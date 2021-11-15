const { AudioFilters } = require("discord-player");

module.exports = {
    name: "bassboost",
    description: "Bass seviyesini değiştirirsiniz.",
    options: [
        {
            name: "seviye",
            description: "Yeni bass seviyesini belirlersiniz.",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "az",
                    value: "az"
                },
                {
                    name: "normal",
                    value: "normal"
                },
                {
                    name: "yüksek",
                    value: "yüksek"
                }
            ]
        }
    ],
    execute: async (client, interaction) => {
        if (!interaction.member.voice.channel)
            return interaction.reply({
                content: `${interaction.member}` + " **Bir kanalda olmalısın** :x:",
                ephemeral: true
            });

        let seviye = interaction.options.getString("seviye");

        if (!seviye)
            return interaction.reply({
                content: `${interaction.member} **Bir bass seviyesi belirtmelisin, örnek: \`/bass <az/normal/yüksek>\`**`,
                ephemeral: true
            });

        const queue = client.player.getQueue(interaction.guild);

        if (!queue?.playing)
            return interaction.reply({
                content: `${interaction.member}` + " **Birşey çalmıyor** :x:",
                ephemeral: true
            });

        if (seviye === "az") {
            queue.setFilters(AudioFilters.bassboost_low);

            return interaction.reply({
                content: `${interaction.member} **Bass seviyesi başarıyla \`az\` olarak ayarlandı** :white_check_mark:`,
                ephemeral: true
            });
        } else if (seviye === "normal") {
            queue.setFilters(AudioFilters.bassboost);

            return interaction.reply({
                content: `${interaction.member} **Bass seviyesi başarıyla \`normal\` olarak ayarlandı** :white_check_mark:`,
                ephemeral: true
            });
        } else if (seviye === "yüksek") {
            queue.setFilters(AudioFilters.bassboost_high);

            return interaction.reply({
                content: `${interaction.member} **Bass seviyesi başarıyla \`yüksek\` olarak ayarlandı** :white_check_mark:`,
                ephemeral: true
            });
        } else
            return interaction.reply({
                content: `${interaction.member} **Yazdığın bass seviyesi geçersiz, \`az/normal/yüksek\`** :x:`,
                ephemeral: true
            });
    }
};
