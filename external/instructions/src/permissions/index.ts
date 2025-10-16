import { Context } from "koishi";
import { Config } from "../index";
export function setupPermissions(ctx: Context, config: Config) {
  ctx.permissions.provide("instructions.botVip", (name, session) => {
    /**
     * 查询数据库赋予权限,权限为botVip则返回true,否则返回false,开发中先返回true
     */
    return false;
  });
}
