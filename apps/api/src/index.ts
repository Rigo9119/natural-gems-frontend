import { Hono } from "hono"
import { logger } from "hono/logger"
import { routes } from "./routes"

const app = new Hono()

app.use(logger())
app.route("/", routes)

export type AppType = typeof app

export default {
	port: 3002,
	fetch: app.fetch,
}
