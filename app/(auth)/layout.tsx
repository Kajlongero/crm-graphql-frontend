export default function AuthLayout ({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white">
      {children}
    </div>
  )
}