import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { ITEMS_PER_PAGE_OPTIONS, DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '@shared/constants/pagination';

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
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  handleItemsPerPageChange: (event: SelectChangeEvent) => void;
}

export function usePagination<T>(items: T[] | undefined, options: PaginationOptions): PaginationResult<T> {
  const {
    defaultPage = DEFAULT_PAGE,
    defaultItemsPerPage = DEFAULT_ITEMS_PER_PAGE,
    itemsPerPageOptions = ITEMS_PER_PAGE_OPTIONS,
    totalItems
  } = options;

  const [page, setPage] = useState(defaultPage);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  const totalPages = items ? Math.ceil(items.length / itemsPerPage) : Math.ceil(totalItems / itemsPerPage);
  
  // Убедимся, что текущая страница не превышает общее количество страниц
  if (page > totalPages && totalPages > 0) {
    setPage(totalPages);
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
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

  const paginatedItems = items 
    ? items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];

  return {
    currentPage: page,
    itemsPerPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    handleItemsPerPageChange
  };
} 