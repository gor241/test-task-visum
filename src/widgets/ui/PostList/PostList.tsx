import React, { useState, useMemo, useCallback } from 'react';
import {
  Grid,
  Box,
  Paper,
  Divider,
  useTheme,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { PostCard } from '@entities/ui';
import { useGetPostsQuery, useGetUsersQuery } from '@shared/api';
import { usePagination, useFavorites } from '@shared/hooks';
import {
  LoadingState,
  ErrorState,
  EmptyState,
  PaginationControls,
  SearchBar,
  SortControls,
  SortDirection,
  FilterControls,
} from '@shared/ui';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { Post, User } from '@shared/model';
import styles from './PostList.module.scss';

// Вынесенные константы для чистоты кода
const sortOptions = [
  { value: 'id', label: 'ID' },
  { value: 'title', label: 'Заголовок' },
  { value: 'userId', label: 'Автор' },
];

// Типы для вынесенных компонентов
interface PostFiltersProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  showOnlyFavorites: boolean;
  onFavoritesToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  authorOptions: Array<{ value: number; label: string }>;
  selectedAuthors: number[];
  onFilterChange: (selectedValues: (number | string)[]) => void;
  sortField: string;
  sortDirection: SortDirection;
  onSortChange: (field: string, direction: SortDirection) => void;
}

interface PostGridProps {
  posts: Post[];
  currentPage: number;
  itemsPerPage: number;
}

// Выносим компонент фильтрации для уменьшения размера основного компонента
// и следования принципу единой ответственности
const PostFilters: React.FC<PostFiltersProps> = ({
  searchTerm,
  onSearch,
  showOnlyFavorites,
  onFavoritesToggle,
  authorOptions,
  selectedAuthors,
  onFilterChange,
  sortField,
  sortDirection,
  onSortChange,
}) => (
  <Box className={styles.toolbarContainer}>
    <Box className={styles.searchContainer}>
      <SearchBar onSearch={onSearch} placeholder="Поиск по заголовку или содержанию..." />
      <FormControlLabel
        control={
          <Switch
            checked={showOnlyFavorites}
            onChange={onFavoritesToggle}
            color="error"
            icon={<FavoriteIcon />}
          />
        }
        label="Только избранное"
        className={styles.favoritesToggle}
      />
    </Box>
    <Box className={styles.filtersContainer}>
      <Box className={styles.filterItem}>
        <FilterControls
          options={authorOptions}
          selectedValues={selectedAuthors}
          onFilterChange={onFilterChange}
          label="Авторы"
        />
      </Box>
      <Box className={styles.filterItem}>
        <SortControls
          options={sortOptions}
          onSortChange={onSortChange}
          selectedOption={sortField}
          sortDirection={sortDirection}
        />
      </Box>
    </Box>
  </Box>
);

// Выносим компонент грида постов
const PostGrid: React.FC<PostGridProps> = ({ posts, currentPage, itemsPerPage }) => (
  <Grid container className={styles.gridContainer} key={`page-${currentPage}-${itemsPerPage}`}>
    {posts.map((post) => (
      <div key={post.id} className={styles.gridItem}>
        <Box className={styles.cardWrapper}>
          <PostCard post={post} />
        </Box>
      </div>
    ))}
  </Grid>
);

export const PostList = () => {
  const { data: posts, isLoading: isPostsLoading, error: postsError } = useGetPostsQuery();
  const { data: users, isLoading: isUsersLoading, error: usersError } = useGetUsersQuery();
  const { favorites } = useFavorites();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Создаем опции для фильтра авторов
  const authorOptions = useMemo(() => {
    if (!users) return [];
    return users.map((user: User) => ({
      value: user.id,
      label: user.name,
    }));
  }, [users]);

  // Мемоизированная функция фильтрации постов
  const getFilteredPosts = useCallback(
    (allPosts: Post[] | undefined) => {
      if (!allPosts) return [];

      return allPosts.filter((post) => {
        // Фильтрация по избранному
        if (showOnlyFavorites && !favorites.includes(post.id)) {
          return false;
        }

        // Фильтрация по тексту
        if (
          searchTerm.trim() &&
          !post.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) &&
          !post.body.toLowerCase().includes(searchTerm.toLowerCase().trim())
        ) {
          return false;
        }

        // Фильтрация по авторам
        if (selectedAuthors.length > 0 && !selectedAuthors.includes(post.userId)) {
          return false;
        }

        return true;
      });
    },
    [searchTerm, selectedAuthors, favorites, showOnlyFavorites]
  );

  // Фильтрация постов
  const filteredPosts = useMemo(() => getFilteredPosts(posts), [posts, getFilteredPosts]);

  // Сортировка отфильтрованных постов
  const sortedPosts = useMemo(() => {
    if (!filteredPosts.length) return [];

    return [...filteredPosts].sort((a, b) => {
      const aValue = a[sortField as keyof Post];
      const bValue = b[sortField as keyof Post];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        // Для числовых значений (id, userId)
        return sortDirection === 'asc'
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }
    });
  }, [filteredPosts, sortField, sortDirection]);

  const { currentPage, itemsPerPage, totalPages, handlePageChange, handleItemsPerPageChange } =
    usePagination<Post>(sortedPosts, {
      defaultItemsPerPage: 6,
      totalItems: sortedPosts?.length || 0,
    });

  // Вычисляем отображаемые посты
  const displayedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedPosts, currentPage, itemsPerPage]);

  // Обработчики событий с использованием useCallback
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    // Сброс страницы при изменении поискового запроса делается внутри хука usePagination
  }, []);

  const handleSortChange = useCallback((field: string, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
  }, []);

  const handleFilterChange = useCallback((selectedValues: (number | string)[]) => {
    setSelectedAuthors(selectedValues as number[]);
  }, []);

  const handleFavoritesToggle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setShowOnlyFavorites(event.target.checked);
  }, []);

  // Обработка состояний загрузки и ошибок
  const isLoading = isPostsLoading || isUsersLoading;
  const error = postsError || usersError;

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (!posts || posts.length === 0) {
    return <EmptyState message="Посты не найдены" />;
  }

  // Сообщение при отсутствии результатов фильтрации
  const emptyFilterMessage = showOnlyFavorites
    ? 'У вас пока нет избранных постов'
    : 'Ничего не найдено по указанным критериям';

  return (
    <Box className={styles.container}>
      <PostFilters
        searchTerm={searchTerm}
        onSearch={handleSearch}
        showOnlyFavorites={showOnlyFavorites}
        onFavoritesToggle={handleFavoritesToggle}
        authorOptions={authorOptions}
        selectedAuthors={selectedAuthors}
        onFilterChange={handleFilterChange}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />

      {filteredPosts.length === 0 ? (
        <EmptyState message={emptyFilterMessage} />
      ) : (
        <>
          <Box className={styles.resultsInfo}>
            <Typography variant="body2" color="text.secondary">
              Показано {displayedPosts.length} из {filteredPosts.length} постов
              {showOnlyFavorites && ' (только избранное)'}
            </Typography>
          </Box>

          <PostGrid posts={displayedPosts} currentPage={currentPage} itemsPerPage={itemsPerPage} />

          <Divider className={styles.divider} />

          <Paper
            elevation={1}
            className={styles.paginationContainer}
            sx={{ backgroundColor: theme.palette.background.paper }}
          >
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </Paper>
        </>
      )}
    </Box>
  );
};
