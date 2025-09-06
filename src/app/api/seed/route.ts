import { NextResponse } from "next/server";
import { db } from "@/drizzle";
import { leads, campaigns } from "@/drizzle/schema";
import { faker } from "@faker-js/faker";

export async function POST() {
  try {
    for (let i = 0; i < 50; i++) {
      const totalLeads = faker.number.int({ min: 5, max: 100 });
      const successfulLeads = faker.number.int({ min: 0, max: totalLeads });

      await db.insert(campaigns).values({
        campaignName: faker.company.name(),
        status: faker.helpers.arrayElement(["Draft", "Active", "Paused", "Completed"]) as | "Draft" | "Active" | "Paused" | "Completed",
        totalLeads,
        successfulLeads,
        responseRate: totalLeads > 0 ? (successfulLeads / totalLeads) * 100 : 0,
        progressBar: totalLeads > 0 ? (successfulLeads / totalLeads) * 100 : 0,
        actions: faker.helpers.arrayElement(["Edit", "Pause", "Resume", "Delete"]) as | "Edit" | "Pause" | "Resume" | "Delete",
      });
    }

    for (let i = 0; i < 150; i++) {
      await db.insert(leads).values({
        leadName: faker.person.fullName(),
        contact: faker.phone.number(),
        email: faker.internet.email(),
        company: faker.company.name(),
        campaignName: `Campaign ${faker.number.int({ min: 1, max: 10 })}`,
        status: faker.helpers.arrayElement(["Pending", "Contacted", "Responded", "Converted"]) as | "Pending" | "Contacted" | "Responded" | "Converted",
        lastContactDate: faker.date.past(),
      });
    }

    return NextResponse.json({ message: "Database seeded successfully!" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
