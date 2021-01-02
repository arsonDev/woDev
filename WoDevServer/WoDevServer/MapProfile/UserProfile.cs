using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.DatabaseTranslationObjects.User;
using WoDevServer.Database.Model;

namespace WoDevServer.MapProfile
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserCreate, User>();
            CreateMap<User, UserCreate>();
            CreateMap<UserRead, User>();
            CreateMap<User, UserRead>();
        }
    }
}