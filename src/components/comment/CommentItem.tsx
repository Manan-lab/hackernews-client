import React, { Fragment } from 'react';
import { Grid } from '@mui/material';
import { TreeItem } from '@material-ui/lab';
import CommentList from './CommentList';
import { CommentsTypes } from '../../types/news';

interface CommentProps {
  comment: CommentsTypes | null;
}

function CommentItem({ comment }: CommentProps) {
  return (
    <TreeItem
      style={{minWidth: '100%'}}
      nodeId={`${comment ? comment.id : ''}`}
      label={
        comment ? (
          <Grid
            sx={{
              minWidth: '100%',
              borderTop: '1px solid #bea9a966',
              p: 2,
              mb: 1
            }}
            dangerouslySetInnerHTML={{__html: comment.text}}
          />
        ) : ''
      }
    >
      {
        comment?.kids?.map(item => (
          <Fragment key={item}>
            <CommentList commentId={item} />
          </Fragment>
        ))
      }
    </TreeItem>
  )
}

export default CommentItem;
