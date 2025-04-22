import { FC, useEffect } from 'react';
import { Container, Typography, Paper, Divider, useMediaQuery, useTheme } from '@mui/material';
import { PostList } from '@widgets/ui/PostList';
import { PageTransition } from '@shared/ui';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export const PostListPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Прокручиваем страницу вверх при загрузке
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            borderRadius: (theme) => theme.shape.borderRadius,
            mb: 3,
            p: isMobile ? 2 : 3,
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? 1 : 2,
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <FormatListBulletedIcon color="primary" fontSize={isMobile ? 'medium' : 'large'} />
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h1"
            align={isMobile ? 'center' : 'left'}
          >
            Список постов
          </Typography>
        </Paper>

        <Divider sx={{ mb: isMobile ? 2 : 4 }} />

        <PostList />
      </Container>
    </PageTransition>
  );
};
