const net = require('net');

const port = 5555

let server = net.createServer((socket) => {
	socket.on('data', (data) => {
		console.log("Received: " + data);
        data_dict = parse_data(data);
        if (read_command_from_data(data_dict) === "Requesting reward")
        {
            socket.write(generate_reward());
        }
    });

    // Catch client disconnecting error
    socket.on('error', (err) => {
        if (err.code === "ECONNRESET")
        {
            console.log("vv Client disconnected vv");
            console.log("| " + err.stack);
        }
    });
	console.log("Accepted connection.");
	socket.write(generic_response("Connection successful"));
}).listen(port, () => console.log("Listening on port " + port.toString() + "."));


function generateRandomCoffee() 
{
    const randomNumber = Math.floor(Math.random() * 99);
    console.log("Coffee random number (0-99): ", randomNumber);
    if (randomNumber < 25) {
        return 1;
    } else if (randomNumber < 50) {
        return 2;
    } else if (randomNumber < 65) {
        return 3;
    } else if (randomNumber < 73) {
        return 4;
    } else if (randomNumber < 80) {
        return 5;
    } else if (randomNumber < 86) {
        return 6;
    } else if (randomNumber < 90) {
        return 7;
    } else if (randomNumber < 93) {
        return 8;
    } else if (randomNumber < 96) {
        return 9;
    } else if (randomNumber < 97) {
        return 10;
    } else if (randomNumber < 98) {
        return 11;
    } else {
        return 12;
    }
}

function generateRandomPastry() 
{
    const randomNumber = Math.floor(Math.random() * 99);
    console.log("Pastry random number (0-99): ", randomNumber);
    if (randomNumber < 24) {
        return "P1";
    } else if (randomNumber < 48) {
        return "P2";
    } else if (randomNumber < 72) {
        return "P3";
    } else if (randomNumber < 96) {
        return "P4";
    } else {
        return "P5";
    }
}

function generate_reward()
{
    const reward = generateRandomCoffee().toString() + " " + generateRandomPastry().toString();
    const dict = {};
    dict["response"] = "Reward";
    dict["reward"] = reward;
    return JSON.stringify(dict, null, 4);
}

function parse_data(data) // data: utf8 byte array
{
    const data_string = data.toString()
    const data_dict = JSON.parse(data_string)

    return data_dict
}

// Assumes data dict has command key because all data being sent should
function read_command_from_data(data_dict)
{
    return data_dict["command"];
}

function generic_response(response)
{
    const dict = {};
    dict["response"] = response;
    return JSON.stringify(dict, null, 4);
}