using System.Security.Claims;
using bookolog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bookolog.Controllers;

[Authorize]
[Route("[controller]")]
public class PrefillController: Controller
{
    public int UserId => int.Parse(this.HttpContext.User.Claims.First(claim => claim.Type == ClaimTypes.Sid).Value);
    
    private IPrefillService _prefillService;

    public PrefillController(IPrefillService prefillService)
    {
        this._prefillService = prefillService;
    }
    
    [HttpGet("Authors")]
    public async Task<IActionResult> GetAuthors(string? pattern)
    {
        var statistic = await _prefillService.GetAuthors(UserId, pattern);
        
        return Ok(statistic);
    }
    
    [HttpGet("Genres")]
    public async Task<IActionResult> GetGenres(string? pattern)
    {
        var statistic = await _prefillService.GetGenres(UserId, pattern);
        
        return Ok(statistic);
    }
    
    [HttpGet("Tags")]
    public async Task<IActionResult> GetTagsStatistic(string? pattern)
    {
        var statistic = await _prefillService.GetTags(UserId, pattern);
        
        return Ok(statistic);
    }
    
    [HttpGet("Series")]
    public async Task<IActionResult> GetSeriesStatistic(string? pattern)
    {
        var statistic = await _prefillService.GetSeries(UserId, pattern);
        
        return Ok(statistic);
    }
}