import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import BookCover from "./BookCover";
import { db } from "@/database/db";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import BorrowBook from "./BorrowBook";

interface Props extends Book {
  userId: string;
}

async function BookOverview(
  {
    title,
    author,
    genre,
    rating, 
    totalCopies,
    availableCopies,
    description,
    coverColor,
    coverUrl,
    id,
    userId,
  }: Props) {

    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if(!user) return null;

    const borrowingEligibility = {
      isEligible: user.status === "APPROVED" && availableCopies > 0,
      message: availableCopies <= 0 ? "Book is not available now" : "You are not eligible to borrow this book"
    };

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200" >{author}</span>
          </p>
          <p>
            Category:{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
          <div className="book-">
            <p>   Total Books <span>{totalCopies}</span>
            </p>
            <p>
              Available Books <span>{availableCopies}</span>
            </p>
          </div>

          <p className="book-description">
            {description}
          </p>

          <BorrowBook bookId={id} userId={userId} borrowingEligibility={borrowingEligibility} />
        </div>
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover coverImage={coverUrl}
            variant="wide"
            className="z-10"
            coverColor={coverColor}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              coverImage={coverUrl}
              variant="wide"
              coverColor={coverColor}
            />
          </div>
        </div>
      </div>





      {/* <div className="flex flex-row gap-1">
            <Image src={cover} alt={title} className="w-24 h-36 object-cover" />
          </div> */}


    </section>
  );
}

export default BookOverview;

