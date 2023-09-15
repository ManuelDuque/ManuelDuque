import { changeReadme } from "./src/toggle/change-readme.js"

// Get the parameters from the npm run command
const args = process.argv.slice(2);

// Get the command
const command = args[0];

// Process the selected command
switch (command) {
    case 'change-readme':
        changeReadme();
        break;
    default:
        // Show a message if the command is not valid
        console.log('Command not found');
}