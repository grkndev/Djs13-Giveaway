module.exports = {
    name: "öncekiniçal",
    description: "Önceki şarkıya geçersiniz.",
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
            await queue.back();
        } catch {
            return interaction.reply({
                content: `${interaction.member} **Önceki şarkı bulunamadı :x:**`,
                ephemeral: true
            });
        }

        return interaction.reply({
            content: `${interaction.member} **Önceki şarkıya başarıyla geçildi :white_check_mark:**`,
            ephemeral: true
        });
    }
};
