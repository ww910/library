import React from "react";

export default function TooManyRequestsPage() {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold  text-light-100">
        Too Many Requests
      </h1>
      <p className="mt-3 max-w-xl text-center text-light-400">
        You have made too many requests in a short period of time. Please try again later. Limitations are in place to ensure fair usage and prevent abuse of the system. If you believe this is an error, please contact support.
      </p>
    </main>
  );
}