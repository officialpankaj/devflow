export interface ITag {
  _id: string;
  name: string;
}

export interface IAuthor {
  _id: string;
  name: string;
  image: string;
}

export interface IQuestion {
  _id: string;
  title: string;
  description: string;
  tags: ITag[];
  author: IAuthor;
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
}
