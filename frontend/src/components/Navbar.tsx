import { Link } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold text-foreground">
              nth-LinkShortener
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
