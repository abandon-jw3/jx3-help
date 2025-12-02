import { Context, Schema } from "koishi";
import { instructionsCommands } from "./commands";

import {} from "koishi-plugin-jx3render";
import {} from "koishi-plugin-jx3ws";
import {} from "koishi-plugin-jx3api";
import {} from "@koishijs/plugin-server";
import {} from "koishi-plugin-jx3auth";

export const inject = ["http", "jx3ws", "jx3api", "jx3render", "server", "database", "jx3auth"];
export const name = "instructions";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context, config: Config) {
  ctx.plugin(instructionsCommands, config);
}
