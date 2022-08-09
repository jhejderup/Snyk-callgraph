"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const index_1 = require("../index");
exports.command = 'generate <classpath> <targetpath> <targets>';
exports.desc = "Generate snyk call graph";
const builder = (yargs) => yargs
    .positional('classPath', { type: 'string', demandOption: true })
    .positional('targetPath', { type: 'string', demandOption: true })
    .positional('targets', { type: 'string', demandOption: true });
exports.builder = builder;
async function handler(argv) {
    const { classPath, targetPath, targets } = argv;
    const t = targets.split(",");
    const result = await (0, index_1.getCallGraph)(classPath, targetPath, t);
    process.stdout.write(result);
}
exports.handler = handler;
//# sourceMappingURL=generate.js.map