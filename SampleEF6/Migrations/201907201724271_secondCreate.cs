namespace SampleEF6.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class secondCreate : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Contacts", "City");
            DropColumn("dbo.Contacts", "Country");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Contacts", "Country", c => c.String());
            AddColumn("dbo.Contacts", "City", c => c.String());
        }
    }
}
