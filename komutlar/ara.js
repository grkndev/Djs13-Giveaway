const { QueryType } = require("discord-player");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const search = require("yt-search");

module.exports = {
    name: "ara",
    aliases: ["search", "şarkıara", "şarkı-ara"],
    botPermissions: ["CONNECT", "SPEAK"],
    execute: async (client, message, args) => {
        const searchQuery = args.join(" ");
        if (!searchQuery)
            return message.reply({
                content: `${message.member}` + " **Aranacak şarkıyı yazmalısın** :x:"
            });

        if (!message.member.voice.channel)
            return message.reply({
                content: `${message.member}` + " **Bir kanalda olmalısın** :x:"
            });

        const queue = client.player.getQueue(message.guild)
            ? client.player.getQueue(message.guild)
            : await client.player.createQueue(message.guild, {
                  metadata: {
                      channel: message.channel
                  }
              });

        if (!queue.connection) await queue.connect(message.member.voice.channel);

        search(searchQuery, async function (err, res) {
            if (err)
                return message.reply({
                    content: `${message.member} **Bir hata oluştu :x:**`
                });

            let songs = res.videos.slice(0, 10);
            let resp = "";
            let songObj = [];

            for (let i in songs) {
                songObj.push({ id: String(parseInt(i) + 1), song: songs[i].title });
                resp += `**${parseInt(i) + 1}.** [**${songs[i].title}**](${songs[i].url})\n`;
            }

            resp += "\n**Lütfen seçmek istediğiniz şarkıyı aşağıdaki butonlar ile belirtiniz.**";

            const embed = new MessageEmbed()
                .setTitle("Arama Sonuçları")
                .setColor("RANDOM")
                .setDescription(resp);

            const oneButton = new MessageButton()
                .setCustomId("1")
                .setStyle("PRIMARY")
                .setLabel("1");

            const twoButton = new MessageButton()
                .setCustomId("2")
                .setStyle("PRIMARY")
                .setLabel("2");

            const threeButton = new MessageButton()
                .setCustomId("3")
                .setStyle("PRIMARY")
                .setLabel("3");

            const fourButton = new MessageButton()
                .setCustomId("4")
                .setStyle("PRIMARY")
                .setLabel("4");

            const fiveButton = new MessageButton()
                .setCustomId("5")
                .setStyle("PRIMARY")
                .setLabel("5");

            const sixButton = new MessageButton()
                .setCustomId("6")
                .setStyle("PRIMARY")
                .setLabel("6");

            const sevenButton = new MessageButton()
                .setCustomId("7")
                .setStyle("PRIMARY")
                .setLabel("7");

            const eightButton = new MessageButton()
                .setCustomId("8")
                .setStyle("PRIMARY")
                .setLabel("8");

            const nineButton = new MessageButton()
                .setCustomId("9")
                .setStyle("PRIMARY")
                .setLabel("9");

            const tenButton = new MessageButton()
                .setCustomId("10")
                .setStyle("PRIMARY")
                .setLabel("10");

            const row = new MessageActionRow().addComponents(
                oneButton,
                twoButton,
                threeButton,
                fourButton,
                fiveButton
            );
            const row2 = new MessageActionRow().addComponents(
                sixButton,
                sevenButton,
                eightButton,
                nineButton,
                tenButton
            );

            message.reply({ embeds: [embed], components: [row, row2] });
            let e = false;

            client.on("interactionCreate", async (interaction) => {
                if (interaction.member.id !== message.author.id) return;
                let Id = interaction.customId;

                for (let res of songObj) {
                    if (res.id === Id) {
                        try {
                            const searchResult = await client.player.search(res.song, {
                                requestedBy: message.member,
                                searchEngine: QueryType.AUTO
                            });

                            queue.addTrack(searchResult.tracks[0]);
                            if (!queue.playing) await queue.play();
                        } catch {
                            e = true;
                        }
                        break;
                    }
                }
            });

            if (e)
                return message.reply({
                    content: `${message.member} **Bir hata oluştu :x:**`
                });
        });
    }
};
