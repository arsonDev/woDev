using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.Database.Model;

namespace WoDevServer.Database.Repository
{
    public interface IUserRepository
    {
        bool SaveChanges();

        IEnumerable<User> GetAllUsers();

        User GetById(int id);

        User GetByEmail(string email);

        void Create(User data);

        void Update(User data);

        void Remove(User data);

        Task<User> GetByIdAsync(int id);

        Task CreateAsync(User data);
    }
}