import { Paper, Typography, Box } from '@mui/material';
import styles from './EmptyState.module.scss';
import { FC } from 'react';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: FC<EmptyStateProps> = ({ 
  message = 'Нет данных'
}) => {
  return (
    <Paper elevation={2} className={styles.container}>
      <Box className={styles.content}>
        <Typography variant="h6">
          {message}
        </Typography>
      </Box>
    </Paper>
  );
}; 