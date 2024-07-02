class ResponseDTO<T> {
    constructor(options: { 'success': boolean, 'data': T }) {
        this.success = options.success;
        this.data = options.data;
    };

    success: boolean;
    data?: T;

    static success(data?: any) {
        return new this({ success: true, data: data });
    };
};

export default ResponseDTO;