using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.Database.Model;

namespace WoDevServer.Database.Repository
{
    public interface IProfileRepository
    {
        Task<bool> SaveChanges();

        IEnumerable<UserProfile> GetByUserAsync(User user);

        Task Update(UserProfile data);

        Task Remove(UserProfile data);

        Task<UserProfile> GetByIdAsync(int id);

        Task CreateAsync(UserProfile data);
    }
}