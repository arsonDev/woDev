using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WoDevServer.DatabaseTranslationObjects.Session
{
    public class SessionRead
    {
        [Required]
        public string SessionToken { get; set; }

        [Required]
        public DateTime ExpireDate { get; set; }
    }
}