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
    }
}
