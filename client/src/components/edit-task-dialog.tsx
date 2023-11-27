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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { requestOptions } from "@/hooks/requestOptions";
import { Task } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderEdit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

export default function EditTaskDialog({
  params,
  columnId,
  task,
  onOpenCloseDialog,
}: {
  params: { workspaceId: string; boardId: string };
  columnId: string;
  task: Task;
  onOpenCloseDialog: () => void;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: task.name,
      description: task.description,
    },
  });

  const handleEdit = (values: z.infer<typeof formSchema>) => {
    fetch(
      `http://localhost:8000/api/workspaces/${params.workspaceId}/boards/${params.boardId}/columns/${columnId}/tasks/${task._id}`,
      requestOptions("PUT", values),
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error editing task:", error);
      });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onOpenCloseDialog();
        setOpen(!open);
        form.reset({
          name: task.name,
          description: task.description,
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
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the task name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the task description"
                      {...field}
                    />
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
