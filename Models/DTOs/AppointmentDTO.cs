using System.ComponentModel.DataAnnotations;
using Haircut.Models;

namespace Haircut.Models.DTOs;

public class AppointmentDTO
{
    public int Id { get; set; }
    [Required]
    public int StylistId { get; set; }
    public StylistDTO Stylist { get; set; }
    [Required]
    public int CustomerId { get; set; }
    public CustomerDTO Customer { get; set; }
    public List<AppointmentServiceDTO> AppointmentServices { get; set; }

    [Required]
    public DateTime Time { get; set; }
    public string TimeInDateOnly {
        get
        {
            return Time.ToString("MM-dd");
        }
    }
    public string TimeInHourOnly {
        get
        {
            return Time.ToString("HH:mm");
        }
    }

    public decimal TotalCost {
        get
        {
            decimal total = AppointmentServices.Sum(aps => aps.Service.Cost);
            return total;
        }
    }
}