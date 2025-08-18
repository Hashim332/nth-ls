import { Button } from "./ui/button";

export default function MainForm() {
  return (
    <div className="mt-10 bg-secondary rounded-lg p-6 shadow-lg">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Enter your link</h1>
          <input
            type="text"
            placeholder="https://www.something.com"
            className="border outline-none p-2 rounded-md w-full"
          />
          <Button
            type="submit"
            className="w-full text-lg font-bold hover:bg-primary/80 cursor-pointer"
          >
            Shorten
          </Button>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold">Your shortened link</h1>
          <p className="text-lg font-bold">[return link here]</p>
        </div>
      </div>
    </div>
  );
}
