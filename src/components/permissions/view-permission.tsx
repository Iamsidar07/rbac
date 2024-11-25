"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "lucide-react"
import { useState } from "react"
import { Permission } from "@/types"

interface Props {
  permission: Permission 
}

export function ViewPermission({ permission }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant={"ghost"}
          className="rounded-full"
          title="view permission"
        >
          <EyeIcon/>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>View Permission</DialogTitle> 
        </DialogHeader>

        <div className="space-y-[14px]">
          {/* Basic Info */}
          <div className="space-y-2">
            <div className="w-full">
              <h3 className="font-semibold text-lg">{permission.name}</h3> 
              <p className="text-sm text-muted-foreground">{permission.description}</p> 
            </div>
          </div>

          {/* Permissions */}
          {/* <div className="space-y-2">
            <label className="text-sm font-medium">Permissions</label>
            <ScrollArea className="h-[200px] w-full rounded-md border p-2">
              <div className="space-y-2">
                
              </div>
            </ScrollArea>
          </div> */}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}