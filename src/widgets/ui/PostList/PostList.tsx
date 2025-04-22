import React from 'react';
import { Grid, Box, Paper, Divider, useTheme } from '@mui/material';
import { PostCard } from '@entities/ui';
import { useGetPostsQuery } from '@shared/api';
import { usePagination } from '@shared/hooks';
import { LoadingState, ErrorState, EmptyState, PaginationControls } from '@shared/ui';
import type { Post } from '@shared/model';
import styles from './PostList.module.scss';

export const PostList: React.FC = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery();
  const theme = useTheme();

  const {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedItems: displayedPosts,
    handlePageChange,
    handleItemsPerPageChange
  } = usePagination<Post>(posts, {
    defaultItemsPerPage: 6,
    totalItems: posts?.length || 0
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (!posts || posts.length === 0) {
    return <EmptyState message="Посты не найдены" />;
  }

  return (
    <Box className={styles.container}>
      <Grid container className={styles.gridContainer}>
        {displayedPosts.map((post) => (
          <div 
            key={post.id}
            className={styles.gridItem}
          >
            <Box className={styles.cardWrapper}>
              <PostCard post={post} />
            </Box>
          </div>
        ))}
      </Grid>
      
      <Divider className={styles.divider} />
      
      <Paper 
        elevation={1} 
        className={styles.paginationContainer}
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </Paper>
    </Box>
  );
}; 