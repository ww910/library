import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

function BookOverview(
  {
    title,
    author,
    genre,
    rating,
    total_copies,
    available_copies,
    description,
    color,
    cover,
  }: Book) {
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
            <p>   Total Books <span>{total_copies}</span>
            </p>
            <p>
              Available Books <span>{available_copies}</span>
            </p>
          </div>

          <p className="book-description">
            {description}
          </p>

          <Button className="book-overview_btn">
            <Image src="/icons/book.svg" alt="book" width={20} height={20} />
            <p className="font-bebas-neue text-xl text-dark-100">
              Borrow
            </p>
          </Button>
        </div>
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover coverImage={cover}
            variant="wide"
            className="z-10"
            coverColor={color}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              coverImage={cover}
              variant="wide"
              coverColor={color}
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

