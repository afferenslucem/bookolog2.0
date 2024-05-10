using System.Security.Claims;
using bookolog.Models;
using bookolog.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace bookolog.Controllers;

[Route("[controller]")]
public class AuthController : Controller
{
    private IUserService _userService;
    
    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("SignIn")]
    public async Task<IActionResult> SignIn([FromBody] AuthenticationModel data)
    {
        var user = await _userService.CheckUser(data);

        if (user == null)
        {
            return Unauthorized();
        }

        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.Login),
            new(ClaimTypes.Sid, user.Id.ToString()),
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity));

        return Ok(user.WithoutPrivate());
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] RegistrationModel data)
    {
        var user = await _userService.Register(data);

        return Ok(user);
    }

    [HttpGet("Me")]
    public async Task<IActionResult> GetMe()
    {
        var userId = this.GetUserId();

        if (userId == null)
        {
            return Unauthorized();
        }
        
        var user = await _userService.GetUser(userId.Value);

        return Ok(user!.WithoutPrivate());
    }

    [HttpGet("IsEmailExists/{email}")]
    public async Task<IActionResult> IsEmailExists(string email)
    {
        var user = await _userService.IsEmailExits(email);

        return Ok(user);
    }

    [HttpGet("Logout")]
    public async Task<IActionResult> Logout()
    {        
        await HttpContext.SignOutAsync();

        return Ok();
    }

    private int? GetUserId()
    {
        var claim = this.HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Sid)?.Value;

        if (claim == null)
        {
            return null;
        }
        else
        {
            return int.Parse(claim);
        }
    }
}