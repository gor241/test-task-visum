import { FC } from 'react';
import { Grid, Box } from '@mui/material';
import { PostCard } from '@entities/ui';
import type { Post } from '@shared/model';
import styles from '../../PostList.module.scss';

export interface PostGridProps {
  posts: Post[];
  currentPage: number;
  itemsPerPage: number;
}

export const PostGrid: FC<PostGridProps> = ({ posts, currentPage, itemsPerPage }) => (
  <Grid container className={styles.gridContainer} key={`page-${currentPage}-${itemsPerPage}`}>
    {posts.map((post) => (
      <div key={post.id} className={styles.gridItem}>
        <Box className={styles.cardWrapper}>
          <PostCard post={post} />
        </Box>
      </div>
    ))}
  </Grid>
);
