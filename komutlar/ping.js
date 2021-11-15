module.exports = {
    name: "ping",
    aliases: ["ms"],
    execute: (client, message, args) => {
        message.reply({ content: `${message.member} **Pingim: \`${client.ws.ping}ms\`**` });
    }
};
