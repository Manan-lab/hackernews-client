import React from 'react';
import { CircularProgress, Grid } from '@mui/material';
import NewsCard from '../newsCard/NewsCard';

interface NewsPageProps {
  newsIds: string[];
  loading: boolean;
}
function NewsPage({ newsIds, loading }: NewsPageProps) {
  return (
    <Grid
      container
      spacing={1}
      gap={5}
      sx={{p: 6}}
      justifyContent='center'
      alignItems='center'
      minHeight='calc(100vh - 32px)'
    >
      {
        loading ? (
          <CircularProgress />
        ) : (
          <>
            {
              newsIds.map(newsId => (
                <Grid item key={newsId}>
                  <NewsCard
                    newsId={newsId}
                  />
                </Grid>
              ))
            }
          </>
        )
      }
    </Grid>
  )
}

export default NewsPage;
