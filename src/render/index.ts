import path from 'node:path'

const render = function render(templateName) {
  const templateDir = path.resolve(templateRoot, templateName)
  renderTemplate(templateDir, root, callbacks)
}
