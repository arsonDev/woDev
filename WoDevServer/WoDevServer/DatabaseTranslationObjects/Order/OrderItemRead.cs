using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WoDevServer.DatabaseTranslationObjects.User;
using WoDevServer.DatabaseTranslationObjects.OrderFile;

namespace WoDevServer.DatabaseTranslationObjects.Order
{
    public class OrderItemRead
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

        public int CreateUserId { get; set; }

        public DateTime CreationDate { get; private set; } = DateTime.Now;
    }
}
