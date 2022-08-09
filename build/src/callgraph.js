#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const helpers_1 = require("yargs/helpers");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .commandDir('commands')
    .strict()
    .alias({ h: 'help' })
    .argv;
//# sourceMappingURL=callgraph.js.map