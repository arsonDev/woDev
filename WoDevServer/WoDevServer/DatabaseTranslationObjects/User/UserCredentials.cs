using System.ComponentModel.DataAnnotations;

namespace WoDevServer.DatabaseTranslationObjects.User
{
    public class UserCredentials
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }
    }
}