module.exports = {
    name: "durdur",
    aliases: ["pause"],
    execute: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply({
                content: `${message.member}` + " **Bir kanalda olmalısın** :x:"
            });

        const queue = client.player.getQueue(message.guild);
        if (!queue?.playing)
            return message.reply({ content: `${message.member}` + " **Birşey çalmıyor** :x:" });

        queue.setPaused(true);
        return message.reply({
            content: `${message.member}` + " **Şarkı durduruldu** :white_check_mark:"
        });
    }
};
