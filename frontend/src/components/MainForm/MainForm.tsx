import { useState } from "react";
import { Button } from "../ui/button";
import { toast, Toaster } from "sonner";
import { useMutation } from "@tanstack/react-query";

export default function MainForm() {
  const [link, setLink] = useState("");
  const [validUrl, setValidUrl] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("link -> ", link); // FIXME:

  function isValidUrl(url: string) {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator

    setValidUrl(pattern.test(url)); // BOOLEAN
    return pattern.test(url); // BOOLEAN
  }

  function handleSubmit() {
    // VALIDATION
    if (!isValidUrl(link) || isSubmitting) {
      toast.warning("Invalid URL, please try again");
      setValidUrl(false);
      return;
    }

    // SUBMISSION
    setIsSubmitting(true);
    try {
      const mutation = useMutation({
        mutationFn: async (url: string) => {
          return fetch(`${import.meta.env.VITE_API_URL}/api/shorten`, {
            method: "POST",
            body: JSON.stringify({ url }),
          });
        },
      });
    } catch (e) {
      toast.error("Failed to shorten URL, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-10 bg-secondary rounded-lg p-6 shadow-lg">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col gap-4">
          {/* INPUT */}
          <h1 className="text-2xl font-bold">Enter your link</h1>
          <input
            type="text"
            placeholder="https://www.something.com"
            className="border outline-none p-2 rounded-md w-full"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <Button
            className="w-full text-lg font-bold hover:bg-primary/80 cursor-pointer"
            onClick={handleSubmit}
          >
            Shorten
          </Button>

          <Toaster />

          {/* OUTPUT */}
        </div>
        <div className="">
          <h1 className="text-2xl font-bold">Your shortened link</h1>
          <p className="text-lg font-bold">[return link here]</p>
        </div>
      </div>
    </div>
  );
}
