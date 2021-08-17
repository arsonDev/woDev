using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Utils
{
    public class Mailer
    {
        public async Task SendEmail(MailMessage mailMessage)
        {
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("wodevapp@gmail.com", "m!6wZoZFjM7^^W"),
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                    DeliveryMethod = SmtpDeliveryMethod.Network
                };
                await smtpClient.SendMailAsync(mailMessage);
            }
            catch (Exception e)
            {
            }
        }
    }
}