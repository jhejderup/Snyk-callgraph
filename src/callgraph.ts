#!/usr/bin/env node

import yargs, {Argv} from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
    .commandDir('commands')
    .strict()
    .alias({ h: 'help' })
    .argv;