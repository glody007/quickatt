"use client"

import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'
import { UserNav } from './userNav';

const items = [
    {
      name: 'Dashboard',
      link: '/dashboard',
    },
    {
      name: 'Agents',
      link: '/dashboard/agent'
    },
    {
        name: 'Visites',
        link: '/dashboard/visit'
    },
    {
        name: 'Horaire',
        link: '/dashboard/schedule'
    },
]

export function MainNav() {
    const pathname = usePathname()
    const router = useRouter()
    const [currentPathName, setCurrentPathName] = React.useState(pathname)

    const isItemSelected = (path: String) => path === currentPathName

    const navigate = (href: string) => {
        router.push(href)
        setCurrentPathName(href)
    }
    
    return (
        <div className="flex justify-center bg-slate-900 border-b w-full">
            <div className="w-full px-6 text-white flex justify-between items-center">
                <div className="flex space-x-8 items-center">
                    <Link href="/access" className="text-3xl font-semibold">
                        <span className="w-4 h-4 bg-green-400 rounded-lg">Quick</span>att
                    </Link>
                    <ul className="flex">
                        {items.map((item) => (
                            <li 
                                onClick={() => navigate(item.link)}
                                className={cn(
                                    "cursor-pointer text-slate-300 p-4 hover:bg-slate-600",
                                    "hover:border-b-4 hover:border-b-slate-600",
                                    {"border-b-4 border-b-green-400 text-green-400 hover:border-b-green-400": isItemSelected(item.link)}
                                )}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <UserNav />
                </div>
            </div>
        </div>
    );
};

