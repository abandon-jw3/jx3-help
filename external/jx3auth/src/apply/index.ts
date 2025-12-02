import { Context } from "koishi";
import { Config } from "../index";
import { Jx3Auth } from "../jx3authService/index";
import { jx3AuthCommands } from "../commands/index";
import { setupPermissions } from "../permissions";

import { initTable } from "../db/index";
export function apply(ctx: Context, config: Config) {
  ctx.plugin(Jx3Auth, config);
  ctx.plugin(jx3AuthCommands, config);
  ctx.on("ready", async () => {
    initTable(ctx);
    setupPermissions(ctx, config);
  });
}
