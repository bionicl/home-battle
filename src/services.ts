import axios from "axios"
import { LogRow } from "../types/LogRow"

var apiPath = "https://home-battle.azurewebsites.net/api/"

/**
 * Get a list
 * @param id ID of incident
 * @returns
 */
export function getAll() {
	return axios.get<LogRow[]>(apiPath + "tasks")
}
