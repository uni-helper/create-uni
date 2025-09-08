#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import packageJson from './../package.json'
import { createCustom, createWithTemplate } from './handlers.js'
import { createCustomSchema, createWithTemplateSchema } from './schemas.js'

/**
 * create-uni的MCP服务器
 * 为AI助手提供创建uni-app项目的能力
 */
const server = new McpServer({
  name: packageJson.name,
  title: packageJson.description,
  version: packageJson.version,
})

/**
 * 使用预设模板创建uni-app项目
 * 通过选择预设模板快速创建uni-app项目，无需自定义配置
 */
server.registerTool(
  'create-with-template',
  {
    title: '使用预设模板创建uni-app项目',
    description: '通过选择预设模板快速创建uni-app项目，无需自定义配置。提供多种预设模板，包括vitesse、wot-starter、零售模板等，适合不同场景的快速启动。',
    inputSchema: createWithTemplateSchema.shape,
  },
  async (input) => {
    return await createWithTemplate(input)
  },
)

/**
 * 使用自定义模板创建uni-app项目
 * 通过自定义配置创建uni-app项目，可自由选择插件、模块、UI库等
 */
server.registerTool(
  'create-custom',
  {
    title: '使用自定义模板创建uni-app项目',
    description: '通过自定义配置创建uni-app项目，可自由选择TypeScript、ESLint、插件、模块、UI库等。适合需要精细化配置的项目需求，提供完整的定制化能力。',
    inputSchema: createCustomSchema.shape,
  },
  async (input) => {
    return createCustom(input)
  },
)

// 启动服务器
const transport = new StdioServerTransport()
server.connect(transport)
