/**
 * Classe qui propose une méthode pour récupérer les données retournées par un appel à une API
 */

/**
 * Permet de
 * @param apis
 */
export async function fetchApi(api, options) {
    console.log("fetch api");
    return await fetch(api, options);
}
