const { AudioFilters } = require("discord-player");

module.exports = {
    name: "bass-boost",
    aliases: ["bass", "bassboost"],
    execute: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply({
                content: `${message.member}` + " **Bir kanalda olmalısın** :x:"
            });

        let seviye = args[0];

        if (!seviye)
            return message.reply({
                content: `${message.member} **Bir bass seviyesi belirtmelisin, örnek: \`/bass <az/normal/yüksek>\`**`
            });

        const queue = client.player.getQueue(message.guild);

        if (!queue?.playing)
            return message.reply({ content: `${message.member}` + " **Birşey çalmıyor** :x:" });

        if (seviye === "az") {
            queue.setFilters(AudioFilters.bassboost_low);

            return message.reply({
                content: `${message.member} **Bass seviyesi başarıyla \`az\` olarak ayarlandı** :white_check_mark:`
            });
        } else if (seviye === "normal") {
            queue.setFilters(AudioFilters.bassboost);

            return message.reply({
                content: `${message.member} **Bass seviyesi başarıyla \`normal\` olarak ayarlandı** :white_check_mark:`
            });
        } else if (seviye === "yüksek") {
            queue.setFilters(AudioFilters.bassboost_high);

            return message.reply({
                content: `${message.member} **Bass seviyesi başarıyla \`yüksek\` olarak ayarlandı** :white_check_mark:`
            });
        } else
            return message.reply({
                content: `${message.member} **Yazdığın bass seviyesi geçersiz, \`az/normal/yüksek\`** :x:`
            });
    }
};
