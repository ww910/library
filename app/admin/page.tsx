import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function AdminPage() {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          <Button className="bg-primary-admin" asChild>
            <Link href="/admin/books/new" className="text-white">
              + New Book
            </Link>
          </Button>
          <div className="mt-7 w-full overflow-hidden">
            <p>Table</p>
          </div>
        </h2>
      </div >
    </section >
  );
}

export default AdminPage;