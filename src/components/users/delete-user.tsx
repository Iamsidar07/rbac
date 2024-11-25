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
import { User } from "@/types";

interface Props {
  user: User;
}

export function DeleteUser({ user }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("User deleted successfully.");
        setOpen(false);
      }
    },
    onError: () => toast.error("Failed to delete user"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleSubmit = () => {
    deleteUser();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant={"ghost"} className="rounded-full">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>Are you sure you want to delete user {user.name}?</p>
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
