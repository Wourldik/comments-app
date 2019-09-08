import { Comments } from '../models';

export interface IComment {
  comments: Comments;
  id: number;
  text: string;
}
