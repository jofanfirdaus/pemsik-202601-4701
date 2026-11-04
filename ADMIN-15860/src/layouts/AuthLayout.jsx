export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
      {children}
    </div>
  )
}