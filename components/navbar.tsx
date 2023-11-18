"use client";
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
import { useEffect, useRef, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import BackgroundMusic from "./root/bg-music";
import Lottie from "lottie-react";
import sound from "@/public/sound.json";

const NavbarPage = () => {
  const { theme } = useTheme();
  const isMobile = window.screen.width <= 768;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();
  const menuItems = ["Magic", "Library", "Products", "Discord"];
  const lottieRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSound, setIsSound] = useState(false);
  useEffect(() => {
    if (!isMobile) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [isMobile]);
  if (isLoading) {
    return null;
  }
  return (
    <>
      <BackgroundMusic isPlay={isSound} />
      <Navbar
        className="sm:bg-transparent sm:fixed z-[99999]"
        isBordered={false}
        isBlurred={isMobile ? true : false}
        maxWidth="full"
        shouldHideOnScroll
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href="/" className="flex items-center gap-4 ml-5">
              <Image
                src={
                  theme === "dark"
                    ? "https://utfs.io/f/7e35cd7d-fd1b-4e34-85ba-e79501bd2be6-sqxz0n.png"
                    : "https://utfs.io/f/aa690307-8655-4f7b-ba0e-ed88b08ae4fc-sfgo65.png"
                }
                width={25}
                height={25}
                alt="logo"
              />
              <p className="font-bold text-inherit">KEYBOARD</p>{" "}
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent
          justify="center"
          className="hidden sm:flex space-x-10  z-50"
        >
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
            <Link color="foreground" href="/discord">
              Discord
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className=" right-0">
          {auth.userId ? (
            <>
              <NavbarItem className="max-sm:absolute max-sm:-left-20 max-sm:w-8">
                <UserButton afterSignOutUrl="/" />
              </NavbarItem>
              <div
                onClick={() => {
                  if (isSound) {
                    setIsSound(false);
                    lottieRef.current.play();
                  } else {
                    setIsSound(true);
                    lottieRef.current.stop();
                  }
                }}
                className="  w-10 h-10 rounded-full cursor-pointer bg-slate-100 dark:bg-black items-center flex"
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={sound}
                  loop={isSound}
                />
              </div>
              <ModeToggle />
            </>
          ) : (
            <>
              <NavbarItem className="flex">
                <SignInButton mode="modal">
                  <span className=" hover:text-gray-400 duration-500 cursor-pointer">
                    Sign In
                  </span>
                </SignInButton>
              </NavbarItem>
              <div
                onClick={() => {
                  if (isSound) {
                    setIsSound(false);
                    lottieRef.current.play();
                  } else {
                    setIsSound(true);
                    lottieRef.current.stop();
                  }
                }}
                className=" w-10 h-10 rounded-full cursor-pointer bg-slate-100 dark:bg-black items-center flex"
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={sound}
                  loop={isSound}
                />
              </div>
              <ModeToggle />
            </>
          )}
        </NavbarContent>

        <NavbarMenu className="">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`} className=" w-full">
              <Link
                href={`/${item.toLowerCase()}`}
                className=" w-full flex flex-col px-1"
              >
                <div className="flex items-center h-full w-full ml-2 hover:border-l-1 hover:border-[#2670E9] border-l-0 hover:bg-gradient-to-r px-2 py-3 from-[#2670E9]/30 to-[2670E9]/0">
                  <div className="text-foreground font-semibold text-xl">
                    {item}
                  </div>
                </div>
                <div className="bg-gradient-to-r w-[90%] from-slate-200 mt-2 via-slate-500 to-slate-200 dark:from-slate-950  dark:via-slate-400 dark:to-slate-950 h-[1px]" />
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default NavbarPage;
