const { QueryType } = require("discord-player");

module.exports = {
    name: "çal",
    aliases: ["play", "oynat", "p"],
    botPermissions: ["CONNECT", "SPEAK"],
    execute: async (client, message, args) => {
        const songTitle = args.join(" ");
        if (!songTitle)
            return message.reply({
                content: `${message.member}` + " **Çalınacak şarkıyı yazmalısın** :x:"
            });

        if (!message.member.voice.channel)
            return message.reply({
                content: `${message.member}` + " **Bir kanalda olmalısın** :x:"
            });

        const searchResult = await client.player.search(songTitle, {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        const queue = client.player.getQueue(message.guild)
            ? client.player.getQueue(message.guild)
            : await client.player.createQueue(message.guild, {
                  metadata: {
                      channel: message.channel
                  }
              });

        if (!queue.connection) await queue.connect(message.member.voice.channel);

        try {
            searchResult.playlist
                ? queue.addTracks(searchResult.tracks)
                : queue.addTrack(searchResult.tracks[0]);
            if (!queue.playing) await queue.play();
        } catch {
          
           /* return message.reply({
                content: `${message.member} **Aradığınız şarkıyı bulamadım :x:**`
            });*/
        }
    }
};
