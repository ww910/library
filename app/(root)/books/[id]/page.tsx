import { db } from "@/database/db";
import { books } from "@/database/schema";
import React from "react";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import BookOverview from "@/components/BookOverview";
import { auth } from "@/auth";
import BookVideo from "@/components/BookVideo";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const session = await auth();

  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1)

  if (!bookDetails) redirect("/404");
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="space-y-5 text-xl text-light-100">
            <h3>Summary</h3>
            <div>
              {bookDetails.summary.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </section>
          {/* {similar} */}
        </div>
      </div>
    </>
  );
}