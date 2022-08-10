import * as fs from 'fs';
import { EOL } from 'os';
import { Arguments, CommandBuilder } from 'yargs';
import { getCallGraph } from '../index';

type Options = {
    targetPath: string,
    outFile: string | undefined,
};

export const command: string = 'generate <targetPath> <outFile>';
export const desc: string = "Generate snyk call graph";

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .positional('targetPath', { type: 'string', demandOption: true })
        .positional('outFile', { type: 'string', description: "Output file", demandOption: false })


export async function handler(argv: Arguments<Options>): Promise<void> {
    const { targetPath, outFile } = argv
    process.stdout.write("Waiting for call graph generation..." + EOL)
    const result = await getCallGraph(targetPath)
    process.stdout.write(`Writing to ${outFile}...` + EOL)

    if (outFile !== undefined) {
        try {
            fs.writeFileSync(outFile, result)
        } catch (error) {
            throw error
        }
    } else {
        process.stdout.write("Writing result to stdout:" + EOL)
        process.stdout.write(result)
    }

}