const lyricsFinder = require("lyrics-finder");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "sözler",
    aliases: ["lyrics"],
    execute: async (client, message, args) => {
        const queue = client.player.getQueue(message.guild);
        if (!queue?.playing)
            return message.reply({ content: `${message.member}` + " **Birşey çalmıyor** :x:" });

        let lyrics = await lyricsFinder(queue.current.author, queue.current.title);
        if (!lyrics)
            return message.reply({
                content: `${message.member} **Malesef çalan şarkının sözlerini bulamadım :x:**`
            });

        lyrics.length = queue.current.title.length + 30;
        if (lyrics.length > 4000) lyrics = lyrics.slice(0, 4000);

        const embed = new MessageEmbed()
            .setTitle("🎶 | Sözler")
            .setColor("RANDOM")
            .setDescription(`**\`${queue.current.title}\` adlı şarkının sözleri;**\n\n${lyrics}`);

        return message.reply({ embeds: [embed] });
    }
};
