using Haircut.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using Haircut.Models.DTOs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// allows passing datetimes without time zone data 
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// allows our api endpoints to access the database through Entity Framework Core
builder.Services.AddNpgsql<HillaryHaircutDbContext>(builder.Configuration["HillaryHaircutDbConnectionString"]);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//ENDPOINTS=========================================================================================================================================================================================


                                                                                                        //==========================================CUSTOMERS========================================
                                                                                                            //GETS
                                                                                                                //All Customers
app.MapGet("/customers", (HillaryHaircutDbContext db) => 
{
    var query = db.Customers;
    
    var result = query
        .Select(c => new CustomerDTO
        {
            Id = c.Id,
            Name = c.Name
        }).ToList();

    return Results.Ok(result);
});
                                                                                                            //POSTS
                                                                                                                //new Customer
app.MapPost("/customers", (HillaryHaircutDbContext db, Customer customerToPost) => 
{
    try
    {
        db.Customers.Add(customerToPost);
        db.SaveChanges();
        return Results.Created($"/customers/{customerToPost.Id}", customerToPost);
    }
    catch (DbUpdateException)
    {
        return Results.BadRequest("Invalid Data Submitted");
    }
});
                                                                                                        //==========================================STYLISTS=========================================
                                                                                                            //GETS
                                                                                                                //All Stylists
app.MapGet("/stylists", (HillaryHaircutDbContext db) => 
{
    var query = db.Stylists
        .OrderBy(q=> q.Id);
    
    var result = query
        .Select(s => new StylistDTO
        {
            Id = s.Id,
            Name = s.Name,
            IsActive = s.IsActive
        }).ToList();

    return Results.Ok(result);
});
                                                                                                            //PUTS
                                                                                                                //IsActive --to-> TRUE
app.MapPut("/stylists/activate/{id}", (int id, HillaryHaircutDbContext db) => 
{
    Stylist foundStylist = db.Stylists.SingleOrDefault(s => s.Id == id);

    if (foundStylist == null)
    {
        return Results.NotFound();
    }

    foundStylist.IsActive = true;

    db.SaveChanges();

    return Results.NoContent();

});
                                                                                                                //IsActive --to-> FALSE
app.MapPut("/stylists/deactivate/{id}", (int id, HillaryHaircutDbContext db) => 
{
    Stylist foundStylist = db.Stylists.SingleOrDefault(s => s.Id == id);

    if (foundStylist == null)
    {
        return Results.NotFound();
    }

    foundStylist.IsActive = false;

    db.SaveChanges();

    return Results.NoContent();

});
                                                                                                            //POSTS
                                                                                                                //new Stylist 
app.MapPost("/stylists", (HillaryHaircutDbContext db, Stylist stylistToPost) => 
{
    try
    {
        db.Stylists.Add(stylistToPost);
        db.SaveChanges();
        return Results.Created($"/stylists/{stylistToPost.Id}", stylistToPost);
    }
    catch (DbUpdateException)
    {
        return Results.BadRequest("Invalid Data Submitted");
    }
});
                                                                                                        //==========================================SERVICES=========================================
                                                                                                            //GETS
                                                                                                                //All Services
app.MapGet("/services", (HillaryHaircutDbContext db) => 
{
    var query = db.Services;
    
    var result = query
        .Select(s => new ServiceDTO
        {
            Id = s.Id,
            ServiceName = s.ServiceName,
            Cost = s.Cost
        }).ToList();

    return Results.Ok(result);
});
                                                                                                        //========================================APPOINTMENTS=======================================
                                                                                                            //GETS
                                                                                                                //All Appointments
