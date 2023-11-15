"use client";
import { motion } from "framer-motion";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";

const NavbarPage = () => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      className=" bg-transparent"
      isBordered={false}
      shouldHideOnScroll
      isBlurred
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link
            href="/"
            color="foreground"
            className=" mr-5 flex items-center gap-4 left-0"
          >
            <Image
              src={
                theme === "dark"
                  ? "https://utfs.io/f/7e35cd7d-fd1b-4e34-85ba-e79501bd2be6-sqxz0n.png"
                  : "https://utfs.io/f/aa690307-8655-4f7b-ba0e-ed88b08ae4fc-sfgo65.png"
              }
              width={25}
              height={25}
              objectFit="contain"
              alt="logo"
            />
            <p className="font-bold text-inherit">KEYBOARD</p>{" "}
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="/magic">
              Magic
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              Products
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/library">
              Library
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Discord
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent justify="end">
        {auth.userId ? (
          <>
            <NavbarItem className="max-sm:absolute max-sm:-left-10 max-sm:w-8">
              <UserButton afterSignOutUrl="/" />
            </NavbarItem>
            <ModeToggle />
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <SignInButton mode="modal">
                <span className=" hover:text-gray-400 duration-500 cursor-pointer">
                  Sign In
                </span>
              </SignInButton>
            </NavbarItem>
            <ModeToggle />
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color="foreground" className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarPage;
