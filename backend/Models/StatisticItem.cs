namespace bookolog.Models;

public class StatisticItem
{
    public string Name { get; set; }
    public int Count { get; set; }

    public StatisticItem(string name, int count)
    {
        Name = name;
        Count = count;
    }
}