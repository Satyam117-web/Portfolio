"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [navbarOpacity, setNavbarOpacity] = useState(0.1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 300;
      const newOpacity = Math.min(0.5, 0.1 + (scrollY / maxScroll) * 0.5);
      setNavbarOpacity(newOpacity);

      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-3xl transition-all duration-300"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${navbarOpacity})`,
        boxShadow: `0 2px 10px rgba(0, 0, 0, ${navbarOpacity * 0.5})`,
      }}
    >
      <nav className="text-white text-xl font-bold min-h-20 flex items-center justify-between px-4 md:px-8">
        {/* Logo */}

        <Image src="/logo.png" alt="" width={130} height={130}></Image>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 lg:gap-8 mr-4">
          {["home", "about", "skills", "projects", "contact"].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section)}
                className={`hover:text-yellow-300 transition-colors duration-200 ${
                  activeSection === section
                    ? "text-yellow-400"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
          <li>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 text-white/90 transition-colors duration-200"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg pb-4 px-4">
          <ul className="flex flex-col gap-4">
            {["home", "about", "skills", "projects", "contact"].map(
              (section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 ${
                      activeSection === section
                        ? "bg-purple-600/50 text-yellow-400"
                        : "text-white/90 hover:bg-gray-800/50 hover:text-white"
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              )
            )}
            <li>
              <a
                href="/Resume.pdf"
                download
                className="block py-2 px-3 text-white/90 hover:text-yellow-300 transition-colors duration-200"
              >
                # Download CV
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Gradient line */}
      <div className="bg-gradient-to-r from-purple-500/80 via-pink-500/80 to-yellow-400/80 h-[1px] w-full"></div>
    </header>
  );
};

export default Navbar;
