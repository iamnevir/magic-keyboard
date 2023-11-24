"use client";
import { cn } from "@/lib/utils";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
const Breadcrumb = ({
  item,
  item2,
  href2,
  href,
  className,
}: {
  item?: string;
  href?: string;
  item2?: string;
  href2?: string;
  className?: string;
}) => {
  return (
    <Breadcrumbs className={cn(" w-full justify-center flex", className)}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href={href}>{item}</BreadcrumbItem>
      {!!item2 && <BreadcrumbItem href={href2}>{item2}</BreadcrumbItem>}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
