import React, { useState, useEffect } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { TreeView } from '@material-ui/lab';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CommentItem from './CommentItem';
import NewsApi from '../../api/NewsApi';
import { CommentsTypes } from '../../types/news';

interface CommentProps {
  commentId: string;
}

function CommentList({ commentId }: CommentProps) {
  const [comment, setComment] = useState<CommentsTypes | null>(null);

  useEffect(() => {
    (async () => {
      await getComments(commentId);
    })();
  }, [commentId]);

  const getComments = async (id: string) => {
    return NewsApi.getNewsById(id)
    .then((res: AxiosResponse) => {
      if (res.data.type === "comment") {
        setComment(res.data);
      }
    })
    .catch((err: AxiosError) => {
      console.log(err);
    });
  };

  return (
    <TreeView
      defaultCollapseIcon={
        <ArrowDropDownIcon
          fontSize='large'
          sx={{mr: 2}}
        />
      }
      defaultExpandIcon={
        <ArrowRightIcon
          fontSize='large'
          sx={{mr: 2}}
        />
      }
      multiSelect
      style={{minWidth: '100%'}}
    >
      <CommentItem comment={comment} />
    </TreeView>
  )
}

export default CommentList;
