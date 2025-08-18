import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-2 items-center text-sm text-muted-foreground">
            <p>© 2025 nth link shortener</p>
            <span>|</span>
            <p className="hover:underline hover:text-primary cursor-pointer flex gap-1 items-center">
              Created by Hashim
              <span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
