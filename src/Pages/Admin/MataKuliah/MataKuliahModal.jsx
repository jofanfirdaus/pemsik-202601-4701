const inputClass =
  "w-full border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

const fields = [
  { name: "kode", label: "Kode MK", placeholder: "Masukkan Kode MK", type: "text" },
  { name: "nama", label: "Nama Mata Kuliah", placeholder: "Masukkan Nama Mata Kuliah", type: "text" },
  { name: "sks", label: "SKS", placeholder: "Masukkan SKS", type: "number", min: 1, max: 6 },
  { name: "semester", label: "Semester", placeholder: "Masukkan Semester", type: "number", min: 1, max: 8 },
];

const MataKuliahModal = ({ isOpen, isEdit, form, onChange, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">
            {isEdit ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl">
            ×
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="block text-sm font-semibold mb-1">
                {f.label}
              </label>
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                min={f.min}
                max={f.max}
                value={form[f.name]}
                onChange={onChange}
                placeholder={f.placeholder}
                className={inputClass}
                required
              />
            </div>
          ))}

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

export default MataKuliahModal;