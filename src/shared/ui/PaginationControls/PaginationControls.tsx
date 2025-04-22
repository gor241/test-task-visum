import { ChangeEvent, FC } from 'react';
import {
  Box,
  Typography,
  Pagination,
  Stack,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ITEMS_PER_PAGE_OPTIONS } from '@shared/constants';
import styles from './PaginationControls.module.scss';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  itemsPerPageOptions?: number[];
  onPageChange: (event: ChangeEvent<unknown> | undefined, page: number) => void;
  onItemsPerPageChange: (event: SelectChangeEvent) => void;
}

export const PaginationControls: FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  itemsPerPageOptions = ITEMS_PER_PAGE_OPTIONS,
  onPageChange,
  onItemsPerPageChange
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Stack 
      spacing={2} 
      justifyContent="center" 
      alignItems="center" 
      direction={isSmallScreen ? 'column' : 'row'}
      className={styles.container}
    >
      <Box className={styles.controlsGroup}>
        <Typography 
          variant="body2" 
          sx={{ color: theme.palette.text.secondary }}
        >
          Показывать по:
        </Typography>
        <FormControl size="small" variant="outlined" sx={{ minWidth: 90 }}>
          <Select
            value={itemsPerPage.toString()}
            onChange={onItemsPerPageChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Элементов на странице' }}
            sx={{ '& .MuiSelect-select': { py: 0.5 } }}
          >
            {itemsPerPageOptions.map((option) => (
              <MenuItem key={option} value={option.toString()}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <Pagination 
        count={totalPages} 
        page={currentPage} 
        onChange={onPageChange} 
        color="primary"
        size={isSmallScreen ? "small" : "medium"}
        showFirstButton 
        showLastButton
      />
      
      <Typography 
        variant="body2" 
        sx={{ color: theme.palette.text.secondary }}
      >
        Страница {currentPage} из {totalPages}
      </Typography>
    </Stack>
  );
}; 