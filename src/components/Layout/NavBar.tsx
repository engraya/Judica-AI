"use client"

import React, { useState } from "react";
import Link from "next/link";
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#" },
  ];


  return (
    <nav className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-950 via-blue-900 to-cyan-950 backdrop-blur-md" />

      {/* Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-4 w-4 rounded-full bg-blue-400/10 animate-float top-4 left-[10%]" />
        <div className="absolute h-3 w-3 rounded-full bg-blue-400/10 animate-float top-8 left-[20%] [animation-delay:0.5s]" />
        <div className="absolute h-5 w-5 rounded-full bg-blue-400/10 animate-float top-6 left-[80%] [animation-delay:1s]" />
        <div className="absolute h-6 w-6 rounded-full bg-blue-400/10 animate-float top-2 left-[60%] [animation-delay:1.5s]" />
      </div>

      {/* Main Navbar Content */}
      <div className="relative px-4 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
        <Link href="/">
        <div className="flex items-center space-x-3 group">
            <span className="text-xl sm:text-2xl font-bold text-white">Judica_AI</span>
          </div>
        </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
              <a href={link.href} key={link.name} className="relative group">
                <span className="text-blue-100 group-hover:text-white transition-colors duration-300">
                  {link.name}
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <Link href="/main" className="hidden sm:flex relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200" />
              <div className="relative px-5 sm:px-7 py-2 sm:py-3 bg-blue-950 rounded-lg leading-none flex items-center">
                <span className="text-blue-200 group-hover:text-white transition duration-200">Get Started</span>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative group"
              aria-label="Toggle mobile menu"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded blur opacity-60 group-hover:opacity-100 transition duration-200" />
              <div className="relative p-2 bg-blue-950 rounded leading-none">
                {isOpen ? (
                  <svg className="w-6 h-6 text-blue-200 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-blue-200 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-900/50 backdrop-blur-sm rounded-lg border border-blue-500/10">
            {navLinks.map((link) => (
              <a href={link.href} key={link.name} className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-blue-800/50">
                {link.name}
              </a>
            ))}
            {/* Mobile CTA Button */}
            <div className="px-3 py-2">
              <Link href="/main" className="w-full relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200" />
                <div className="relative px-4 py-2 bg-blue-950 rounded-lg leading-none flex items-center justify-center">
                  <span className="text-blue-200 group-hover:text-white transition duration-200">Get Started</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
