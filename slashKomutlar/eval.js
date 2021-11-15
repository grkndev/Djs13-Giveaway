const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "eval",
    description: "Sahibim botta kod dener",
    options: [{ name: "kod", description: "Denenecek kod.", required: true, type: "STRING" }],
    ownerOnly: true,
    execute: async (client, interaction) => {
        let code = interaction.options.getString("kod");

        try {
            const result = eval(code);
            var embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Başarılı!")
                .addFields([
                    {
                        name: "Kod",
                        value: `\`\`\`js\n${code}\`\`\``
                    },
                    {
                        name: "Sonuç",
                        value: `\`\`\`js\n${result}\`\`\``
                    },
                    {
                        name: "Tip",
                        value: `\`\`\`js\n${typeof result}\`\`\``,
                        inline: true
                    },
                    {
                        name: "Uzunluk",
                        value: `\`\`\`js\n${code.length}\`\`\``,
                        inline: true
                    }
                ]);
        } catch (error) {
            var embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Hata!")
                .addFields([
                    {
                        name: "Kod",
                        value: `\`\`\`js\n${code}\`\`\``
                    },
                    {
                        name: "Sonuç",
                        value: `\`\`\`js\n${error}\`\`\``
                    },
                    {
                        name: "Tip",
                        value: `\`\`\`js\nError\`\`\``,
                        inline: true
                    },
                    {
                        name: "Uzunluk",
                        value: `\`\`\`js\n${code.length}\`\`\``,
                        inline: true
                    }
                ]);
        }
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
