import {API_SERVEUR_URL} from "./config";

/**
 * Permet de fetch une api et retourner les données en json
 * @param apis
 */
export async function fetchWithProxy(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('CORS issue');
        const data = await response.json();
        return data;
    } catch (error) {

        const proxyUrl = `${API_SERVEUR_URL}/proxy?url=${encodeURIComponent(url)}`;
        const proxyResponse = await fetch(proxyUrl, options);
        if (!proxyResponse.ok) {
            throw new Error('Erreur avec proxy');
        }
        const proxyData = await proxyResponse.json();
        return proxyData;
    }
}
