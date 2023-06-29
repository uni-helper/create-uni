#!/usr/bin/env node

import { printBanner } from './banners'
import { question } from './question'

async function init() {
  printBanner()

  let result: {
    projectName?: string
    shouldOverwrite?: boolean
    needsTypeScript?: boolean
    needsJsx?: boolean
    needsPinia?: boolean
    needsVitest?: boolean
    needsEslint?: boolean
    needsPrettier?: boolean
  } = {}

  try {
    result = await question()
  }
  catch {
    process.exit(1)
  }

  console.log(result)
}

init()
