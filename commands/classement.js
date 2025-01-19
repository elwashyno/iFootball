import { fetchCompetitionStandings } from '../utils/fetchAPI.js';

export default async function classementCommand(interaction) {
    const competitionId = interaction.options.getString('competition'); // ID de la compétition reçu (exemple : /competition: PL donc competitionId = PL)

    if (!competitionId) {
        await interaction.reply('❌ Vous devez fournir un ID de compétition.');
        return;
    }

    // appel à l'API pour récupérer les standings
    const standingsData = await fetchCompetitionStandings(competitionId);

    if (!standingsData || !standingsData.standings || standingsData.standings.length === 0) {
        await interaction.reply('❌ Classement indisponible pour cette compétition.');
        return;
    }

    // informations nécessaires
    const competitionName = standingsData.competition.name;
    const currentMatchday = standingsData.season.currentMatchday;
    const table = standingsData.standings[0].table;

    let formattedStandings = ''; // Chaîne pour stocker le classement formaté

// parcourir la table
for (let i = 0; i < table.length; i++) {
    // vérifiication, si nous avons traité 10 équipes
    if (i >= 10) {
        break; // arrête la boucle après 10 équipes (si il y'en a moins)
    }

    const team = table[i]; 

    formattedStandings += `**${team.position}. ${team.team.name}**\n`;
    formattedStandings += `Points : ${team.points}, Joués : ${team.playedGames}, Gagnés : ${team.won}, Nuls : ${team.draw}, Perdus : ${team.lost}\n\n`;
}

    // envoi du message formaté
    await interaction.reply({
        content: `🏆 **Classement : ${competitionName} (Journée ${currentMatchday})**\n\n${formattedStandings}`,
        ephemeral: false,
    });
}
