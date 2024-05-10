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
    public Task<Book[]> Search(SearchBookOptions? options);
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

    public async Task<Book[]> Search(SearchBookOptions? options)
    {
        IQueryable<Book> books = dbContext.Books;

        if (!string.IsNullOrEmpty(options?.Author))
        {
            books = books.Where(book => book.Authors.Contains(options!.Author));
        }

        if (!string.IsNullOrEmpty(options?.Tag))
        {
            books = books.Where(book => book.Tags.Contains(options!.Tag));
        }

        if (!string.IsNullOrEmpty(options?.Pattern))
        {
            books = books.Where(book => book.Name.Contains(options!.Pattern));
        }

        if (options?.Year != null)
        {
            books = books.Where(book => book.FinishDate!.Value.Year == options.Year);
        }

        if (options?.Genre != null)
        {
            books = books.Where(book => book.Genre == options.Genre);
        }

        if (options?.Status != null)
        {
            books = books.Where(book => book.Status == options.Status);
        }

        if (options?.Series != null)
        {
            books = books.Where(book => book.Series == options.Series)
                .OrderBy(book => book.SeriesNumber);
        }
        else
        {
            books = books.OrderByDescending(book => book.ModifyDate);
        }

        return await books.ToArrayAsync();
    }

    public async Task Delete(Book book)
    {
        dbContext.Books.Remove(book);

        await dbContext.SaveChangesAsync();
    }
}