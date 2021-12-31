import { Client, Intents } from "discord.js"
import * as config from "./../config.json"

const token: string = config.token;

const client: Client = new Client({
    intents: [ Intents.FLAGS.GUILDS ]
});

client.on('ready', () => {
    console.log("Logged in as " + client?.user?.tag);  
})

client.login(token)