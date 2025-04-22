import { FC, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AnimatePresence } from 'framer-motion';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import styles from './Layout.module.scss';

export const Layout: FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const location = useLocation();

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#1976d2' : '#90caf9',
          },
          secondary: {
            main: mode === 'light' ? '#dc004e' : '#f48fb1',
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#fff' : '#1e1e1e',
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    if (prefersDarkMode) {
      setMode('dark');
    }
  }, [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={styles.container}>
        <AppBar position="static" elevation={2} className={styles.header}>
          <Toolbar className={styles.toolbar}>
            <Typography variant="h6" component="div" className={styles.title}>
              Тестовое задание
            </Typography>
            <IconButton onClick={toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box component="main" className={styles.main}>
          <Container maxWidth="lg" className={styles.content}>
            <AnimatePresence mode="wait">
              <Outlet key={location.pathname} />
            </AnimatePresence>
          </Container>
        </Box>

        <Box
          component="footer"
          className={styles.footer}
          sx={{
            backgroundColor:
              theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
            borderTopColor: theme.palette.divider,
          }}
        >
          <Container maxWidth={false} className={styles.footerContainer}>
            <Typography variant="body2" color="text.secondary" className={styles.footerText}>
              © 2025 Тестовое задание Visum
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
