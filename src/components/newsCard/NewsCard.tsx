import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {Grid} from '@mui/material';
import {AxiosError, AxiosResponse} from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NewsLoader from '../newsLoader/NewsLoader';
import NewsApi from '../../api/NewsApi';
import { NewsTypes } from '../../types/news';


interface NewsCardProps {
  newsId: string;
}

function NewsCard({ newsId }: NewsCardProps) {
  const [news, setNews] = useState<NewsTypes | null>(null);

  useEffect(() => {
    (async () => {
      await getNewsById(newsId);
    })();
  }, []);

  const getNewsById = async (newsId: string) => {
    return NewsApi.getNewsById(newsId)
    .then((res: AxiosResponse) => {
      setNews(res.data);
    })
    .catch((err: AxiosError) => {
      console.log(err);
    });
  };


  return (
    <Card sx={{ width: 300 }}>
      {
        news ? (
          <>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  height: '100px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  lineClamp: 3,
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {news.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                {moment(new Date(news.time)).format('ll HH:MM')}
              </Typography>
              <Grid container justifyContent="space-between">
                <Typography variant="body2" color="textSecondary">
                  Author: {news.by}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Rating: {news.score}
                </Typography>
              </Grid>
            </CardContent>
            <CardActions>
              <Link to={`/news/${news.id}`}>
                <Button size="small">Show More</Button>
              </Link>
            </CardActions>
          </>
        ) : (
          <NewsLoader />
        )
      }
    </Card>
  );
}

export default NewsCard;
