import { useState, useEffect, FC, ChangeEvent } from 'react';
import { Paper, InputBase, IconButton, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  initialValue?: string;
  debounceTime?: number;
}

export const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Поиск...',
  initialValue = '',
  debounceTime = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedTerm, setDebouncedTerm] = useState(initialValue);
  const theme = useTheme();

  // Обновляем поисковый запрос с задержкой для оптимизации
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceTime]);

  useEffect(() => {
    onSearch(debouncedTerm);
  }, [debouncedTerm, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <Paper
      className={styles.searchBar}
      elevation={1}
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <IconButton className={styles.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={styles.input}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'поиск' }}
      />
      {searchTerm && (
        <IconButton className={styles.iconButton} aria-label="clear" onClick={handleClear}>
          <ClearIcon />
        </IconButton>
      )}
    </Paper>
  );
};
