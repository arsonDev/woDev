using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WoDevServer.DatabaseTranslationObjects.Profile
{
    public class ProfileCreate
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int ProfileType { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string SurName { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }
    }
}