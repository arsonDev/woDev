using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.Database.Model;
using WoDevServer.DatabaseTranslationObjects.User;

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

        public async Task CreateAsync(UserCreate data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Data must be not null");
            }

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(data.Password, out passwordHash, out passwordSalt);
            var user = new User()
            {
                Email = data.Email,
                Password = passwordHash,
                PasswordSalt = passwordSalt
            };

            await _context.AddAsync(user);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.User.ToListAsync();
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.User.AsNoTracking().FirstOrDefaultAsync(x => x.Email == email || x.Login == email);
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

        public async Task<User> Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = await _context.User.SingleOrDefaultAsync(x => x.Login == username || x.Email == username);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.Password, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}