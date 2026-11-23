const pageSizeOptions = [5, 10, 20];

const getPageNumbers = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  pages.push(total);

  return pages;
};

const base = "px-3 py-1 rounded border text-sm";
const activeCls = "bg-blue-600 text-white border-blue-600";
const normalCls = "bg-white text-gray-700 border-gray-300 hover:bg-gray-100";
const disabledCls = "opacity-50 cursor-not-allowed";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  setPage,
  setPageSize,
}) => {
  if (totalItems === 0) return null;

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-4 text-sm text-gray-600">
      <div className="flex items-center gap-3">
        <span>
          Menampilkan {from}-{to} dari {totalItems} data
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt} / halaman
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
          className={`${base} ${normalCls} ${currentPage === 1 ? disabledCls : ""}`}
        >
          Sebelumnya
        </button>

        {getPageNumbers(currentPage, totalPages).map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`${base} ${p === currentPage ? activeCls : normalCls}`}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
          className={`${base} ${normalCls} ${
            currentPage === totalPages ? disabledCls : ""
          }`}
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
};

export default Pagination;