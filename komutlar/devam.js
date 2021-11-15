module.exports = {
    name: "devam",
    aliases: ["resume"],
    execute: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply({
                content: `${message.member}` + " **Bir kanalda olmalısın** :x:"
            });

        const queue = client.player.getQueue(message.guild);
        if (!queue?.playing)
            return message.reply({ content: `${message.member}` + " **Birşey çalmıyor** :x:" });

        queue.setPaused(false);
        return message.reply({
            content: `${message.member}` + " **Şarkı devam ettirildi** :white_check_mark:"
        });
    }
};
