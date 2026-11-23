const KelasTable = ({ data, mataKuliah, dosen, onEdit, onDelete, canManage }) => {
  const namaMk = (id) =>
    mataKuliah.find((m) => String(m.id) === String(id))?.nama ?? "-";
  const namaDosen = (id) =>
    dosen.find((d) => String(d.id) === String(id))?.nama ?? "-";

  return (
    <table className="w-full text-left">
      <thead>
        <tr className="bg-blue-800 text-white">
          <th className="px-4 py-3">Kode</th>
          <th className="px-4 py-3">Nama Kelas</th>
          <th className="px-4 py-3">Mata Kuliah</th>
          <th className="px-4 py-3">Dosen</th>
          <th className="px-4 py-3">Hari</th>
          <th className="px-4 py-3">Ruang</th>
          {canManage && <th className="px-4 py-3 text-center">Aksi</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={canManage ? 7 : 6}
              className="px-4 py-6 text-center text-gray-500"
            >
              Belum ada data kelas
            </td>
          </tr>
        ) : (
          data.map((k) => (
            <tr key={k.id} className="odd:bg-white even:bg-gray-100">
              <td className="px-4 py-3">{k.kode}</td>
              <td className="px-4 py-3">{k.nama}</td>
              <td className="px-4 py-3">{namaMk(k.mataKuliahId)}</td>
              <td className="px-4 py-3">{namaDosen(k.dosenId)}</td>
              <td className="px-4 py-3">{k.hari}</td>
              <td className="px-4 py-3">{k.ruang}</td>
              {canManage && (
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(k)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(k.id)}
                      className="bg-red-700 hover:bg-red-800 text-white text-sm px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default KelasTable;