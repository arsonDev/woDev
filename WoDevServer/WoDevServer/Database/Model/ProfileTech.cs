using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WoDevServer.Database.Model
{
    [Table("ProfileTech")]
    public class ProfileTech
    {
        [Key]
        [Required]
        [Column("Id")]
        public int Id { get; set; }

        public virtual UserProfile UserProfile { get; set; }

        public virtual Technology Technology { get; set; }
    }
}