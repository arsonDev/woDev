using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WoDevServer.DatabaseTranslationObjects.User
{
    public class ResetPassword
    {
        [Required]
        public string Email { get; set; }
    }
}