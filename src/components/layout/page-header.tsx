import React, { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export interface BreadcrumbData {
  title: string;
  href: string;
}

interface Props {
  pageTitle: string;
  breadcrumbItems: BreadcrumbData[];
}

const PageHeader: FC<Props> = ({ pageTitle, breadcrumbItems }) => {
  return (
    <div className="flex flex-col gap-[14px]">
      <h2 className="text-lg sm:text-2xl font-bold">{pageTitle}</h2>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map(({ title, href }, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={href}
                  className={`${idx === breadcrumbItems.length - 1 ? "text-black" : ""}`}
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
