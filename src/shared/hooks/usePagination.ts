import { useState, useEffect, ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '@shared/constants/pagination';

export interface PaginationOptions {
  defaultPage?: number;
  defaultItemsPerPage?: number;
  itemsPerPageOptions?: number[];
  totalItems: number;
}

export interface PaginationResult<T> {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  paginatedItems: T[];
  handlePageChange: (event: ChangeEvent<unknown> | undefined, value: number) => void;
  handleItemsPerPageChange: (event: SelectChangeEvent) => void;
}

export function usePagination<T>(
  items: T[] | undefined,
  options: PaginationOptions
): PaginationResult<T> {
  const {
    defaultPage = DEFAULT_PAGE,
    defaultItemsPerPage = DEFAULT_ITEMS_PER_PAGE,
    totalItems,
  } = options;

  const [page, setPage] = useState(defaultPage);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  const totalPages = items
    ? Math.ceil(items.length / itemsPerPage)
    : Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (totalPages > 0) {
      if (page > totalPages) {
        setPage(totalPages);
      }
    } else if (page !== 1) {
      // Если нет страниц, сбрасываем на первую
      setPage(1);
    }
  }, [totalPages, page]);

  const handlePageChange = (_event: React.ChangeEvent<unknown> | undefined, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent) => {
    const newItemsPerPage = parseInt(event.target.value);
    const currentFirstItemIndex = (page - 1) * itemsPerPage;
    const newPage = Math.floor(currentFirstItemIndex / newItemsPerPage) + 1;

    setItemsPerPage(newItemsPerPage);
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items ? items.slice(startIndex, endIndex) : [];

  return {
    currentPage: page,
    itemsPerPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    handleItemsPerPageChange,
  };
}
