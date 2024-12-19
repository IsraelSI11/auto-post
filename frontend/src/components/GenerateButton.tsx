"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { generateTweetAction } from "@/app/actions/generateTweetAction";

const MAX_INPUT_LENGTH = 3000;

export default function GenerateButton() {
  const [generateText, setGenerateText] = useState(false);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const generateTweet = async () => {
    try {
      const data = await generateTweetAction(inputText);
      setOutputText(data.tweet);
    } catch (e) {
      console.log(e);
      setOutputText("Error al generar el tweet");
    }
  };

  return (
    <>
      <Button onClick={() => setGenerateText(true)}>
        Generar Tweet con IA
      </Button>
      <Dialog
        open={generateText}
        onOpenChange={() => {
          setGenerateText(false);
          setInputText("");
          setOutputText("");
        }}
      >
        <DialogContent className="w-11/12 max-w-5xl h-[90vh] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Generar tweet</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 flex-grow overflow-hidden">
            <Textarea
              className="h-full resize-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              maxLength={MAX_INPUT_LENGTH}
              placeholder="Enter text to generate tweet from"
            />
            <Textarea
              disabled
              className="h-full resize-none"
              value={outputText}
            />
          </div>
          <Button onClick={generateTweet} className="mt-4">
            Generar tweet
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
