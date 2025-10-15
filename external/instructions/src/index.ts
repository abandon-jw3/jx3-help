import { Context, Schema } from "koishi";
import { instructionsCommands } from "./commands";
import "koishi-plugin-jx3Render";
import "koishi-plugin-jx3ws";
import "koishi-plugin-jx3api";

export const inject = ["http", "jx3ws", "jx3api", "jx3Render"];
export const name = "instructions";

// 配置接口
export interface Config {}

// 配置模式
export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context, config: Config) {
  ctx.on("jx3ws.2005", (data) => {});

  ctx.plugin(instructionsCommands, config);
}
