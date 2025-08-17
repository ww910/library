import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/db";
import { borrowRecords, books } from "@/database/schema";
import { eq, desc, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {

  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  const rows = await db
    .select({
      book: books,           // joined book row
      record: borrowRecords, // joined borrow record
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(
      and(
        eq(borrowRecords.userId, session.user.id),
        eq(borrowRecords.status, "BORROWED" as const)
      )
    )
    .orderBy(desc(borrowRecords.createdAt));

  // Extract just the books for the component
  const borrowedBooks: Book[] = rows.map(r => r.book);

  return (
    <>
      <BookList title="Borrowed Books" books={borrowedBooks} />
    </>
  );
}

export default Page;