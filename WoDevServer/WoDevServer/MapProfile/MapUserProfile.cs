using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.Database.Model;
using WoDevServer.DatabaseTranslationObjects.Profile;

namespace WoDevServer.MapProfile
{
    public class MapUserProfile : Profile
    {
        public MapUserProfile()
        {
            CreateMap<UserProfile, ProfileCreate>();
            CreateMap<ProfileCreate, UserProfile>();

            CreateMap<UserProfile, ProfileRead>();
        }
    }
}