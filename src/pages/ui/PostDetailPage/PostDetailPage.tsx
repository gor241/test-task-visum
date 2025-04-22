import { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Divider,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { PostDetail } from '@widgets/ui/PostDetail';
import { PageTransition } from '@shared/ui';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArticleIcon from '@mui/icons-material/Article';

export const PostDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBack = () => {
    navigate(-1);
  };

  // Прокручиваем страницу вверх при загрузке
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Container maxWidth="lg">
        <Button
          variant="outlined"
          onClick={handleBack}
          sx={{ mb: 3 }}
          startIcon={<ArrowBackIcon />}
          size={isMobile ? 'small' : 'medium'}
          fullWidth={isMobile}
        >
          Назад к списку
        </Button>

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
          <ArticleIcon color="primary" fontSize={isMobile ? 'medium' : 'large'} />
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h1"
            align={isMobile ? 'center' : 'left'}
          >
            Детали поста #{id}
          </Typography>
        </Paper>

        <Divider sx={{ mb: isMobile ? 2 : 4 }} />

        {id && <PostDetail postId={parseInt(id)} />}
      </Container>
    </PageTransition>
  );
};
