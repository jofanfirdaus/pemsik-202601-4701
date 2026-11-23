const inputClass =
  "w-full border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const KelasModal = ({
  isOpen,
  isEdit,
  form,
  mataKuliah,
  dosen,
  onChange,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">
            {isEdit ? "Edit Kelas" : "Tambah Kelas"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl">
            ×
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="kode" className="block text-sm font-semibold mb-1">Kode Kelas</label>
            <input id="kode" name="kode" value={form.kode} onChange={onChange}
              placeholder="Masukkan Kode Kelas" className={inputClass} required />
          </div>

          <div>
            <label htmlFor="nama" className="block text-sm font-semibold mb-1">Nama Kelas</label>
            <input id="nama" name="nama" value={form.nama} onChange={onChange}
              placeholder="Masukkan Nama Kelas" className={inputClass} required />
          </div>

          <div>
            <label htmlFor="mataKuliahId" className="block text-sm font-semibold mb-1">Mata Kuliah</label>
            <select id="mataKuliahId" name="mataKuliahId" value={form.mataKuliahId}
              onChange={onChange} className={inputClass} required>
              <option value="">-- Pilih Mata Kuliah --</option>
              {mataKuliah.map((m) => (
                <option key={m.id} value={m.id}>{m.kode} - {m.nama}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dosenId" className="block text-sm font-semibold mb-1">Dosen Pengampu</label>
            <select id="dosenId" name="dosenId" value={form.dosenId}
              onChange={onChange} className={inputClass} required>
              <option value="">-- Pilih Dosen --</option>
              {dosen.map((d) => (
                <option key={d.id} value={d.id}>{d.nama}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="hari" className="block text-sm font-semibold mb-1">Hari</label>
            <select id="hari" name="hari" value={form.hari}
              onChange={onChange} className={inputClass} required>
              <option value="">-- Pilih Hari --</option>
              {hariList.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="ruang" className="block text-sm font-semibold mb-1">Ruang</label>
            <input id="ruang" name="ruang" value={form.ruang} onChange={onChange}
              placeholder="Contoh: H.3.2" className={inputClass} required />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg">
              Batal
            </button>
            <button type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KelasModal;