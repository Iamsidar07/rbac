import PageHeader, { BreadcrumbData } from "@/components/layout/page-header";
import PermissionsTable from "@/components/permissions/permissions-table";
import React from "react";
import { Metadata } from "next";
import { config } from "@/config";
import { Permission } from "@/types";

export const metadata: Metadata = {
  title: "Permissions | Dashboard",
  description: "Manage system permissions",
};

const getPermissions = async()=>{
  const res = await fetch(`${config.api}/permissions`)
  return await res.json() as Permission[];
}



export default async function Permissions() {
  const data = await getPermissions()
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
      <PermissionsTable data={data} />
    </>
  );
}
