import { Context, Schema } from "koishi";
import { instructionsCommands } from "./commands";
import { instructionsEvents } from "./events";

import {} from  "@koishijs/plugin-server";
import {} from  "koishi-plugin-jx3auth";
import {} from  "koishi-plugin-jx3render";
import {} from  "koishi-plugin-jx3ws";
import {} from  "koishi-plugin-jx3api";

export const inject = ["http", "jx3ws", "jx3api", "jx3render", "server", "database", "jx3auth"];
export const name = "jx3instructions";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

import { applyTeamModule } from "./jx3team";

export function apply(ctx: Context, config: Config) {
  ctx.plugin(instructionsCommands, config);
  ctx.plugin(instructionsEvents, config);
  applyTeamModule(ctx);
}
