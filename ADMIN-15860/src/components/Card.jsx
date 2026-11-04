export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm ${className}`}>
      {children}
    </div>
  )
}