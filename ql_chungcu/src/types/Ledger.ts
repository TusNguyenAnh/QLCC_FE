export type Ledger = {
  id: string;
  type: "revenue" | "expense";
  related_id: string;
  amount: string;
  final_amount: number;
  transaction_date: string;
  payment_method: "cash" | "bank_transfer";
  description: string;
  voucher_number: string;
  fund_type: string;
  building_id: string;
  payer_name: string;
  receiver_name: string;
  contact_info: string;
  bank_transaction_id: string | null;
  bank_name: string | null;
  bank_account: string | null;
  created_by: string;
  balance: number;
};

export type LedgerFilters = {
  perPage?: string | number;
  page?: number;
  building_id?: string;
  payment_method?: string;
  trans_from?: string;
  trans_to?: string;
};

export type LedgerListResponse = {
  message: string;
  data: Ledger[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
};
