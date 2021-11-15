const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "eval",
    ownerOnly: true,
    execute: async (client, message, args) => {
        let code = args.join(" ");
        if (!code) {
            return message.reply({
                content: `${message.member} **Denenecek kodu yazmalısın** :x:`
            });
        }

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
        return message.reply({ embeds: [embed] });
    }
};
