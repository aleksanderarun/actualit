namespace SampleEF6.Migrations
{
    using SampleEF6.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<SampleEF6.Models.EFContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "SampleEF6.Models.EFContext";
        }

        protected override void Seed(SampleEF6.Models.EFContext context)
        {
            context.Contacts.AddOrUpdate(
              p => p.FirstName, //crash if same name??
              new Contact { FirstName = "Janez",
                  LastName = "Novak",
                  Address = "CEsta na koper 2",
                  TelNum = "04123123"},
              new Contact
              {
                  FirstName = "Ana",
                  LastName = "Novak",
                  Address = "CEsta na koper 3",
                  TelNum = "04324334"
              },
              new Contact
              {
                  FirstName = "Petra",
                  LastName = "Novak",
                  Address = "CEsta na koper 2",
                  TelNum = "04123123"
              }  
              //new Contact { Name = "João Sousa", Address= "Street x", City = "Porto", Country = "Portugal" },
              //new Contact { Name = "Steves Jon", Address = "Street y", City = "Porto", Country = "Portugal" },
              //new Contact { Name = "Steve Jon", Address = "Street y", City = "Porto", Country = "Portugal" },
              //new Contact { Name = "Stevde Jon", Address = "Street y", City = "Porto", Country = "Portugal" },
              //new Contact { Name = "Steve Josn", Address = "Street y", City = "Porto", Country = "Portugal" },
              //new Contact { Name = "Peter", Address = "Street z", City = "Porto", Country = "Portugal" }
            );            
        }
    }
}
