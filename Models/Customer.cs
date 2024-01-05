using System.ComponentModel.DataAnnotations;

namespace Haircut.Models;

public class Customer
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
}