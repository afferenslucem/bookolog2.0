using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace bookolog.Models;

public enum BookStatus
{
    ToRead = 0,
    InProgress = 1,
    Done = 2
}

public enum BookType
{
    Audio = 0,
    Paper = 1,
    Electronic = 2
}

[Index(nameof(ModifyDate))]
public class Book
{
    public long Id { get; set; }
    
    [Column(TypeName = "varchar(512)")]
    [Required]
    public string Name { get; set; }
        
    [Column(TypeName = "varchar(512)[]")]
    public string[] Authors { get; set; }
    
    [Column(TypeName = "varchar(256)[]")]
    public string[] Tags { get; set; }
    
    [Column(TypeName = "varchar(256)")]
    [Required]
    public string Genre { get; set; }
    
    [Column(TypeName = "varchar(256)")]
    public string? Series { get; set; }
    
    public short? SeriesNumber { get; set; }
    
    public DateTime? StartDate { get; set; }
        
    public DateTime? FinishDate { get; set; }

    public DateTime ModifyDate { get; set; }
    
    public string? Note { get; set; }

    [Required]
    public BookType Type { get; set; }

    [Required]
    public BookStatus Status { get; set; }
    
    public int UserId { get; set; }
        
    [JsonIgnore]
    public User User { get; set; }
}