export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`w-full rounded-lg bg-red-600 py-2 text-sm font-semibold text-white
        hover:bg-red-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}