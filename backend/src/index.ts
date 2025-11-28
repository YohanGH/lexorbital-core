import "reflect-metadata"

import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module.js"

const PORT = process.env["PORT"] || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS
  app.enableCors()

  await app.listen(PORT)

  console.warn(`🚀 LexOrbital BackRing running on http://localhost:${PORT}`)
  console.warn(`📡 Health: http://localhost:${PORT}/health`)
  console.warn(`📦 Modules: http://localhost:${PORT}/modules`)
}

bootstrap()
