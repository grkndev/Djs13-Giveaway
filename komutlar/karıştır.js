module.exports = {
    name: "karıştır",
    aliases: ["shuffle", "kuyruğu-karıştır", "kuyruğukarıştır", "suffle-queue", "shufflequeue"],
    execute: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply({
                content: `${message.member}` + " **Bir kanalda olmalısın** :x:"
            });

        const queue = client.player.getQueue(message.guild);

        if (!queue?.playing)
            return message.reply({ content: `${message.member}` + " **Birşey çalmıyor** :x:" });

        await queue.shuffle();

        return message.reply({
            content: `${message.member} **Kuyruk başarıyla karıştırıldı :white_check_mark:**`
        });
    }
};
