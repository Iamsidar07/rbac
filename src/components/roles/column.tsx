import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ViewRole } from "./view-role";
import { DeleteRole } from "./delete-role";
import { EditorCreateRole } from "./edit-or-create-role";
import { Role } from "@/types";

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="truncate maxw-sm">{row.original.description}</span>
    ),
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) =>
      row.original.permissions.map((p) => (
        <Badge variant={"secondary"} key={p._id || p.name}>
          {p.name}
        </Badge>
      )),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CreatedAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const role = row.original;
      return (
        <div className="flex items-center">
          <ViewRole role={role} />
          <EditorCreateRole
            mode="edit"
            defaultPermissions={role.permissions.map((p) => p._id)}
            name={role.name}
            description={role.description}
            id={role._id}
          />
          <DeleteRole role={role} />
        </div>
      );
    },
  },
];
