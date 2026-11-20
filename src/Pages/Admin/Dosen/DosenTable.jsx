const DosenTable = ({ data, onEdit, onDelete, canManage }) => {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="bg-blue-800 text-white">
          <th className="px-4 py-3">NIDN</th>
          <th className="px-4 py-3">Nama</th>
          <th className="px-4 py-3">Email</th>
          {canManage && <th className="px-4 py-3 text-center">Aksi</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={canManage ? 4 : 3} className="px-4 py-6 text-center text-gray-500">
              Belum ada data dosen
            </td>
          </tr>
        ) : (
          data.map((d) => (
            <tr key={d.id} className="odd:bg-white even:bg-gray-100">
              <td className="px-4 py-3">{d.nidn}</td>
              <td className="px-4 py-3">{d.nama}</td>
              <td className="px-4 py-3">{d.email}</td>
              {canManage && (
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(d)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(d.id)}
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

export default DosenTable;