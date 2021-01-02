using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.Database.Model;

namespace WoDevServer.Database.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly WodevContext _context;

        public UserRepository(WodevContext context)
        {
            _context = context;
        }

        public void Create(User data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Data must be not null");
            }
            _context.Add(data);
        }

        public async Task CreateAsync(User data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Data must be not null");
            }
            await _context.AddAsync(data);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.User.ToList();
        }

        public User GetByEmail(string email)
        {
            return _context.User.AsNoTracking().FirstOrDefault(x => x.Email == email);
        }

        public User GetById(int id)
        {
            return _context.User.AsEnumerable().FirstOrDefault(x => x.Id == id);
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.FindAsync<User>(id);
        }

        public void Remove(User data)
        {
            _context.Remove(data);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void Update(User data)
        {
            _context.Update(data);
        }
    }
}