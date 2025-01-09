"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { generateTweetAction } from "@/app/actions/generateTweetAction";
import { Loading } from "./Loading";
import { Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const MAX_INPUT_LENGTH = 3000;

export default function GenerateButton() {
  const [generateText, setGenerateText] = useState(false);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateTweet = async () => {
    setLoading(true);
    try {
      const data = await generateTweetAction(inputText);
      setOutputText(data.tweet);
    } catch (e) {
      console.log(e);
      setOutputText("Error al generar el tweet");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copiado al portapapeles",
        description: "El tweet generado ha sido copiado al portapapeles.",
      });
    } catch (err) {
      console.error("Error al copiar el texto: ", err);
      toast({
        title: "Error al copiar",
        description: "Hubo un error al copiar el texto al portapapeles.",
        variant: "destructive",
      });
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
              placeholder="Escribe el texto para generar el tweet con IA"
              spellCheck="false"
            />
            {loading ? (
              <Loading text="Generando tweet..." />
            ) : (
              <div className="relative h-full">
                <Textarea
                  disabled
                  className="h-full resize-none pr-10"
                  value={outputText}
                />
                {outputText && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copiar al portapapeles</span>
                  </Button>
                )}
              </div>
            )}
          </div>
          <Button onClick={generateTweet} className="mt-4">
            Generar tweet
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

