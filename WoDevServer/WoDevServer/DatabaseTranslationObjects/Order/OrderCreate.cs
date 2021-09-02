using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WoDevServer.DatabaseTranslationObjects.OrderFile;

namespace WoDevServer.DatabaseTranslationObjects.Order
{
    public class OrderCreate
    {

        [Required]
        public string ReqFunc { get; set; }

        [Required]
        public string ReqNoFunc { get; set; }

        [Required]
        public string Technology { get; set; }

        [Required]
        public List<OrderFileRead> Files { get; set; }

        [Required]
        public int CreateUserId { get; set; }

    }
}
