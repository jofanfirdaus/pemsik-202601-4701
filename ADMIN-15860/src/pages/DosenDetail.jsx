import { useParams, useNavigate } from 'react-router-dom'
import { getDosen } from '@/utils/dosenStorage'

export default function DosenDetail() {
  const { nidn } = useParams()
  const navigate = useNavigate()
  const dosen = getDosen().find((d) => d.nidn === nidn)

  const aktif = dosen?.status === 'Aktif'

  return (
    <div className="mx-auto max-w-5xl">
      <div className="max-w-xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-bold text-gray-800">Detail Dosen</h1>

        {dosen ? (
          <>
            <dl className="divide-y divide-gray-100 text-sm">
              <div className="flex py-3">
                <dt className="w-32 text-gray-500">NIDN</dt>
                <dd className="text-gray-800">{dosen.nidn}</dd>
              </div>
              <div className="flex py-3">
                <dt className="w-32 text-gray-500">Nama</dt>
                <dd className="text-gray-800">{dosen.nama}</dd>
              </div>
              <div className="flex py-3">
                <dt className="w-32 text-gray-500">Mata Kuliah</dt>
                <dd className="text-gray-800">{dosen.mataKuliah}</dd>
              </div>
              <div className="flex py-3">
                <dt className="w-32 text-gray-500">Status</dt>
                <dd>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      aktif ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {dosen.status}
                  </span>
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <p className="text-sm text-gray-600">Data dosen tidak ditemukan.</p>
        )}

        <button
          onClick={() => navigate(-1)}
          className="mt-5 rounded-lg bg-gray-500 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600"
        >
          &larr; Kembali
        </button>
      </div>
    </div>
  )
}