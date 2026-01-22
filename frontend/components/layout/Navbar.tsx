'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { useTranslation } from 'react-i18next'
import { navRoutes } from '@/constants/navRoutes'
import { cn } from '@/lib/utils'
import { Globe, Mail, Menu, Languages, Home, Info, Users, Trophy, BookOpen, Newspaper, HelpCircle, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

// Simplified navigation items - showing key ones in the pill
// Simplified navigation items - showing key ones in the pill
const mainNavItems = [
    { key: 'nav.home', href: navRoutes.home },
    { key: 'nav.about', href: navRoutes.about },
    { key: 'nav.freelancers', href: navRoutes.freelancers },
    { key: 'nav.contact', href: navRoutes.contact },
]

// All nav items for mobile menu with icons
const allNavItems = [
    { key: 'nav.home', href: navRoutes.home, icon: Home },
    { key: 'nav.about', href: navRoutes.about, icon: Info },
    { key: 'nav.freelancers', href: navRoutes.freelancers, icon: Users },
    { key: 'nav.contact', href: navRoutes.contact, icon: Phone },
]


export default function Navbar() {
    const pathname = usePathname()
    const { language, changeLanguage } = useLanguage()
    const { t } = useTranslation() // uses default 'translation' namespace
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4">
            {/* Centered Pill-Shaped Navbar */}
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: isMounted ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-7xl w-full bg-card/50 backdrop-blur-md rounded-full px-2 py-2 shadow-xl border border-border/50 flex items-center justify-between"
            >
                {/* Left: Circular Logo Button */}
                <div className="flex-shrink-0">
                    <Link
                        href="/"
                        className="flex items-center justify-center h-10 px-6 rounded-full bg-foreground border border-border hover:bg-foreground/90 transition-colors flex-shrink-0"
                    >
                        <span className="font-extrabold text-background text-base md:text-lg tracking-widest uppercase whitespace-nowrap">TEAM</span>
                    </Link>
                </div>

                {/* Center: Navigation Links */}
                <div className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center">
                    {mainNavItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'relative px-3 lg:px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 whitespace-nowrap font-[family-name:var(--font-ms-block)]',
                                    isActive
                                        ? 'text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <span className="relative z-10">{t(item.key)}</span>
                                {isActive && (
                                    <>
                                        <motion.div
                                            layoutId="navbar-active-bg"
                                            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 -z-10"
                                            transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.9 }}
                                        />
                                        <motion.div
                                            layoutId="navbar-active-glow"
                                            className="absolute inset-0 rounded-full bg-primary/40 blur-md -z-20"
                                            transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.9 }}
                                        />
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
                                        />
                                    </>
                                )}
                            </Link>
                        )
                    })}
                </div>

                {/* Right: Email/Contact & Language Selector */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Email/Contact Pill - Desktop */}
                    <div className="hidden md:flex items-center flex-shrink-0">
                        <Link
                            href={navRoutes.contact}
                            className="px-4 py-2 rounded-full bg-foreground border border-border text-sm font-medium text-background hover:bg-foreground/90 transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95 flex-shrink-0"
                        >
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <span className="hidden lg:inline whitespace-nowrap">info@teamcreative.ge </span>
                            <span className="lg:hidden whitespace-nowrap">Contact</span>
                        </Link>
                    </div>

                    {/* Language Selector */}
                    <div>
                        <Select value={language} onValueChange={changeLanguage}>
                            <SelectTrigger className="w-auto h-9 px-3 text-[10px] uppercase tracking-widest font-bold bg-transparent border-none focus:ring-0 text-foreground hover:bg-accent/20 transition-all rounded-full flex gap-2 items-center font-[family-name:var(--font-ms-block)]">
                                <span className="uppercase">{language}</span>
                            </SelectTrigger>
                            <SelectContent
                                side="bottom"
                                align="end"
                                className="min-w-[140px] rounded-xl border border-border/50 bg-card/95 backdrop-blur-md"
                            >
                                <SelectItem value="en" className="cursor-pointer py-2.5">
                                    <span className="flex items-center gap-2">
                                        <span className="text-base">🇬🇧</span>
                                        <span className="font-medium">English</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="ge" className="cursor-pointer py-2.5">
                                    <span className="flex items-center gap-2">
                                        <span className="text-base">🇬🇪</span>
                                        <span className="font-medium">ქართული</span>
                                    </span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Mobile Menu Button */}
                    <div>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden w-9 h-9 text-foreground hover:bg-background/10 rounded-full transition-all duration-200"
                                >
                                    <Menu className="w-5 h-5" />
                                    <span className="sr-only">Open mobile menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-[280px] sm:w-[320px] bg-background/95 backdrop-blur-xl border-l border-border/50 p-0 flex flex-col"
                            >
                                {/* Mobile Menu Header */}
                                <SheetHeader className="px-6 pt-6 pb-4 border-b border-border/50">
                                    <div className="flex items-center justify-between">
                                        <SheetTitle className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20">
                                                <Globe className="w-6 h-6 text-primary" />
                                            </div>
                                            <span className="text-xl font-bold text-foreground">TEAM</span>
                                        </SheetTitle>
                                    </div>
                                    {/* Language Selector in Mobile Menu */}
                                    <div className="mt-4">
                                        <Select value={language} onValueChange={changeLanguage}>
                                            <SelectTrigger className="w-full h-10 text-sm font-medium bg-muted border border-border/50 rounded-lg text-foreground hover:bg-muted/80 transition-all duration-200 px-3">
                                                <div className="flex items-center gap-2">
                                                    <Languages className="w-4 h-4" />
                                                    <span className="text-base">{language === 'en' ? '🇬🇧' : '🇬🇪'}</span>
                                                    <span className="uppercase">{language === 'en' ? 'English' : 'ქართული'}</span>
                                                </div>
                                            </SelectTrigger>
                                            <SelectContent
                                                side="bottom"
                                                align="start"
                                                className="w-full rounded-xl border border-border/50 bg-card/95 backdrop-blur-md"
                                            >
                                                <SelectItem value="en" className="py-3">
                                                    <span className="flex items-center gap-2">
                                                        <span className="text-lg">🇬🇧</span>
                                                        <span className="font-medium">English</span>
                                                    </span>
                                                </SelectItem>
                                                <SelectItem value="ge" className="py-3">
                                                    <span className="flex items-center gap-2">
                                                        <span className="text-lg">🇬🇪</span>
                                                        <span className="font-medium">ქართული</span>
                                                    </span>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </SheetHeader>

                                {/* Mobile Navigation Links */}
                                <nav className="flex-1 overflow-y-auto px-3 py-4">
                                    <div className="flex flex-col gap-1">
                                        {allNavItems.map((item, index) => {
                                            const isActive = pathname === item.href
                                            const Icon = item.icon
                                            return (
                                                <motion.div
                                                    key={item.href}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{
                                                        delay: index * 0.04,
                                                        duration: 0.3,
                                                        ease: [0.16, 1, 0.3, 1]
                                                    }}
                                                >
                                                    <SheetClose asChild>
                                                        <Link
                                                            href={item.href}
                                                            className={cn(
                                                                'relative group flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all duration-200 font-[family-name:var(--font-ms-block)]',
                                                                isActive
                                                                    ? 'text-primary'
                                                                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                                                            )}
                                                        >
                                                            <div className={cn(
                                                                'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200',
                                                                isActive
                                                                    ? 'bg-primary/10 text-primary'
                                                                    : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary'
                                                            )}>
                                                                <Icon className="w-5 h-5" />
                                                            </div>
                                                            <span className="flex-1 relative z-10">{t(item.key)}</span>
                                                            {isActive && (
                                                                <>
                                                                    <motion.div
                                                                        layoutId="mobile-active-bg"
                                                                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 -z-10"
                                                                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                                                                    />
                                                                    <motion.div
                                                                        initial={{ scale: 0 }}
                                                                        animate={{ scale: 1 }}
                                                                        className="absolute right-4 w-2 h-2 rounded-full bg-primary"
                                                                        transition={{ duration: 0.3 }}
                                                                    />
                                                                </>
                                                            )}
                                                        </Link>
                                                    </SheetClose>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </nav>

                                {/* Mobile Menu Footer */}
                                <div className="px-6 py-4 border-t border-border/50">
                                    <SheetClose asChild>
                                        <Link
                                            href={navRoutes.contact}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-sm font-medium text-foreground hover:from-primary/15 hover:to-primary/10 transition-all duration-200 group"
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs text-muted-foreground">Contact Us</div>
                                                <div className="font-semibold">info@teamcreative.ge</div>
                                            </div>
                                        </Link>
                                    </SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </motion.nav>
        </header>
    )
}

