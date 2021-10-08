module.exports = (client) => {
    console.log(`${client.user.tag} ismi ile giriş yapıldı,
    ${client.channels.cache.size} adet kanala,
    ${client.guilds.cache.size} adet sunucuya,
    ${client.users.cache.size} adet kullanıcıya hizmet veriyor.`);
};