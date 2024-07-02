class PaginationDTO<T> {
    constructor(options: { page: number, limit: number, total: number, items: T[]; }) {
        this.page = options.page;
        this.limit = options.limit;
        this.total = options.total;
        this.pages = Math.ceil(this.total / this.limit);
        this.items = options.items;
    };

    page: number;
    limit: number;
    total: number;
    pages: number;
    items: T[];
};

export default PaginationDTO;