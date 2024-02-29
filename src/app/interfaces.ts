export interface Quote {
    _id: string;
    name: string;
    quoteCount?: number;
    author: string;
    content: string;
    tags?: [];
    authorSlug?: string;
    length?: number;
    dateAdded?: string,
    dateModified?: string
    icon?: boolean;
  }
  
export  interface QuoteData {
    [key: string]: Quote;
  }