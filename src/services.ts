import axios from "axios"
import { HistoryRow, HistoryRowPartial } from "./types/HistoryRow"
import { Task } from "./types/Task"

// var apiPath = "https://home-battle.azurewebsites.net/api/"
var apiPath = "http://localhost:7071/api/"

// History
export function getAllHistory() {
	return axios.get<HistoryRow[]>(apiPath + "history")
}
export function createNewHistoryRow(data: HistoryRowPartial) {
	return axios.post<HistoryRow[]>(apiPath + "history", data)
}
export function removeHistoryRow(id: string) {
	return axios.delete(apiPath + "history/" + id);
}

// Tasks
export function getAllTasks() {
	return axios.get<Task[]>(apiPath + "tasks")
}

export function createNewTask(data: { name: string, weight: number }) {
	return axios.post<Task[]>(apiPath + "tasks", data)
}

export function removeTask(id: string) {
	return axios.delete(apiPath + "tasks/" + id);
}