'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import BioGenerator from '@/app/(pages)/bio/page';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleNavbar = () => setIsOpen(!isOpen);

  const navLinks = [
    // { href: '/', label: 'Home' },
    { href: '/', label: 'Caption Generator' },
    { href: '/bio', label: 'Bio Generator' },
    // { href: '/se', label: 'Services' },
    // { href: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <Image
                src="/icon_1.png"
                width={40}
                height={40}
                className="rounded-full"
                alt="InstaGenius Logo"
                priority
              />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                InstaGenius
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? 'bg-yellow-500 text-white'
                      : 'text-gray-700 hover:bg-yellow-400 hover:text-white dark:text-gray-300 dark:hover:bg-yellow-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleNavbar}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-white hover:bg-yellow-500 focus:outline-none transition duration-150 ease-in-out"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? 'bg-yellow-500 text-white'
                  : 'text-gray-700 hover:bg-yellow-400 hover:text-white dark:text-gray-300 dark:hover:bg-yellow-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;