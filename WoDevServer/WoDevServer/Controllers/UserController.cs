using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WoDevServer.Database.Repository;
using WoDevServer.DatabaseTranslationObjects;
using WoDevServer.DatabaseTranslationObjects.User;
using WoDevServer.Database.Model;
using WoDevServer.Helper;
using Microsoft.EntityFrameworkCore;
using WoDevServer.DatabaseTranslationObjects.Session;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.Extensions.Options;

namespace WoDevServer.Controllers
{
    [Route("/api/user/")]
    [ApiController]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UserController(IUserRepository repository, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _repository = repository;
            _mapper = mapper;
            _appSettings = appSettings.Value;
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
                return NotFound(new { e.Message, e.InnerException, e.StackTrace, e.Source });
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
                    return NotFound("Could not create a user");

                return Created(nameof(CreateUser), _mapper.Map<UserRead>(userFromDb));
            }
            catch (DbUpdateException e)
            {
                return NotFound(new { Error = "Dane są nieprawidłowe lub taki użytkownik już istnieje", e.Message, e.InnerException, e.StackTrace, e.Source });
            }
            catch (Exception e)
            {
                return NotFound(new { e.Message, e.InnerException, e.StackTrace, e.Source });
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
                if (user == null)
                    return BadRequest("User or password incorrect");

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescripton = new SecurityTokenDescriptor()
                {
                    Subject = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, user.Id.ToString()) }),
                    Expires = DateTime.Now.AddHours(4),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescripton);
                var tokenString = tokenHandler.WriteToken(token);

                //TODO
                var responseTokenInfo = new
                {
                    Token = tokenString,
                    Expires = tokenDescripton.Expires
                };
                return Ok(responseTokenInfo);
            }
            catch (Exception e)
            {
                return NotFound(new { e.Message, e.InnerException, e.StackTrace, e.Source });
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
    }
}