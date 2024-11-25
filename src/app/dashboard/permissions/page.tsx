import PageHeader, { BreadcrumbData } from "@/components/layout/page-header";
import PermissionsTable from "@/components/permissions/permissions-table";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permissions | Dashboard",
  description: "Manage system permissions",
};

export default function Permissions() {
  const breatedcrumbItems: BreadcrumbData[] = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "permissions", href: "/dashboard/permissions" },
  ];
  return (
    <>
      <PageHeader
        breadcrumbItems={breatedcrumbItems}
        pageTitle="Manage Permissions"
      />
      <PermissionsTable />
    </>
  );
}
