import { Context, Schema } from "koishi";
import koaStatic from "koa-static";
import koaMount from "koa-mount";
import path from "path";
import "@koishijs/plugin-server";
export const inject = ["server"];

export const name = "jx3assets";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  const staticPath = path.join(__dirname, "../public");
  const htmlPath = path.join(ctx.baseDir, "./data", "./jx3render", "./public");

  ctx.server.use(koaMount("/jx3assets", koaStatic(staticPath)));
  ctx.server.use(koaMount("/jx3html", koaStatic(htmlPath)));
  ctx.logger("jx3assets").info("jx3assets ready");
}
