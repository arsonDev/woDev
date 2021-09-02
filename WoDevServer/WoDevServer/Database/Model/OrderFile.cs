using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WoDevServer.Database.Model
{
    [Table("OrderFile")]
    public class OrderFile
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        public string Data { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime CreateDate { get; private set; } = DateTime.Now;

        public virtual Order Order { get; set; }
    }
}
