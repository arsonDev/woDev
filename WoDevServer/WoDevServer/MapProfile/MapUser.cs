using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.DatabaseTranslationObjects.User;
using WoDevServer.Database.Model;

namespace WoDevServer.MapProfile
{
    public class MapUser : Profile
    {
        public MapUser()
        {
            CreateMap<UserCreate, User>();
            CreateMap<User, UserCreate>();
            CreateMap<UserRead, User>();
            CreateMap<User, UserRead>();
        }
    }
}