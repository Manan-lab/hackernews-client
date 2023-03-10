import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CachedIcon from '@material-ui/icons/Cached';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CircularProgress, Container, Divider, Grid, Typography } from '@mui/material';
import CommentList from '../comment/CommentList';
import { NewsTypes } from '../../types/news';

interface NewsDetailsPageProps {
  news: NewsTypes | null;
  loading: boolean;
  handleRefreshComments: () => void;
}
function NewsDetailsPage({ news, loading, handleRefreshComments }: NewsDetailsPageProps) {
  const navigate = useNavigate();

  return (
    <Container
      fixed
      sx={{ pt: 4 }}
    >
      {
        loading ? (
          <Grid
            sx={{
              pt: 4,
              width: '100%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <>
            {
              news && (
                <Card sx={{p: 2}}>
                  <Grid
                    container
                    alignItems="center"
                    gap={2}
                  >
                    <ArrowBackIcon
                      cursor='pointer'
                      onClick={() => navigate('/news')}
                    />
                    <Typography variant="h5">
                      {news.title}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    sx={{m: 2}}
                  >
                    <a href={news.url} target='_blank'>
                      {news.url}
                    </a>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                  >
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" sx={{pb: 2}}>
                        {moment(news.time).format('ll HH:MM')}
                      </Typography>
                      <Grid container justifyContent="space-between">
                        <Typography variant="body2" color="textSecondary">
                          Author: {news.by}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Rating: {news.score}
                        </Typography>
                      </Grid>
                      <Divider sx={{mt: 4}} />
                      <Grid container>
                        <Grid item sx={{p: 2}}>
                          <Typography variant="inherit" color="blue">
                            Comments ({news.kids ? news.kids.length : 0})
                          </Typography>
                        </Grid>
                        <Grid item sx={{p: 2}}>
                          <CachedIcon
                            fontSize='small'
                            cursor='pointer'
                            onClick={handleRefreshComments}
                          />
                        </Grid>
                      </Grid>
                      {
                        news?.kids?.map(item => (
                          <Fragment key={item}>
                            <CommentList
                              commentId={item}
                            />
                          </Fragment>
                        ))
                      }
                    </CardContent>
                  </Grid>
                </Card>
              )
            }
          </>
        )
      }
    </Container>
  )
}

export default NewsDetailsPage;
