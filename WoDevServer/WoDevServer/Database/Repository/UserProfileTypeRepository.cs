using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.Database.Model;

namespace WoDevServer.Database.Repository
{
    public class UserProfileTypeRepository : IUserProfileTypeRepository
    {
        private readonly WodevContext _context;

        public UserProfileTypeRepository(WodevContext context)
        {
            _context = context;
            if (_context.UserProfileType.Count() == 0)
            {
                _context.Add<UserProfileType>(new UserProfileType() { Name = "Pracownik" });
                _context.Add<UserProfileType>(new UserProfileType() { Name = "Pracodawca" });
                _context.SaveChanges();
            }

        }

        public List<UserProfileType> GetAllTypes()
        {
            return _context.UserProfileType.ToList();
        }
    }
}
