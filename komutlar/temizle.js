module.exports = {
    name: "temizle",
    aliases: ["clear-queue", "kuyruğu-temizle", "kuyruğutemizle", "clearqueue"],
    execute: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply({
                content: `${message.member}` + " **Bir kanalda olmalısın** :x:"
            });

        const queue = client.player.getQueue(message.guild);

        if (!queue?.playing)
            return message.reply({ content: `${message.member}` + " **Birşey çalmıyor** :x:" });

        await queue.clear();

        return message.reply({
            content: `${message.member} **Kuyruk başarıyla temizlendi :white_check_mark:**`
        });
    }
};
