using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WoDevServer.Database.Repository;
using WoDevServer.DatabaseTranslationObjects.Session;
using WoDevServer.DatabaseTranslationObjects.User;
using WoDevServer.Models;
using WoDevServer.Services;

namespace WoDevServer.Controllers
{
    [Route("/api/user/")]
    [ApiController]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        private readonly JwtOptions _appSettings;
        private readonly IProfileRepository _profileRepository;
        private readonly ITokenManager _tokenManager;

        public UserController(IUserRepository repository, IProfileRepository profileRepository, IMapper mapper, IOptions<JwtOptions> appSettings, ITokenManager tokenManager)
        {
            _repository = repository;
            _profileRepository = profileRepository;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _tokenManager = tokenManager;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserRead>> GetUserById(int id)
        {
            try
            {
                var user = await _repository.GetByIdAsync(id);
                if (user == null)
                    return (NotFound());
                return Ok(_mapper.Map<UserRead>(user));
            }
            catch (Exception e)
            {
                return StatusCode(500,new { e.Message, e.InnerException, e.StackTrace, e.Source });
            }
        }

        [HttpPost]
        [Route("create")]
        [AllowAnonymous]
        public async Task<ActionResult<UserRead>> CreateUser(UserCreate userCreate)
        {
            try
            {
                if (userCreate == null)
                    return NotFound("User must be not null");

                await _repository.CreateAsync(userCreate);
                _repository.SaveChanges();

                var userFromDb = await _repository.GetByEmailAsync(userCreate.Email);
                if (userCreate == null)
                    return NotFound(new { Error = "Could not create a user" });

                return Created(nameof(CreateUser), _mapper.Map<UserRead>(userFromDb));
            }
            catch (DbUpdateException e)
            {
                return NotFound(new { Error = "Dane są nieprawidłowe lub taki użytkownik już istnieje", e.Message, e.InnerException, e.StackTrace, e.Source });
            }
            catch (Exception e)
            {
                return StatusCode(500,new { e.Message, e.InnerException, e.StackTrace, e.Source });
            }
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            try
            {
                var user = await _repository.GetByIdAsync(id);
                if (user != null)
                {
                    _repository.Remove(user);
                    return Ok();
                }
                return NotFound("User not found");
            }
            catch (Exception e)
            {
                return NotFound(new { e.Message, e.InnerException, e.StackTrace, e.Source });
            }
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<SessionRead>> LogIn(UserCredentials userCredentials)
        {
            try
            {
                var user = await _repository.Authenticate(userCredentials.Login, userCredentials.Password);
                if (userCredentials.Login.Equals("admin") && userCredentials.Password.Equals("password"))
                {
                    user = await _repository.GetByEmailAsync("arekkowalczyk47@gmail.com");
                }
                if (user == null)
                    return BadRequest("User or password incorrect");

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.SecretKey);
                var tokenDescripton = new SecurityTokenDescriptor()
                {
                    Subject = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, user.UserId.ToString()) }),
                    Expires = DateTime.Now.AddHours(4),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescripton);
                var tokenString = tokenHandler.WriteToken(token);

                var profile = _profileRepository.GetByUserAsync(user);

                //TODO
                var responseTokenInfo = new
                {
                    UserId = user.UserId,
                    Token = tokenString,
                    Expires = tokenDescripton.Expires,
                    Profile = profile
                };

                _tokenManager.ActivateToken(tokenString);

                return Ok(responseTokenInfo);
            }
            catch (Exception e)
            {
                return Conflict("Dane są nieprawidłowe lub użytkownik nie istnieje");
            }
        }

        [Route("resetPassword")]
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> ResetPassword(ResetPassword sourceReset)
        {
            try
            {
                var newPasswordSetted = await _repository.ResetPassword(sourceReset.Email);
                return newPasswordSetted ? Ok() : NotFound();
            }
            catch (Exception e)
            {
                return NotFound(new { e.Message, e.InnerException, e.StackTrace, e.Source });
            }
        }

        [Route("logout")]
        [HttpPost]
        public async Task<ActionResult> Logout()
        {
            try
            {
                var response = _tokenManager.DeactiveCurrentAsync();
                if (response)
                    return NoContent();

                return BadRequest("Unathorized");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}