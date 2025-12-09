import { Context, Channel, User, Session } from "koishi";
import { Config } from "../index";
import dayjs from "dayjs";

declare module "koishi" {
  interface Session {
    expireTime: string; //到期时间
    groupServer: string; //默认区服
    roleName: string; //角色名称
    userServer: string; //角色区服
  }
}
export function setupPermissions(ctx: Context, config: Config) {
  //校验权限
  ctx.on("command/before-execute", async ({ session, ...argv }) => {
    //白名单指令数组
    const whiteList = ["绑定区服", "绑定角色", "续期", "添加时间", "状态"];
    if (whiteList.includes(argv.command.name)) return;

    //验证服务是否过期
    const hasPermission = await ctx.permissions.test(["instructions.isServiceValid"], session);
    if (!hasPermission) return "服务已过期，请续期后重试";
  });

  // 设置instructions.isServiceValid权限
  ctx.permissions.provide("instructions.isServiceValid", async (name, session) => {
    const channel = await session.getChannel(session.guildId, ["expireTime", "groupServer"]);

    const isAfter = dayjs(channel.expireTime).isAfter(dayjs());
    return isAfter;
  });
}
