"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { Status, User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  user: User;
}

export function ViewUser({ user }: Props) {
  const [open, setOpen] = useState(false);

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "inactive":
        return "bg-yellow-500"
      default:
        return "bg-red-500"
    }
  }

  const uniquePermission = new Set(user.roles.flatMap(role => role.permissions.map(permission => permission.name)))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant={"ghost"} className="rounded-full p-2" title="view user">
          <EyeIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-4">
        <DialogHeader className="sr-only">
          <DialogTitle>View User</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="sm:text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex items-center text-xs">
              <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(user.status)}`}></div>
              <span className="capitalize text-muted-foreground">{user.status}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Roles</h3>
            <div className="flex flex-wrap gap-2">
              {user.roles.map((role) => (
                <Badge key={role._id} variant="secondary">
                  {role.name}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Permissions</h3>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <ul className="flex items-center gap-2 flex-wrap">

                {Array.from(uniquePermission).map((r) =>
                    <Badge
                      key={r}
                      variant="outline"
                      className="rounded-full text-xs"
                    >
                      {r}
                    </Badge>
                )}

              </ul>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
