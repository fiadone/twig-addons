import fs from 'fs'
import twig from 'twig'
import twigAddons from '../'

const engine = twigAddons(twig)
const cwd = process.cwd()

engine.renderFile(`${cwd}/test/index.twig`, {}, (err, html) => {
  fs.writeFileSync(`${cwd}/test/index.html`, html)
})