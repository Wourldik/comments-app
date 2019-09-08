import { ICommentBackend } from '../../../pages/comments/interfaces';

export const commentsMock: ReadonlyArray<ICommentBackend> = [
  {
    id: 1,
    text: 'comment 1.1',
    comments: [
      {
        id: 11,
        text: 'comment 2.1',
        comments: [],
      },
    ],
  },
  {
    id: 2,
    text: 'comment 1.2',
    comments: [
      {
        id: 22,
        text: 'comment 2.2',
        comments: [
          {
            id: 23,
            text: 'comment 3.1',
            comments: [
              {
                id: 24,
                text: 'comment 4.1',
                comments: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    text: 'comment 1.3',
    comments: [
      {
        id: 31,
        text: 'comment 2.3',
        comments: [],
      },
    ],
  },
];
