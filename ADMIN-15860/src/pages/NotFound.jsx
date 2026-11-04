import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4 text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-2 text-gray-600">Halaman tidak ditemukan</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
      >
        Kembali ke Login
      </Link>
    </div>
  )
}