"use client"

import { Button } from "./ui/button"
import { signOut } from "next-auth/react";

const LogoutButton = (
    { className }: { className?:string }
) => {
    return (
        <Button onClick={() => signOut()} variant="outline" size="sm">Log out</Button>
    )
}
  
export default LogoutButton