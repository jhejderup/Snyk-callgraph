import { Arguments, CommandBuilder } from 'yargs';
declare type Options = {
    classPath: string;
    targetPath: string;
    targets: string;
};
export declare const command: string;
export declare const desc: string;
export declare const builder: CommandBuilder<Options, Options>;
export declare function handler(argv: Arguments<Options>): Promise<void>;
export {};
