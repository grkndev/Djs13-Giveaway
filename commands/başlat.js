const ms = require('ms');
const messages = require("../utils/messages");

module.exports = {

    description: 'Çekiliş Başlat',
    options: [
        {
            name: 'süre',
            description: 'Bu Çekiliş ne kadar sürecek?. Örnek Kullanım: 1m, 1h, 1d',
            type: 'STRING',
            required: true
        },
        {
            name: 'kazananlar',
            description: 'Bu çekilişde kaç kişi kazanıcak?',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'ödül',
            description: 'Bu Çekilişin ödülü ne?',
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
        if(!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.has(client.config.çekilişsorumlusu)){
            return interaction.reply({
                content: ':x: Çekiliş yapabilmen için MESAJLARI_YÖNET yetkisine sahip olmalısın.',
                ephemeral: true
            });
        }
        const giveawayChannel = interaction.options.getChannel('kanal');
        const giveawayDuration = interaction.options.getString('süre');
        const giveawayWinnerCount = interaction.options.getInteger('kazananlar');
        const giveawayPrize = interaction.options.getString('ödül');
        if(!giveawayChannel.isText()) {
            return interaction.reply({
                content: ':x: Seçilen kanal YAZI kanalı değil.',
                ephemeral: true
            });
        }
        client.giveawaysManager.start(giveawayChannel, {
            duration: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinnerCount,
            hostedBy: client.config.hostedBy ? interaction.user : null,
            messages
        });
        interaction.reply(`Çekiliş, ${giveawayChannel} kanalında başladı!`);
    } 
};
