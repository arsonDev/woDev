using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.Database.Model;
using WoDevServer.DatabaseTranslationObjects.User;

namespace WoDevServer.Database.Repository
{
    public interface IUserRepository
    {
        bool SaveChanges();

        Task<IEnumerable<User>> GetAllUsersAsync();

        Task<User> GetByEmailAsync(string email);

        void Create(User data);

        void Update(User data);

        void Remove(User data);

        Task<User> GetByIdAsync(int id);

        Task CreateAsync(UserCreate data);

        Task<User> Authenticate(string userName, string password);
    }
}