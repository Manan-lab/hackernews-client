import React, { useEffect, useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { Params, useParams } from 'react-router-dom';
import NewsDetailsPage from '../components/pages/NewsDetailsPage';
import NewsApi from '../api/NewsApi';
import { NewsTypes } from '../types/news';

function NewsDetailsPageWrapper() {
  const { id } = useParams<Params>();

  const [newsDetails, setNewsDetails] = useState<NewsTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await getNews();
    })();
  }, []);

  const getNews = async () => {
    if (id) {
      await getNewsById(id);
    }
  };

  const getNewsById = async (newsId: string) => {
    setLoading(true);
    return NewsApi.getNewsById(newsId)
    .then((res: AxiosResponse) => {
      setNewsDetails(res.data);
    })
    .catch((err: AxiosError) => {
      console.log(err);
    })
    .finally(() => setLoading(false));
  };

  return (
    <NewsDetailsPage
      news={newsDetails}
      loading={loading}
      handleRefreshComments={getNews}
    />
  )
}

export default NewsDetailsPageWrapper;
