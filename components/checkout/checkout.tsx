"use client";
import CheckOutForm from "@/components/checkout/check-out-form";
import { SignIn, useUser } from "@clerk/clerk-react";
import { Divider } from "@nextui-org/react";
const CheckOut = () => {
  const { user } = useUser();
  if (!user?.emailAddresses) {
    return (
      <div className=" w-full h-full ">
        <div className=" sm:pl-[20dvw] font-semibold text-xl sm:p-8 mt-2 pl-2">
          Magic Keyboard
        </div>
        <div className=" w-full h-full items-center flex justify-center">
          <SignIn afterSignInUrl="/checkout" />
        </div>
      </div>
    );
  }
  return (
    <div className=" w-full h-full">
      <div className=" sm:pl-[20dvw] font-semibold text-xl sm:mt-8 mt-2 pl-2">
        Magic Keyboard
      </div>
      <Divider className=" sm:my-5 my-2" />
      <CheckOutForm />
    </div>
  );
};

export default CheckOut;
