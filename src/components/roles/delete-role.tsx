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
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Role } from "@/types";

interface Props {
  role: Role;
}

export function DeleteRole({ role }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutate: deleteRole, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/roles/${role._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Role deleted successfully.");
        setOpen(false);
      }
    },
    onError: () => toast.error("Failed to delete role"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  const handleSubmit = () => {
    deleteRole();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant={"ghost"} className="rounded-full" title="delete role">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Role</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>Are you sure you want to delete role {role.name}?</p>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone.
          </p>
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleSubmit}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
