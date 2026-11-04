import { getDosen } from '@/utils/dosenStorage'

export default function Dashboard() {
  const dosenList = getDosen()
  const total = dosenList.length
  const aktif = dosenList.filter((d) => d.status === 'Aktif').length
  const cuti = dosenList.filter((d) => d.status === 'Cuti').length

  const cards = [
    { label: 'Total Dosen', value: total, border: 'border-red-600' },
    { label: 'Dosen Aktif', value: aktif, border: 'border-green-500' },
    { label: 'Dosen Cuti', value: cuti, border: 'border-gray-400' },
  ]

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-800">Selamat Datang di Dashboard</h1>
      <p className="mb-6 text-sm text-gray-500">Ringkasan data dosen</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className={`rounded-xl border-t-4 bg-white p-5 shadow ${c.border}`}
          >
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className="mt-1 text-3xl font-bold text-gray-800">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}