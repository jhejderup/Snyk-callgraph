#! /usr/bin/env node
import { getCallGraphGenCommandArgs } from '@snyk/java-call-graph-builder/dist/java-wrapper';
import * as promisifedFs from '@snyk/java-call-graph-builder/dist/promisified-fs-glob';
import { execute } from '@snyk/java-call-graph-builder/dist/sub-process';
import * as path from 'path';
import * as tempDir from 'temp-dir';

export async function getCallGraph(
  classPath: string,
  targetPath: string,
  targets: string[],
): Promise<string> {

  const jarPath = "callgraph-generator.jar"
  const tmpDir = await promisifedFs.mkdtemp(
    path.join(tempDir, 'call-graph-generator'),
  );
  const classPathFile = path.join(tmpDir, 'callgraph-classpath');
  await promisifedFs.writeFile(classPathFile, classPath);


  const callgraphGenCommandArgs = getCallGraphGenCommandArgs(
    classPathFile,
    jarPath,
    targets,
  )

  try {
    const javaOutput = await execute('java', callgraphGenCommandArgs, { cwd: targetPath })
    return javaOutput
  } finally {
    cleanupTempDir(classPathFile, tmpDir)
  }
}

async function cleanupTempDir(classPathFile: string, tmpDir: string): Promise<void> {
  try {
    await promisifedFs.unlink(classPathFile)
    await promisifedFs.rmdir(tmpDir)
  } catch {
    // we couldn't delete temporary data in temporary folder, no big deal
  }
}

