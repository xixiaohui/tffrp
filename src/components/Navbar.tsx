'use client'

import Link from 'next/link'
// import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Button } from '@/components/ui/button'

type NavItem = {
  label: string
  href: string
}

interface NavbarProps {
  items: NavItem[]
  brand?: string
}

export default function Navbar({ items, brand = 'Brand Name' }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm sticky top-0 z-50">
      <Link href="/" className="text-xl font-semibold text-gray-900">
        {brand}
      </Link>

      {/* Desktop Nav (可选扩展) */}
      <div className="hidden md:flex gap-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-700 hover:text-black text-sm"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <Sheet>
            <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
            </Button>
            </SheetTrigger>
            <SheetContent side="left">
            <SheetHeader>
                <SheetTitle>
                <VisuallyHidden>移动端导航菜单</VisuallyHidden>
                </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-4 mt-6">
                {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="text-base text-gray-800 hover:text-black"
                >
                    {item.label}
                </Link>
                ))}
            </div>
            </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
