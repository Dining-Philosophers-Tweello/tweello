import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white w-full">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link className="text-black text-xl font-bold" href="/">My Next.js App</Link>

          <ul className="flex space-x-6">
          <li>
              <Link className="text-black text-xl" href="/register">Register</Link>
            </li>
            <li>
              <Link className="text-black text-xl" href="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
