module.exports = {
    name: "kapat",
    description: "Çalan şarkıyı kapatırsınız.",
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

        await queue.stop();
        await interaction.deferReply({ ephemeral: true });
    }
};
