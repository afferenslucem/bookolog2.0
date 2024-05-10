using System.Security.Claims;
using bookolog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bookolog.Controllers;

[Authorize]
[Route("[controller]")]
public class StatisticController: Controller
{
    public int UserId => int.Parse(this.HttpContext.User.Claims.First(claim => claim.Type == ClaimTypes.Sid).Value);
    
    private IStatisticService _statisticService;

    public StatisticController(IStatisticService statisticService)
    {
        this._statisticService = statisticService;
    }
    
    [HttpGet("Authors")]
    public async Task<IActionResult> GetAuthorsStatistic(string? pattern)
    {
        var statistic = await _statisticService.GetAuthorsStatistic(UserId, pattern);
        
        return Ok(statistic);
    }
    
    [HttpGet("Genres")]
    public async Task<IActionResult> GetGenresStatistic(string? pattern)
    {
        var statistic = await _statisticService.GetGenresStatistic(UserId, pattern);
        
        return Ok(statistic);
    }
    
    [HttpGet("Tags")]
    public async Task<IActionResult> GetTagsStatistic(string? pattern)
    {
        var statistic = await _statisticService.GetTagsStatistic(UserId, pattern);
        
        return Ok(statistic);
    }
    
    [HttpGet("Types")]
    public async Task<IActionResult> GetTypeStatistic()
    {
        var statistic = await _statisticService.GetTypeStatistic(UserId);
        
        return Ok(statistic);
    }
    
    [HttpGet("Years")]
    public async Task<IActionResult> GetYearStatistic()
    {
        var statistic = await _statisticService.GetYearStatistic(UserId);
        
        return Ok(statistic);
    }
}