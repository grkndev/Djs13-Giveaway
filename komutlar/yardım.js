const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "yardım",
    aliases: ["help"],
    execute: (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Yardım Menüsü [${client.commands.size}]`)
            .setTimestamp()
            .addFields([
                {
                    name: "**`/çal <isim/url/playlist>`**",
                    value: "**Çarkı çalarsınız.**",
                    inline: true
                },
                {
                    name: "**`/çalan`**",
                    value: "**Bot çalan şarkıyı atar.**",
                    inline: true
                },
                {
                    name: "**`/döngü <şarkı/kuyruk>`**",
                    value: "**Döngü modunu açarsınız.**",
                    inline: true
                },
                {
                    name: "**`/devam`**",
                    value: "**Durdurulan şarkıyı devam ettiririsiniz.**",
                    inline: true
                },
                {
                    name: "**`/durdur`**",
                    value: "**Şarkıyı durdurursunuz.**",
                    inline: true
                },
                {
                    name: "**`/geç`**",
                    value: "**Sonraki şarkıyı çalarsınız.**",
                    inline: true
                },
                {
                    name: "**`/kapat`**",
                    value: "**Şarkıyı kapatırsınız.**",
                    inline: true
                },
                {
                    name: "**`/karıştır`**",
                    value: "**Kuyruğu karıştırısınız.**",
                    inline: true
                },
                {
                    name: "**`/kuyruk`**",
                    value: "**Bot kuyruğu atar.**",
                    inline: true
                },
                {
                    name: "**`/ses <seviye>`**",
                    value: "**Şarkının ses seviyesini değiştirirsiniz.**",
                    inline: true
                },
                {
                    name: "**`/sözler`**",
                    value: "**Çalan şarkının sözlerini atar.**",
                    inline: true
                },
                {
                    name: "**`/öncekiniçal`**",
                    value: "**Önceki şarkıyı çalarsınız.**",
                    inline: true
                },
                {
                    name: "**`/temizle`**",
                    value: "**Kuyruğu temizlersiniz.**",
                    inline: true
                },
                {
                    name: "**`/ara <şarkı>`**",
                    value: "**YouTube'de şarkı ararsınız.**",
                    inline: true
                },
                {
                    name: "**`/bassboost <az/normal/yüksek>`**",
                    value: "**Bass seviyesini değiştirirsiniz.**",
                    inline: true
                },
                {
                    name: "**`/ping`**",
                    value: "**Botun pingini atar.**",
                    inline: true
                },
                {
                    name: "**`/eval <kod>`**",
                    value: "**Sahibim botta kod dener.**",
                    inline: true
                }
            ])
            .setThumbnail(client.user.avatarURL());
        return message.reply({ embeds: [embed] });
    }
};
