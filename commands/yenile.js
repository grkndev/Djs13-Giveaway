module.exports = {
    description: 'Bir çekilişi yeniden yap',
    options: [
        {
            name: 'çekiliş',
            description: 'Yenilenecek çekilişin Ödülünü veya Mesaj IDsini giriniz',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
        if(!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.has(client.config.çekilişsorumlusu)){
            return interaction.reply({
                content: ':x: Çekiliş yapabilmen için MESAJLARI_YÖNET yetkisine sahip olmalısın.',
                ephemeral: true
            });
        }
        const query = interaction.options.getString('çekiliş');
        const giveaway = 
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
        if (!giveaway) {
            return interaction.reply({
                content: '`'+ query + '` Adında çekiliş bulamadık.',
                ephemeral: true
            });
        }
        if (!giveaway.ended) {
            return interaction.reply({
                content: 'Bu çekiliş henüz bitmedi.',
                ephemeral: true
            });
        }
        client.giveawaysManager.reroll(giveaway.messageId)
        .then(() => {
            interaction.reply('Çekiliş yenilendi!');
        })
        .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true
            });
        });
    }
};
