# Snyk-callgraph (WIP)
Hacked-together way to get a Snyk callgraph from a maven project



To run, do the following:
- (Only for the first run) **Build the maven project, since maven relies on the `target` directory to get the classpath.**
- Execute `npm run gen '/absolute/path/to/project' 'path/to/file.json'`
