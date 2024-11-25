import PageHeader, { BreadcrumbData } from "@/components/layout/page-header";
import RolesTable from "@/components/roles/roles-table";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roles | Dashboard",
  description: "Manage user roles and permissions",
};

export default function Roles() {
  const breatedcrumbItems: BreadcrumbData[] = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "roles", href: "/dashboard/roles" },
  ];
  return (
    <>
      <PageHeader
        breadcrumbItems={breatedcrumbItems}
        pageTitle="Manage Roles"
      />
      <RolesTable />
    </>
  );
}
