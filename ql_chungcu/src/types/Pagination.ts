export type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type PaginationLinks = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};

export type PaginatedResponse<T> = {
  message: string;
  data: {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    from: number;
    to: number;
    path: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
};
