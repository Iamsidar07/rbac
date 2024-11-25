"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, PenIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Permission } from "@/types";

const roleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  permissions: z.array(z.string()).min(1, "Pleas select an permission"),
});

type RoleSchema = z.infer<typeof roleSchema>;

interface Props {
  id?: string;
  name?: string;
  description?: string;
  defaultPermissions?: string[];
  mode: "edit" | "create";
}

export const EditorCreateRole: FC<Props> = ({
  name,
  id,
  description,
  defaultPermissions,
  mode,
}) => {
  const queryClient = new QueryClient();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RoleSchema>({
    resolver: zodResolver(roleSchema),
    mode: "onChange",
    defaultValues: {
      name: name || "",
      description: description || "",
      permissions: defaultPermissions || [],
    },
  });
  const permissions = watch("permissions") || [];

  const { data: availablePermissions } = useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const response = await fetch("/api/permissions");
      if (!response.ok) {
        throw new Error("Failed to fetch permissions");
      }
      return response.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (newRole: RoleSchema) => {
      const url = mode === "edit" ? `/api/roles/${id}` : `/api/roles`;
      const response = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRole),
      });
      if (!response.ok) {
        throw new Error("Failed to create role");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success(
        `Role ${mode === "edit" ? "updated" : "created"} successfully`,
      );
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: () => {
      toast.error(`Failed to ${mode} role`);
    },
  });

  const onSubmit = (data: RoleSchema) => {
    console.log(data);
    mutation.mutate(data);
  };

  const togglePermission = (permissionId: string) => {
    console.log({ permissionId }, permissions);
    if (permissions.includes(permissionId)) {
      console.log("remove");
      setValue(
        "permissions",
        permissions.filter((p) => p !== permissionId),
      );
    } else {
      console.log("add");
      setValue("permissions", [...permissions, permissionId]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button className="flex items-center gap-1">
            <PlusIcon className="h-4 w-4" />
            Add Role
          </Button>
        ) : (
          <Button size="icon" variant={"ghost"} className="rounded-full">
            <PenIcon className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="capitalize">{mode} Role</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[10px]"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Input
              {...register("name")}
              placeholder="Name"
              className={errors.name ? "border-red-500" : ""}
            />
            <div className="h-2">
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>
          </div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description (optional)
          </label>
          <Input
            {...register("description")}
            placeholder="Description (optional)"
          />

          <label
            htmlFor="permissions"
            className="block text-sm font-medium text-gray-700"
          >
            Permissions (optional)
          </label>
          <div className="flex flex-wrap gap-2">
            {availablePermissions &&
              availablePermissions.map((permission: Permission) => (
                <Badge
                  key={permission._id}
                  variant={
                    permissions.includes(permission._id) ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => togglePermission(permission._id)}
                >
                  {permission.name}
                </Badge>
              ))}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="capitalize"
            >
              {mutation.isPending && (
                <Loader className="w-4 h-4 animate-spin mr-1.5" />
              )}
              {mode} Role
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
