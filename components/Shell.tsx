import Nav from "./Nav";
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Nav />
      <main className="container pb-16">{children}</main>
      <footer className="container text-gray-400 py-10">
        © {new Date().getFullYear()} NextPrompt.tech
      </footer>
    </div>
  );
}
