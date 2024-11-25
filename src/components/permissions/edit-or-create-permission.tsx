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
import { PenIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

const permissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

type PermissionSchema = z.infer<typeof permissionSchema>;

interface Props {
  _id?: string;
  name?: string;
  description?: string;
  mode: "edit" | "create";
}

export const EditorCreatePermission: FC<Props> = ({
  _id,
  name,
  description,
  mode,
}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PermissionSchema>({
    resolver: zodResolver(permissionSchema),
    mode: "onChange",
    defaultValues: {
      name: name || "",
      description: description || "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (newPermission: PermissionSchema) => {
      const url =
        mode === "edit" ? `/api/permissions/${_id}` : `/api/permissions`;
      const response = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPermission),
      });
      if (!response.ok) {
        throw new Error(`Failed to ${mode} permission`);
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success(
        `Permission ${mode === "edit" ? "updated" : "created"} successfully`,
      );
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: () => {
      toast.error(`Failed to ${mode} permission`);
    },
  });

  const onSubmit = (data: PermissionSchema) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button className="flex items-center gap-1">
            <PlusIcon className="h-4 w-4" />
            Add Permission
          </Button>
        ) : (
          <Button size="icon" variant={"ghost"} className="rounded-full">
            <PenIcon className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit" : "Create"} Permission
          </DialogTitle>
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
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description (optional)
            </label>
            <Input
              {...register("description")}
              placeholder="Description (optional)"
              className={errors.description ? "border-red-500" : ""}
            />
            <div className="h-2">
              {errors.description && (
                <p className="text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending
                ? `${mode === "edit" ? "Updating" : "Creating"}...`
                : `${mode === "edit" ? "Update" : "Create"} Permission`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
