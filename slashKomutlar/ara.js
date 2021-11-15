const { QueryType } = require("discord-player");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const search = require("yt-search");

module.exports = {
    name: "ara",
    description: "YouTube'de şarkı ararsınız.",
    botPermissions: ["CONNECT", "SPEAK"],
    options: [
        {
            name: "şarkı",
            description: "Aranacak şarkının adını yazınız.",
            type: "STRING",
            required: true
        }
    ],
    execute: async (client, interaction) => {
        const searchQuery = interaction.options.getString("şarkı");

        if (!interaction.member.voice.channel)
            return interaction.reply({
                content: `${interaction.member}` + " **Bir kanalda olmalısın** :x:",
                ephemeral: true
            });

        const queue = client.player.getQueue(interaction.guild)
            ? client.player.getQueue(interaction.guild)
            : await client.player.createQueue(interaction.guild, {
                  metadata: {
                      channel: interaction.channel
                  }
              });

        if (!queue.connection) await queue.connect(interaction.member.voice.channel);

        search(searchQuery, async function (err, res) {
            if (err)
                return interaction.reply({
                    content: `${interaction.member} **Bir hata oluştu :x:**`,
                    ephemeral: true
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

            interaction.reply({ embeds: [embed], components: [row, row2], ephemeral: true });
            let e = false;

            client.on("interactionCreate", async (int) => {
                if (int.member.id !== interaction.member.id) return;
                let Id = int.customId;

                for (let res of songObj) {
                    if (res.id === Id) {
                        try {
                            const searchResult = await client.player.search(res.song, {
                                requestedBy: int.member,
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
                return interaction.reply({
                    content: `${interaction.member} **Bir hata oluştu :x:**`,
                    ephemeral: true
                });
        });
    }
};
