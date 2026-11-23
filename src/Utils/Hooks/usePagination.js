import { useMemo, useState } from "react";

export const usePagination = (data = [], initialPageSize = 5) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const totalItems = data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // kalau data berkurang (misalnya hapus item terakhir di halaman terakhir),
  // halaman otomatis mundur ke halaman yang masih ada
  const currentPage = Math.min(page, totalPages);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  const setPageSize = (size) => {
    setPageSizeState(Number(size));
    setPage(1);
  };

  return {
    pageData,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    setPage,
    setPageSize,
  };
};