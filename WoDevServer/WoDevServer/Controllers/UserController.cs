using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WoDevServer.Database.Repository;
using WoDevServer.DatabaseTranslationObjects;
using WoDevServer.DatabaseTranslationObjects.User;
using WoDevServer.Database.Model;
using WoDevServer.Utils;

namespace WoDevServer.Controllers
{
    [Route("/api/user/")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
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
        public async Task<ActionResult<UserRead>> CreateUser(UserCreate userCreate)
        {
            try
            {
                if (userCreate == null)
                    return NotFound("User must be not null");

                var password = SecurityUtils.Encrypt(userCreate.Password, "stronePassword123");

                var user = _mapper.Map<User>(new UserCreate() { Email = userCreate.Email, Password = password });
                await _repository.CreateAsync(user);
                _repository.SaveChanges();

                var userFromDb = _repository.GetByEmail(userCreate.Email);
                if (userCreate == null)
                    return NotFound("Could not create a user");

                return Created(nameof(CreateUser), _mapper.Map<UserRead>(userFromDb));
            }
            catch (Exception e)
            {
                return NotFound(new { e.Message, e.InnerException, e.StackTrace, e.Source });
            }
        }
    }
}