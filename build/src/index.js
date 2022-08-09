#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallGraph = void 0;
const java_wrapper_1 = require("@snyk/java-call-graph-builder/dist/java-wrapper");
const promisifedFs = require("@snyk/java-call-graph-builder/dist/promisified-fs-glob");
const sub_process_1 = require("@snyk/java-call-graph-builder/dist/sub-process");
const path = require("path");
const tempDir = require("temp-dir");
async function getCallGraph(classPath, targetPath, targets) {
    const jarPath = "callgraph-generator.jar";
    const tmpDir = await promisifedFs.mkdtemp(path.join(tempDir, 'call-graph-generator'));
    const classPathFile = path.join(tmpDir, 'callgraph-classpath');
    await promisifedFs.writeFile(classPathFile, classPath);
    const callgraphGenCommandArgs = (0, java_wrapper_1.getCallGraphGenCommandArgs)(classPathFile, jarPath, targets);
    try {
        const javaOutput = await (0, sub_process_1.execute)('java', callgraphGenCommandArgs, { cwd: targetPath });
        return javaOutput;
    }
    finally {
        cleanupTempDir(classPathFile, tmpDir);
    }
}
exports.getCallGraph = getCallGraph;
async function cleanupTempDir(classPathFile, tmpDir) {
    try {
        await promisifedFs.unlink(classPathFile);
        await promisifedFs.rmdir(tmpDir);
    }
    catch (_a) {
        // we couldn't delete temporary data in temporary folder, no big deal
    }
}
//# sourceMappingURL=index.js.map