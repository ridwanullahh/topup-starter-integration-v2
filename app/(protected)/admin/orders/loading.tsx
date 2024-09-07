import { DashboardHeader } from "@/components/dashboard/header";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersLoading() {
  return (
    <>
      <DashboardHeader
        heading="Orders"
        text="Check and manage your latest orders."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
