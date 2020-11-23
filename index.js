try {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    client.login(process.env.LOGIN) //Get token from env variable (fuck you randos on Github. You won't get my token that easily)

    const channel = '760492676864147461'; //Voice channel code, edit accordingly
    const donne = require('./donne.js'); //Get user IDs from different file

    client.on('ready', () => {  //Just debug
        console.log('Logged in');
    });

    client.on('voiceStateUpdate', (oldMember, newMember) => {
        const newUserChannel = newMember.channelID; //Some random stuff I saw on stackoverflow. It just works...
        const oldUserChannel = oldMember.channelID;
        const textChannel = newMember.guild.channels.cache.find(channel => channel.name === 'ciao-marta'); // Select spam channel, edit accordingly
        const User = client.users.cache.get(newMember.id); // Getting user by ID

        if (donne.includes(User.id)) { // Checking if the user exists

            if (channel.includes(newUserChannel) && oldUserChannel !== newUserChannel) {  //If voice channel is...
                textChannel.send(`${User} Ciao Marta!`);    //THAT'S IT
                console.log(`Joined ${User}`)   //Debug
            } else if (oldUserChannel === channel && newUserChannel !== channel) {    //If client left voice channel. Not really useful, might remove
                console.log(`Left ${User}`)     //You guessed it. Debug
            }
        }

    })
}

catch(err){
    console.log(err)//It won't happen. But if it happened... No actually heroku and repl are bothering me with this shit. If it were me If I had any choiche I'd never lose time with this crap. Fuck this crap
}