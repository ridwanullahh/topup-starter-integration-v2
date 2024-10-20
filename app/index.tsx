
import Link from 'next/link';
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-blue-600">Welcome to VTU App</h1>
        <p className="mt-4 text-lg text-center text-gray-700">Recharge your mobile data and airtime easily.</p>
        <nav className="mt-8">
          <ul className="flex flex-col space-y-4 items-center">
            <li>
              <Link href="/about" legacyBehavior>
                <a className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">About</a>
              </Link>
            </li>
            <li>
              <Link href="/contact" legacyBehavior>
                <a className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Contact</a>
              </Link>
            </li>
            <li>
              <Link href="/auth/signin" legacyBehavior>
                <a className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Sign In</a>
              </Link>
            </li>
            <li>
              <Link href="/auth/signup" legacyBehavior>
                <a className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Sign Up</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}