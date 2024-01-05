using System.ComponentModel.DataAnnotations;

namespace Haircut.Models.DTOs;

public class AppointmentServiceDTO
{
    public int Id { get; set; }
    [Required]
    public int ServiceId { get; set; }
    public ServiceDTO Service { get; set; }
    [Required]
    public int AppointmentId { get; set; }
    public AppointmentDTO Appointment { get; set; }
}