import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { SearchCommand } from "@/components/dashboard/search-command";

import { UserAccountNav } from "@/components/layout/user-account-nav";
import { sidebarLinks } from "@/config/dashboard";
import { DashboardSidebar, MobileSheetSidebar } from "@/components/layout/dashboard-sidebar";
import { ModeToggle } from "@/components/ModeToggle";


interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const filteredLinks = sidebarLinks.map((section) => ({
    ...section,
    items: section.items.filter(({ authorizeOnly }) => !authorizeOnly || authorizeOnly === user.role),
  }));

  return (
    <div className="relative flex min-h-screen w-full">
      <DashboardSidebar links={filteredLinks} />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-50 flex h-14 bg-background px-4 lg:h-[60px] xl:px-8">
          <div className="flex max-w-7xl items-center gap-x-3 px-0">
            <MobileSheetSidebar links={filteredLinks} />

            <div className="w-full flex-1">
              <SearchCommand links={filteredLinks} />
            </div>

            <ModeToggle />
            <UserAccountNav />
          </div>
        </header>

        <main className="flex-1 p-4 xl:px-8">
          <div className="flex h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6">{children}</div>
        </main>
      </div>
    </div>
  );
}