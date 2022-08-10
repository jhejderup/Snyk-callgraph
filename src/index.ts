#! /usr/bin/env node
import * as graphlib from '@snyk/graphlib'
import { getCallGraphMvn } from '@snyk/java-call-graph-builder'

export async function getCallGraph(path: string): Promise<string> {
  const graph = await getCallGraphMvn(path)

  return JSON.stringify(graphlib.json.write(graph))
}
