"use client";
import React, { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";

export interface BreadcrumbData {
  title: string;
  href: string;
}

interface Props {
  pageTitle: string;
  breadcrumbItems: BreadcrumbData[];
}

const PageHeader: FC<Props> = ({ pageTitle, breadcrumbItems }) => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="flex flex-col gap-[14px]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-2xl font-bold">{pageTitle}</h2>
        <Button onClick={toggleSidebar} variant={"ghost"} className="md:hidden">
          <PanelLeft className="text-muted-foreground" />
        </Button>
      </div>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map(({ title, href }, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={href}
                  className={`${idx === breadcrumbItems.length - 1 ? "text-black" : "text-primary opacity-80"}`}
                >
                  {title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {idx < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
export default PageHeader;
