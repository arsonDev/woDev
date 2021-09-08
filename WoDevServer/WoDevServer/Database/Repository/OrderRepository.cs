using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.Database.Model;

namespace WoDevServer.Database.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly WodevContext _context;

        public OrderRepository(WodevContext context)
        {
            _context = context;
        }

        public async Task<Order> Create(Order order)
        {
            await _context.AddAsync(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<Order> GetById(int id)
        {
            return _context.Orders.FirstOrDefault(x => x.Id == id);
        }

        public async Task<(List<Order>, int)> GetMyOrders(int userId, int page, int pageSize)
        {
            var orders = _context.Orders.Where(x => x.CreateUserId == userId && x.WorkingUser == null);

            return (orders.Skip((page * pageSize) - pageSize).Take(pageSize).ToList(), orders.Count());
        }

        public async Task<(List<Order>, int)> GetOrderInProgres(int userId, int page, int pageSize)
        {
            var orders = _context.Orders.Where(x => x.WorkingUser != null && x.WorkingUser.UserId == userId);
            return (orders.Skip((page * pageSize) - pageSize).Take(pageSize).ToList(), orders.Count());
        }

        public async Task<bool> Update(Order order)
        {
            _context.Update(order);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
