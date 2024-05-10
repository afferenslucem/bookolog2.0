using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bookolog.Models;

public class User
{
    public int Id { get; set; }
    
    [Required]
    [Column(TypeName = "varchar(128)")]
    
    public string Login { get; set; }
    
    [Required]
    [Column(TypeName = "varchar(128)")]
    public string Email { get; set; }
    
    public string PasswordHash { get; set; }
    
    
    [Required]
    [Column(TypeName = "varchar(256)")]
    public string Salt { get; set; }
    
    public ICollection<Book> Books { get; }

    public User WithoutPrivate()
    {
        return new()
        {
            Id = Id,
            Login = Login,
            Email = Email
        };
    }
}