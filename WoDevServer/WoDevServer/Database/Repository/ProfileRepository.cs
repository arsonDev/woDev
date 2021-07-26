using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.Database.Model;

namespace WoDevServer.Database.Repository
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly WodevContext _context;

        public ProfileRepository(WodevContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(UserProfile data)
        {
            await _context.AddAsync(data);
            await SaveChanges();
        }

        public Task<UserProfile> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public UserProfile GetByUserAsync(User user)
        {
            return _context.UserProfile.FirstOrDefault(x => x.User == user);
        }

        public async Task Remove(UserProfile data)
        {
            _context.Remove(data);
            await SaveChanges();
        }

        public async Task<bool> SaveChanges()
        {
            return await _context.SaveChangesAsync() >= 0;
        }

        public async Task Update(UserProfile data)
        {
            _context.Update(data);
            await SaveChanges();
        }
    }
}