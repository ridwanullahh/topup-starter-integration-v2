
import Link from 'next/link';
export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-blue-600">About VTU App</h1>
        <p className="mt-4 text-lg text-center text-gray-700">VTU App is a platform for recharging mobile data and airtime easily.</p>
        <nav className="mt-8">
          <ul className="flex flex-col space-y-4 items-center">
            <li>
              <Link href="/" legacyBehavior>
                <a className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/contact" legacyBehavior>
                <a className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}