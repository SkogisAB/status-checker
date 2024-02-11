const express = require('express');
const config = require('./config.json');
const cors = require('cors');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] });

client.on('ready', () => {
    console.log(`Bot is ready as: ${client.user.tag}`);
});

client.login(config.token);

const app = express();
app.use(cors());

app.get('/api/status', async (req, res) => {
    try {
        const guild = client.guilds.cache.get(config.guildId);
        const member = await guild.members.fetch(config.userId);
        if (member && member.presence) {
            if (member.presence.status === 'dnd') {
                res.json({ status: 'do not disturb' });
            } else {
            res.json({ status: member.presence.status });
        }
        } else {
            res.json({ status: 'offline' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(config.port, () => console.log(`Status-server running on port ${config.port}`));