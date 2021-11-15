const { QueryType } = require("discord-player");

module.exports = {
    name: "çal",
    description: "Bir şarkı çalarsınız.",
    botPermissions: ["CONNECT", "SPEAK"],
    options: [
        {
            name: "çalınacak",
            type: "STRING",
            required: true,
            description: "Çalınacak şarkının ismini/linkini yazınız."
        }
    ],
    execute: async (client, interaction) => {
        const songTitle = interaction.options.getString("çalınacak");

        if (!interaction.member.voice.channel)
            return interaction.reply({
                content: `${interaction.member}` + " **Bir kanalda olmalısın** :x:",
                ephemeral: true
            });

        const searchResult = await client.player.search(songTitle, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        });

        const queue = client.player.getQueue(interaction.guild)
            ? client.player.getQueue(interaction.guild)
            : await client.player.createQueue(interaction.guild, {
                  metadata: {
                      channel: interaction.channel
                  }
              });

        if (!queue.connection) await queue.connect(interaction.member.voice.channel);

        try {
            searchResult.playlist
                ? queue.addTracks(searchResult.tracks)
                : queue.addTrack(searchResult.tracks[0]);
            if (!queue.playing) await queue.play();
            await interaction.deferReply({ ephemeral: true });
        } catch {
            return interaction.reply({
                content: `${interaction.member} **Aradığınız şarkıyı bulamadım :x:**`,
                ephemeral: true
            });
        }
    }
};
