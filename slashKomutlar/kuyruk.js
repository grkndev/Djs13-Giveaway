const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kuyruk",
    description: "Bot kuyruk sırasını atar.",
    execute: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild);
        if (!queue?.playing)
            return interaction.reply({
                content: `${interaction.member}` + " **Birşey çalmıyor** :x:",
                ephemeral: true
            });

        const currentTrack = queue.current;
        const tracks = queue.tracks
            .slice(0, 10)
            .map((m, i) => `**${i + 1}.** [**${m.title}**](${m.url}) - **${m.requestedBy.tag}**`);

        const embed = new MessageEmbed()
            .setTitle("🎶 | Kuyruk")
            .setDescription(tracks.join("\n"))
            .setColor("RANDOM")
            .addField(
                "🎶 | Şuanda çalan",
                `[**${currentTrack.title}**](${currentTrack.url}) - **${currentTrack.requestedBy.tag}**`
            );

        return interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
