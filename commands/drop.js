const messages = require("../utils/messages");

module.exports = {

    description: 'İlk emojiye basan kazanır',

    options: [
        {
            name: 'kazananlar',
            description: 'Çekilişde kaç kazanan olucak?',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'ödül',
            description: 'Bu çekilişin ödülü ne?',
            type: 'STRING',
            required: true
        },
        {
            name: 'kanal',
            description: 'Çekiliş hangi kanalda yapılacak?',
            type: 'CHANNEL',
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
        const giveawayChannel = interaction.options.getChannel('kanal');
        const giveawayWinnerCount = interaction.options.getInteger('kazananlar');
        const giveawayPrize = interaction.options.getString('ödül');
        if(!giveawayChannel.isText()) {
            return interaction.reply({
                content: ':x: Seçilan kanal bir YAZI kanalı değil.',
                ephemeral: true
            });
        }
        client.giveawaysManager.start(giveawayChannel, {
            winnerCount: giveawayWinnerCount,
            prize: giveawayPrize,
            hostedBy: client.config.hostedBy ? interaction.user : null,
            isDrop: true,
            messages
        });
        interaction.reply(`Çekiliş, ${giveawayChannel} kanalında başladı!`);
    }
};
