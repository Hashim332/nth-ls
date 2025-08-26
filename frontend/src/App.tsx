import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { Footer } from "./components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
      <Footer />
    </div>
  );
}

export default App;
