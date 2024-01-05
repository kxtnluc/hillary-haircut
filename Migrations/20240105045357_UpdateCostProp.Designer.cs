﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HillaryHaircut.Migrations
{
    [DbContext(typeof(HillaryHaircutDbContext))]
    [Migration("20240105045357_UpdateCostProp")]
    partial class UpdateCostProp
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Appointment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer");

                    b.Property<int>("StylistId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Time")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("StylistId");

                    b.ToTable("Appointments");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CustomerId = 1,
                            StylistId = 1,
                            Time = new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 2,
                            CustomerId = 2,
                            StylistId = 2,
                            Time = new DateTime(2023, 12, 9, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("AppointmentService", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AppointmentId")
                        .HasColumnType("integer");

                    b.Property<int>("ServiceId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("AppointmentServices");
                });

            modelBuilder.Entity("Haircut.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Customers");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Kara"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Popcorn"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Bando"
                        },
                        new
                        {
                            Id = 4,
                            Name = "May"
                        });
                });

            modelBuilder.Entity("Haircut.Models.Stylist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Stylists");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            IsActive = false,
                            Name = "Luc"
                        },
                        new
                        {
                            Id = 2,
                            IsActive = false,
                            Name = "Coco"
                        },
                        new
                        {
                            Id = 3,
                            IsActive = false,
                            Name = "Lenu"
                        });
                });

            modelBuilder.Entity("Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("AppointmentId")
                        .HasColumnType("integer");

                    b.Property<decimal>("Cost")
                        .HasColumnType("numeric");

                    b.Property<string>("ServiceName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AppointmentId");

                    b.ToTable("Services");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Cost = 20.50m,
                            ServiceName = "Haircut"
                        },
                        new
                        {
                            Id = 2,
                            Cost = 8.25m,
                            ServiceName = "Beard-Trim"
                        },
                        new
                        {
                            Id = 3,
                            Cost = 12.00m,
                            ServiceName = "Waxing"
                        },
                        new
                        {
                            Id = 4,
                            Cost = 45.97m,
                            ServiceName = "Coloring"
                        });
                });

            modelBuilder.Entity("Appointment", b =>
                {
                    b.HasOne("Haircut.Models.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Haircut.Models.Stylist", "Stylist")
                        .WithMany()
                        .HasForeignKey("StylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("Stylist");
                });

            modelBuilder.Entity("Service", b =>
                {
                    b.HasOne("Appointment", null)
                        .WithMany("Services")
                        .HasForeignKey("AppointmentId");
                });

            modelBuilder.Entity("Appointment", b =>
                {
                    b.Navigation("Services");
                });
#pragma warning restore 612, 618
        }
    }
}
