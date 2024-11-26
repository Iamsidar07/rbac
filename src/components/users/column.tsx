import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { ViewUser } from "./view-user";
import { Badge } from "../ui/badge";
import { EditorCreateUser } from "./edit-or-create-user";
import { DeleteUser } from "./delete-user";
import { User } from "@/types";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "roles",
    header: "Role",
    cell: ({ row }) =>
      row.original.roles.map((r) => (
        <Badge variant={"secondary"} key={r._id} className="capitalize">
          {r.name}
        </Badge>
      )),
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className="capitalize"
          variant={
            status === "suspended"
              ? "destructive"
              : status === "inactive"
                ? "secondary"
                : "default"
          }
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      const permissions = row.original.roles
        .map((r) => r.permissions.map((p) => p.name).join(","))
        .join(",");
      const uniquePermission = new Set(permissions.split(","));
      return Array.from(uniquePermission).map((p) => (
        <Badge key={p} variant={"secondary"}>
          {p}
        </Badge>
      ));
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center">
          <ViewUser user={user} />
          <EditorCreateUser
            mode="edit"
            avatar={user.avatar}
            defaultRoles={user.roles.map((r) => r._id)}
            email={user.email}
            id={user._id}
            status={user.status}
            name={user.name}
          />
          <DeleteUser user={user} />
        </div>
      );
    },
  },
];
