export interface Expense {
  id: string;
  title: string;
  category: string;
  original_amount: string;
  amount_paid: string;
  remaining: number;
  status: string;
  vendor: string;
  description: string;
  created_by: string;
  approved_by: string | null;
  approved_at: string | null;
}

export interface ExpenseFilters {
  perPage?: number;
  page?: number;
  category?: string;
  status?: string;
  proposed_from?: string;
  proposed_to?: string;
  approved?: number;
  building_id?: string;
}

export interface ExpenseSummary {
  total_paid: number;
  total_expect: number;
}
