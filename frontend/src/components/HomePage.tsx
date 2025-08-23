import MainForm from "./MainForm";

export function HomePage() {
  return (
    <main className="flex-1 py-16">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Shorten Your Links
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Transform long URLs into short, shareable links with nth link
            shortener. Fast, reliable, and simple to use.
          </p>
        </div>
        <MainForm />
      </div>
    </main>
  );
}
