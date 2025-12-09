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

const whiteList = [
  "绑定区服",
  "绑定角色",
  "续期",
  "添加时间",
  "状态",
  "开启开服监控",
  "关闭开服监控",
  "开启新闻播报",
  "关闭新闻播报",
  "开启更新播报",
  "关闭更新播报",
  "开启奇遇播报",
  "关闭奇遇播报",
  "开启八卦播报",
  "关闭八卦播报",
  "开启马驹播报",
  "关闭马驹播报",
  "开启扶摇播报",
  "关闭扶摇播报",
  "开启烟花播报",
  "关闭烟花播报",
  "开启玄晶播报",
  "关闭玄晶播报",
  "开启的卢播报",
  "关闭的卢播报",
  "开启据点播报",
  "关闭据点播报",
  "开启帮会宣战",
  "关闭帮会宣战",
  "开启追魂播报",
  "关闭追魂播报",
  "开启诛恶事件",
  "关闭诛恶事件",
];

export function setupPermissions(ctx: Context, config: Config) {
  //校验权限
  ctx.on("command/before-execute", async ({ session, ...argv }) => {
    //白名单指令数组
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
