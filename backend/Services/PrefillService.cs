using bookolog.Models;
using bookolog.Storages;
using bookolog.Utils;
using Microsoft.EntityFrameworkCore;

namespace bookolog.Services;

public interface IPrefillService
{
    Task<string[]> GetAuthors(int userId, string? pattern);
    Task<string[]> GetTags(int userId, string? pattern);
    Task<string[]> GetSeries(int userId, string? pattern);
    Task<string[]> GetGenres(int userId, string? pattern);
}

public class PrefillService : IPrefillService
{
    private BookologContext dbContext;

    public PrefillService(BookologContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<string[]> GetAuthors(int userId, string? pattern)
    {
        var userBooks = dbContext.Books.Where(book => book.UserId == userId);

        var authors = userBooks.SelectMany(book => book.Authors);

        if (pattern != null)
        {
            authors = authors.Where(author => author.Contains(pattern));
        }

        authors = authors.Distinct().OrderBy(line => line);

        return await authors.ToArrayAsync();
    }

    public async Task<string[]> GetGenres(int userId, string? pattern)
    {
        var userBooks = dbContext.Books.Where(book => book.UserId == userId);

        var genres = userBooks.Where(book => book.Genre != null && book.Genre != "").Select(book => book.Genre);

        if (pattern != null)
        {
            genres = genres.Where(genre => genre.Contains(pattern));
        }

        genres = genres.Distinct().OrderBy(line => line);

        return await genres.ToArrayAsync();
    }

    public async Task<string[]> GetTags(int userId, string? pattern)
    {
        var userBooks = dbContext.Books.Where(book => book.UserId == userId);

        var tags = userBooks.SelectMany(book => book.Tags);

        if (pattern != null)
        {
            tags = tags.Where(tag => tag.Contains(pattern));
        }

        tags = tags.Select(line => line.ToLower()).Distinct().OrderBy(line => line);

        return await tags.ToArrayAsync();
    }

    public async Task<string[]> GetSeries(int userId, string? pattern)
    {
        var userBooks = dbContext.Books.Where(book => book.UserId == userId && book.Series != null);

        var series = userBooks.Select(book => book.Series).Distinct();

        if (pattern != null)
        {
            series = series.Where(series => series.Contains(pattern));
        }

        series = series.OrderBy(line => line);

        return await series.ToArrayAsync();
    }
}