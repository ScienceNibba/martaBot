const https = require('https');

const options = {
    hostname: 'didattica.polito.it',
    path: '', //Insert path here, if needed
    port: 443,
    method: 'GET',
    timeout: 60000 //One minute timeout
};

console.log('\nAdesso telefono al poli\n');

let req = https.request(options, res => { //HTTPS request
    code = res.statusCode; //Response code, conveniently stored

    if (code >= 200 && code <= 299) { //If success
        console.log('✅Il poli ha risposto');
        console.log(`Richesta approvata con response status code ${code}\n`);
    } else if (code > 400) { //If fails
        console.log('❌Il poli non ha risposto\n');
        console.log(`Richesta respinta con response status code ${code}\n`);
    }
});

req.on('timeout', () => { //Request timed out, timeout set as one minute(defined start of program)
    console.log('⚠Il poli non dà segni di vita');
    console.log('La richiesta non ha ricevuto alcuna risposta - timeout\n');

    req.destroy(); //Aborts the timed out request, otherwise gets the response after a thousand years with little to no context EDIT: abort is deprecated. I do what I must
});

req.on('error', error => { //Application error, not connection ones
    console.error(error);
});

req.end(); //Always end your requests, folks