var fs = require('fs'),
    readline = require('readline');

main(process.argv)

function main(argv) {
    var instream = fs.createReadStream('input.json');
    let id = false
    var rl = readline.createInterface({
        input: instream,
        terminal: false
    });
    rl.on('line', function(line) {
        if (line.includes(`\"id\": ${argv[2]}`)) {
            const temp = line.split(":")[1].trim()
            if (temp == `${argv[2]},`)
                id = true
        }

        if (id && line.includes("\"name\":")) {
            console.log(line.split(":")[1].trim().replaceAll("\"", ""))
            id = false
        }
    });
}