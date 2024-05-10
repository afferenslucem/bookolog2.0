using System.Security.Claims;
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

    public SeriesController(ISeriesService seriesService)
    {
        this._seriesService = seriesService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetSeries(string? pattern)
    {
        var statistic = await _seriesService.GetSeries(UserId, pattern);
        
        return Ok(statistic);
    }
}