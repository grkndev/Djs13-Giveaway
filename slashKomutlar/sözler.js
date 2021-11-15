const lyricsFinder = require("lyrics-finder");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "sözler",
    description: "Bot çalan şarkının sözlerini atar.",
    execute: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild);
        if (!queue?.playing)
            return interaction.reply({
                content: `${interaction.member}` + " **Birşey çalmıyor** :x:",
                ephemeral: true
            });

        let lyrics = await lyricsFinder(queue.current.author, queue.current.title);
        if (!lyrics)
            return interaction.reply({
                content: `${interaction.member} **Malesef çalan şarkının sözlerini bulamadım :x:**`,
                ephemeral: true
            });

        lyrics.length = queue.current.title.length + 30;
        if (lyrics.length > 4000) lyrics = lyrics.slice(0, 4000);

        const embed = new MessageEmbed()
            .setTitle("🎶 | Sözler")
            .setColor("RANDOM")
            .setDescription(`**\`${queue.current.title}\` adlı şarkının sözleri;**\n\n${lyrics}`);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
