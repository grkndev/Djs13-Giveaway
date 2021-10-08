const ms = require('ms');

module.exports = {

    description: 'Çekilişi durdur',

    options: [
        {
            name: 'çekiliş',
            description: 'Durdurulacak çekilişin Ödülünü veya Mesaj IDsini giriniz',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
        if(!interaction.member.permissions.has('MANAGE_MESSAGES') &&  !interaction.member.roles.cache.has(client.config.çekilişsorumlusu)){
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
        if (giveaway.pauseOptions.isPaused) {
            return interaction.reply({
                content: 'Bu çekiliş zaten durdurulmuş.',
                ephemeral: true
            });
        }
        client.giveawaysManager.pause(giveaway.messageId)
        .then(() => {
            interaction.reply('Çekiliş durduruldu!');
        })
        .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true
            });
        });
    }
};
