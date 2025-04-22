import { FC, ChangeEvent } from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SearchBar, SortControls, FilterControls, SortDirection } from '@shared/ui';
import { sortOptions } from './constants';
import styles from '../../PostList.module.scss';

export interface PostFiltersProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  showOnlyFavorites: boolean;
  onFavoritesToggle: (event: ChangeEvent<HTMLInputElement>) => void;
  authorOptions: Array<{ value: number; label: string }>;
  selectedAuthors: number[];
  onFilterChange: (selectedValues: (number | string)[]) => void;
  sortField: string;
  sortDirection: SortDirection;
  onSortChange: (field: string, direction: SortDirection) => void;
}

export const PostFilters: FC<PostFiltersProps> = ({
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
