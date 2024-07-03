interface PaginationDTO<T> {
    count: number;
    totalPages: number;
    hasNext: boolean;
    totalItems: number;
    items: T[];
};

export default PaginationDTO;