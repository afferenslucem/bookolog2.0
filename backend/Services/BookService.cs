using System.Linq.Expressions;
using bookolog.Models;
using bookolog.Storages;
using bookolog.Utils;
using Microsoft.EntityFrameworkCore;

namespace bookolog.Services;

public interface IBookService
{
    public Task<Book> Create(Book entity);
    public Task<Book> Update(Book entity);
    public Task<Book?> GetById(long id);
    public Task<Book[]> Search(int userId, SearchBookOptions? options);
    public Task Delete(Book entity);
}

public class BookService : IBookService
{
    private BookologContext dbContext;

    public BookService(BookologContext dbContext)
    {
        this.dbContext = dbContext;
    }


    public async Task<Book> Create(Book entity)
    {
        await dbContext.Books.AddAsync(entity);

        await dbContext.SaveChangesAsync();

        return entity;
    }

    public async Task<Book> Update(Book entity)
    {
        dbContext.Books.Update(entity);

        await dbContext.SaveChangesAsync();

        return entity;
    }

    public async Task<Book?> GetById(long id)
    {
        var book = await dbContext.Books.FirstOrDefaultAsync(book => book.Id == id);

        return book;
    }

    public async Task<Book[]> Search(int userId, SearchBookOptions? options)
    {
        IQueryable<Book> books = dbContext.Books;

        books = books.Where(book => book.UserId == userId);

        if (!string.IsNullOrEmpty(options?.Author))
        {
            books = books.Where(book => book.Authors.Any(author => author.ToLower() == options.Author.ToLower()));
        }

        if (!string.IsNullOrEmpty(options?.Tag))
        {
            books = books.Where(book => book.Tags.Any(tag => tag.ToLower() == options.Tag.ToLower()));
        }

        if (!string.IsNullOrEmpty(options?.Pattern))
        {
            books = books.Where(book => book.Name.ToLower().Contains(options!.Pattern.ToLower()));
        }

        if (options?.Year != null)
        {
            books = books.Where(book => book.FinishDate!.Value.Year == options.Year);
        }

        if (options?.Genre != null)
        {
            books = books.Where(book => book.Genre.ToLower() == options.Genre.ToLower());
        }

        if (options?.Status != null)
        {
            books = books.Where(book => book.Status == options.Status);
        }

        if (options?.Series != null)
        {
            books = books
                .Where(book => book.Series.ToLower() == options.Series.ToLower());
        }

        if (options?.Order?.Direction.ToLower() == "asc")
        {
            books = books.OrderBy(GetNullOrder(options)).ThenBy(GetOrderProperty(options));
        }
        else
        {
            books = books.OrderBy(GetNullOrder(options)).ThenByDescending(GetOrderProperty(options));
        }

        return await books.ToArrayAsync();
    }

    public async Task Delete(Book book)
    {
        dbContext.Books.Remove(book);

        await dbContext.SaveChangesAsync();
    }

    private static Expression<Func<Book, object?>> GetOrderProperty(SearchBookOptions? options)
    {
        Expression<Func<Book, object?>> keySelector = options?.Order?.FieldName.ToLower() switch
        {
            "seriesnumber" => book => book.SeriesNumber,
            "startdate" => book => book.StartDate,
            "finishdate" => book => book.FinishDate,
            _ => book => book.ModifyDate,
        };

        return keySelector;
    }

    private static Expression<Func<Book, Boolean>> GetNullOrder(SearchBookOptions? options)
    {
        Expression<Func<Book, Boolean>> keySelector = options?.Order?.FieldName.ToLower() switch
        {
            "seriesnumber" => book => book.SeriesNumber == null,
            "startdate" => book => book.StartDate == null,
            "finishdate" => book => book.FinishDate == null,
            _ => book => book.ModifyDate == null,
        };

        return keySelector;
    }
}