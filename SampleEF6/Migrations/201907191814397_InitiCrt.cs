namespace SampleEF6.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitiCrt : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Contacts", "FirstName", c => c.String());
            AddColumn("dbo.Contacts", "LastName", c => c.String());
            AddColumn("dbo.Contacts", "TelNum", c => c.String());
            DropColumn("dbo.Contacts", "Name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Contacts", "Name", c => c.String());
            DropColumn("dbo.Contacts", "TelNum");
            DropColumn("dbo.Contacts", "LastName");
            DropColumn("dbo.Contacts", "FirstName");
        }
    }
}
