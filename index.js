try {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    client.login(process.env.LOGIN) //Get token from env variable (fuck you randos on Github. You won't get my token that easily)

    const channel = require('./canali.js'); //Voice channel code, edit accordingly
    const donne = require('./donne.js'); //Get user IDs from different file

    const cucina = '778281298133254187' //cucina channel
    const orders = '760496195184492565'   //execute-orders channel


    const https = require('https');
    const options = {
        hostname: 'didattica.polito.it',
        port: 443,
        method: 'GET',
        timeout: 60000  //One minute timeout
    };


    client.on('ready', () => {  //Put random code in here
        console.log('Logged in');   //Just debug

        /*//Ugly code for Chirstmas wishes (let this be my very own ugly Christmas sweater)
        target = new Date(2020, 11, 25, 0, 5, 0, 0);   //Target date(input Christmas here) - YYYY-MM-DD-hh-mm-ss-ms

        countDown = target - new Date();    //On boot starts the countdown to target date
        console.log(countDown);
        setTimeout(() => {  //Awesome code goes in here!
            const chrismasChannel = client.channels.cache.get('780426427416707113');

            chrismasChannel.send('@everyone Tanti auguri di buon Natale all\'intera Vibe Zone!\:santa\:');  //The message
            console.log('Sending Christmas wishes') //Debug because why not?

        }, countDown); //The countdown*/
    });

    client.on('voiceStateUpdate', (oldMember, newMember) => {
        const newUserChannel = newMember.channelID; //Some random stuff I saw on stackoverflow. It just works...
        const oldUserChannel = oldMember.channelID;
        const textChannel = newMember.guild.channels.cache.find(channel => channel.name === 'ciao-marta'); // Select spam channel, edit accordingly
        const User = client.users.cache.get(newMember.id); // Getting user by ID

        //Ciao Marta

        if (donne.includes(User.id)) { // Checking if the user exists
            if (channel.includes(newUserChannel) && oldUserChannel !== newUserChannel) {  //If voice channel is...
                textChannel.send(`${User} Ciao Marta!`).then(msg => setTimeout(function () {msg.delete()}, 300000));    //THAT'S IT, wait and delete own message
                console.log(`Joined ${User}`)   //Debug
            } else if (oldUserChannel === channel && newUserChannel !== channel) {    //If client left voice channel. Not really useful, might remove
                console.log(`Left ${User}`)     //You guessed it. Debug
            }
        }

        //Back to the kitchen

        if (newUserChannel === cucina && oldUserChannel !== newUserChannel && !newMember.member.hasPermission('ADMINISTRATOR')) {   //If channel is 'cucina'
            newMember.member.setNickname(`[In cucina]${newMember.member.nickname}`);
        }
        else if (oldUserChannel === cucina && newMember.member.nickname !== null && !newMember.member.hasPermission('ADMINISTRATOR')) {     //If user left 'cucina'
            newMember.member.setNickname(newMember.member.nickname.replace('[In cucina]', ''));
        }
    })

    client.on('message', msg => {

        //Ping polito

        if (msg.channel.id === orders) {      //If channel is 'execute-orders'
            if (msg.content.substring(0, 5) === '-ping') {      //Check command
                msg.channel.send('Adesso telefono al poli');

                let req = https.request(options, res => {   //HTTPS request
                    code = res.statusCode;      //Response code, conveniently stored

                    if (code >= 200 && code <= 299) {   //If success
                        msg.channel.send('✅Il poli ha risposto');
                        if (msg.content.substring(0, 10) === '-ping-nerd') {    //Cool embed, only for nerds
                            msg.channel.send(new Discord.MessageEmbed()
                                .setColor('#38f57d')
                                .setDescription(`Richesta approvata con response status code ${code}`)
                            );
                        }
                    }
                    else if (code > 400) {      //If fails
                        msg.channel.send('❌Il poli non ha risposto');
                        if (msg.content.substring(0, 10) === '-ping-nerd') {    //Cool embed, again only for nerds
                            msg.channel.send(new Discord.MessageEmbed()
                                .setColor('#cc0e0e')
                                .setDescription(`Richesta respinta con response status code ${code}`)
                            );
                        }
                    }

                });

                req.on('timeout', () => {   //Request timed out, timeout set as one minute(defined start of program)
                    msg.channel.send('⚠Il poli non dà segni di vita');
                    if (msg.content.substring(0, 10) === '-ping-nerd') {
                        msg.channel.send(new Discord.MessageEmbed()     //You guessed it, cool embed for nerds
                            .setColor('#e8cb27')
                            .setDescription('La richiesta non ha ricevuto alcuna risposta - timeout')
                        );
                    }
                    req.abort();    //Aborts the timed out request, otherwise gets the response after a thousand years with little to no context
                });

                req.on('error', error => {    //Application error, not connection ones
                    console.error(error);
                });

                req.end();      //Always end your requests, folks
            }
        }
    });
}

catch (err) {
    console.log(err)//It won't happen. But if it happened... No actually heroku and repl are bothering me with this shit. If it were me If I had any choiche I'd never lose time with this crap. Fuck this crap
}