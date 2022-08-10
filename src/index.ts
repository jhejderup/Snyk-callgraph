#! /usr/bin/env node
import { Edge } from '@snyk/graphlib'
import { getCallGraphMvn } from '@snyk/java-call-graph-builder'
import { sep as seperator  } from 'path'

// export async function getCallGraph(
//   classPath: string,
//   targetPath: string,
//   targets: string[],
// ): Promise<string> {

//   const jarPath = "callgraph-generator.jar"
//   const tmpDir = await promisifedFs.mkdtemp(
//     path.join(tempDir, 'call-graph-generator'),
//   );
//   const classPathFile = path.join(tmpDir, 'callgraph-classpath');
//   await promisifedFs.writeFile(classPathFile, classPath);


//   const callgraphGenCommandArgs = getCallGraphGenCommandArgs(
//     classPathFile,
//     jarPath,
//     targets,
//   )

//   try {
//     const javaOutput = await execute('java', callgraphGenCommandArgs, { cwd: targetPath })
//     return javaOutput
//   } finally {
//     cleanupTempDir(classPathFile, tmpDir)
//   }
// }

// async function cleanupTempDir(classPathFile: string, tmpDir: string): Promise<void> {
//   try {
//     await promisifedFs.unlink(classPathFile)
//     await promisifedFs.rmdir(tmpDir)
//   } catch {
//     // we couldn't delete temporary data in temporary folder, no big deal
//   }
// }

export async function getCallGraph(path: string): Promise<string> {
  const graph = await getCallGraphMvn(path)
  for (const n in graph.nodes) {
    const temp = graph.nodeEdges(n)
    const edges = temp instanceof Object ? temp as Edge[] : []
    for (const edge in edges) {
      console.log(edge)
    }
  }
  return "TODO"
}
