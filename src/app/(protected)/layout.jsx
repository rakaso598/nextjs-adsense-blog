export default function ProtectedLayout({ children }) {
  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="flex flex-col h-full">{children}</div>
    </div>
  );
}
