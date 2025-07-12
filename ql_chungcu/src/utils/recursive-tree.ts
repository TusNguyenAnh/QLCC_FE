export function getSelectedRows(rows: any[]): { ids: any[]; selected: number; total: number } {
    return rows.reduce(
        (acc, row) => {
            // Tăng tổng số hàng (bất kể chọn hay không)
            acc.total += 1;

            // Nếu được chọn thì lưu ID và tăng selected count
            if (row.getIsSelected()) {
                acc.ids.push(row.original.id);
                acc.selected += 1;
            }

            // Nếu có subRows thì đệ quy xử lý tiếp
            if (row.subRows?.length) {
                const sub = getSelectedRows(row.subRows);
                acc.ids.push(...sub.ids);
                acc.selected += sub.selected;
                acc.total += sub.total;
            }

            return acc;
        },
        { ids: [], selected: 0, total: 0 }
    );
}