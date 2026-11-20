const MataKuliahTable = ({ data, onEdit, onDelete, canManage }) => {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="bg-blue-800 text-white">
          <th className="px-4 py-3">Kode</th>
          <th className="px-4 py-3">Nama</th>
          <th className="px-4 py-3">SKS</th>
          <th className="px-4 py-3">Semester</th>
          {canManage && <th className="px-4 py-3 text-center">Aksi</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={canManage ? 5 : 4}
              className="px-4 py-6 text-center text-gray-500"
            >
              Belum ada data mata kuliah
            </td>
          </tr>
        ) : (
          data.map((mk) => (
            <tr key={mk.id} className="odd:bg-white even:bg-gray-100">
              <td className="px-4 py-3">{mk.kode}</td>
              <td className="px-4 py-3">{mk.nama}</td>
              <td className="px-4 py-3">{mk.sks}</td>
              <td className="px-4 py-3">{mk.semester}</td>
              {canManage && (
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(mk)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(mk.id)}
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

export default MataKuliahTable;