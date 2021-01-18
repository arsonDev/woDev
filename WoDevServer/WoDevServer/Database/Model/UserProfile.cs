using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WoDevServer.Database.Model
{
    public class UserProfile
    {
        [Key]
        [Required]
        [Column("Id")]
        public int UserProfileId { get; set; }

        public virtual User User { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Address { get; set; }

        public string Phone { get; set; }
        public byte[] File { get; set; }
        public byte[] Logo { get; set; }
        public DateTime? BirthDate { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string SurName { get; set; }

        [Required]
        public int Type { get; set; }
    }
}