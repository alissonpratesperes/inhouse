interface PaginationDTO<T> {
    count: number;
    hasNext: boolean;
    totalPages: number;
    totalItems: number;
    items: T[];
};

export default PaginationDTO;