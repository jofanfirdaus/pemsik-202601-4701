import { Link } from 'react-router-dom'

export default function DosenCard({ dosen, onEdit, onDelete }) {
  const aktif = dosen.status === 'Aktif'

  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">{dosen.nama}</h3>
          <p className="text-xs text-gray-500">NIDN {dosen.nidn}</p>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            aktif ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {dosen.status}
        </span>
      </div>

      <p className="mt-3 text-sm text-gray-700">{dosen.mataKuliah}</p>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Link
          to={`/admin/dosen/${dosen.nidn}`}
          className="rounded-lg bg-red-600 py-2 text-center text-xs font-semibold text-white hover:bg-red-700"
        >
          Detail
        </Link>
        <button
          onClick={() => onEdit(dosen)}
          className="rounded-lg bg-amber-500 py-2 text-xs font-semibold text-white hover:bg-amber-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(dosen)}
          disabled={aktif}
          className="rounded-lg bg-red-600 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-200"
        >
          Hapus
        </button>
      </div>
    </div>
  )
}