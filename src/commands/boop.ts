import { CommandInteraction } from "discord.js";

export const description = "Use this command to boop malcolmb!"

export default function command(interaction: CommandInteraction): any {

    interaction.reply("boop command recieved")

}