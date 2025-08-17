import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";
import { Button } from "./ui/button";

function Header() {

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="Logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        {/* <li>
          <Link href="/books" className={cn('text-base cursor-pointer capitalize', pathname == '/books' ? 'text-light-200' : 'text-light-100')}>Library</Link>
        </li>
        <li>
          <Link href="/my-profile" >
            <Avatar>
              <AvatarFallback className="bg-amber-100">{getInitials(session?.user?.name || 'IN')}</AvatarFallback>
            </Avatar>
          </Link>

        </li> */}
        <li>
          <form action={
            async () => {
              'use server';

              await signOut();
            }}
            className="mb-10"
          >
            <Button>Sign Out</Button>
          </form>
        </li>
      </ul>
    </header>
  );
}
export default Header;