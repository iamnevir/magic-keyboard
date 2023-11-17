"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = false;
  return (
    <ClerkProvider
      appearance={
        !isMobile
          ? {
              baseTheme: dark,

              elements: {
                formButtonPrimary:
                  "hover:scale-[1.05] duration-300 dark:bg-white bg-black dark:text-black text-white dark:hover:bg-white hover:bg-black",
                socialButtonsBlockButton:
                  "hover:scale-[1.05] duration-300 dark:bg-black bg-white dark:text-white text-black dark:border-white border-black border-1 dark:border-opacity-10 border-opacity-10",
                card: "rounded-tr-[20px] rounded-br-[20px] rounded-tl-[0px] rounded-bl-[0px] border-transparent h-[550px] dark:bg-black bg-white",
                modalCloseButton:
                  " rounded-full dark:bg-black bg-white dark:text-white text-black  ",
                rootBox: "sm:ml-[400px] mr-5",
                formFieldInput:
                  " focus-visible:ring-0 dark:bg-black bg-white dark:text-white text-black dark:border-white border-black border-1 dark:border-opacity-10 border-opacity-10 ",
                headerTitle:
                  "dark:bg-black bg-white dark:text-white text-black",
                formFieldLabel:
                  "dark:bg-black bg-white dark:text-white text-black ",
                headerSubtitle: "dark:text-[#A1A1A1] text-gray-500",
                footerActionText:
                  "dark:bg-black bg-white dark:text-white text-black ",
                userButtonPopoverActionButtonText: "dark:text-white text-black",
                userButtonPopoverActionButtonIcon:
                  "dark:text-white text-black ",
                userPreviewSecondaryIdentifier: "dark:text-white text-black",
                userPreviewMainIdentifier: "dark:text-white text-black",
                userButtonPopoverFooter: "hidden opacity-0",
                userButtonPopoverActionButton:
                  "dark:hover:bg-[#0A0A0A] hover:bg-gray-100",
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "auto",
              },
            }
          : {
              baseTheme: dark,
              elements: {
                formButtonPrimary:
                  "bg-gradient-to-r from-[#CC75DB] to-[#5137AE] shadow-black  shadow-lg hover:scale-[1.05]",
                socialButtonsBlockButton:
                  " bg-[#e0eff6] text-[#0E435C] shadow-white shadow-md hover:bg-[#e0eff6] hover:scale-[1.05] ",
                card: "rounded-tr-[10px] rounded-br-[10px] rounded-tl-[0px] rounded-bl-[0px] border-transparent h-[550px] mr-[60px]",
                modalCloseButton: " rounded-full",
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "auto",
              },
            }
      }
    >
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;
