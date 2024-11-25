import PageHeader, { BreadcrumbData } from "@/components/layout/page-header";
import UsersTable from "@/components/users/users-table";
import React from "react";
import { Metadata } from "next";
import { config } from "@/config";
import { User } from "@/types";

export const metadata: Metadata = {
  title: "Users | Dashboard",
  description: "Manage users, roles and permissions",
};

const getUsers = async()=>{
  const res = await fetch(`${config.api}/users`)
  return await res.json() as User[];
}

export default async function Users() {
  const users = await getUsers()
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
      <UsersTable data={users} />
    </>
  );
}
