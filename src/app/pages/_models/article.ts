export interface Article {
  id: number;
  date_deposit: string;
  description: string;
  size: string;
  price: string;
  amount_by_client: string;
  amount_to_client?: string;
  boutique_commission: string;
  status: string;
  article_type: {
    name: string;
  };
  client: {
    first_name: string;
    last_name: string;
    image_user: string;
  };
}

export class ArticleTypeApiModel {
  items?: Article[];
  count!:number;
  total!:number;
}
