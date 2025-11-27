import "reflect-metadata"
import { Controller, Get } from "@nestjs/common"

// Mocked modules data
const mockedModules = [
  { name: "demo-auth", type: "back", status: "mocked" },
  { name: "demo-audit", type: "back", status: "mocked" },
]

@Controller()
export class AppController {
  @Get("health")
  getHealth(): { status: string; service: string } {
    return {
      status: "ok",
      service: "lexorbital-core",
    }
  }

  @Get("modules")
  getModules(): Array<{ name: string; type: string; status: string }> {
    return mockedModules
  }
}
