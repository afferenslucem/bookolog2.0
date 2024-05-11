namespace bookolog.Models;

public class SearchBookOptions
{
    public string? Tag { get; set; }
    public string? Author { get; set; }
    public int? Year { get; set; }
    public string? Pattern { get; set; }
    public string? Series { get; set; }
    public string? Genre { get; set; }
    public BookStatus? Status { get; set; }
    
    public OrderOption? Order { get; set; }
}