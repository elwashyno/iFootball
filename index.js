import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import matchCommand from './commands/match.js';
import classementCommand from './commands/classement.js';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  console.log(`Interaction reçue : ${interaction.commandName}`);

  if (!interaction.isChatInputCommand()) {
    console.log('Interaction ignorée (pas une commande)');
    return;
  }

  const { commandName } = interaction;

  if (commandName === 'match') {
    await matchCommand(interaction);
  } else if (commandName === 'classement') {
    await classementCommand(interaction);
  }
});

client.login(process.env.DISCORD_TOKEN);

