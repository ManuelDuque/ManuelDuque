import { getTemplates, processTemplate } from "../templates/index.js"
import { read, write } from "../utils/fileSystem.js";

function getCurrentReadmeIndex() {
    const pck = read({ path: 'package.json' })
    const package_data = JSON.parse(pck);
    return package_data.current_readme || 0;
}

function updatePackage({ index }) {
    const pck = read({ path: 'package.json' })
    const package_data = JSON.parse(pck);
    package_data.current_readme = index;
    write({ path: 'package.json', content: JSON.stringify(package_data, null, 2) });
    return;
}

export function changeReadme() {
    // Read the template content
    const templates = getTemplates();
    const numberOfTemplates = templates.length;
    const nextReadmeIndex = getCurrentReadmeIndex() + 1;
    const index = nextReadmeIndex >= numberOfTemplates ? 0 : nextReadmeIndex;
    const nextReadmeName = templates[index];
    // Process the template
    processTemplate(nextReadmeName).then((result) => {
        // Write the new readme file
        write({ path: 'README.md', content: result });
        // Update the package.json
        updatePackage({ index });
    });
    return;
}