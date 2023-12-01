import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@nextui-org/button";
import React from "react";

export const BuyAgain = ({ item }: { item: Doc<"order"> }) => {
  const muaLai = () => {};
  return (
    <Button onClick={muaLai} variant="shadow" color="success">
      Mua lại
    </Button>
  );
};
