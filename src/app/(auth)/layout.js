export default function AuthLayout({ children }) {
  return (
    <div className="mx-auto w-screen bg-gray-100 flex items-center justify-center min-h-[calc(100vh-7.7rem)]">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        {children}
      </div>
    </div>
  );
}
