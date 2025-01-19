import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const commands = [
  {
    name: 'match',
    description: 'Affiche les 3 derniers matchs et le prochain match d’une équipe.',
    options: [
      {
        name: 'team',
        type: 3, // STRING
        description: 'ID de l’équipe',
        required: true,
      },
    ],
  },
  {
    name: 'classement',
    description: 'Affiche le classement d’un championnat.',
    options: [
      {
        name: 'competition',
        type: 3, // STRING
        description: 'ID de la compétition',
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔄 Enregistrement des commandes...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID), // Enregistrement global
      { body: commands }
    );
    console.log('✅ Commandes enregistrées avec succès.');
  } catch (error) {
    console.error('Erreur lors de l’enregistrement des commandes :', error);
  }
})();
