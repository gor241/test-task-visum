import { FC, memo } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Skeleton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import { Post } from '@shared/model';
import { useFavorites, useToast } from '@shared/hooks';
import { Toast } from '@shared/ui';
import { useGetUserQuery } from '@shared/api';
import styles from './PostCard.module.scss';

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast, autoHideDuration, hideToast, showSuccess } = useToast();
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(post.userId, {
    skip: !post.userId,
  });

  const isPostFavorite = isFavorite(post.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем переход по ссылке при клике
    toggleFavorite(post.id);

    if (!isPostFavorite) {
      showSuccess(`Пост "${post.title.substring(0, 20)}..." добавлен в избранное`);
    } else {
      showSuccess(`Пост удален из избранного`);
    }
  };

  return (
    <>
      <Card elevation={2} className={styles.card}>
        <CardContent className={styles.content}>
          <Box className={styles.header}>
            <Chip
              label={`ID: ${post.id}`}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ alignSelf: 'flex-start' }}
            />
            <Tooltip title={isPostFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}>
              <IconButton
                size="small"
                color="error"
                onClick={handleToggleFavorite}
                className={styles.favoriteButton}
              >
                {isPostFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant="h6" component="h2" gutterBottom className={styles.title}>
            {post.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" className={styles.body}>
            {post.body}
          </Typography>

          <Box className={styles.author}>
            <PersonIcon fontSize="small" color="action" />
            {isUserLoading ? (
              <Skeleton width={100} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                {user?.name || 'Неизвестный автор'}
              </Typography>
            )}
          </Box>
        </CardContent>

        <CardActions className={styles.actions}>
          <Button
            size="small"
            color="primary"
            component={RouterLink}
            to={`/post/${post.id}`}
            variant="contained"
            className={styles.button}
          >
            Читать полностью
          </Button>
        </CardActions>
      </Card>

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        autoHideDuration={autoHideDuration}
        onClose={hideToast}
      />
    </>
  );
};

// Мемоизируем компонент для оптимизации производительности
export const MemoizedPostCard = memo(PostCard);
export { MemoizedPostCard as PostCard };
