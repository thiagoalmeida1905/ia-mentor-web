'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout( { children }: MainLayoutProps) {

    const session = useSession()

    if (session.status === "unauthenticated") {
        return redirect("/login")
    }

    return <div className="h-screen w-screen">{children}</div>
}