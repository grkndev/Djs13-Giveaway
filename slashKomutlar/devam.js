module.exports = {
    name: "devam",
    description: "Durdurulan şarkıyı devam ettirirsiniz.",
    execute: async (client, interaction) => {
        if (!interaction.member.voice.channel)
            return interaction.reply({
                content: `${interaction.member}` + " **Bir kanalda olmalısın** :x:",
                ephemeral: true
            });

        const queue = client.player.getQueue(interaction.guild);
        if (!queue?.playing)
            return interaction.reply({
                content: `${interaction.member}` + " **Birşey çalmıyor** :x:",
                ephemeral: true
            });

        queue.setPaused(false);
        return interaction.reply({
            content: `${interaction.member}` + " **Şarkı devam ettirildi** :white_check_mark:",
            ephemeral: true
        });
    }
};
