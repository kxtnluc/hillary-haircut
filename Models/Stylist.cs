using System.ComponentModel.DataAnnotations;

namespace Haircut.Models;

public class Stylist
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public bool IsActive { get; set; }
}