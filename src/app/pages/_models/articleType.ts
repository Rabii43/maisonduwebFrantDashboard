

export interface ArticleType {
  id: number;
  name: string;
}

export class ArticleTypeApiModel {
  items?: ArticleType[];
  count!:number;
  total!:number;
}
