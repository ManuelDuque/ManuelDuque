import { TEMPLATES_FOLDER, TEMPLATE_EXTENSION, TEMPLATE_PROCESS_BLOCK, TEMPLATE_PROCESS_FUNCTION_END, TEMPLATE_PROCESS_FUNCTION_START } from '../constants/index.js';
import { getFiles, read } from '../utils/fileSystem.js';

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

/**
 * Get all the templates from the templates folder and return them as an array.
 * @returns {Array} The templates.
 */
export function getTemplates() {
    return getFiles({ path: TEMPLATES_FOLDER, extension: TEMPLATE_EXTENSION });
}

/**
 * Get the readme template content from the templates folder with the given name.
 * @param {String} name The name of the template.
 * @returns {String} The content of the template.
 */
function getTemplateContent(name) {
    return read({ path: `${TEMPLATES_FOLDER}/${name}` });
}

function getScopes(content) {
    return content.match(TEMPLATE_PROCESS_BLOCK);
}

async function getScopeResult(scope) {
    const scopeFunctionData = scope.replace(TEMPLATE_PROCESS_FUNCTION_START, '').replace(TEMPLATE_PROCESS_FUNCTION_END, '');
    // Extract all the await functions from the scope function
    const scopeFunction = new AsyncFunction(scopeFunctionData);
    return await scopeFunction();
}

/**
 * Get the function to process the template with the given name.
 * @param {String} name The name of the template.
 * @returns {Function} The function to process the template.
 */
export async function processTemplate(name) {
    // Get the template content
    const templateContent = getTemplateContent(name);

    // Get all the scopes
    const scopes = getScopes(templateContent);

    // Build the readme content
    let readmeContent = templateContent;
    
    return new Promise((resolve, reject) => {
        // Await all the scopes
        Promise.all(
            scopes.map(async scope => {
                const scopeResult = await getScopeResult(scope);
                // Replace the readme result with the scope result
                readmeContent = readmeContent.replace(scope, scopeResult);
            })
        ).then(() => {
            resolve(readmeContent);
        }).catch((error) => {
            reject(error);
        });
    });
}