import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { DeletePermission } from "./delete-permission";
import { EditorCreatePermission } from "./edit-or-create-permission";
import { ViewPermission } from "./view-permission";
import { Permission } from "@/types";

export const columns: ColumnDef<Permission>[] = [
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
      const permission = row.original;
      return (
        <div className="flex items-center">
          <ViewPermission permission={permission} />
          <EditorCreatePermission {...permission} mode="edit" />
          <DeletePermission permission={permission} />
        </div>
      );
    },
  },
];
