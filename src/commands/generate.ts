import { EOL } from 'os';
import { Arguments, CommandBuilder } from 'yargs';
import { getCallGraph } from '../index';

type Options = {
    targetPath: string,
}

export const command: string = 'generate <targetPath>'
export const desc: string = "Generate snyk call graph";

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .positional('targetPath', { type: 'string', demandOption: true })

export async function handler(argv: Arguments<Options>): Promise<void> {
    const { targetPath } = argv
    const result = await getCallGraph(targetPath)
    process.stdout.write(result)
    // To make sure it gets printed nicely.
    process.stdout.write(EOL)
}