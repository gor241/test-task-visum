import { FC } from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Typography, 
  Box, 
  Chip
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Post } from '@shared/model';
import styles from './PostCard.module.scss';

interface PostCardProps {
  post: Post;
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <Card 
      elevation={2} 
      className={styles.card}
    >
      <CardContent className={styles.content}>
        <Box className={styles.header}>
          <Chip 
            label={`ID: ${post.id}`} 
            size="small" 
            color="primary" 
            variant="outlined"
            sx={{ alignSelf: 'flex-start' }}
          />
        </Box>
        
        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom
          className={styles.title}
        >
          {post.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          className={styles.body}
        >
          {post.body}
        </Typography>
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
          Просмотр
        </Button>
      </CardActions>
    </Card>
  );
}; 