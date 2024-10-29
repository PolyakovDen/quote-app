export interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
}

export interface QuoteHistory {
  quotes: Quote[];
}
