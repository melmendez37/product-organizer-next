import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <section className="px-24 py-6 space-y-6">
      <nav className="mx-auto max-w-screen-lg ">
        <div className="flex items-center justify-between">
          <h1>Personal tracker</h1>
          <UserButton></UserButton>
        </div>
      </nav>
    </section>
  );
};

export default Header;
