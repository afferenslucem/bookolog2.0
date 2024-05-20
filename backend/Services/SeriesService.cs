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

        var bookWithSeries = userBooks.Where(book => book.Series != null);

        if (pattern != null)
        {
            bookWithSeries = bookWithSeries.Where(book => book.Series.ToLower().Contains(pattern.ToLower()));
        }

        var statistic = await bookWithSeries
            .GroupBy(book => book.Series, (series, books) => new
            {
                Name = series, 
                Count = books.Select(item => item.Name).Distinct().Count(), 
                ModifyDate = books.Select(book => book.ModifyDate).Max()
            })
            .OrderByDescending(item => item.ModifyDate)
            .ToArrayAsync();

        return statistic.Select(item => new StatisticItem(item.Name, item.Count)).ToArray();
    }
}