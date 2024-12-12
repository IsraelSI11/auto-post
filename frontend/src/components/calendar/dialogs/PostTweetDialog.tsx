import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "postcss";

export default function PostTweetDialog() {
  return (
    <Dialog
      open={!!selectedDate}
      onOpenChange={() => {
        setSelectedDate(null);
        setSelectedStartTime(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Publicar tweet para el {selectedDate?.toDateString()} a las{" "}
            {selectedStartTime}
          </DialogTitle>
        </DialogHeader>
        <Input
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          placeholder="Enter event title"
        />
        <Button onClick={addEvent}>Publicar tweet</Button>
      </DialogContent>
    </Dialog>
  );
}
