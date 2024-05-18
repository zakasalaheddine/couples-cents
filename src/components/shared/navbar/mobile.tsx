'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { UserButton } from '@clerk/nextjs'
import { MenuIcon } from 'lucide-react'
import { items } from './items'
import NavbarItem from './item'
import { useState } from 'react'
import { LogoMobile } from '../logo'
import { ThemeSwitcher } from '../theme-switcher'

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            {/* <Logo /> */}
            <div className="flex flex-col gap-1 pt-4">
              {items.map((item) => (
                <NavbarItem
                  key={item.label}
                  link={item.link}
                  label={item.label}
                  onClick={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <LogoMobile />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  )
}
