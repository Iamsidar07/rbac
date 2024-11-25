import PageHeader, { BreadcrumbData } from "@/components/layout/page-header";
import UsersTable from "@/components/users/users-table";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users | Dashboard",
  description: "Manage users, roles and permissions",
};

export default function Users() {
  const breatedcrumbItems: BreadcrumbData[] = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Users", href: "/dashboard/users" },
  ];
  return (
    <>
      <PageHeader
        breadcrumbItems={breatedcrumbItems}
        pageTitle="Manage Users"
      />
      <UsersTable />
    </>
  );
}
