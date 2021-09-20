using System;
using System.ComponentModel.DataAnnotations;

namespace WoDevServer.DatabaseTranslationObjects.Profile
{
    public class ProfileCreate
    {
        [Required]
        public string Description { get; set; }
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
        public int UserProfileTypeId { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}