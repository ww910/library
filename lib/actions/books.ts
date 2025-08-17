"use server";

import { db } from "@/database/db";
import { books, borrowRecords } from "@/database/schema";
import {eq} from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  try{
    const { bookId, userId } = params;
   const book = await db.select().from(books).where(eq(books.id, bookId)).limit(1);

   if(!book.length || book[0].availableCopies <= 0) {
     return { success: false, error: "Book is not available for borrowing." };
   }

  const dueDate = dayjs().add(7, "day").toDate().toDateString();

  const record = await db.insert(borrowRecords).values({
  userId,
  bookId,
  dueDate,
  status: "BORROWED",
  }).returning();;

  await db.update(books).set({
    availableCopies: book[0].availableCopies - 1
  }).where(eq(books.id, bookId));

return {
  success: true, 
  data: JSON.parse(JSON.stringify(record)),
};

  }catch (error) {
   console.error("Error borrowing book:", error);
   return { success: false, error: "Could not borrow book" };
  }

};
