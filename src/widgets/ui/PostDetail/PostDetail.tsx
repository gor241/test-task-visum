import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Divider, 
  Paper,
  Avatar,
  Chip,
  Skeleton,
  useTheme
} from '@mui/material';
import { useGetPostQuery, useGetUserQuery } from '@shared/api';
import { LoadingState, ErrorState, EmptyState } from '@shared/ui';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './PostDetail.module.scss';

interface PostDetailProps {
  postId: number;
}

export const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const theme = useTheme();
  const { data: post, isLoading: isPostLoading, error: postError } = useGetPostQuery(postId);
  const { data: user, isLoading: isUserLoading, error: userError } = useGetUserQuery(post?.userId || 0, {
    skip: !post?.userId,
  });

  if (isPostLoading) {
    return <LoadingState />;
  }

  if (postError || userError) {
    return <ErrorState />;
  }

  if (!post) {
    return <EmptyState message="Пост не найден" />;
  }

  return (
    <Card 
      elevation={3}
      className={styles.card}
    >
      <CardContent className={styles.content}>
        <Box className={styles.header}>
          <Chip 
            label={`ID: ${post.id}`} 
            color="primary"
            size="small"
          />
        </Box>

        <Typography 
          variant="h5" 
          component="h1" 
          gutterBottom 
          className={styles.title}
        >
          {post.title}
        </Typography>
        
        <Typography 
          variant="body1" 
          className={styles.body}
          sx={{ color: theme.palette.text.primary }}
        >
          {post.body}
        </Typography>
        
        <Divider className={styles.divider} />
        
        {isUserLoading ? (
          <Box className={styles.loadingContainer}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ width: '100%' }}>
              <Skeleton variant="text" height={24} width="40%" />
              <Skeleton variant="text" height={20} width="60%" />
            </Box>
          </Box>
        ) : user ? (
          <Paper 
            elevation={1} 
            className={styles.authorContainer}
            sx={{ 
              backgroundColor: theme.palette.mode === 'dark' 
                ? theme.palette.background.default 
                : theme.palette.grey[50],
            }}
          >
            <Box className={styles.authorInfo}>
              <Box>
                <Avatar 
                  className={styles.avatar}
                  sx={{ bgcolor: theme.palette.primary.main }}
                >
                  <AccountCircleIcon fontSize="large" />
                </Avatar>
              </Box>
              <Box className={styles.authorContent}>
                <Typography variant="h6" gutterBottom>
                  <Box component="span" className={styles.authorName}>
                    <PersonIcon fontSize="small" />
                    {user.name}
                  </Box>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Box component="span" className={styles.authorEmail}>
                    <EmailIcon fontSize="small" />
                    {user.email}
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Paper>
        ) : null}
      </CardContent>
    </Card>
  );
}; 