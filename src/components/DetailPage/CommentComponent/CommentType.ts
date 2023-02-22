import React from "react"

export interface IEditor{
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
	onSubmit: () => void
	submitting: boolean
	value: string | number |string[]
}

export interface IComment{
	author: string
	avatar: string
	content: string
}
export interface ICommentList{
	comments: IComment[]
}