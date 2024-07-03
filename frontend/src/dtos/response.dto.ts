interface ResponseDTO<T> {
    success: boolean;
    data: T;
    message: string;
};

export default ResponseDTO;