using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.Database.Model;

namespace WoDevServer.Database.Repository
{
    public interface IOrderRepository
    {
        public Task<Order> Create(Order order);
        public Task<(List<Order>, int)> GetOrders(int userId, int page, int pageSize);
        public Task<(List<Order>, int)> GetOrderInProgres(int userId, int page, int pageSize);
        public Task<(List<Order>, int)> GetMyCreated(int userId, int page, int pageSize);
        public Task<(List<Order>, int)> GetOnWorking(int userId, int page, int pageSize);
        public Task<bool> Update(Order order);
        public Task<Order> GetById(int id);
        public Task Delete(int id);
    }
}
