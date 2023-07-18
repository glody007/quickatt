import React from 'react';
import { UserNav } from './userNav';

export function MainNav() {
    return (
        <div className="flex justify-center bg-slate-900 border-b w-full">
            <div className="w-full px-6 text-white flex justify-between items-center">
                <div className="flex space-x-8 items-center">
                    <h1 className="text-3xl font-semibold">
                        <span className="w-4 h-4 bg-green-400 rounded-lg">Quick</span>att
                    </h1>
                    <ul className="flex space-x-8 ">
                        <li className="text-green-400 py-4 border-b-4 border-b-green-400">Dashboard</li>
                        <li className="text-slate-200 py-4">Agents</li>
                        <li className="text-slate-200 py-4">Visites</li>
                        <li className="text-slate-200 py-4">Horaires</li>
                    </ul>
                </div>
                <div>
                    <UserNav />
                </div>
            </div>
        </div>
    );
};

