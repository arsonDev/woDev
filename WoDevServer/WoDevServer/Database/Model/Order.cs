using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WoDevServer.Database.Model
{
    [Table("Order")]
    public class Order
    {

        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string ReqFunc { get; set; }

        [Required]
        public string ReqNoFunc { get; set; }

        [Required]
        public string Technology { get; set; }

        [Required]
        public DateTime DeadLine { get; set; } = DateTime.Now.AddDays(7);

        public virtual User WorkingUser { get; set; }

        public virtual ICollection<OrderFile> Files {get;set;}

        [ForeignKey("User")]
        public int CreateUserId { get; set; }

        public DateTime CreationDate { get; private set; } = DateTime.Now;
    }
}
