import axios from "axios"

var API_URL = "https://home-battle.azurewebsites.net/api/httptrigger1"

/**
 * Get a list
 * @param id ID of incident
 * @returns
 */
export function getAll() {
	return axios.get("https://home-battle.azurewebsites.net/api/httptrigger1")
}
