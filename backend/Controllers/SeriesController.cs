using System.Security.Claims;
using bookolog.Models;
using bookolog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bookolog.Controllers;

[Authorize]
[Route("[controller]")]
public class SeriesController: Controller
{
    public int UserId => int.Parse(this.HttpContext.User.Claims.First(claim => claim.Type == ClaimTypes.Sid).Value);
    
    private ISeriesService _seriesService;
    private IBookService _bookService;

    public SeriesController(ISeriesService seriesService, IBookService bookService)
    {
        _seriesService = seriesService;
        _bookService = bookService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetSeries(string? pattern)
    {
        var statistic = await _seriesService.GetSeries(UserId, pattern);
        
        return Ok(statistic);
    }
    
    [HttpPost("books")]
    public async Task<IActionResult> GetBooks([FromBody] SearchBookAtSeriesOptions options)
    {
        var books = await _bookService.Search(UserId, new()
        {
            Series = options.Series
        });

        var result = books
            .OrderBy(book => book.SeriesNumber)
            .ThenBy(book => book.ModifyDate)
            .DistinctBy(book => book.Name);
        
        return Ok(result);
    }
}