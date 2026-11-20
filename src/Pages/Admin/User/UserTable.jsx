const roleColor = {
  admin: "bg-red-100 text-red-700",
  dosen: "bg-green-100 text-green-700",
  mahasiswa: "bg-blue-100 text-blue-700",
};

const UserTable = ({ data, onEdit }) => {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="bg-blue-800 text-white">
          <th className="px-4 py-3">Nama</th>
          <th className="px-4 py-3">Email</th>
          <th className="px-4 py-3">Role</th>
          <th className="px-4 py-3">Permission</th>
          <th className="px-4 py-3 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
              Belum ada pengguna
            </td>
          </tr>
        ) : (
          data.map((u) => (
            <tr key={u.id} className="odd:bg-white even:bg-gray-100">
              <td className="px-4 py-3">{u.nama}</td>
              <td className="px-4 py-3">{u.email}</td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${roleColor[u.role] || "bg-gray-200"}`}>
                  {u.role || "-"}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {u.permissions?.length || 0} permission
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onEdit(u)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-1 rounded"
                >
                  Atur Akses
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default UserTable;