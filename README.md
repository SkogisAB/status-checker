# Discord Status checker

A simple discord bot that checks your status, used in my [website](https://skogis.net/about-me) to check if I am online or not.

## Setup

1. Create a bot at the [developer portal](https://discord.com/developers/applications)
2. Invite the bot to a server where you also are in
  
### Windows
3. change the values in .env.example and then save as .env
4. run `npm i` to install all dependencies
5. run `node index.js` to start the app, check if it's working with localhost:PORT/api/status
   to use the api outside of your local network you will have to forward the port in your router or use something like [Cloudflare Tunnels](https://www.cloudflare.com/products/tunnel/)

### Docker (Stack)
docker-compose.yml:
```yml
version: '3.8'
services:
  app:
    image: skogisab/status-checker:latest
    ports:
      - "PORT:PORT" # CHANGE PORT TO YOUR ACTUAL PORT
    environment:
      - TOKEN=your-discord-bot-token
      - GUILD_ID=your-guild-id
      - USER_ID=your-user-id
      - PORT=your-port
```
