module.exports = {
    name: "geç",
    description: "Sıradaki şarkıya geçersiniz.",
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

        try {
            await queue.skip();
        } catch {
            return interaction.reply({
                content: `${interaction.member} **Bir hata oluştu :x:**`,
                ephemeral: true
            });
        }

        return interaction.reply({
            content: `${interaction.member} **Sıradaki şarkıya başarıyla geçildi :white_check_mark:**`,
            ephemeral: true
        });
    }
};
