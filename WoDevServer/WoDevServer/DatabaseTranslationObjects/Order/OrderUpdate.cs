using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.DatabaseTranslationObjects.OrderFile;
using WoDevServer.DatabaseTranslationObjects.User;

namespace WoDevServer.DatabaseTranslationObjects.Order
{
    public class OrderUpdate
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Type { get; set; }

        public string ReqFunc { get; set; }

        public string ReqNoFunc { get; set; }

        public string Technology { get; set; }

        public DateTime DeadLine { get; set; }

        public UserRead WorkingUser { get; set; }

        public List<OrderFileRead> Files { get; set; }
    }
}
