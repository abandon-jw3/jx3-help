import { Context } from "koishi";
import dayjs from "dayjs";
export const name = "jx3Auth-commands";
export interface Config {}

export function jx3AuthCommands(ctx: Context, config: Config) {
  ctx
    .guild()
    .command("绑定区服 <服务器>", "绑定群聊默认区服")
    .channelFields(["groupServer"])
    .alias("绑定")
    .action(async ({ session }, server) => {
      // 获取当前会话角色列表
      const roles = session.author?.roles || [];
      // 判断是否为群主或管理员
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      if (!server) {
        await session.send("请输入区服：");
        server = await session.prompt(60000);
        if (!server) return "输入超时。";
      }
      session.channel.groupServer = server;
      return `绑定成功！当前群绑定区服【${server}】`;
    });

  ctx
    .command("绑定角色 <服务器> <角色名>", "绑定个人默认区服和角色")
    .userFields(["userServer", "roleName"])
    .action(async ({ session }, server, role) => {
      if (!server) {
        await session.send("请输入区服：");
        server = await session.prompt(60000);
        if (!server) return "输入超时。";
      }
      if (!role) {
        await session.send("请输入角色名：");
        role = await session.prompt(60000);
        if (!role) return "输入超时。";
      }
      session.user.userServer = server;
      session.user.roleName = role;
      return `绑定成功！当前服务器【${server}】的【${role}】`;
    });

  ctx
    .guild()
    .command("添加时间 <天数:number>", "为当前群组添加到期时间")
    .channelFields(["expireTime"])
    .action(async (arg, day = 30) => {
      const channel = arg.session.channel;
      //当前到期时间
      const expireTime = channel.expireTime;
      //判断到期时间是否大于当前时间
      if (dayjs(expireTime).isAfter(dayjs())) {
        channel.expireTime = dayjs(expireTime).add(day, "day").format("YYYY-MM-DD");
      } else {
        channel.expireTime = dayjs().add(day, "day").format("YYYY-MM-DD");
      }
      return `添加成功！当前群到期时间【${channel.expireTime}】`;
    });
}
