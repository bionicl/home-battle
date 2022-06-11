export type HistoryRow = {
	Id: string,
	date: string,
	who: "Maciej" | "Zofia",
	description: string,
	count: number,
	notes: string
}

export type HistoryRowPartial = {
	date: string,
	who: "Maciej" | "Zofia",
	description: string,
	count: number,
	notes: string
}