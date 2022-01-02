import fs from 'fs'
import twig from 'twig'
import twigAddons from '../'

const engine = twigAddons(twig)
const cwd = process.cwd()

engine.renderFile(`${cwd}/example/index.twig`, {}, (err, html) => {
  if (err) {
    console.log(err)
  } else {
    fs.writeFileSync(`${cwd}/example/index.html`, html)
  }
})