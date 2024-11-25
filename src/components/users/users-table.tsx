"use client";
import { columns } from "./column";
import { DataTable } from "../ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { EditorCreateUser } from "./edit-or-create-user";

export default function UsersTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users");
      if (!res.ok) return [];
      return await res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DataTable
      columns={columns}
      data={data}
      rightAction={<EditorCreateUser mode="create" />}
    />
  );
}
