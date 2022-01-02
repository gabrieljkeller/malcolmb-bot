import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from "discord.js"
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as config from "./../config.json"
import fs from "fs"

interface Command {
    commandName: string,
    description?: string,
    callback?: CommandCallback
}

interface CommandCallback {
    (interaction: CommandInteraction): any
}

const commands: { [commandName: string]: Command } = {}

export const prepareCommmands = async () => {
    const commandNames = fs.readdirSync("dist/src/commands")
        .filter(fileName => {
            return fileName.endsWith(".js")
        })
        .map(fileName => {
            return fileName.substring(0, fileName.length - 3)
        })

    for(let commandName of commandNames) {
        const imported = await import(`./commands/${commandName}.js`)
        commands[commandName] = {
            commandName,
            description: imported.description,
            callback: imported.default
        }
    }
}

export const handleCommand = async (interaction: CommandInteraction) => {
    const command = commands[interaction.commandName]

    if(!command || !command.callback) {
        console.error(`Command ${interaction.commandName} not found`)
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        return
    }

    try {
        await command?.callback(interaction)
    } catch (error) {
        console.log(error)
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }
}

export const deployCommands = async () => {
    const slashCommands: SlashCommandBuilder[] = Object.values(commands)
        .map(command => {
            return new SlashCommandBuilder()
                .setName(command.commandName)
                .setDescription(command.description ?? command.commandName)
        });

    const rest = new REST({ version: '9' }).setToken(config.token);

    config.guilds.forEach(guildId => {
        rest.put(Routes.applicationGuildCommands(config.clientId, guildId), { body: slashCommands })
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);
    })
}
