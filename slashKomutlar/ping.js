module.exports = {
    name: "ping",
    description: "Botun pingine bakarsınız.",
    execute: (client, interaction) => {
        interaction.reply({
            content: `${interaction.member} **Pingim: \`${client.ws.ping}ms\`**`,
            ephemeral: true
        });
    }
};
