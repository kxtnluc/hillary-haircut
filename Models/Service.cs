using System.ComponentModel.DataAnnotations;
namespace Haircut.Models;

public class Service
{
    public int Id { get; set; }
    [Required]
    public string ServiceName { get; set; }
    public decimal Cost { get; set; }
}