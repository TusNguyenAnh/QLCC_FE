export type RevenueApartment = {
    id: string;
    building_id: string;
    apt_number: string;
    apt_area: number;
    apt_type: string;
    description: string | null;
    status: number;
};

export type Revenue = {
    id: string;
    apartment_id: string;
    apartment: RevenueApartment;
    title: string;
    original_amount: string;
    amount_paid: string;
    remaining: number;
    status: "paid" | "partial" | "unpaid";
    description: string;
    created_by: string;
    approved_by: string | null;
    approved_at: string | null;
};

export type RevenueSummary = {
    total_paid: number;
    total_expect: number;
};

export type RevenueListResponse = {
    message: string;
    data: Revenue[];
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
    summary: RevenueSummary;
};

export type RevenueFilters = {
    perPage?: number;
    page?: number;
    apartment_id?: string;
    status?: string;
    year?: string;
    month?: string;
};

export type GenerateMonthlyRevenueRequest = {
    building_id: string;
    year: number;
    month: number;
};

export type GenerateMonthlyRevenueResponse = {
    message: string;
    data?: any;
};
