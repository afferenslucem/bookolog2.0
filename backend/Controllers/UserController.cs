using bookolog.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace bookolog.Controllers;

[Route("[controller]")]
public class UserController: Controller
{
    [Route("{userId}")]
    [HttpGet]
    public IActionResult GetUser(int userId)
    {
        return Ok(new User());
    }
}