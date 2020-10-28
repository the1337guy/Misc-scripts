const fs = require('fs-jetpack')
const path = require('path')

const _range = require('lodash.range')
const prompt = require('prompt-sync')({
  sigint: true
})

async function mkfolder (folderPth, remainingLevels) {
  if (remainingLevels === 0) {
    return
  }
  for (let i in _range(0, 10)) {
    const newpath = path.join(folderPth, i.toString())
    await fs.dirAsync(newpath)
    await mkfolder(path.join(newpath), remainingLevels - 1)
  }
}

async function main () {
  const l = Number(prompt('How many levels do you want?'))
  if (!Number.isFinite(l)) {
    console.log('Invalid answer:', l)
    process.exit(1)
  }

  return mkfolder(process.cwd(), l)
}

main().catch(e => console.error(e))
