import PageHeader, { BreadcrumbData } from "@/components/layout/page-header";
import RolesTable from "@/components/roles/roles-table";
import React from "react";
import { Metadata } from "next";
import { config } from "@/config";
import { Role } from "@/types";

export const metadata: Metadata = {
  title: "Roles | Dashboard",
  description: "Manage user roles and permissions",
};
const getRoles = async()=>{
  try {
    const res = await fetch(`${config.api}/roles`)
    return await res.json() as Role[];
  } catch (error) {
    console.error("Failed to fetch roles:", error);
    return [];
  }
}

export default async function Roles() {
  const roles = await getRoles()
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
      <RolesTable data={roles} />
    </>
  );
}
