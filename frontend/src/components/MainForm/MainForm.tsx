import { useState } from "react";
import { Button } from "../ui/button";
import { toast, Toaster } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { getUrl } from "../../services/urlService";
import { Copy, X } from "lucide-react";

export default function MainForm() {
  const [link, setLink] = useState("");
  const [validUrl, setValidUrl] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");

  const mutation = useMutation({
    mutationFn: getUrl,
    onSuccess: (response) => {
      setShortenedUrl(response.data.shortUrl);
    },
  });

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

  // TODO: ADD enter key to submit
  function handleSubmit() {
    // VALIDATION
    if (!isValidUrl(link)) {
      toast.warning("Invalid URL, please try again");
      setValidUrl(false);
      return;
    }

    mutation.mutate(link);
    setLink("");
    setShortenedUrl("");
    setValidUrl(false);
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

          <div>{mutation.isPending && <p>Loading...</p>}</div>

          <Toaster />

          {/* OUTPUT */}
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Your shortened link</h1>
          {mutation.isSuccess && (
            <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
              <div className="flex items-center">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">
                    Shortened URL:
                  </p>
                  <p className="text-primary font-mono text-sm break-all">
                    {shortenedUrl}
                  </p>
                </div>

                {/* FIXME: ADD COPY TO CLIPBOARD */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-3 flex-shrink-0 hover:bg-primary/10 hover:text-primary cursor-pointer"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4 " />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
