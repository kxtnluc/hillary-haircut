using System.ComponentModel.DataAnnotations;

namespace Haircut.Models;

public class Appointment
{
    public int Id { get; set; }
    [Required]
    public int StylistId { get; set; }
    public Stylist Stylist { get; set; }
    [Required]
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    public List<AppointmentService> AppointmentServices { get; set; }
    [Required]
    public DateTime Time { get; set; }
}