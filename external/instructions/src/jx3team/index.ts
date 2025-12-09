import { Context } from "koishi";
import { applyDatabase } from "./database";
import { applyCreate } from "./create";
import { applyJoin } from "./join";
import { applyLeave } from "./leave";
import { applyView } from "./view";
import { applyManage } from "./manage";

export function applyTeamModule(ctx: Context) {
  // 1. Apply Database Changes
  applyDatabase(ctx);

  // 2. Register Commands
  applyCreate(ctx);
  applyJoin(ctx);
  applyLeave(ctx);
  applyView(ctx);
  applyManage(ctx);
}
