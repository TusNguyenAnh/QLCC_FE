export type FinancialModel = {
  id: string;
  model_name: string;
  model_code: string;
  description: string;
  building_id: string;
  model_type: "revenue" | "expense" | "mixed";
  status: "active" | "inactive" | "draft";
  created_at: string;
  updated_at: string;
  created_by: string;
};

export type FinancialModelItem = {
  id: string;
  model_id: string;
  item_name: string;
  item_code: string;
  item_type: "revenue" | "expense";
  calculation_method: "fixed" | "area_based" | "percentage" | "custom";
  base_amount: number;
  unit: string;
  apply_to: "all" | "specific";
  is_mandatory: boolean;
  description: string;
  formula?: string;
  priority: number;
};

export type fillItemFinancialModel = {
  id?: string;
  model_name: string;
  model_code: string;
  description?: string;
  building_id?: string;
  model_type: "revenue" | "expense" | "mixed";
  status?: "active" | "inactive" | "draft";
  items?: FinancialModelItem[];
};

export type FinancialModelFilters = {
  perPage?: number;
  page?: number;
  building_id?: string;
  model_type?: string;
  status?: string;
};
