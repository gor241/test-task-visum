import { FC } from 'react';
import { Container, Typography, Paper, Divider } from '@mui/material';
import { PostList } from '@widgets/ui/PostList';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export const PostListPage: FC = () => {
  return (
    <Container maxWidth="lg">
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: (theme) => theme.shape.borderRadius,
          mb: 3,
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <FormatListBulletedIcon color="primary" fontSize="large" />
        <Typography variant="h4" component="h1">
          Список постов
        </Typography>
      </Paper>
      
      <Divider sx={{ mb: 4 }} />
      
      <PostList />
    </Container>
  );
}; 