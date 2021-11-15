module.exports = {
    name: "ready",
    execute: async (client) => {
        console.log(`Bot Aktif! (${client.user.username})`);
    }
};
