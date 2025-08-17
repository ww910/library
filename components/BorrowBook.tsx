'use client';
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/books";

interface BorrowBookProps { bookId: string, userId: string, borrowingEligibility: { isEligible: boolean, message: string } }

export default function BorrowBook({ bookId, userId, borrowingEligibility }: BorrowBookProps) {

  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!borrowingEligibility.isEligible) {
      toast.error("Error", {
        description: borrowingEligibility.message
      });
      return;
    }

    setBorrowing(true);
    try {
      const result = await borrowBook({ bookId, userId });
      if (result.success) {
        toast.success("Success", {
          description: "Book borrowed successfully"
        });

        router.push("/my-profile")
      } else {
        console.error("Error borrowing book:", result.error);
        toast.error("Error", {
          description: "Could not borrow book"
        });
      }
    } catch (error) {
      console.error("Error borrowing book:", error);

      toast.error("Error", {
        description: "Could not borrow book"
      });
    } finally {
      setBorrowing(false);

    }
    router.refresh();
  };

  return (
    <Button className="book-overview_btn" onClick={handleBorrow} disabled={borrowing}>
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing..." : "Borrow"}
      </p>
    </Button>
  );
}
