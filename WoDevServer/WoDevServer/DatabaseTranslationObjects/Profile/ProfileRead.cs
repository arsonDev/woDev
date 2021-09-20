using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WoDevServer.DatabaseTranslationObjects.Profile
{
    public class ProfileRead
    {
        public int UserProfileId { get; set; }

        public int UserId { get; set; }

        public string Description { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }
        public byte[] File { get; set; }
        public byte[] Logo { get; set; }
        public DateTime? BirthDate { get; set; }

        public string Name { get; set; }

        public string SurName { get; set; }

        public int UserProfileTypeId { get; set; }
    }
}
