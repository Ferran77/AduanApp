"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "Inicio",
    },
    {
      href: "/history",
      label: "Historial",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
    },
  ];

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-800
        bg-slate-950/80
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-4
        "
      >
        {/* 🔥 LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-clasifia.png"
            alt="ClasifIAduana"
            width={140}
            height={30}
            className="h-auto w-auto"
          />
        </Link>

        {/* 🚀 NAV */}
        <nav className="flex items-center gap-2">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  rounded-xl
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${active
                    ? "bg-cyan-500 text-slate-950"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}