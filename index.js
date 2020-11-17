try {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    client.login(process.env.LOGIN) //TODO save the key in a decent and secure way

    const channel = process.env.CHANNEL;
    const donne = [process.env.DONNE];

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
}

catch(err){
    console.log(err)//It won't happen. But if it happened... No actually heroku and repl are bothering me with this shit. If it were me If I had any choiche I'd never lose time with this crap. Fuck this crap
}