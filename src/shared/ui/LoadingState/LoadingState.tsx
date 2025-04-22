import { Box, CircularProgress } from '@mui/material';
import styles from './LoadingState.module.scss';

export const LoadingState = () => {
  return (
    <Box className={styles.container}>
      <CircularProgress size={60} />
    </Box>
  );
};
