using System.ComponentModel.DataAnnotations;

namespace Haircut.Models.DTOs;

public class ServiceDTO
{
    public int Id { get; set; }
    [Required]
    public string ServiceName { get; set; }
    public decimal Cost { get; set; }
}