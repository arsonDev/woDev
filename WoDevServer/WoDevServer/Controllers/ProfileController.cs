using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.Database.Model;
using WoDevServer.Database.Repository;
using WoDevServer.DatabaseTranslationObjects.Profile;

namespace WoDevServer.Controllers
{
    [Route("api/profile")]
    [ApiController]
    [Authorize]
    public class ProfileController : Controller
    {
        private readonly IProfileRepository _profileRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public ProfileController(IProfileRepository profileRepository, IUserRepository userRepository, IMapper mapper)
        {
            _profileRepository = profileRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<ActionResult> Create(ProfileCreate profileCreate)
        {
            try
            {
                if (profileCreate == null)
                    return BadRequest();

                var userId = HttpContext.User.Identity.Name;

                var profile = _mapper.Map<UserProfile>(profileCreate);

                await _profileRepository.CreateAsync(profile);

                return Ok();
            }
            catch (Exception e)
            {
                return NotFound(new { e.Message, e.InnerException, e.StackTrace, e.Source });
            }
        }

        [HttpPatch]
        [Route("Update")]
        public async Task<ActionResult> Update(int id, JsonPatchDocument<ProfileCreate> patchDto)
        {
            try
            {
                var profileFromDb = await _profileRepository.GetByIdAsync(id);
                if (profileFromDb == null)
                    return NotFound();

                var profileToPatch = _mapper.Map<ProfileCreate>(profileFromDb);
                patchDto.ApplyTo(profileToPatch, ModelState);
                if (!TryValidateModel(profileToPatch))
                    return ValidationProblem(ModelState);

                _mapper.Map(profileToPatch, profileFromDb);
                await _profileRepository.Update(profileFromDb);
                await _profileRepository.SaveChanges();

                return NoContent();
            }
            catch (Exception e)
            {
                return NotFound(new { e.Message, e.InnerException, e.StackTrace, e.Source });
            }
        }
    }
}