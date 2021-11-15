module.exports = {
    name: "çalan",
    description: "Bot çalan şarkıyı atar.",
    execute: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild);
        if (!queue?.playing)
            return interaction.reply({
                content: `${interaction.member}` + " **Birşey çalmıyor** :x:",
                ephemeral: true
            });

        return interaction.reply({
            content:
                `${interaction.member}` +
                " **Şu anda `" +
                queue.current.title +
                "` Adlı şarkı çalınıyor.**",
            ephemeral: true
        });
    }
};
