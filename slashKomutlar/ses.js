module.exports = {
    name: "ses",
    description: "Çalan şarkının ses seviyesini belirlersiniz.",
    options: [
        {
            name: "seviye",
            type: "NUMBER",
            required: true,
            description: "Ses seviyesini belirlersiniz."
        }
    ],
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

        let per = interaction.options.getNumber("seviye");

        if (per < 0) per = 0;
        if (per > 250) per = 250;

        await queue.setVolume(per);

        return interaction.reply({
            content: `${interaction.member} **Ses başarıyla \`${per}\` olarak ayarlandı :white_check_mark:**`,
            ephemeral: true
        });
    }
};