app.MapGet("/appointments", (HillaryHaircutDbContext db) => 
{
    var query = db.Appointments
        .Include(a => a.Stylist)
        .Include(a => a.Customer)
        .Include(a => a.AppointmentServices)
        .ThenInclude(a => a.Service);
    
    var result = query
        .Select(a => new AppointmentDTO
        {
            Id = a.Id,
            StylistId = a.StylistId,
            Stylist = new StylistDTO
            {
                Id = a.Stylist.Id,
                Name = a.Stylist.Name
            },
            CustomerId = a.CustomerId,
            Customer = new CustomerDTO
            {
                Id = a.Customer.Id,
                Name = a.Customer.Name
            },
            AppointmentServices = a.AppointmentServices
                .Select(s => new AppointmentServiceDTO
                {
                    Id = s.Id,
                    ServiceId = s.ServiceId,
                    Service = new ServiceDTO
                    {
                        Id = s.Service.Id,
                        ServiceName = s.Service.ServiceName,
                        Cost = s.Service.Cost
                    },
                    AppointmentId = s.AppointmentId
                }).ToList(),
            Time = a.Time
        }).ToList();

    return Results.Ok(result);
});
                                                                                                            //POSTS
                                                                                                                //new Appointment
app.MapPost("appointments", (HillaryHaircutDbContext db, Appointment appointmentToPost) =>
{
     try
    {
        db.Appointments.Add(appointmentToPost);
        db.SaveChanges();
        return Results.Created($"/customers/{appointmentToPost.Id}", appointmentToPost);
    }
    catch (DbUpdateException)
    {
        return Results.BadRequest("Invalid Data Submitted");
    }
});
                                                                                                            //DELETE
                                                                                                                //deleteAppointment
app.MapDelete("/appointments/{id}", (int id, HillaryHaircutDbContext db) =>
{
    Appointment appointment = db.Appointments.SingleOrDefault(a => a.Id == id);

    if(appointment == null)
    {
        return Results.NotFound();
    }
    db.Appointments.Remove(appointment);
    db.SaveChanges();
    return Results.NoContent();
});
                                                                                                        //==========================================APPTSERV==========================================
                                                                                                            //GETS
                                                                                                                //All AppointmentServices
app.MapGet("/appointmentservices", (HillaryHaircutDbContext db) => 
{
    //=======Filters=======
    var query = db.AppointmentServices
        .Include(a => a.Service)
        .Include(a => a.Appointment);

    //=======Selection=======
    var result = query
        .Select(aps => new AppointmentServiceDTO
        {
            Id = aps.Id,
            ServiceId = aps.ServiceId,
            Service = new ServiceDTO
            {
                Id = aps.Service.Id,
                ServiceName = aps.Service.ServiceName,
                Cost = aps.Service.Cost
            },
            AppointmentId = aps.AppointmentId,
            Appointment = new AppointmentDTO
            {
                Id = aps.Appointment.Id,
                StylistId = aps.Appointment.StylistId,
                Stylist = new StylistDTO
                {
                    Id = aps.Appointment.Stylist.Id,
                    Name = aps.Appointment.Stylist.Name
                },
                CustomerId = aps.Appointment.CustomerId,
                Customer = new CustomerDTO
                {
                    Id = aps.Appointment.Customer.Id,
                    Name = aps.Appointment.Customer.Name
                },
                Time = aps.Appointment.Time
            }
        }).ToList();

    //======RETURN=======
    return Results.Ok(result);

});
                                                                                                            //POSTS
                                                                                                                //new appointment service
app.MapPost("appointmentservices", (HillaryHaircutDbContext db, AppointmentService apptservToPost) =>
{
     try //for why????
    {
        db.AppointmentServices.Add(apptservToPost);
        db.SaveChanges();
        return Results.Created($"/appointmentservices/{apptservToPost.Id}", apptservToPost);
    }
    catch (DbUpdateException)
    {
        return Results.BadRequest("Invalid Data Submitted");
    }
});
                                                                                                            //DELETES
                                                                                                                //remove an appointment service
app.MapDelete("/appointmentServices/{id}", (int id, HillaryHaircutDbContext db) =>
{
    AppointmentService apptServ = db.AppointmentServices.SingleOrDefault(a => a.Id == id);

    if(apptServ == null)
    {
        return Results.NotFound();
    }
    db.AppointmentServices.Remove(apptServ);
    db.SaveChanges();
    return Results.NoContent();
});
//RUN===============================================================================================================================================================================================



app.UseHttpsRedirection();



app.Run();