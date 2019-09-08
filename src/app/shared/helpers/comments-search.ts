import { Comments } from '../../pages/comments/models';

export function search(
  comments: Comments | null,
  value: string
): Comments | null {
  if (!comments) {
    return null;
  }

  const searchResults: Comments = [];

  comments.forEach(function f(comment) {
    if (comment.text.includes(value)) {
      searchResults.push({
        text: comment.text,
        id: comment.id,
        comments: [],
      });
    }

    comment.comments.forEach(f);
  });

  return searchResults;
}
