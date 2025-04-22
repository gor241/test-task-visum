import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Divider, Paper } from '@mui/material';
import { PostDetail } from '@widgets/ui/PostDetail';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArticleIcon from '@mui/icons-material/Article';

export const PostDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="lg">
      <Button 
        variant="outlined" 
        onClick={handleBack}
        sx={{ mb: 3 }}
        startIcon={<ArrowBackIcon />}
      >
        Назад к списку
      </Button>
      
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
        <ArticleIcon color="primary" fontSize="large" />
        <Typography variant="h4" component="h1">
          Детали поста #{id}
        </Typography>
      </Paper>
      
      <Divider sx={{ mb: 4 }} />
      
      {id && <PostDetail postId={parseInt(id)} />}
    </Container>
  );
}; 