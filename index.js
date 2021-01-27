#!/usr/bin/env node
const fs = require('fs')

const glob = require('glob')
const { program } = require('commander')
const transformImports = require('transform-imports')

program
  .option('-g, --glob <glob>', 'File glob')
  .option('-c, --cachebuststring <cachebuststring>', 'Cache bust string')
  .option('-i, --ignore <ignore>', 'Ignore specific imports using a RegExp string (optional)')

program.parse(process.argv)

const noCacheBustEnvVarSet = !process.env.CACHE_BUST_STRING || process.env.CACHE_BUST_STRING.length < 1
const noCacheBustCliOptionSet = !program.cachebuststring

if (noCacheBustEnvVarSet && noCacheBustCliOptionSet) {
  throw new Error('Error in rename-es6-imports-cli: you must specify a cache bust string either via the process.env.CACHE_BUST_STRING environment variable, or via the --cache-bust-string cli option.')
}
if (!program.glob) {
  throw new Error('Error in rename-es6-imports-cli: --glob not set')
}

const ignoreRegex = program.ignore ? program.ignore : false
const cacheBustString = noCacheBustEnvVarSet ? program.cachebuststring : process.env.CACHE_BUST_STRING
const shouldIgnoreImport = source => ignoreRegex && RegExp(ignoreRegex).test(source)

glob(program.glob, { nonull: false }, function (err, files) {
  if (err) throw err
  files.forEach(file => {
    const code = fs.readFileSync(file, 'utf8')
    const transformedCode = transformImports(code, (importDefs) => {
      importDefs.forEach((importDef) => {
        if (shouldIgnoreImport(importDef.source)) return
        importDef.source = importDef.source.slice(0, -3) + `_${cacheBustString}.js`
      })
    })
    fs.writeFileSync(file, transformedCode)
  })
})





