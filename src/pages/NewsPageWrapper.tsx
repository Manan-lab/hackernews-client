import React, { useEffect, useRef, useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { Grid, ListSubheader, Typography } from '@mui/material';
import CachedIcon from '@material-ui/icons/Cached';
import NewsPage from '../components/pages/NewsPage';
import NewsApi from '../api/NewsApi';

const GET_NEWS_INTERVAL = 60000;
function NewsPageWrapper() {
  const [newsIds, setNewsIds]=useState<string[]>([]);
  const [loading, setLoading]=useState<boolean>(false);
  const requestIntervalRef = useRef({intervalId: null} as {intervalId: null | ReturnType<typeof setTimeout>
  });

  useEffect(() => {
    getNews();
  }, []);

  const startGetNewsInterval = () => {
    const intervalId = setInterval(() => {
      getNews();
    }, GET_NEWS_INTERVAL);
    requestIntervalRef.current.intervalId = intervalId;
  };

  useEffect(() => {
    startGetNewsInterval();

    return () => {
      clearInterval(requestIntervalRef.current.intervalId || undefined);
    };
  }, []);

  const getNews = async () => {
    setLoading(true);
    return NewsApi.getNews()
    .then(async (res: AxiosResponse) => {
      const newsIds = res.data.splice(0,100);
      setNewsIds(newsIds);
    })
    .catch((err: AxiosError) => {
      console.log(err);
    })
    .finally(() => setLoading(false));
  };

  const refreshNews = async () => {
    clearInterval(requestIntervalRef.current.intervalId || undefined);
    await getNews();
    startGetNewsInterval();
  };

  return (
    <Grid>
      <ListSubheader sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
        <Grid container alignItems="center" gap={2}>
          <Typography variant='h5'>
            Latest news
          </Typography>
          <CachedIcon
            cursor='pointer'
            onClick={refreshNews}
          />
        </Grid>
      </ListSubheader>
      <NewsPage
        newsIds={newsIds}
        loading={loading}
      />
    </Grid>
  )
}

export default NewsPageWrapper;
