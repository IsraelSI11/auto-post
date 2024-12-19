'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { generateTweetAction } from "@/app/actions/generateTweetAction";

export default function GenerateButton() {
  const [generateText, setGenerateText] = useState(false);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const generateTweet = async () => {
    try {
      const data = await generateTweetAction(inputText);
      setOutputText(data.tweet);
    } catch (e) {
        console.log(e)
        setOutputText("Error al generar el tweet");
    }
  };

  return (
    <>
      <Button onClick={()=>setGenerateText(true)}>Generar Tweet con IA</Button>
      <Dialog
        open={generateText}
        onOpenChange={() => {
          setGenerateText(false);
          setInputText("");
          setOutputText("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generar tweet</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <Textarea
              className="h-96 max-h-96"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to generate tweet from"
            />

            <Textarea disabled className="h-96 max-h-96" value={outputText} />
          </div>

          <Button onClick={generateTweet}>Generar tweet</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
