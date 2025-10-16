import { Context, Schema } from "koishi";
import { instructionsCommands } from "./commands";
import { setupPermissions } from "./permissions";
import "koishi-plugin-jx3Render";
import "koishi-plugin-jx3ws";
import "koishi-plugin-jx3api";

export const inject = ["http", "jx3ws", "jx3api", "jx3Render"];
export const name = "instructions";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context, config: Config) {
  ctx.plugin(instructionsCommands, config);

  ctx.on("ready", async () => {
    setupPermissions(ctx, config);
  });
}
