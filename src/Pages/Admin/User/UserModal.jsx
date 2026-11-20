import { PERMISSIONS, ROLES } from "@/Utils/permissions";

const UserModal = ({ user, role, permissions, onRoleChange, onToggle, onClose, onSubmit }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Atur Akses: {user.nama}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl">×</button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="role" className="block text-sm font-semibold mb-1">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => onRoleChange(e.target.value)}
              className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(ROLES).map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="block text-sm font-semibold mb-2">Permission</p>
            <div className="space-y-2">
              {PERMISSIONS.map((p) => (
                <label key={p.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions.includes(p.key)}
                    onChange={() => onToggle(p.key)}
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg">
              Batal
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;