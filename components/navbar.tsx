"use client";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Badge,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ModeToggle from "./mode-toggle";
import BackgroundMusic from "./root/bg-music";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import sound from "@/public/sound.json";
import cartIcon from "@/public/cart.json";
import { usePathname } from "next/navigation";
import useCart from "@/hooks/use-shopping-cart";
import { useCartDrawer } from "@/hooks/use-shopping-cart-drawer";
import { useMusic } from "@/hooks/use-bg-music";
import { cn } from "@/lib/utils";
import { useEventListener, useMediaQuery } from "usehooks-ts";
import { Navigation } from "./navigation";

const NavbarPage = () => {
  const { theme } = useTheme();
  const isPLay = useMusic();
  const isMobile = useMediaQuery("(max-width:768px)");
  const auth = useAuth();
  const cart = useCart();
  const cartDrawer = useCartDrawer();
  const menuItems = ["Magic", "Posts", "Library", "Collections", "Discord"];
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(0);
  const onScroll = (event: Event) => {
    setIsAtTop(window.scrollY);
  };
  useEventListener("scroll", onScroll);
  useEffect(() => {
    isPLay.onClose();
    const timeoutId = setTimeout(() => {
      if (isPLay.isOpen) {
        isPLay.onClose();
      }
      isPLay.onOpen();
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <>
      <BackgroundMusic />
      <Navbar
        className={cn(
          " sm:fixed z-[99]",
          isAtTop === 0 ? "sm:bg-transparent" : ""
        )}
        isBordered={false}
        isBlurred={isMobile ? true : isAtTop === 0 ? false : true}
        maxWidth="full"
        shouldHideOnScroll
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle aria-label={"menu"} className="sm:hidden" />
          <NavbarBrand>
            <Link href="/" className="flex items-center gap-4 ml-5">
              <Image
                src={
                  theme === "dark"
                    ? "https://utfs.io/f/7e35cd7d-fd1b-4e34-85ba-e79501bd2be6-sqxz0n.png"
                    : "https://utfs.io/f/aa690307-8655-4f7b-ba0e-ed88b08ae4fc-sfgo65.png"
                }
                width={20}
                height={30}
                className=" w-[20px] h-[30px]"
                alt="logo"
              />
              <p className="font-bold sm:flex hidden text-inherit">KEYBOARD</p>{" "}
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="center" className="hidden sm:flex w-full z-50">
          <Navigation />
        </NavbarContent>
        <NavbarContent justify="end" className=" flex items-center">
          {auth.userId ? (
            <>
              <NavbarItem
                className={cn(
                  "absolute w-10 right-[90px] -top-6 sm:right-[487px] sm:top-4 z-[99999]",
                  pathname !== "/" ? "sm:right-[540px] right-[140px]" : ""
                )}
              >
                <UserButton />
              </NavbarItem>
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
            </>
          )}
          {pathname !== "/" && (
            <Badge
              content={cart.items.length}
              color="danger"
              variant="shadow"
              showOutline={false}
            >
              <div
                onClick={() => cartDrawer.toggle()}
                className=" w-10 h-10 rounded-[10px] p-1 cursor-pointer dark:bg-slate-400 bg-transparent  items-center flex"
              >
                <Lottie animationData={cartIcon} loop={false} />
              </div>
            </Badge>
          )}

          <div
            onClick={() => {
              if (isPLay.isOpen) {
                isPLay.onClose();
                lottieRef.current?.play();
              } else {
                isPLay.onOpen();
                lottieRef.current?.stop();
              }
            }}
            className=" w-10 h-10 rounded-full cursor-pointer bg-transparent hover:shadow-inner dark:shadow-white shadow-black duration-500 items-center flex"
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={sound}
              loop={isPLay.isOpen}
            />
          </div>
          <ModeToggle />
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
