import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config(); 

// l'URL de base pour l'API Football Data
const API_BASE = 'http://api.football-data.org/v4';
// récupération depuis le fichier .env pour (sécuriser)
const API_KEY = process.env.API_KEY;

/**
 * Fonction générique pour effectuer des requêtes à l'API Football Data
 * @param {string} endpoint - L'endpoint spécifique à appeler (ex: `/competitions/PL/standings`)
 * @returns {Object|null} - Les données de la réponse ou null en cas d'erreur
 */
export async function fetchFootballData(endpoint) {
    try {
        // affiche l'URL complète envoyée pour débogage (url de base + endpoint rentré en paramètre)
        console.log(`Requête envoyée : ${API_BASE}${endpoint}`);

        // effectue une requête HTTP GET vers l'API
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: { 'X-Auth-Token':API_KEY}, //authentification avec la clé API
        });

        // pour convertir la réponse en JSON
        const responseData = await response.json();

        // vérifie si la requête a échoué (statut HTTP non 2xx)
        if (!response.ok) {
            console.error(`Erreur API : ${response.status} - ${responseData.message || responseData}`);
            throw new Error(`Erreur API : ${response.status} - ${responseData.message || JSON.stringify(responseData)}`);
        }

        // Retourne les données (en json donc)
        return responseData;
    } catch (error) {
        console.error('Erreur dans fetchFootballData :', error.message);
        return null; // Retourne null en cas d'erreur
    }
}

/**
 * Récupère les standings (classement) d'une compétition spécifique pour une saison donnée
 * @param {string} competitionId - ID de la compétition (ex: "PL" pour la Premier League)
 * @returns {Object|null} - Données du classement ou null en cas d'erreur
 */
export async function fetchCompetitionStandings(competitionId) {
    // Définit explicitement la saison utilisée dans la requête
    const season = 2024;
    // Crée l'endpoint complet avec le paramètre "season"
    const endpoint = `/competitions/${competitionId}/standings?season=${season}`;
    // Appelle la fonction générique pour effectuer la requête et retourne les données
    return await fetchFootballData(endpoint);
}

/**
 * Récupère les matchs d'une équipe spécifique
 * @param {string} teamId - ID de l'équipe (ex: 86 pour Real Madrid)
 * @param {string} status - Statut des matchs (ex: "FINISHED", "SCHEDULED")
 * @param {number} limit - Limite du nombre de matchs à récupérer
 * @returns {Object|null} - Données des matchs ou null en cas d'erreur
 */
export async function fetchTeamMatches(teamId, status, limit = 3) {
    // Crée l'endpoint avec les paramètres "status" et "limit"
    const endpoint = `/teams/${teamId}/matches?status=${status}&limit=${limit}`;
    return await fetchFootballData(endpoint);
}

/**
 * Récupère les informations détaillées d'un match spécifique
 * @param {string} matchId - ID du match
 * @returns {Object|null} - Détails du match ou null en cas d'erreur
 */
export async function fetchMatchDetails(matchId) {
    // Crée l'endpoint pour un match spécifique
    const endpoint = `/matches/${matchId}`;
    return await fetchFootballData(endpoint);
}
