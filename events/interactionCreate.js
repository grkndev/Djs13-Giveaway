module.exports = (client, interaction) => {

    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return void interaction.reply({
        content: `\`${interaction.commandName}\` isminde komut bulunamadı.`,
        ephemeral: true
    });
  
    command.run(client, interaction);
};