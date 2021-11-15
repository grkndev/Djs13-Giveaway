module.exports = {
    name: "geri-gel",
    aliases: ["öncekiniçal", "gerigel", "öncekini-çal"],
    execute: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply({
                content: `${message.member}` + " **Bir kanalda olmalısın** :x:"
            });

        const queue = client.player.getQueue(message.guild);
        if (!queue?.playing)
            return message.reply({ content: `${message.member}` + " **Birşey çalmıyor** :x:" });

        try {
            await queue.back();
        } catch {
            return message.reply({
                content: `${message.member} **Önceki şarkı bulunamadı :x:**`
            });
        }
        
        return message.reply({
            content: `${message.member} **Önceki şarkıya başarıyla geçildi :white_check_mark:**`
        });
    }
};
