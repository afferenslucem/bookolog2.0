using bookolog.Models;
using bookolog.Storages;
using bookolog.Utils;
using Microsoft.EntityFrameworkCore;

namespace bookolog.Services;

public interface IStatisticService
{
    Task<StatisticItem[]> GetAuthorsStatistic(int userId, string? pattern);
    Task<StatisticItem[]> GetGenresStatistic(int userId, string? pattern);
    Task<StatisticItem[]> GetTagsStatistic(int userId, string? pattern);
    Task<StatisticItem[]> GetTypeStatistic(int userId);
    Task<StatisticItem[]> GetYearStatistic(int userId);
}

public class StatisticService : IStatisticService
{
    private BookologContext dbContext;

    public StatisticService(BookologContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<StatisticItem[]> GetAuthorsStatistic(int userId, string? pattern)
    {
        var userBooks = dbContext.Books
            .Where(book => book.UserId == userId && book.Status == BookStatus.Done);

        var authors = userBooks.SelectMany(book => book.Authors);

        if (pattern != null)
        {
            authors = authors.Where(author => author.ToLower().Contains(pattern.ToLower()));
        }

        var statistic = await authors
            .GroupBy(author => author.ToLower(), (author, books) => new { Name = author.ToString(), Count = books.Count() })
            .OrderByDescending(pair => pair.Count)
            .ToArrayAsync();

        return statistic.Select(item => new StatisticItem(item.Name, item.Count)).ToArray();
        ;
    }

    public async Task<StatisticItem[]> GetGenresStatistic(int userId, string? pattern)
    {
        var userBooks = dbContext.Books
            .Where(book => book.UserId == userId && book.Status == BookStatus.Done);

        var genres = userBooks.Where(book => book.Genre != null).Select(book => book.Genre);

        if (pattern != null)
        {
            genres = genres.Where(genre => genre.ToLower().Contains(pattern.ToLower()));
        }

        var statistic = await genres
            .GroupBy(genre => genre.ToLower(), (genre, books) => new { Name = genre.ToString(), Count = books.Count() })
            .OrderByDescending(pair => pair.Count)
            .ToArrayAsync();

        return statistic.Select(item => new StatisticItem(item.Name, item.Count)).ToArray();
        ;
    }

    public async Task<StatisticItem[]> GetTagsStatistic(int userId, string? pattern)
    {
        var userBooks = dbContext.Books
            .Where(book => book.UserId == userId && book.Status == BookStatus.Done);

        var tags = userBooks.SelectMany(book => book.Tags);

        if (pattern != null)
        {
            tags = tags.Where(tag => tag.ToLower().Contains(pattern.ToLower()));
        }

        var statistic = await tags
            .GroupBy(tag => tag.ToLower(), (tag, books) => new { Name = tag.ToString(), Count = books.Count() })
            .OrderByDescending(pair => pair.Count)
            .ToArrayAsync();

        return statistic.Select(item => new StatisticItem(item.Name, item.Count)).ToArray();
        ;
    }

    public async Task<StatisticItem[]> GetTypeStatistic(int userId)
    {
        var userBooks = dbContext.Books
            .Where(book => book.UserId == userId && book.Status == BookStatus.Done);

        var types = userBooks.Select(book => book.Type);

        var statistic = await types
            .GroupBy(type => type, (type, books) => new { Name = type.ToString(), Count = books.Count() })
            .OrderByDescending(pair => pair.Count)
            .ToArrayAsync();

        return statistic.Select(item => new StatisticItem(item.Name, item.Count)).ToArray();
    }

    public async Task<StatisticItem[]> GetYearStatistic(int userId)
    {
        var userBooks = dbContext.Books
            .Where(book => book.UserId == userId && book.Status == BookStatus.Done);

        var years = userBooks.Select(book => book.FinishDate!.Value.Year);

        var statistic = await years
            .GroupBy(year => year, (year, books) => new { Name = year.ToString(), Count = books.Count() })
            .OrderByDescending(pair => pair.Count)
            .ToArrayAsync();

        return statistic.Select(item => new StatisticItem(item.Name, item.Count)).ToArray();
    }
}