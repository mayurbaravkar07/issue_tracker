import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = issueSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        const newIssue = await prisma.issue.create({
            data: { title: body.title, description: body.description }
        });

        return NextResponse.json(newIssue, { status: 201 });
    } catch (error) {
        console.error("Error creating issue:", error);
        return NextResponse.error();
    }
}
