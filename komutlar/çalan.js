module.exports = {
    name: "çalan",
    aliases: ["np"],
    execute: async (client, message, args) => {
        const queue = client.player.getQueue(message.guild);
        if (!queue?.playing)
            return message.reply({ content: `${message.member}` + " **Birşey çalmıyor** :x:" });

        return message.reply({
            content:
                `${message.member}` +
                " **Şu anda `" +
                queue.current.title +
                "` Adlı şarkı çalınıyor.**"
        });
    }
};
