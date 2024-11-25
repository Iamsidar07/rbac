"use client"
import { columns } from "./column";
import { DataTable } from "../ui/data-table";
import { EditorCreateUser } from "./edit-or-create-user";
import { User } from "@/types";

export default function UsersTable({data}: {data: User[]}) {
  return (
    <DataTable
      columns={columns}
      data={data}
      rightAction={<EditorCreateUser mode="create" />}
    />
  );
}
