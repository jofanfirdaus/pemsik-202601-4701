const inputClass =
  "w-full border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

const DosenModal = ({ isOpen, isEdit, form, onChange, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">
            {isEdit ? "Edit Dosen" : "Tambah Dosen"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl">
            ×
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="nidn" className="block text-sm font-semibold mb-1">NIDN</label>
            <input
              id="nidn"
              name="nidn"
              value={form.nidn}
              onChange={onChange}
              placeholder="Masukkan NIDN"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="nama" className="block text-sm font-semibold mb-1">Nama</label>
            <input
              id="nama"
              name="nama"
              value={form.nama}
              onChange={onChange}
              placeholder="Masukkan Nama"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Masukkan Email"
              className={inputClass}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DosenModal;