import { Context } from "koishi";
import { Config } from "../index";

//扩展上下文类型
declare module "koishi" {
  interface Session {
    jx3HelpUserInfo?: {
      userId?: string; // 用户ID
      userName?: string; // 用户名
      //服务到期时间 格式为2025-11-24 10:00:00
      serviceExpireTime?: string;
    };
    jx3HelpGroupInfo?: {
      groupId?: string; // 群ID
      groupName?: string; // 群名
      //服务到期时间 格式为2025-11-24 10:00:00
      serviceExpireTime?: string;
    };
  }
}
export function setupPermissions(ctx: Context, config: Config) {
  // 设置instructions.botVip权限
  ctx.permissions.provide("instructions.botVip", (name, session) => {
    /**
     * 查询数据库再赋予权限,权限为botVip则返回true,否则返回false,
     */

    // 1. 扩展类型

    return true;
  });

  ctx.on("command/before-execute", async (argv) => {
    // argv.command 是当前要执行的指令对象
    // session 是当前的会话对象
    // console.log(argv.command.name);
    // const hasPermission = await ctx.permissions.test(["instructions.botVip"], argv.session);
    // console.log(hasPermission);
  });
}
