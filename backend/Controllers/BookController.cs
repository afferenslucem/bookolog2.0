using System.Security.Claims;
using bookolog.Models;
using bookolog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace bookolog.Controllers;

[Authorize]
[Route("[controller]")]
public class BookController : Controller
{
    public int UserId => int.Parse(this.HttpContext.User.Claims.First(claim => claim.Type == ClaimTypes.Sid).Value);

    private IBookService _bookService;

    public BookController(IBookService bookService)
    {
        this._bookService = bookService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBook([FromBody] Book entity)
    {
        entity.UserId = this.UserId;
        entity.ModifyDate = DateTime.UtcNow;

        await _bookService.Create(entity);

        return Ok(entity);
    }

    [HttpPut("{bookId}")]
    public async Task<IActionResult> UpdateBook(long bookId, [FromBody] Book entity)
    {
        entity.UserId = this.UserId;
        entity.ModifyDate = DateTime.UtcNow;
        entity.Id = bookId;

        await _bookService.Update(entity);

        return Ok(entity);
    }

    [HttpGet("{bookId}")]
    public async Task<IActionResult> GetBook(long bookId)
    {
        var book = await _bookService.GetById(bookId);

        if (book == null)
        {
            return NotFound();
        }

        return Ok(book);
    }

    [HttpPost("search")]
    public async Task<IActionResult> SearchBooks([FromBody] SearchBookOptions? options)
    {
        var books = await _bookService.Search(UserId, options);

        return Ok(books);
    }

    [HttpDelete("{bookId}")]
    public async Task<IActionResult> RemoveBook(long bookId)
    {
        var book = await _bookService.GetById(bookId);

        if (book == null)
        {
            return NotFound();
        }

        await _bookService.Delete(book);

        return Ok();
    }
}