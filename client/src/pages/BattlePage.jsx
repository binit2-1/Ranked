import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "../components/ui/dialog";

function ResultDialog({ open, onOpenChange, isWinner, yourTime, opponentTime, ratingChange, onExit }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#181022] border-fuchsia-700 text-white">
        <DialogHeader className="flex flex-col items-center justify-center text-center w-full">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            {isWinner ? "Congratulations!" : "Battle Result"}
          </DialogTitle>
        </DialogHeader>
        <div className="text-center my-4">
          <div className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            {isWinner ? "You Won!" : "You Lost"}
          </div>
          <div className="text-lg mb-2">Your Time: <span className="text-fuchsia-400 font-mono">{yourTime}s</span></div>
          <div className="text-lg mb-2">Opponent's Time: <span className="text-purple-400 font-mono">{opponentTime}s</span></div>
          <div className={`text-lg font-semibold ${ratingChange > 0 ? 'text-green-400' : 'text-red-400'}`}> 
            {ratingChange > 0 ? `+${ratingChange} ELO` : `${ratingChange} ELO`} {isWinner ? 'gained' : 'lost'}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onExit} className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white w-full">Exit to Dashboard</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function MinimalBattlePage() {
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [resignDialogOpen, setResignDialogOpen] = useState(false);

  // Demo values for dialog
  const isWinner = true;
  const yourTime = 42;
  const opponentTime = 55;
  const ratingChange = 25;

  const handleSubmit = () => {
    setResultDialogOpen(true);
  };
  const handleResign = () => {
    setResignDialogOpen(false);
    
  };
  const handleExit = () => {
    setResultDialogOpen(false);
    
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white font-sans flex flex-col items-center justify-center gap-8">
      <Button onClick={handleSubmit} className="bg-fuchsia-600 text-white hover:bg-fuchsia-700 px-6 py-2 text-base font-semibold rounded-md">Submit</Button>
      <Dialog open={resignDialogOpen} onOpenChange={setResignDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-slate-900 border border-red-500 text-red-500 cursor-pointer hover:bg-neutral-900 px-6 py-2 text-base font-semibold rounded-md">Resign</Button>
        </DialogTrigger>
        <DialogContent className="bg-[#181022] border-fuchsia-700 text-white">
          <DialogHeader className="flex flex-col items-center justify-center text-center w-full">
            <DialogTitle>Are you sure you want to resign?</DialogTitle>
          </DialogHeader>
          <div className="text-center my-4">
            <span className="text-lg font-semibold text-red-400">You will lose 18 ELO if you resign.</span>
          </div>
          <DialogFooter>
            <Button
              onClick={handleResign}
              className="bg-[#101010] text-white hover:bg-[#232323] border-none shadow-none"
            >
              Yes, Resign
            </Button>
            <DialogClose asChild>
              <Button className="bg-fuchsia-700 text-white hover:bg-fuchsia-600 border-none shadow-none">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ResultDialog
        open={resultDialogOpen}
        onOpenChange={setResultDialogOpen}
        isWinner={isWinner}
        yourTime={yourTime}
        opponentTime={opponentTime}
        ratingChange={ratingChange}
        onExit={handleExit}
      />
    </div>
  );
}