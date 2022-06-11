import axios from "axios"
import { HistoryRow } from "./types/HistoryRow"
import { Task } from "./types/Task"

// var apiPath = "https://home-battle.azurewebsites.net/api/"
var apiPath = "http://localhost:7071/api/"

export function getAllHistory() {
	return axios.get<HistoryRow[]>(apiPath + "history")
}

export function getAllTasks() {
	return axios.get<Task[]>(apiPath + "tasks")
}

export function createNewTask(data: { name: string, weight: number }) {
	return axios.post<Task>(apiPath + "tasks", data)
}
