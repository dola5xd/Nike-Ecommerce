import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import Logo from "../ui/Logo";
import { footerBottomLinks, footerLinks } from "@/_data/footerLinks";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-light-200 py-12 px-6 sm:px-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-10 md:gap-8">
        {/* Logo */}
        <div className="flex sm:justify-start">
          <Logo />
        </div>

        {/* Footer Columns */}
        {footerLinks.map((section) => (
          <div key={section.title} className="sm:col-span-1">
            <h4 className="font-medium mb-3">{section.title}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-light-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Socials */}
        <div className="flex sm:justify-start md:justify-end items-center gap-3">
          <Link
            href="#"
            aria-label="Visit our X profile"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-light-200 text-dark-900 hover:scale-110 transition"
          >
            <SiX size={16} />
          </Link>
          <Link
            href="#"
            aria-label="Visit our Facebook page"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-light-200 text-dark-900 hover:scale-110 transition"
          >
            <FaFacebookF size={16} />
          </Link>
          <Link
            href="#"
            aria-label="Visit our Instagram profile"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-light-200 text-dark-900 hover:scale-110 transition"
          >
            <FaInstagram size={16} />
          </Link>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400 text-center md:text-left">
        {/* Location + Rights */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-1">
            <MdLocationOn size={14} />
            <span>Egypt</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span>© 2025 Nike, Inc. All Rights Reserved</span>
          <span className="italic">Developed by Adel Yasser</span>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {footerBottomLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-light-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
