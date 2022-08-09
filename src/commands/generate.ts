import { Arguments, CommandBuilder } from 'yargs';
import { getCallGraph } from '../index';

type Options = {
    classPath: string,
    targetPath: string,
    targets: string,
}

export const command: string = 'generate <classpath> <targetpath> <targets>'
export const desc: string = "Generate snyk call graph";

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .positional('classPath', { type: 'string', demandOption: true })
        .positional('targetPath', { type: 'string', demandOption: true })
        .positional('targets', { type: 'string', demandOption: true })

export async function handler(argv: Arguments<Options>): Promise<void> {
    const { classPath, targetPath, targets } = argv
    const t: string[] = targets.split(",")
    const result = await getCallGraph(classPath, targetPath, t)
    process.stdout.write(result)
}