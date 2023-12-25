"use client";

import * as React from "react";
import Link from "next/link";

import { cn, hasPassedTwoDays } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Badge } from "@nextui-org/react";
import NavProductsDropDown from "./nav-product-item";

export function Navigation() {
  const posts = useQuery(api.post.getPosts);
  const categories = useQuery(api.category.getCategories);
  const collections = useQuery(api.collection.getCollections);
  const products = useQuery(api.product.getProductsForNavbar);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden lg:flex">
          <NavigationMenuTrigger>
            {" "}
            <Link href="/collections/all" legacyBehavior passHref>
              Products
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavProductsDropDown
              categories={categories}
              products={products}
              collections={collections}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden lg:flex">
          <NavigationMenuTrigger>
            {" "}
            <Link href="/posts" legacyBehavior passHref>
              News
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-wrap w-[910px] gap-3 p-4 border-none dark:bg-black dark:text-white bg-white text-black">
              {posts?.map((item, index) => (
                <div
                  className=" flex flex-col gap-2 items-start cursor-pointer w-[200px]"
                  key={index}
                >
                  <Badge
                    content="new"
                    color="danger"
                    size="sm"
                    variant="shadow"
                    className={cn(
                      hasPassedTwoDays(item._creationTime) ? "hidden" : ""
                    )}
                  >
                    <div className=" relative w-[200px] rounded-[5px] h-[100px]  overflow-hidden">
                      <Image
                        src={item.thumnail}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 100dvw, 33dvw"
                        className=" hover:scale-110 duration-1000"
                      />
                    </div>
                  </Badge>

                  <span className=" text-sm line-clamp-2">{item.title}</span>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden lg:flex">
          <Link href="/sale" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Sale
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden lg:flex">
          <Link href="/comming-soon" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Comming Soon
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/magic" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Magic
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/library" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Library
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/discord" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Discord
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
