import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Chip,
  OutlinedInput,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import styles from './FilterControls.module.scss';

export type FilterOption = {
  value: number | string;
  label: string;
};

export interface FilterControlsProps {
  options: FilterOption[];
  selectedValues: (number | string)[];
  onFilterChange: (selectedValues: (number | string)[]) => void;
  label?: string;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  options,
  selectedValues,
  onFilterChange,
  label = 'Фильтр',
}) => {
  const handleChange = (event: SelectChangeEvent<(number | string)[]>) => {
    const {
      target: { value },
    } = event;

    // В MUI передается строка, преобразуем ее обратно в массив
    const newValues = typeof value === 'string' ? value.split(',') : value;

    // Преобразуем все значения в числа, если это возможно
    const processedValues = newValues.map((val) => {
      const numVal = Number(val);
      return !isNaN(numVal) ? numVal : val;
    });

    onFilterChange(processedValues);
  };

  return (
    <Box className={styles.container}>
      <FormControl size="small" className={styles.formControl}>
        <InputLabel id="filter-label">{label}</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as (number | string)[]).map((value) => {
                const option = options.find((opt) => opt.value === value);
                return <Chip key={value} label={option ? option.label : value} size="small" />;
              })}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }}
          startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
