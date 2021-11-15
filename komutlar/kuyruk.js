const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kuyruk",
    aliases: ["queue", "sıra"],
    execute: async (client, message, args) => {
        const queue = client.player.getQueue(message.guild);
        if (!queue?.playing)
            return message.reply({ content: `${message.member}` + " **Birşey çalmıyor** :x:" });

        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `**${i + 1}.** [**${m.title}**](${m.url}) - **${m.requestedBy.tag}**`;
        });

        const embed = new MessageEmbed()
            .setTitle("🎶 | Kuyruk")
            .setDescription(tracks.join("\n"))
            .setColor("RANDOM")
            .addField(
                "🎶 | Şuanda çalan",
                `[**${currentTrack.title}**](${currentTrack.url}) - **${currentTrack.requestedBy.tag}**`
            );

        return message.reply({
            embeds: [embed]
        });
    }
};
