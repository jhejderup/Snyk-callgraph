# Snyk-callgraph (WIP)
Hacked-together way to get a Snyk callgraph from a maven project

## Prerequisites
- npm
- maven
- Run `npm install` to install all dependencies
## How to run
- **Build** the maven project you wish to inspect, since maven requires the `target` directory to find the classpath
- Execute `npm run gen '/absolute/path/to/project' 'path/to/file.json'`
