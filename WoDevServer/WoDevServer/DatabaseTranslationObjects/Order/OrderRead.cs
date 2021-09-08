using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WoDevServer.DatabaseTranslationObjects.Order
{
    public class OrderRead
    {
        public List<OrderItemRead> Orders { get; set; }
        public int AllOrderCount { get; set; }
    }
}
