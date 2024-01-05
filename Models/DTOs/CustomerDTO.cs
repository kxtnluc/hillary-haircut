using System.ComponentModel.DataAnnotations;

namespace Haircut.Models.DTOs;


public class CustomerDTO
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
}