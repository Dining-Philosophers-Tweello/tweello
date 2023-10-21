"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { Settings } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const ProfileSettingsDialog = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
  });

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:8000/api/users/profile", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setProfile({ ...profile, name: data.name, email: data.email });
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let errorMessage = "";

    if (name === "name") {
      if (value.trim() === "") {
        errorMessage = "Name is required";
      }
    }

    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name } = profile;
    validateField("name", name);

    if (!errors.name) {
      const body = {
        ...(profile.name && { name: profile.name }),
      };
      const jwt = localStorage.getItem("jwt");
      const requestOptions = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(
          "http://localhost:8000/api/users/profile",
          requestOptions,
        );

        if (response.ok) {
          setOpen(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Settings size={40} />
      </DialogTrigger>
      <DialogContent>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Profile Settings</DialogTitle>
            <div className="pt-[20px] grid gap-2">
              <Label>Name</Label>
              <Input
                id="name"
                name="name"
                placeholder=""
                type="text"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                onChange={handleChange}
                value={profile.name}
              />
              {errors.name ? (
                <div className="flex items-center">
                  <Icons.infocircle className="w-[1.5rem]" />
                  <div className="text-[.8rem] text-gray-500 m-2 no-wrap">
                    {errors.name}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="pt-[20px] grid gap-2">
              <Label>Email</Label>
              <Input
                className=" "
                id="email"
                placeholder=""
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={profile.email}
                disabled
              />
            </div>
          </DialogHeader>
          <DialogFooter className="pt-[20px]">
            <DialogClose asChild>
              <Button className="w-1/2 mr-2" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="w-1/2 mr-2"
              type="submit"
              disabled={errors.name !== ""}
            >
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSettingsDialog;
