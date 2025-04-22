import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from '@mui/material';
import styles from './SortControls.module.scss';

export type SortOption = {
  value: string;
  label: string;
};

export type SortDirection = 'asc' | 'desc';

export interface SortControlsProps {
  options: SortOption[];
  onSortChange: (field: string, direction: SortDirection) => void;
  selectedOption: string;
  sortDirection: SortDirection;
}

export const SortControls: React.FC<SortControlsProps> = ({
  options,
  onSortChange,
  selectedOption,
  sortDirection,
}) => {
  const handleSortFieldChange = (event: SelectChangeEvent<string>) => {
    onSortChange(event.target.value, sortDirection);
  };

  const handleSortDirectionChange = (event: SelectChangeEvent<SortDirection>) => {
    onSortChange(selectedOption, event.target.value as SortDirection);
  };

  return (
    <Box className={styles.container}>
      <FormControl size="small" className={styles.formControl}>
        <InputLabel id="sort-field-label">Сортировать по</InputLabel>
        <Select
          labelId="sort-field-label"
          id="sort-field"
          value={selectedOption}
          label="Сортировать по"
          onChange={handleSortFieldChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" className={styles.formControl}>
        <InputLabel id="sort-direction-label">Порядок</InputLabel>
        <Select
          labelId="sort-direction-label"
          id="sort-direction"
          value={sortDirection}
          label="Порядок"
          onChange={handleSortDirectionChange}
        >
          <MenuItem value="asc">По возрастанию</MenuItem>
          <MenuItem value="desc">По убыванию</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
