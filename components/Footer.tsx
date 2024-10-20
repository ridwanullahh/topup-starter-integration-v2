
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 mt-8">
      <div className="container mx-auto text-center text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>&copy; {new Date().getFullYear()} VTU App. All rights reserved.</div>
          <div className="space-x-4">
<Link href="/about" className="text-white">About</Link>
<Link href="/contact" className="text-white">Contact</Link>
<Link href="/privacy" className="text-white">Privacy Policy</Link>
<Link href="/terms" className="text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
