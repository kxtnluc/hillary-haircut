using Microsoft.EntityFrameworkCore;
using Haircut.Models;

public class HillaryHaircutDbContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Stylist> Stylists { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<AppointmentService> AppointmentServices { get; set; }


    public HillaryHaircutDbContext(DbContextOptions<HillaryHaircutDbContext> context) : base(context)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>().HasData(new Customer[]
        {
            new Customer {Id = 1, Name = "Kara"},
            new Customer {Id = 2, Name = "Popcorn"},
            new Customer {Id = 3, Name = "Bando"},
            new Customer {Id = 4, Name = "May"}
        });

        modelBuilder.Entity<Stylist>().HasData(new Stylist[]
        {
            new Stylist {Id = 1, Name = "Luc"},
            new Stylist {Id = 2, Name = "Coco"},
            new Stylist {Id = 3, Name = "Lenu"}
        });

        modelBuilder.Entity<Service>().HasData(new Service[]
        {
            new Service {Id = 1, ServiceName = "Haircut", Cost = 20.50M},
            new Service {Id = 2, ServiceName = "Beard-Trim", Cost = 8.25M},
            new Service {Id = 3, ServiceName = "Waxing", Cost = 12.00M},
            new Service {Id = 4, ServiceName = "Coloring", Cost = 45.97M}
        });

        modelBuilder.Entity<Appointment>().HasData(new Appointment[]
        {
            new Appointment {Id = 1, StylistId = 1, CustomerId = 1, Time = new DateTime(2024, 2, 5)},
            new Appointment {Id = 2, StylistId = 2, CustomerId = 2, Time = new DateTime(2023, 12, 9)},
        });

        modelBuilder.Entity<AppointmentService>().HasData(new AppointmentService[]
        {
            new AppointmentService {Id = 1, AppointmentId = 1, ServiceId = 1},
            new AppointmentService {Id = 2, AppointmentId = 2, ServiceId = 2},
            new AppointmentService {Id = 3, AppointmentId = 2, ServiceId = 3},
        });
    }
}