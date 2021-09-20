using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WoDevServer.Database.Model
{
    public class UserProfileType
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public virtual ICollection<UserProfile> UserProfiles { get; set; }
    }
}
