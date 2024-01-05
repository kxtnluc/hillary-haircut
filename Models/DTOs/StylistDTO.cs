using System.ComponentModel.DataAnnotations;

namespace Haircut.Models.DTOs;

public class StylistDTO
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public bool IsActive { get; set; }
}