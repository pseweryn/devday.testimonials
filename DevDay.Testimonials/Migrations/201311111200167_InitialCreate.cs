namespace DevDay.Testimonials.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Feedback",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OpinionId = c.Int(nullable: false),
                        Message = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Opinions", t => t.OpinionId, cascadeDelete: true)
                .Index(t => t.OpinionId);
            
            CreateTable(
                "dbo.Opinions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Feedback", "OpinionId", "dbo.Opinions");
            DropIndex("dbo.Feedback", new[] { "OpinionId" });
            DropTable("dbo.Opinions");
            DropTable("dbo.Feedback");
        }
    }
}
