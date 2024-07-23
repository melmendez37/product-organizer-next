import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <section className="px-24 py-6 space-y-6 bg-[#003B4A] dark:bg-slate-800">
      <nav className="mx-auto max-w-screen-lg ">
        <div className="flex items-center justify-between">
          <Link className="font-bold text-2xl text-slate-300" href={'/dashboard'}>Product Management System</Link>
          <UserButton></UserButton>
        </div>
      </nav>
    </section>
  );
};

export default Header;
