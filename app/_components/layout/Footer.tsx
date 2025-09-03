import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import Logo from "../ui/Logo";
import { footerBottomLinks, footerLinks } from "@/app/_lib/footerLinks";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-light-200 py-12 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 items-start gap-8">
        {/* Logo */}
        <div className="flex items-start">
          <Logo />
        </div>

        {/* Footer Columns */}
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="font-medium mb-3">{section.title}</h4>
            <ul className="space-y-2 text-body text-dark-700">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Socials */}
        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-light-200 text-dark-900 hover:scale-110 transition"
          >
            <SiX size={14} />
          </Link>
          <Link
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-light-200 text-dark-900 hover:scale-110 transition"
          >
            <FaFacebookF size={14} />
          </Link>
          <Link
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-light-200 text-dark-900 hover:scale-110 transition"
          >
            <FaInstagram size={14} />
          </Link>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
        {/* Location + Rights */}
        <div className="flex items-center gap-2">
          <MdLocationOn size={14} />
          <span>Egypt</span>
          <span className="mx-2">© 2025 Nike, Inc. All Rights Reserved</span>
          <span className="italic">Developed by Adel Yasser</span>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-wrap items-center gap-4">
          {footerBottomLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
