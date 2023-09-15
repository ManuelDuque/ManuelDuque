export const TEMPLATES_FOLDER = 'src/templates';
export const TEMPLATE_EXTENSION = '.tpl.md';
export const TEMPLATE_FUNCTION_EXTENSION = '.tpl.js';

export const TEMPLATE_PROCESS_FUNCTION_START = '%{{ proc }}%';
export const TEMPLATE_PROCESS_FUNCTION_END = '%{{ endproc }}%';
export const TEMPLATE_PROCESS_BLOCK = new RegExp(`${TEMPLATE_PROCESS_FUNCTION_START}([\\s\\S]*?)${TEMPLATE_PROCESS_FUNCTION_END}`, 'g');