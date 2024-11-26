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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC, useState } from "react";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "../ui/badge";
import { Role } from "@/types";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  avatar: z.string().optional(),
  status: z.enum(["active", "inactive", "suspended"]),
  roles: z.array(z.string()).min(1, "At least one role is required"),
});

type UserSchema = z.infer<typeof userSchema>;
interface Props {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  status?: "active" | "inactive" | "suspended";
  defaultRoles?: string[];
  mode: "edit" | "create";
}
export const EditorCreateUser: FC<Props> = ({
  mode,
  name,
  email,
  id,
  status,
  avatar,
  defaultRoles,
}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      name: name || "",
      email: email || "",
      avatar: avatar || "",
      roles: defaultRoles || [],
      status: status || "active",
    },
  });
  const roles = watch("roles") || [];

  const { data: availableRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await fetch("/api/roles");
      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }
      return response.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (newUser: UserSchema) => {
      const url = mode === "edit" ? `/api/users/${id}` : `/api/users`;
      const response = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success(
        `User ${mode === "edit" ? "updated" : "created"} successfully`,
      );
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error(`Failed to ${mode} user`);
    },
  });

  const onSubmit = (data: UserSchema) => {
    console.log("data", data);
    mutation.mutate(data);
  };

  const toggleRole = (roleId: string) => {
    if (roles.includes(roleId)) {
      setValue(
        "roles",
        roles.filter((r) => r !== roleId),
      );
    } else {
      setValue("roles", [...roles, roleId]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button className="flex items-center gap-1">
            <PlusIcon className="h-4 w-4" />
            <span className="hidden sm:inline-flex">Add User</span>
          </Button>
        ) : (
          <Button
            size="icon"
            variant={"ghost"}
            className="rounded-full"
            title="edit user"
          >
            <PenIcon className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="capitalize">{mode} User</DialogTitle>
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
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              {...register("email")}
              placeholder="Email"
              className={errors.email ? "border-red-500" : ""}
            />
            <div className="h-2">
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
          </div>
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-gray-700"
          >
            Avatar URL (optional)
          </label>
          <Input {...register("avatar")} placeholder="Avatar URL (optional)" />

          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <label
            htmlFor="roles"
            className="block text-sm font-medium text-gray-700"
          >
            Roles
          </label>
          <div className="flex flex-wrap gap-2">
            {availableRoles &&
              availableRoles.map((role: Role) => (
                <Badge
                  key={role._id}
                  variant={roles.includes(role._id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleRole(role._id)}
                >
                  {role.name}
                </Badge>
              ))}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="mt-2 sm:mt-0"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="capitalize"
            >
              {mutation.isPending && (
                <Loader className="w-4 h-4 mr-1.5 animate-spin" />
              )}
              {mode} user
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
