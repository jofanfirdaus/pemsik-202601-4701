import { useState } from 'react'
import Modal from '@/components/Modal'
import Label from '@/components/Label'
import Input from '@/components/Input'

export default function DosenFormModal({ initial, existing, onSave, onClose }) {
  const isEdit = Boolean(initial)
  const [form, setForm] = useState(
    initial ?? { nidn: '', nama: '', mataKuliah: '', status: 'Aktif' }
  )
  const [error, setError] = useState('')

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!/^\d{10}$/.test(form.nidn)) {
      return setError('NIDN harus 10 digit angka!')
    }
    if (!isEdit && existing.some((d) => d.nidn === form.nidn)) {
      return setError('NIDN sudah terdaftar!')
    }
    if (!form.nama.trim() || !form.mataKuliah.trim()) {
      return setError('Nama dan mata kuliah wajib diisi!')
    }
    onSave({ ...form, nama: form.nama.trim(), mataKuliah: form.mataKuliah.trim() })
  }

  return (
    <Modal title={isEdit ? 'Edit Dosen' : 'Tambah Dosen'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-100 px-3 py-2 text-xs text-red-600">{error}</div>
        )}

        <div>
          <Label htmlFor="nidn">NIDN</Label>
          <Input
            id="nidn"
            name="nidn"
            value={form.nidn}
            onChange={change}
            readOnly={isEdit}
            maxLength={10}
            placeholder="Masukkan 10 digit NIDN"
            className={isEdit ? 'bg-gray-100 text-gray-500' : ''}
          />
        </div>
        <div>
          <Label htmlFor="nama">Nama</Label>
          <Input id="nama" name="nama" value={form.nama} onChange={change} placeholder="Masukkan nama" />
        </div>
        <div>
          <Label htmlFor="mataKuliah">Mata Kuliah</Label>
          <Input
            id="mataKuliah"
            name="mataKuliah"
            value={form.mataKuliah}
            onChange={change}
            placeholder="Masukkan mata kuliah"
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={change}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="Aktif">Aktif</option>
            <option value="Cuti">Cuti</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-lg bg-gray-500 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600">
            Batal
          </button>
          <button type="submit" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
            Simpan
          </button>
        </div>
      </form>
    </Modal>
  )
}