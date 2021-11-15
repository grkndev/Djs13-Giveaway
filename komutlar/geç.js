module.exports = {
    name: "geç",
    aliases: ["skip"],
    execute: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply({
                content: `${message.member}` + " **Bir kanalda olmalısın** :x:"
            });

        const queue = client.player.getQueue(message.guild);
        if (!queue?.playing)
            return message.reply({ content: `${message.member}` + " **Birşey çalmıyor** :x:" });

        try {
            await queue.skip();
        } catch {
            return message.reply({
                content: `${message.member} **Bir hata oluştu :x:**`
            });
        }

        return message.reply({
            content: `${message.member} **Sıradaki şarkıya başarıyla geçildi :white_check_mark:**`
        });
    }
};
