import { Paper, Typography, Box } from '@mui/material';
import styles from './ErrorState.module.scss';
import { FC } from 'react';

interface ErrorStateProps {
  message?: string;
}

export const ErrorState: FC<ErrorStateProps> = ({ message = 'Ошибка загрузки данных' }) => {
  return (
    <Paper elevation={2} className={styles.container}>
      <Box className={styles.content}>
        <Typography variant="h6" color="error">
          {message}
        </Typography>
      </Box>
    </Paper>
  );
};
