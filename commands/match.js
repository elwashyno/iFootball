import { fetchTeamMatches } from '../utils/fetchAPI.js';
import dayjs from 'dayjs';

/**
 * Commande pour afficher les 3 derniers matchs et le prochain match d'une équipe
 * @param {Interaction} interaction - L'interaction Discord
 */
export default async function matchCommand(interaction) {
    const teamName = interaction.options.getString('team'); // Nom de l'équipe

    if (!teamName) {
        await interaction.reply('❌ Vous devez fournir le nom d\'une équipe.');
        return;
    }

    try {
        // ID des équipes les plus connues (associées à leurs noms)
        const teamMap = {
            'psg': 524,
            'rma': 86,
            'fcb': 81,
            'mc': 65,
            'bay': 5,
            'bvb': 4,
            'om': 516,
            'liv': 64
        };

        // Trouver l'ID de l'équipe dans la map
        const teamId = teamMap[teamName.toLowerCase()];
        if (!teamId) {
            await interaction.reply(`❌ Équipe "${teamName}" non reconnue. Assurez-vous que le nom est correct.`);
            return;
        }

        // Récupérer les 3 derniers matchs
        const recentMatches = await fetchTeamMatches(teamId, 'FINISHED', 3);

        // Récupérer le prochain match
        const nextMatch = await fetchTeamMatches(teamId, 'SCHEDULED', 1);

        if (!recentMatches || !recentMatches.matches) {
            await interaction.reply(`❌ Aucun match terminé trouvé pour "${teamName}".`);
            return;
        }

        // Formatage des 3 derniers matchs
        const formattedRecentMatches = recentMatches.matches.map((match) => {
            const matchDate = dayjs(match.utcDate).format('DD/MM/YYYY HH:mm');
            const isHome = match.homeTeam.id === teamId;
            const opponent = isHome ? match.awayTeam.name : match.homeTeam.name;
            const score = `${match.score.fullTime.home} - ${match.score.fullTime.away}`;
            const result =
                match.score.winner === 'HOME_TEAM' && isHome
                    ? 'Victoire'
                    : match.score.winner === 'AWAY_TEAM' && !isHome
                    ? 'Victoire'
                    : match.score.winner === 'DRAW'
                    ? 'Match nul'
                    : 'Défaite';

            return `📅 **Date** : ${matchDate}\n🔸 **Adversaire** : ${opponent}\n🔹 **Score** : ${score}\n🏆 **Résultat** : ${result}`;
        });

        // Formatage du prochain match
        const formattedNextMatch = nextMatch.matches.length
            ? (() => {
                  const match = nextMatch.matches[0];
                  const matchDate = dayjs(match.utcDate).format('DD/MM/YYYY HH:mm');
                  const isHome = match.homeTeam.id === teamId;
                  const opponent = isHome ? match.awayTeam.name : match.homeTeam.name;
                  return `📅 **Date** : ${matchDate}\n🔸 **Adversaire** : ${opponent}`;
              })()
            : 'Aucun prochain match trouvé.';

        // Envoi des résultats
        await interaction.reply({
            content: `⚽ **Résultats pour ${teamName} :**\n\n**3 Derniers Matchs TCC :**\n${formattedRecentMatches.join(
                '\n\n'
            )}\n\n**Prochain Match TCC :**\n${formattedNextMatch}`,
            ephemeral: false,
        });
    } catch (error) {
        console.error('Erreur dans matchCommand :', error);
        await interaction.reply('❌ Une erreur s\'est produite lors de la récupération des données.');
    }
}
