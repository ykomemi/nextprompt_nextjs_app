import Nav from "./Nav";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
      <Nav />

      {/* Global page padding */}
      <main className="flex-1">
        <div className="container py-10">{children}</div>
      </main>

      <footer className="bg-white dark:bg-[#0b0d12] border-t border-gray-200 dark:border-white/10 py-10">
        <div className="container flex items-center justify-center gap-3">
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">{`</>`}</span>
          </div>
          <span className="text-xl font-bold gradient-text">
            NextPrompt.tech
          </span>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          © {new Date().getFullYear()} NextPrompt.tech. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
