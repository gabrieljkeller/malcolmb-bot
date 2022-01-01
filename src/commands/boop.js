const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

const imageGenerator = require('../../imageGenerator.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tboop')
		.setDescription('Boop!'),
	async execute(interaction) {
        await imageGenerator.generateImage().then(() => {
            const attachment = new MessageAttachment("background-copy.jpg");

            interaction.reply({files: [attachment] })
            
            setTimeout(() => {
                const emojis = [":smiling_imp:", ":smirk:", ":scream:", ":face_with_symbols_over_mouth:", ":pleading_face:", ":lipstick:", ":rotating_light:", ":woman_running:"]
    
                interaction.channel.send("<@501212640392118272> **b o o o p** " + emojis[Math.floor(Math.random() * emojis.length)]).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 500)
                })
            }, 0);
        })
	},
};