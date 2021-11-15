module.exports = {
    name: "durdur",
    description: "Çalan şarkıyı durdurursunuz.",
    execute: async (client, interaction) => {
        if (!interaction.member.voice.channel)
            return message.reply({
                content: `${interaction.member}` + " **Bir kanalda olmalısın** :x:",
                ephemeral: true
            });

        const queue = client.player.getQueue(interaction.guild);
        if (!queue?.playing)
            return interaction.reply({
                content: `${interaction.member}` + " **Birşey çalmıyor** :x:",
                ephemeral: true
            });

        queue.setPaused(true);
        return interaction.reply({
            content: `${interaction.member}` + " **Şarkı durduruldu** :white_check_mark:",
            ephemeral: true
        });
    }
};
