module.exports = {
    name: "ses",
    aliases: ["vol", "volume"],
    execute: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply({
                content: `${message.member}` + " **Bir kanalda olmalısın** :x:"
            });

        const queue = client.player.getQueue(message.guild);

        if (!queue?.playing)
            return message.reply({ content: `${message.member}` + " **Birşey çalmıyor** :x:" });

        let per = args[0];
        if (!per)
            return message.reply({
                content: `${message.member} **Ayarlanacak yeni ses seviyesini belirtmelisin** :x:`
            });

        if (isNaN(per))
            return message.reply({ content: `${message.member} **Ses seviyesi sayı olmalıdır** :x:` });

        if (per < 0) per = 0;
        if (per > 250) per = 250;

        await queue.setVolume(per);

        return message.reply({
            content: `${message.member} **Ses başarıyla \`${per}\` olarak ayarlandı :white_check_mark:**`
        });
    }
};
