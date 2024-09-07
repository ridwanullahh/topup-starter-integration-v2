// "use client";

// import { useTransition } from "react";
// import { generateUserStripe } from "@/actions/generate-user-stripe";
// import { SubscriptionPlan, UserSubscriptionPlan } from "@/types";

// import { Button } from "@/components/ui/button";
// import { Icons } from "@/components/shared/icons";

// interface BillingFormButtonProps {
//   offer: SubscriptionPlan;
//   subscriptionPlan: UserSubscriptionPlan;
//   year: boolean;
// }

// export function BillingFormButton({
//   year,
//   offer,
//   subscriptionPlan,
// }: BillingFormButtonProps) {
//   let [isPending, startTransition] = useTransition();
//   const generateUserStripeSession = generateUserStripe.bind(
//     null,
//     offer.stripeIds[year ? "yearly" : "monthly"],
//   );

//   const stripeSessionAction = () =>
//     startTransition(async () => await generateUserStripeSession());

//   const userOffer =
//     subscriptionPlan.stripePriceId ===
//     offer.stripeIds[year ? "yearly" : "monthly"];

//   return (
//     <Button
//       variant={userOffer ? "default" : "outline"}
//       className="w-full"
//       disabled={isPending}
//       onClick={stripeSessionAction}
//     >
//       {isPending ? (
//         <>
//           <Icons.spinner className="mr-2 size-4 animate-spin" /> Loading...
//         </>
//       ) : (
//         <>{userOffer ? "Manage Subscription" : "Upgrade"}</>
//       )}
//     </Button>
//   );
// }

"use client";

import { useTransition } from "react";
import { generateUserStripe } from "@/actions/generate-user-stripe";
import { SubscriptionPlan, UserSubscriptionPlan } from "@/types";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

interface BillingFormButtonProps {
  offer: SubscriptionPlan;
  subscriptionPlan: UserSubscriptionPlan;
  year: boolean;
}

export function BillingFormButton({
  year,
  offer,
  subscriptionPlan,
}: any) {
  let [isPending, startTransition] = useTransition();
  const generateUserStripeSession = generateUserStripe.bind(
    null,
    offer.stripeIds[year ? "yearly" : "monthly"]
  );

  const stripeSessionAction = () =>
    startTransition(() => {
      // Call the async function without awaiting it, so we don't return a Promise
      generateUserStripeSession();
    });

  const userOffer =
    subscriptionPlan.stripePriceId ===
    offer.stripeIds[year ? "yearly" : "monthly"];

  return (
    <Button
      variant={userOffer ? "default" : "outline"}
      className="w-full"
      disabled={isPending}
      onClick={stripeSessionAction}
    >
      {isPending ? (
        <>
          <Icons.spinner className="mr-2 size-4 animate-spin" /> Loading...
        </>
      ) : (
        <>{userOffer ? "Manage Subscription" : "Upgrade"}</>
      )}
    </Button>
  );
}