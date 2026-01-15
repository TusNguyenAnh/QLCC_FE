import request from "@/utils/request.ts";
import type {
    Expense,
    ExpenseFilters,
    ExpenseSummary,
} from "@/types/Expense.ts";
import type {PaginationMeta} from "@/types/Pagination.ts";
import type {BdFormSchema} from "@/pages/building/action-form-bd.tsx";

interface GetExpensesResponse {
    message: string;
    data: Expense[];
    meta: PaginationMeta;
    summary: ExpenseSummary;
}

export const getExpenses = async (
    filters: ExpenseFilters
): Promise<GetExpensesResponse> => {
    const response = await request({
        url: "/expenses/getExpense",
        method: "POST",
        data: filters,
    });
    return response;
};

export const createExpenseAPI = async (newExpense) => {
    const res = await request.post('/expenses', newExpense);
    return res.data;
}
