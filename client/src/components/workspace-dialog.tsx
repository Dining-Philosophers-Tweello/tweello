import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function WorkspaceDialog() {
    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <p className="text-xl">Workspaces</p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Workspace 1</DropdownMenuItem>
                    <DropdownMenuItem>Workspace 2</DropdownMenuItem>
                    <DropdownMenuItem>Workspace 3</DropdownMenuItem>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>Create New Workspace</DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Workspace</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid  items-center gap-4">
                        <Label htmlFor="name" className="text-left text-sm">
                            Workspace Name
                        </Label>
                        <Input id="" className="col-span-3"/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}
