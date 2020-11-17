const Discord = require('discord.js');
const client = new Discord.Client();
client.login('YOYO') //TODO save the key in a decent and secure way

const channel = 'YUYU';
const donne = ['YEYE'];

client.on('ready', () => {
    console.log('Logged in');
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    const newUserChannel = newMember.channelID;
    const oldUserChannel = oldMember.channelID;
    const textChannel = newMember.guild.channels.cache.find(channel => channel.name === 'botteria'); // Select spam channel
    const User = client.users.cache.get(newMember.id); // Getting user by ID

    if (donne.includes(User.id)) { // Checking if the user exists
        
        if (newUserChannel === channel) {  //If voice channel is...
            textChannel.send(`${User} Ciao Marta!`);    //THAT?S IT
            console.log(`Joined ${User}`)   //Debug
        } else if (oldUserChannel === channel && newUserChannel !== channel) {    //If client left voice channel. Not really useful, might remove
            console.log(`Left ${User}`)
        }
    }

})