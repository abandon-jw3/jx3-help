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
    .alias("绑定服务器")
    .action(async ({ session }, server) => {
      const roles = session.author?.roles || [];
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

  //查看群组状态
  ctx
    .guild()
    .command("状态", "获取本群服务状态")
    .action(async ({ session }) => {
      const channel = await ctx.database.getChannel(session.platform, session.guildId);
      const screenshot = await ctx.jx3render.render("channelStatus", channel, `channelStatus-${session.channelId}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  ctx
    .guild()
    .command("开启开服监控", "开启本群开服监控")
    .alias("开启开服")
    .channelFields(["kaifu"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.kaifu = true;
      return "开启成功！";
    });

  ctx
    .guild()
    .command("关闭开服监控", "关闭本群开服监控")
    .alias("关闭开服")
    .channelFields(["kaifu"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.kaifu = false;
      return "关闭成功！";
    });

  // 新闻播报
  ctx
    .guild()
    .command("开启新闻播报", "开启本群新闻播报")
    .alias("开启新闻")
    .channelFields(["xinwen"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.xinwen = true;
      return "开启成功！";
    });
  ctx
    .guild()
    .command("关闭新闻播报", "关闭本群新闻播报")
    .alias("关闭新闻")
    .channelFields(["xinwen"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.xinwen = false;
      return "关闭成功！";
    });

  // 更新播报
  ctx
    .guild()
    .command("开启更新播报", "开启本群更新播报")
    .alias("开启更新")
    .channelFields(["gengxin"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.gengxin = true;
      return "开启成功！";
    });
  ctx
    .guild()
    .command("关闭更新播报", "关闭本群更新播报")
    .alias("关闭更新")
    .channelFields(["gengxin"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.gengxin = false;
      return "关闭成功！";
    });

  // 奇遇播报
  ctx
    .guild()
    .command("开启奇遇播报", "开启本群奇遇播报")
    .alias("开启奇遇")
    .channelFields(["qiyu"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.qiyu = true;
      return "开启成功！";
    });
  ctx
    .guild()
    .command("关闭奇遇播报", "关闭本群奇遇播报")
    .alias("关闭奇遇")
    .channelFields(["qiyu"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.qiyu = false;
      return "关闭成功！";
    });

  // 八卦播报
  ctx
    .guild()
    .command("开启八卦播报", "开启本群八卦播报")
    .alias("开启八卦")
    .channelFields(["bagua"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.bagua = true;
      return "开启成功！";
    });
  ctx
    .guild()
    .command("关闭八卦播报", "关闭本群八卦播报")
    .alias("关闭八卦")
    .channelFields(["bagua"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.bagua = false;
      return "关闭成功！";
    });

  // 马驹播报
  ctx
    .guild()
    .command("开启马驹播报", "开启本群马驹播报")
    .alias("开启马驹")
    .channelFields(["maju"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.maju = true;
      return "开启成功！";
    });
  ctx
    .guild()
    .command("关闭马驹播报", "关闭本群马驹播报")
    .alias("关闭马驹")
    .channelFields(["maju"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.maju = false;
      return "关闭成功！";
    });

  // 扶摇播报
  ctx
    .guild()
    .command("开启扶摇播报", "开启本群扶摇播报")
    .alias("开启扶摇")
    .channelFields(["fuyao"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.fuyao = true;
      return "开启成功！";
    });
  ctx
    .guild()
    .command("关闭扶摇播报", "关闭本群扶摇播报")
    .alias("关闭扶摇")
    .channelFields(["fuyao"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.fuyao = false;
      return "关闭成功！";
    });

  // 烟花播报
  ctx
    .guild()
    .command("开启烟花播报", "开启本群烟花播报")
    .alias("开启烟花")
    .channelFields(["yanhua"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.yanhua = true;
      return "开启成功！";
    });
  ctx
    .guild()
    .command("关闭烟花播报", "关闭本群烟花播报")
    .alias("关闭烟花")
    .channelFields(["yanhua"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.yanhua = false;
      return "关闭成功！";
    });

  // 玄晶播报
  ctx
    .guild()
    .command("开启玄晶播报", "开启本群玄晶播报")
    .alias("开启玄晶")
    .channelFields(["xuanjing"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.xuanjing = true;
      return "开启成功！";
    });
  ctx
    .guild()
    .command("关闭玄晶播报", "关闭本群玄晶播报")
    .alias("关闭玄晶")
    .channelFields(["xuanjing"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.xuanjing = false;
      return "关闭成功！";
    });

  // 的卢播报
  ctx
    .guild()
    .command("开启的卢播报", "开启本群的卢播报")
    .alias("开启的卢")
    .channelFields(["dilu"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.dilu = true;
      return "开启成功！";
    });
  ctx
    .guild()
    .command("关闭的卢播报", "关闭本群的卢播报")
    .alias("关闭的卢")
    .channelFields(["dilu"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.dilu = false;
      return "关闭成功！";
    });

  // 据点播报
  ctx
    .guild()
    .command("开启据点播报", "开启本群据点播报")
    .alias("开启据点")
    .channelFields(["judian"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.judian = true;
      return "开启成功！";
    });
  ctx
    .guild()
    .command("关闭据点播报", "关闭本群据点播报")
    .alias("关闭据点")
    .channelFields(["judian"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.judian = false;
      return "关闭成功！";
    });

  // 帮会宣战
  ctx
    .guild()
    .command("开启帮会宣战", "开启本群帮会宣战")
    .alias("开启宣战")
    .channelFields(["xuanzhan"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.xuanzhan = true;
      return "开启成功！";
    });
  ctx
    .guild()
    .command("关闭帮会宣战", "关闭本群帮会宣战")
    .alias("关闭宣战")
    .channelFields(["xuanzhan"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.xuanzhan = false;
      return "关闭成功！";
    });

  // 追魂播报
  ctx
    .guild()
    .command("开启追魂播报", "开启本群追魂播报")
    .alias("开启追魂")
    .channelFields(["zhuihun"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.zhuihun = true;
      return "开启成功！";
    });
  ctx
    .guild()
    .command("关闭追魂播报", "关闭本群追魂播报")
    .alias("关闭追魂")
    .channelFields(["zhuihun"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.zhuihun = false;
      return "关闭成功！";
    });

  // 诛恶事件
  ctx
    .guild()
    .command("开启诛恶事件", "开启本群诛恶事件")
    .alias("开启诛恶")
    .channelFields(["zhue"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.zhue = true;
      return "开启成功！";
    });
  ctx
    .guild()
    .command("关闭诛恶事件", "关闭本群诛恶事件")
    .alias("关闭诛恶")
    .channelFields(["zhue"])
    .action(async ({ session }) => {
      const roles = session.author?.roles || [];
      const isAdmin = roles.includes("admin");
      const isOwner = roles.includes("owner");
      if (!isAdmin && !isOwner) return "你没有权限执行此操作。";
      session.channel.zhue = false;
      return "关闭成功！";
    });
}
