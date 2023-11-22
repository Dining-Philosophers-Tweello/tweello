import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { requestOptions } from "@/hooks/requestOptions";
import { Column } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderEdit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "./ui/input";

const formSchema = z.object({
  name: z.string().min(1),
});

export default function EditColumnDialog({
  params,
  columnData,
}: {
  params: { workspaceId: string; boardId: string };
  columnData: Column;
}) {
  const [open, setOpen] = useState(false);
  const [columnName, setColumnName] = useState(columnData.name);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: columnName,
    },
  });

  const handleEdit = (values: z.infer<typeof formSchema>) => {
    fetch(
      `http://localhost:8000/api/workspaces/${params.workspaceId}/boards/${params.boardId}/columns/${columnData._id}`,
      requestOptions("PUT", values),
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error editing column:", error);
      });
    setColumnName(values.name);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        form.reset({
          name: columnName,
        });
      }}
    >
      <DialogTrigger>
        <Button variant="ghost" className="!mt-0" size="icon">
          <FolderEdit color="grey" size="24" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Column</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Column Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the column name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button className="mr-2" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={!form.formState.isValid}>Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
