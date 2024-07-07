import ValidateOrder from "@/components/ui/public/validate-order/ValidateOrder";
import React from "react";

export default function page({ params }) {
  return (
    <>
      <div className="py-2 px-4">
        <ValidateOrder id={params.id} />
      </div>
    </>
  );
}
