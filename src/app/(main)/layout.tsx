import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "../api/auth/authOptions";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return redirect("/login");
  } else {
    const role: any = session.user?.user?.role;

    if (role === "STUDENT") {
        return redirect ('/student')
    }
  }

  return <div className="h-screen w-screen">{children}</div>;
}