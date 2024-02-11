const express = require('express');
const cors = require('cors');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] });
require('dotenv').config();

const token = process.env.TOKEN;
const guildId = process.env.GUILD_ID;
const userId = process.env.USER_ID;
const port = process.env.PORT;

client.on('ready', () => {
    console.log(`Bot is ready as: ${client.user.tag}`);
});

client.login(token);

const app = express();
app.use(cors());

app.get('/api/status', async (req, res) => {
    try {
        const guild = client.guilds.cache.get(guildId);
        const member = await guild.members.fetch(userId);
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

app.listen(port, () => console.log(`Status-server running on port ${port}`));