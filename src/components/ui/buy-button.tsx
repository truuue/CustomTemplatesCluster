"use client";

import { createCheckoutSession } from "@/lib/actions/stripe";
import { useState } from "react";
import { Button } from "./button";

export const BuyButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    await createCheckoutSession();
    setIsLoading(false);
  };

  if (isLoading) {
    return <Button disabled>Chargement...</Button>;
  }

  return (
    <form>
      <Button
        onClick={handleSubscribe}
        className="w-full text-base"
        disabled={isLoading}
      >
        S&apos;abonner
      </Button>
    </form>
  );
};
