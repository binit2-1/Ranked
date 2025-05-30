import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { showSuccess } from "./ui/sonner";
import { useAuth } from "../lib/useAuth";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    showSuccess("Logged out successfully!");
    setOpen(false);
    navigate("/");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white border-0 font-semibold px-6 py-2 rounded-md shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-all duration-300">
          LOG OUT
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#181022] border-fuchsia-700 text-white">
        <DialogHeader className="flex flex-col items-center justify-center text-center w-full">
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleLogout} className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white border-0 font-semibold px-6 py-2 rounded-md shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-all duration-300">Yes, LOG OUT</Button>
          <DialogClose asChild>
            <Button variant="ghost" className="text-white hover:text-fuchsia-600 hover:bg-fuchsia-900/10 transition-colors">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

