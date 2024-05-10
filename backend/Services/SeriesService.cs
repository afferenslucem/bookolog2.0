using bookolog.Models;
using bookolog.Storages;
using bookolog.Utils;
using Microsoft.EntityFrameworkCore;

namespace bookolog.Services;

public interface ISeriesService
{
    Task<StatisticItem[]> GetSeries(int userId, string? pattern);
}

public class SeriesService : ISeriesService
{
    private BookologContext dbContext;

    public SeriesService(BookologContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<StatisticItem[]> GetSeries(int userId, string? pattern)
    {
        var userBooks = dbContext.Books
            .Where(book => book.UserId == userId);

        var bookSeries = userBooks.Where(book => book.Series != null)
            .Select(book => book.Series);

        if (pattern != null)
        {
            bookSeries = bookSeries.Where(series => series.Contains(pattern));
        }

        var statistic = await bookSeries
            .GroupBy(series => series, (series, books) => new StatisticItem(series, books.Count()))
            .ToArrayAsync();

        return statistic;
    }
}