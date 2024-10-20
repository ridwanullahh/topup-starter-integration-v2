
import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">VTU App</div>
        <div className="hidden md:flex space-x-4">
          <Link href="/dashboard" legacyBehavior>
            <a className="text-white">Dashboard</a>
          </Link>
          <Link href="/purchase" legacyBehavior>
            <a className="text-white">Purchase</a>
          </Link>
          <Link href="/transactions" legacyBehavior>
            <a className="text-white">Transactions</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="text-white">About</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className="text-white">Contact</a>
          </Link>
          <Link href="/auth/signin" legacyBehavior>
            <a className="text-white">Sign In</a>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <XIcon className="h-6 w-6 text-white" /> : <MenuIcon className="h-6 w-6 text-white" />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <Link href="/dashboard" legacyBehavior>
            <a className="block text-white p-2">Dashboard</a>
          </Link>
          <Link href="/purchase" legacyBehavior>
            <a className="block text-white p-2">Purchase</a>
          </Link>
          <Link href="/transactions" legacyBehavior>
            <a className="block text-white p-2">Transactions</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="block text-white p-2">About</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className="block text-white p-2">Contact</a>
          </Link>
          <Link href="/auth/signin" legacyBehavior>
            <a className="block text-white p-2">Sign In</a>
          </Link>
        </div>
      )}
    </nav>

  );
}
