import { Context, Schema } from "koishi";
import { instructionsCommands } from "./commands";
import { instructionsEvents } from "./events";

import "@koishijs/plugin-server";
import "koishi-plugin-jx3auth";
import "koishi-plugin-jx3render";
import "koishi-plugin-jx3ws";
import "koishi-plugin-jx3api";

export const inject = ["http", "jx3ws", "jx3api", "jx3render", "server", "database", "jx3auth"];
export const name = "instructions";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context, config: Config) {
  ctx.plugin(instructionsCommands, config);
  ctx.plugin(instructionsEvents, config);
}
