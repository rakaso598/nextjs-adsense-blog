"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm border-b-1 border-gray-200 w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="ml-6 flex items-center space-x-4">
              <Link
                href={"/"}
                className={`px-3 py-2 rounded-md text-sm font-medium text-blue-600 text-xl`}
              >
                Example
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
