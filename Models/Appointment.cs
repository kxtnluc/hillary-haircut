using System.ComponentModel.DataAnnotations;
using Haircut.Models;

public class Appointment
{
    public int Id { get; set; }
    [Required]
    public int StylistId { get; set; }
    public Stylist Stylist { get; set; }
    [Required]
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    public List<Service> Services { get; set; }
    [Required]
    public DateTime Time { get; set; }
}