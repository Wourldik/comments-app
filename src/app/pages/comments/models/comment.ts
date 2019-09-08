import { IComment, ICommentBackend } from '../interfaces';

export class Comment implements IComment {
  static fromBackendFactory(obj: Readonly<ICommentBackend>): Comment {
    return new Comment({
      text: obj.text,
      comments: obj.comments.map(comment =>
        Comment.fromBackendFactory(comment)
      ),
      id: obj.id,
    });
  }

  comments: Comments;
  id: number;
  text: string;

  constructor(obj: Readonly<IComment>) {
    this.text = obj.text;
    this.comments = obj.comments;
    this.id = obj.id;
  }
}

export type Comments = Comment[];
