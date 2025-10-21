import { Context } from "koishi";
import { Config } from "../index";

export function setupPermissions(ctx: Context, config: Config) {
  // 设置instructions.botVip权限
  ctx.permissions.provide("instructions.botVip", (name, session) => {
    /**
     * 查询数据库再赋予权限,权限为botVip则返回true,否则返回false,
     */
    return true;
  });
}
