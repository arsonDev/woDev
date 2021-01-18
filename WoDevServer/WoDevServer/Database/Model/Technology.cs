using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WoDevServer.Database.Model
{
    [Table("Technology")]
    public class Technology
    {
        [Key]
        [Required]
        [Column("Id")]
        public int TechnologyId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public byte[] Logo { get; set; }
    }
}