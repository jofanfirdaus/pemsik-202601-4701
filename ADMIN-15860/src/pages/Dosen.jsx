import { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import DosenCard from '@/components/DosenCard'
import DosenFormModal from '@/components/DosenFormModal'
import { getDosen, saveDosen } from '@/utils/dosenStorage'

export default function Dosen() {
  const [dosen, setDosen] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  // Muat data dengan delay 500 ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDosen(getDosen())
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Update state sekaligus simpan ke localStorage
  const update = (list) => {
    setDosen(list)
    saveDosen(list)
  }

  const openAdd = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (d) => {
    setEditing(d)
    setFormOpen(true)
  }

  const handleSave = (data) => {
    if (editing) {
      update(dosen.map((d) => (d.nidn === data.nidn ? data : d)))
    } else {
      update([...dosen, data])
    }
    setFormOpen(false)
  }

  const handleDelete = () => {
    if (deleting.status === 'Aktif') return 
    update(dosen.filter((d) => d.nidn !== deleting.nidn))
    setDeleting(null)
  }

  const filtered = dosen.filter((d) =>
    d.nama.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Dosen</h1>
        <button
          onClick={openAdd}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          + Tambah Dosen
        </button>
      </div>

      <div className="mb-4 max-w-xs">
        <Input
          placeholder="Cari nama dosen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Memuat data...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-500">Data dosen tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((d) => (
            <DosenCard key={d.nidn} dosen={d} onEdit={openEdit} onDelete={setDeleting} />
          ))}
        </div>
      )}

      {formOpen && (
        <DosenFormModal
          initial={editing}
          existing={dosen}
          onSave={handleSave}
          onClose={() => setFormOpen(false)}
        />
      )}

      {deleting && (
        <Modal title="Konfirmasi Hapus" onClose={() => setDeleting(null)}>
          <p className="text-sm text-gray-700">
            Yakin ingin menghapus <b>{deleting.nama}</b>?
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button
              onClick={() => setDeleting(null)}
              className="rounded-lg bg-gray-500 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600"
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Ya, Hapus
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}