export interface IGetComment {
    _id: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    estate: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isEdit: boolean;
}

export interface ICommentState<T> {
    message: string;
    data: {
        record: T;
    };
    isLoading: boolean;
}
