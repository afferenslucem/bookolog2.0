using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bookolog.Models;

public class AuthenticationModel
{
    [Required]
    public string Login { get; set; }
    
    [Required]
    public string Password { get; set; }
}