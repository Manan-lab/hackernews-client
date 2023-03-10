export type NewsTypes = {
  id: string;
  by: string;
  descendants: number;
  score: number;
  time: string;
  title: string;
  type: string;
  url: string;
  kids?: string[];
}

export type CommentsTypes = {
  by: string;
  id: string;
  kids?: string[];
  parent: string;
  text: string;
  time: string;
  type: string;
}
