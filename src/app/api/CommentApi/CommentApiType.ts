export interface ICommentInput {
    commentInput: {
        content: string;
    };
    idEstate: string;
}

export interface IUpdateCommentInput {
    commentInput: {
        content: string;
    };
    idComment: string;
}
