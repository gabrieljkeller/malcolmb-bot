import { Client, Intents, Interaction } from "discord.js"
import * as config from "./../config.json"
import { deployCommands, handleCommand, prepareCommmands } from "./commandHandler";

const token: string = config.token;

const client: Client = new Client({
    intents: [ Intents.FLAGS.GUILDS ]
});

( async () => {
    
    client.on('ready', () => {
        console.log("Logged in as " + client?.user?.tag);  
    })
    
    client.on('interactionCreate', async (interaction: Interaction) => {
        if(interaction.isCommand()) {
            handleCommand(interaction)
        }
    })
    
    await prepareCommmands()
    await deployCommands()

    client.login(token)

} )()
