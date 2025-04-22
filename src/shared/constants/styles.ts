import { Theme } from '@mui/material';

export const CARD_HOVER_EFFECT = (theme: Theme) => ({
  transform: 'translateY(-4px)',
  boxShadow: theme.shadows[4],
});

export const CARD_TRANSITION = 'transform 0.2s, box-shadow 0.2s';

export const TEXT_ELLIPSIS = {
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
};

export const TITLE_ELLIPSIS = {
  ...TEXT_ELLIPSIS,
  WebkitLineClamp: 2,
  height: '60px',
};

export const BODY_ELLIPSIS = {
  ...TEXT_ELLIPSIS,
  WebkitLineClamp: 3,
  height: '72px',
};
