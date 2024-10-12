"use client";

import Link from "next/link";
import { Home, Info, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const DesktopNavbar = () => (
  <nav className="bg-gray-800 p-4 hidden md:block">
    <div className="container mx-auto flex flex-col items-center">
      <div className="text-white font-bold text-xl mb-4">
        <Image
          src="/APDS-logo.svg"
          alt="APDS Landscaping Logo"
          width={200}
          height={200}
        />
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/about" className="text-white hover:text-gray-300">
            About
          </Link>
        </li>
        <li>
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link href="/past-work" className="text-white hover:text-gray-300">
            Services
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

const MobileNavbar = () => (
  <nav className="bg-gray-800 p-4 fixed bottom-0 left-0 right-0 md:hidden">
    <ul className="flex justify-around">
      <li className="flex flex-col items-center">
        <Link
          href="/about"
          className="text-white hover:text-gray-300 flex flex-col items-center"
        >
          <Info className="mb-1 h-6 w-6" />
          <span className="text-xs">About</span>
        </Link>
      </li>
      <li className="flex flex-col items-center">
        <Link
          href="/"
          className="text-white hover:text-gray-300 flex flex-col items-center"
        >
          <Home className="mb-1 h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
      </li>
      <li className="flex flex-col items-center">
        <Link
          href="/past-work"
          className="text-white hover:text-gray-300 flex flex-col items-center"
        >
          <Briefcase className="mb-1 h-6 w-6" />
          <span className="text-xs">Services</span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default function ClientNavbar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <DesktopNavbar />
      {isMobile && <MobileNavbar />}
    </>
  );
}
