import { Context, Session } from "koishi";
import dayjs from "dayjs";
import { ArgParser, serverList, jjcModel } from "../tools";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
export const name = "instructions-commands";
export interface Config {}

const getDefaultServerAndName = (session) => {
  const { groupServer } = session.channel;
  const { userServer, roleName } = session.user;
  return {
    groupServer,
    userServer,
    roleName,
  };
};
export function instructionsCommands(ctx: Context, config: Config) {
  //服务器活动日历查询
  ctx
    .guild()
    .command("日常 [服务器]", "查询服务器活动日历")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .alias("每日")
    .action(async ({ session }, server) => {
      const { groupServer } = session.channel;
      const { userServer } = session.user;
      if (!server) server = groupServer || userServer;
      const res = await ctx.jx3api.getActiveCalendar({ server, num: 0 });
      if (res.msg !== "success") return <p>查询服务器活动日历失败</p>;
      return (
        <>
          <p>
            当前时间：{res.data.date} 星期{res.data.week}
          </p>
          <p>秘境大战：{res.data.war}</p>
          <p>战场任务：{res.data.battle}</p>
          <p>宗门事件：{res.data.school}</p>
          <p>驰援任务：{res.data.rescue}</p>
          <p>阵营任务：{res.data.orecar}</p>
          <p>福源宠物：{res.data.luck.join(";")}</p>
          {["二", "四"].includes(res.data.week) ? <p>小攻防：20:00-22:00</p> : null}
          {["六", "日"].includes(res.data.week) ? <p>大攻防：13:00-15:00,17:00-19:00</p> : null}
          {res.data.draw ? <p>美人画像：{res.data.draw} </p> : null}
          <br />
          <p>家园声望·加倍道具</p>
          <p>{res.data.card.join(";")}</p>
          <p>武林通鉴·公共任务</p>
          <p>{res.data.team[0]}</p>
          <p>武林通鉴·团队秘境</p>
          <p>{res.data.team[2]}</p>
        </>
      );
    });

  // 基础命令
  ctx
    .guild()
    .command("月历", "查询服务器活动月历")
    .action(async () => {
      const res = await ctx.jx3api.getActiveListCalendar({ num: 15 });
      const week = dayjs(res.data.data[0].date).isoWeekday();
      const arr = Array.from({ length: week - 1 }).fill(false);
      res.data.data.unshift(...(arr as any));
      if (res.msg !== "success") return <p>查询服务器活动月历失败</p>;
      const screenshot = await ctx.jx3render.render("ActiveList", res.data, "ActiveList", false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });
  //楚天社
  ctx
    .guild()
    .command("楚天社", "查询楚天社进度")
    .action(async () => {
      const res = await ctx.jx3api.getActiveCelebs({ name: "楚天社" });
      if (res.msg !== "success") return <p>查询楚天社进度失败</p>;
      const screenshot = await ctx.jx3render.render("celebs", res.data, "celebs楚天社", false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });
  //云从社
  ctx
    .guild()
    .command("云从社", "查询云从社进度")
    .action(async () => {
      const res = await ctx.jx3api.getActiveCelebs({ name: "云从社" });
      if (res.msg !== "success") return <p>查询云从社进度失败</p>;
      const screenshot = await ctx.jx3render.render("celebs", res.data, "celebs云从社", false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });
  //披风会
  ctx
    .guild()
    .command("披风会", "查询披风会进度")
    .action(async () => {
      const res = await ctx.jx3api.getActiveCelebs({ name: "披风会" });
      if (res.msg !== "success") return <p>查询披风会进度失败</p>;
      const screenshot = await ctx.jx3render.render("celebs", res.data, "celebs披风会", false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //科举答案查询
  ctx
    .guild()
    .command("科举 [string]", "查询科举")
    .action(async (_, string) => {
      if (!string) return <p>请输入题目信息</p>;
      const res = await ctx.jx3api.getExamAnswer({ subject: string, limit: 3 });
      if (res.msg !== "success") return <p>查询科举失败</p>;
      if (res.data.length === 0) return <p>未找到科举：{string}</p>;
      return (
        <>
          {res.data.map((item) => (
            <>
              <p>Q：{item.question}</p>
              <p>A：{item.answer}</p>
              <br />
            </>
          ))}
        </>
      );
    });

  //家园装饰查询
  ctx
    .guild()
    .command("装饰 [名称]", "查询家园装饰信息")
    .action(async (_, name) => {
      if (!name) return <p>请输入装饰名称</p>;
      const res = await ctx.jx3api.getHomeFurniture({ name });
      if (res.msg !== "success") return <p>未找到装饰：{name}</p>;
      return (
        <>
          {res.data.map((item) => {
            return (
              <>
                <img src={item.image} />
                <br />
                <p>装饰-{item.name}</p>
                <p>来源：{item.source}</p>
                <p>品质：{item.quality}</p>
                <p>价格：{item.architecture}</p>
                <p>需要家园等级：{item.limit}</p>
                <p>风水评分：{item.geomantic}</p>
                <p>观赏评分：{item.view}</p>
                <p>实用评分：{item.practical}</p>
                <p>坚固评分：{item.hard}</p>
                <p>{item.tip}</p>
              </>
            );
          })}
        </>
      );
    });

  //器物谱查询
  ctx
    .guild()
    .command("器物谱 [地图]", "查阅地图产出的家具")
    .action(async ({ session }, name) => {
      if (!name) {
        await session.send("请输入地图名称：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getHomeTravel({ name });
      if (res.msg !== "success") return <p>未找到家具：{name}</p>;
      return (
        <>
          {res.data.map((item) => {
            return (
              <>
                <img src={item.image} />
                <br />
                <p>家具-{item.name}</p>
                <p>来源：{item.source}</p>
                <p>品质：{item.quality}</p>
                <p>价格：{item.architecture}</p>
                <p>需要家园等级：{item.limit}</p>
                <p>风水评分：{item.geomantic}</p>
                <p>观赏评分：{item.view}</p>
                <p>实用评分：{item.practical}</p>
                <p>坚固评分：{item.hard}</p>
                <p>{item.tip}</p>
              </>
            );
          })}
        </>
      );
    });

  //官方新闻查询
  ctx
    .guild()
    .command("新闻", "查询新闻")
    .alias("公告")
    .action(async () => {
      const res = await ctx.jx3api.getAllNews({ limit: 3 });
      if (res.msg !== "success") return <p>查询新闻失败</p>;
      return (
        <>
          {res.data.map((item) => {
            return (
              <>
                <p>{item.class}</p>
                <p>{item.title}</p>
                <p>{item.date}</p>
                <p>{item.url}</p>
                <br />
              </>
            );
          })}
        </>
      );
    });

  //开服信息查询
  ctx
    .guild()
    .command("开服 [服务器]", "查询服务器开服信息")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .action(async ({ session }, server) => {
      if (!server) server = session.channel.groupServer || session.user.userServer;
      const res = await ctx.jx3api.getServerCheck({ server });
      if (res.msg !== "success") return <p>查询服务器开服信息失败</p>;
      return (
        <>
          <p>服务器：{res.data.server}</p>
          <p>状 态：{res.data.status == 1 ? "已开服" : "维护中"}</p>
        </>
      );
    });
  //服务器状态查询
  ctx
    .guild()
    .command("服务器 [服务器]", "查询服务器状态")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .action(async ({ session }, server) => {
      if (!server) server = session.channel.groupServer || session.user.userServer;
      const res = await ctx.jx3api.getServerStatus({ server });
      if (res.msg !== "success") return <p>查询服务器状态失败</p>;
      return (
        <>
          <p>服务器：{res.data.server}</p>
          <p>热 度：{res.data.status}</p>
        </>
      );
    });

  //维护公告查询
  ctx
    .guild()
    .command("维护", "查询维护公告")
    .alias("维护公告")
    .action(async () => {
      const res = await ctx.jx3api.getNewsAnnounce({ limit: 3 });
      if (res.msg !== "success") return <p>查询维护公告失败</p>;

      return (
        <>
          {res.data.map((item) => {
            return (
              <>
                <p>{item.class}</p>
                <p>{item.title}</p>
                <p>{item.date}</p>
                <p>{item.url}</p>
                <br />
              </>
            );
          })}
        </>
      );
    });

  //技改查询
  ctx
    .guild()
    .command("技改", "查询技改记录")
    .action(async () => {
      const res = await ctx.jx3api.getSkillRecords();
      if (res.msg !== "success") return <p>查询技改记录失败</p>;
      const arr = res.data.slice(0, 3);
      return (
        <>
          {arr.map((item) => {
            return (
              <>
                <p>{item.title}</p>
                <p>{item.time}</p>
                <p>{item.url}</p>
                <br />
              </>
            );
          })}
        </>
      );
    });

  //百战查询
  ctx
    .guild()
    .command("百战", "查询百战异闻录")
    .action(async () => {
      const res = await ctx.jx3api.getActiveMonster();
      if (res.msg !== "success") return <p>查询百战异闻录失败</p>;
      const screenshot = await ctx.jx3render.render("baizhan", res.data, `baizhan`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //烟花统计
  ctx
    .guild()
    .command("烟花统计 [服务器]", "查询烟花统计")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .action(async ({ session }, server) => {
      if (!server) server = session.channel.groupServer || session.user.userServer;
      const res = await ctx.jx3api.getFireworksCollect({ server, num: 7 });
      if (res.msg !== "success") return <p>未找到烟花统计：{server}</p>;
      const screenshot = await ctx.jx3render.render("FireworksRecords", res.data, `FireworksRecords-${server}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //烟花记录查询
  ctx
    .guild()
    .command("烟花记录 [服务器] [角色]", "查询烟花记录")
    .channelFields(["groupServer"])
    .userFields(["userServer", "roleName"])
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg);
      let server = parser.tryMatch("server", serverList);
      if (!server) server = session.channel.groupServer || session.user.userServer;
      let name = parser.getRemaining()[0] || session.user.roleName;
      if (!name) {
        await session.send("请输入角色名：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getFireworksRecords({ server, name });
      if (res.msg !== "success") return <p>未找到烟花记录</p>;
      const screenshot = await ctx.jx3render.render("UserFireworksRecords", res.data, `UserFireworksRecords-${server}-${name}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //拍卖纪录查询
  ctx
    .guild()
    .command("拍卖纪录 [服务器] [物品名]", "查询拍卖纪录")
    .channelFields(["groupServer"])
    .userFields(["userServer", "roleName"])
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg); //创建参数解析器
      let server = parser.tryMatch("server", serverList); //尝试匹配服务器
      if (!server) server = session.channel.groupServer || session.user.userServer;
      let name = parser.getRemaining()[0] || session.user.roleName; //获取剩余参数
      if (!name) {
        await session.send("请输入物品名称：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getAuctionRecords({ server, name });
      if (!(Array.isArray(res.data) && res.data.length)) return <p>查询拍卖纪录失败</p>;
      const screenshot = await ctx.jx3render.render("AuctionRecord", res.data, `AuctionRecord-${server}-${name}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //的卢查询
  ctx
    .guild()
    .command("的卢 [server]", "查询的卢记录")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .alias("的卢记录")
    .action(async ({ session }, server) => {
      if (!server) server = session.channel.groupServer || session.user.userServer;
      const res = await ctx.jx3api.getDiluRecords({ server });
      if (!(Array.isArray(res.data) && res.data.length)) return <p>查询的卢记录失败</p>;
      const screenshot = await ctx.jx3render.render("DiluRecord", res.data, `DiluRecord-${server}`, false);
      return (
        <>
          <p>的卢-{server}</p>
          <img src={"data:image/png;base64," + screenshot} />
        </>
      );
    });

  //黑历史查询
  ctx
    .guild()
    .command("查人 [uid]", "查询qq号黑历史")
    .action(async ({ session }, uid) => {
      if (!uid) {
        await session.send("请输入QQ号：");
        uid = await session.prompt();
        if (!uid) return "输入超时。";
      }
      const res = await ctx.jx3api.getFraudDetailed({ uid });
      if (!res.data.records.length) return <p>未找到{uid}的qq号贴吧黑历史</p>;
      res.data.records.forEach((item) => {
        item.data.forEach((item) => {
          item.time = dayjs.unix(item.time).format("YYYY-MM-DD HH:mm:ss") as any;
        });
      });
      const count = res.data.records.reduce((acc, item) => acc + item.data.length, 0);
      return (
        <>
          <p>注意！！！，该用户在贴吧有【{count}】条黑历史，以下为部分数据</p>
          <br />
          {res.data.records.map((item) => {
            return (
              <>
                <p>
                  {item.tieba}吧：{item.data.length}条
                </p>
                {item.data.map((item) => {
                  return (
                    <>
                      <p>主题：{item.title}</p>
                      <p>内容：{item.text}</p>
                      <p>时间：{item.time}</p>
                      <p>链接：{"https://tieba.baidu.com/p/" + item.tid}</p>
                      <br />
                    </>
                  );
                })}
                <br />
              </>
            );
          })}
        </>
      );
    });

  //奇遇统计查询
  ctx
    .guild()
    .command("奇遇统计 [服务器] [奇遇名称]", "查询奇遇统计")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg);
      let server = parser.tryMatch("server", serverList);

      if (!server) server = session.channel.groupServer || session.user.userServer;
      let name = parser.getRemaining()[0] || "";

      if (!name) {
        await session.send("请输入要查询的奇遇名称：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }

      const res = await ctx.jx3api.getLuckStatistical({ server, name });
      if (res.msg !== "success") return <p>{res.msg}</p>;
      const screenshot = await ctx.jx3render.render("ServerQiyuRecord", res.data, `ServerQiyuRecord-${server}-${name}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //奇遇汇总查询
  ctx
    .guild()
    .command("奇遇汇总 [服务器]", "查询服务器奇遇汇总")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .action(async ({ session }, server) => {
      if (!server) server = session.channel.groupServer || session.user.userServer;
      const res = await ctx.jx3api.getLuckRecent({ server });
      if (!(Array.isArray(res.data) && res.data.length)) return <p>没有查到奇遇数据</p>;
      const screenshot = await ctx.jx3render.render("ServerQiyuSummary", res.data, `ServerQiyuSummary-${server}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //角色奇遇记录查询
  ctx
    .guild()
    .command("奇遇 [服务器] [角色名]", "查询奇遇记录")
    .channelFields(["groupServer"])
    .userFields(["userServer", "roleName"])
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg);
      let server = parser.tryMatch("server", serverList);
      if (!server) server = session.channel.groupServer || session.user.userServer;
      let name = parser.getRemaining()[0] || "";
      if (!name) {
        await session.send("请输入角色名：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getLuckAdventure({ server, name });
      if (!(Array.isArray(res.data) && res.data.length)) return <p>没有查到奇遇记录</p>;
      const screenshot = await ctx.jx3render.render("UserQiyuRecord", res.data, `UserQiyuRecord-${server}-${name}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });
  //未出奇遇查询
  ctx
    .guild()
    .command("未出奇遇 [服务器] [角色名]", "查询角色缺失奇遇")
    .channelFields(["groupServer"])
    .userFields(["userServer", "roleName"])
    .alias("缺失奇遇", "缺少奇遇")
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg);
      let server = parser.tryMatch("server", serverList);
      if (!server) server = session.channel.groupServer || session.user.userServer;
      let name = parser.getRemaining()[0] || "";
      if (!name) {
        await session.send("请输入角色名：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getLuckUnfinished({ server, name });
      if (!(Array.isArray(res.data) && res.data.length)) return <p>没有查到缺失奇遇</p>;
      return (
        <>
          <p>服务器：{server}</p>
          <p>角色名：{name}</p>
          <br />
          {res.data.map((item) => (
            <p>
              {item.type}-{item.name}
            </p>
          ))}
        </>
      );
    });

  // ctx
  //   .guild()
  //   .command("奇遇汇总 [server]", "查询奇遇汇总")
  //   .action(async (_, server) => {
  //     const res = await ctx.jx3api.getLuckCollect({ server });
  //     if (res.msg !== "success") return <>{res.msg}</>;
  //   });
  //招募
  ctx
    .guild()
    .command("招募 [服务器] [关键词]", "查询招募信息")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg);
      let server = parser.tryMatch("server", serverList);
      if (!server) server = session.channel.groupServer || session.user.userServer;
      let keyword = parser.getRemaining()[0] || "";
      if (!keyword) {
        await session.send("请输入要查询的招募关键词：");
        keyword = await session.prompt();
        if (!keyword) return "输入超时。";
      }

      const res = await ctx.jx3api.getMemberRecruit({ server, keyword, table: 1 });
      if (!(Array.isArray(res.data.data) && res.data.data.length)) return <p>没有查到招募信息</p>;
      const screenshot = await ctx.jx3render.render("MemberRecruit", res.data, `MemberRecruit-${server}-${keyword}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //师父
  ctx
    .guild()
    .command("师父 [服务器] [关键字]", "查询师父信息")
    .alias("拜师")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg);
      let server = parser.tryMatch("server", serverList);
      if (!server) server = session.channel.groupServer || session.user.userServer;
      let keyword = parser.getRemaining()[0] || "";
      if (!keyword) {
        await session.send("请输入要查询的师父关键字：");
        keyword = await session.prompt();
        if (!keyword) return "输入超时。";
      }
      const res = await ctx.jx3api.getMemberTeacher({ server, keyword });
      if (!(Array.isArray(res.data.data) && res.data.data.length)) return <p>没有查到师父信息</p>;
      const screenshot = await ctx.jx3render.render("MemberTeacher", res.data, `MemberTeacher-${server}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //徒弟
  ctx
    .guild()
    .command("徒弟 [服务器] [关键字]", "查询徒弟信息")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg);
      let server = parser.tryMatch("server", serverList);
      if (!server) server = session.channel.groupServer || session.user.userServer;
      let keyword = parser.getRemaining()[0] || "";
      if (!keyword) {
        await session.send("请输入要查询的徒弟关键字：");
        keyword = await session.prompt();
        if (!keyword) return "输入超时。";
      }
      const res = await ctx.jx3api.getMemberStudent({ server, keyword });
      if (!(Array.isArray(res.data.data) && res.data.data.length)) return <p>没有查到徒弟信息</p>;
      const screenshot = await ctx.jx3render.render("MemberStudent", res.data, `MemberStudent-${server}-${keyword}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });
  //副本进度
  ctx
    .guild()
    .command("副本 [...arg]", "查询副本进度")
    .action(async (_, ...arg) => {
      const parser = new ArgParser(arg);
      const server = parser.tryMatch("server", serverList);
      const name = parser.getRemaining()[0] || "";
      if (!server || !name) return <p>请输入服务器和副本名</p>;
      const res = await ctx.jx3api.getTeamCdList({ server, name });
      if (res.msg !== "success") return <p>{res.msg}</p>;
      const screenshot = await ctx.jx3render.render("TeamCdList", res.data, `TeamCdList-${server}-${name}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });
  //全服掉落统计
  ctx
    .guild()
    .command("全服掉落 [物品名]", "查询全服掉落物品统计")
    .action(async ({ session }, name) => {
      if (!name) {
        await session.send("请输入要查询的物品名称：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getRewardServerStatistical({ name });
      if (res.msg !== "success") return <p>{res.msg}</p>;
      const data = { ...res, name };
      const screenshot = await ctx.jx3render.render("RewardServerStatistical", data, `RewardServerStatistical-${name}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //区服掉落统计
  ctx
    .guild()
    .command("掉落 [服务器] [物品名]", "查询区服掉落统计")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg);
      let server = parser.tryMatch("server", serverList);
      if (!server) server = session.channel.groupServer || session.user.userServer;
      let name = parser.getRemaining()[0] || "";
      if (!name) {
        await session.send("请输入要查询的物品名称：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      if (!server || !name) return <p>请输入服务器和副本名</p>;
      const res = await ctx.jx3api.getRewardStatistical({ server, name });
      if (res.msg !== "success") return <p>{res.msg}</p>;
      const screenshot = await ctx.jx3render.render("RewardStatistical", { ...res, name, server }, `RewardStatistical-${server}-${name}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //角色详情查询
  ctx
    .guild()
    .command("角色详情 [服务器] [角色名]", "查询角色详情")
    .alias("角色")
    .channelFields(["groupServer"])
    .userFields(["userServer", "roleName"])
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg);
      let server = parser.tryMatch("server", serverList);
      if (!server) server = session.channel.groupServer || session.user.userServer;
      let name = parser.getRemaining()[0] || session.user.roleName;
      if (!name) {
        await session.send("请输入角色名：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getRoleDetailed({ server, name });
      if (res.msg !== "success") return <p>{res.msg}</p>;
      return (
        <>
          <p>{res.data.roleName} · 详情</p>
          <p>服务器：{res.data.serverName}</p>
          <p>名称：{res.data.roleName}</p>
          <p>门派：{res.data.forceName}</p>
          <p>体型：{res.data.bodyName}</p>
          <p>阵营：{res.data.campName}</p>
          <p>帮会：{res.data.tongName}</p>
          <p>角色标识：{res.data.roleId}</p>
          <p>全服标识：{res.data.globalRoleId}</p>
        </>
      );
    });

  //心法奇穴
  ctx
    .guild()
    .command("奇穴 [心法名]", "查询心法奇穴信息")
    .action(async ({ session }, name) => {
      if (!name) {
        await session.send("请输入要查询的心法名称：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getSchoolForce({ name });
      if (res.msg !== "success") return <p>{res.msg}</p>;
      const screenshot = await ctx.jx3render.render("SchoolForce", { ...res, name }, `SchoolForce-${name}`, true);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //查询精耐
  ctx
    .guild()
    .command("精耐 [服务器] [角色名]", "查询角色精力信息")
    .channelFields(["groupServer"])
    .userFields(["userServer", "roleName"])
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg);
      let server = parser.tryMatch("server", serverList);
      if (!server) server = session.channel.groupServer || session.user.userServer;
      let name = parser.getRemaining()[0] || session.user.roleName;
      if (!name) {
        await session.send("请输入角色名：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getRoleMonster({ server, name });
      if (res.code == 404) return <p>未找到角色：{name},请确认角色名或在世界发言</p>;
      else if (res.msg !== "success") return <p>{res.msg}</p>;
      const screenshot = await ctx.jx3render.render("RoleMonster", { ...res, name, server }, `RoleMonster-${server}-${name}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //沙盘
  ctx
    .guild()
    .command("沙盘 [服务器] ", "查询服务器沙盘信息")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .action(async ({ session }, server) => {
      if (!server) server = session.channel.groupServer || session.user.userServer;
      const res = await ctx.jx3api.getServerSand({ server });
      const data = {
        server: res.data.server,
        reset: res.data.reset,
        update: res.data.update,
        data: {},
      };
      res.data.data.forEach((item) => {
        data.data[item.castleName] = { ...item, campId: item.campId === 1 ? "浩" : "恶" };
      });
      if (res.msg !== "success") return <p>{res.msg}</p>;
      const screenshot = await ctx.jx3render.render("ServerSand", data, `ServerSand-${server}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  ctx
    .guild()
    .command("成就 [服务器] [角色名] [成就名]", "查询角色成就信息")
    .channelFields(["groupServer"])
    .userFields(["userServer", "roleName"])
    .action(async ({ session }, ...arg) => {
      return <p>由于推栏属性接口升级维护，全网机器人目前无法获取相关数据；我们将会持续跟进，敬请期待功能恢复 ꒰꧞˃ 𛱊 ˂꒱</p>;

      // const parser = new ArgParser(arg);
      // let server = parser.tryMatch("server", serverList);
      // if (!server) server = session.channel.groupServer || session.user.userServer;
      // let name = parser.getRemaining()[0] || "";
      // if (!name) {
      //   await session.send("请输入要查询的成就名称：");
      //   name = await session.prompt();
      //   if (!name) return "输入超时。";
      // }

      // const res = await ctx.jx3api.getRoleAchievement({ server, role, name });
      // if (res.msg !== "success") return <>{res.msg}</>;
      // const screenshot = await ctx.jx3render.render("RoleAchievement", { ...res, name, role, server }, `RoleAchievement-${server}-${name}`, false);
      // return <img src={"data:image/png;base64," + screenshot} />;
    });
  ctx
    .guild()
    .command("属性 [服务器] [角色名]", "查询角色属性信息")
    .channelFields(["groupServer"])
    .userFields(["userServer", "roleName"])
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg);
      let server = parser.tryMatch("server", serverList);
      if (!server) server = session.channel.groupServer || session.user.userServer;
      let name = parser.getRemaining()[0] || session.user.roleName;
      if (!name) {
        await session.send("请输入要查询的角色名：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getRoleAttribute({ server, name });
      if (res.msg !== "success") return <>{res.msg}</>;
      const screenshot = await ctx.jx3render.render("RoleAttribute", res.data, `RoleAttribute-${server}-${name}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //心法阵眼
  ctx
    .guild()
    .command("阵眼 [心法名]", "查询心法阵眼信息")
    .action(async ({ session }, name) => {
      if (!name) {
        await session.send("请输入要查询的心法名称：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getSchoolMatrix({ name });
      if (res.msg !== "success") return <>{res.msg}</>;
      return (
        <>
          <p>
            {res.data.name}-{res.data.skillName}
          </p>
          <br />
          {res.data.descs.map((item) => (
            <>
              <p>{item.name}</p>
              <p>{item.desc}</p>
            </>
          ))}
        </>
      );
    });

  //诛恶查询
  ctx
    .guild()
    .command("诛恶 [服务器]", "查询服务器诛恶信息")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .action(async ({ session }, server) => {
      if (!server) server = session.channel.groupServer || session.user.userServer;
      const res = await ctx.jx3api.getServerAntivice({ server });
      if (res.msg !== "success") return <>{res.msg}</>;
      const screenshot = await ctx.jx3render.render("ServerAntivice", { ...res, server }, `ServerAntivice-${server}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //关隘查询
  ctx
    .guild()
    .command("关隘", "查询服务器关隘信息")
    .action(async (_) => {
      const res = await ctx.jx3api.getServerLeader();
      if (res.msg !== "success") return <>{res.msg}</>;
      const screenshot = await ctx.jx3render.render("ServerLeader", res, `ServerLeader`, false);
      return <img src={"data:image/png;base64," + screenshot} alt="服务器关隘信息" />;
    });

  //名片查询
  ctx
    .guild()
    .command("名片 [服务器] [角色名]", "查询服务器名片信息")
    .userFields(["userServer", "roleName"])
    .channelFields(["groupServer"])
    .action(async ({ session }, ...arg) => {
      const { groupServer, userServer, roleName } = getDefaultServerAndName(session);
      const parser = new ArgParser(arg);
      const server = parser.tryMatch("server", serverList) || groupServer || userServer;
      const name = parser.getRemaining()[0] || roleName || "";

      if (!server || !name) return <p>请输入服务器和角色名</p>;
      const res = await ctx.jx3api.getShowCache({ server, name });
      if (res.msg !== "success") return <>{res.msg}</>;
      return <img src={res.data.showAvatar} alt={`${res.data.serverName}-${res.data.roleName}`} />;
    });

  //随机名片
  ctx
    .guild()
    .command("随机名片", "查询随机名片信息")
    .action(async (_) => {
      const res = await ctx.jx3api.getShowRandom();
      if (res.msg !== "success") return <>{res.msg}</>;
      return <img src={res.data.showAvatar} alt={`${res.data.serverName}-${res.data.roleName}`} />;
    });
  //名片墙
  // ctx.command("名片墙 [...arg]", "查询服务器名片墙信息").action(async (_, ...arg) => {
  //   const parser = new ArgParser(arg);
  //   const server = parser.tryMatch("server", serverList);
  //   const name = parser.getRemaining()[0] || "";
  //   if (!server || !name) return <p>请输入服务器和角色名</p>;
  //   const res = await ctx.jx3api.getShowCard({ server, name });
  //   if (res.msg !== "success") return <>{res.msg}</>;
  //   return <img src={res.data.showAvatar} alt={`${res.data.serverName}-${res.data.roleName}`} />;
  // });
  //贴吧物价
  ctx
    .guild()
    .command("贴吧物价 [服务器] [物品名]", "查询服务器贴吧物价信息")
    .userFields(["userServer"])
    .channelFields(["groupServer"])
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg);
      let server = parser.tryMatch("server", serverList);
      if (!server) server = session.channel.groupServer || session.user.userServer;
      let name = parser.getRemaining()[0] || "";
      if (!name) {
        await session.send("请输入要查询的物品名称：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getTiebaItemRecords({ server, name, limit: 3 });
      if (res.msg !== "success") return <>{res.msg}</>;
      return (
        <>
          {res.data.map((item) => (
            <>
              <p>物品信息：{item.context}</p>
              <p>来源链接：{`https://c.tieba.baidu.com/p/${item.url}?pid=${item.id}#${item.floor}`}</p>
              <p>所在楼层：{item.floor}</p>
              <p>发布时间：{dayjs.unix(item.time).format("YYYY-MM-DD")}</p>
              <p>来源贴吧：{item.name}</p>
            </>
          ))}
        </>
      );
    });

  //金价比例
  ctx
    .guild()
    .command("金价比例 [服务器]", "查询服务器金价比例信息")
    .userFields(["userServer"])
    .channelFields(["groupServer"])
    .alias("金价")
    .action(async ({ session }, server) => {
      if (!server) server = session.channel.groupServer || session.user.userServer;
      const res = await ctx.jx3api.getTradeDemon({ server, limit: 1 });
      if (res.msg !== "success") return <>{res.msg}</>;
      return (
        <>
          {res.data.map((item) => (
            <>
              <p>
                {item.server} {item.date}
              </p>
              <p>万宝楼：{item.wanbaolou}</p>
              <p>贴&nbsp;吧：{item.tieba}</p>
              <p>dd373：{item.dd373}</p>
            </>
          ))}
        </>
      );
    });

  //骚话
  ctx
    .guild()
    .command("骚话", "查询骚话随机信息")
    .action(async (_) => {
      const res = await ctx.jx3api.getSaohuaRandom();
      if (res.msg !== "success") return <>{res.msg}</>;
      return <p>{res.data.text}</p>;
    });

  //舔狗日记
  ctx
    .guild()
    .command("舔狗日记", "查询舔狗日记信息")
    .action(async (_) => {
      const res = await ctx.jx3api.getSaohuaContent();
      if (res.msg !== "success") return <>{res.msg}</>;
      return <p>{res.data.text}</p>;
    });

  //扶摇
  ctx
    .guild()
    .command("扶摇 [服务器]", "查询扶摇信息")
    .userFields(["userServer"])
    .channelFields(["groupServer"])
    .action(async ({ session }, server) => {
      if (!server) server = session.channel.groupServer || session.user.userServer;
      const res = await ctx.jx3api.getActiveNextEvent({ server });
      if (res.msg !== "success") return <>{res.msg}</>;
      if (res.data[0].status === 0) {
        return (
          <p>
            {res.data[0].server} 下次梅花桩试炼的时间为：{dayjs.unix(res.data[0].time).format("YYYY年MM月DD日 HH时mm分ss秒")}
          </p>
        );
      } else {
        return <p>{res.data[0].server} 梅花桩试炼已开始</p>;
      }
    });

  //查询挂件信息
  ctx
    .guild()
    .command("挂件 [挂件名称] ", "查询挂件信息")
    .action(async ({ session }, name) => {
      if (!name) {
        await session.send("请输入要查询的挂件名称：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getArchivedPendant({ name });
      if (res.msg !== "success") return <>{res.msg}</>;
      return (
        <>
          {res.data.map((item) => (
            <>
              <p>名称：{item.name}</p>
              <p>描述：{item.desc}</p>
              <p>来源：{item.source}</p>
              <p>类型：{item.class}</p>
              <br />
            </>
          ))}
        </>
      );
    });

  //查询服务器宠物记录
  ctx
    .guild()
    .command("蹲宠 [服务器]", "查询服务器宠物记录")
    .userFields(["userServer"])
    .channelFields(["groupServer"])
    .action(async ({ session }, server) => {
      if (!server) server = session.channel.groupServer || session.user.userServer;
      const res = await ctx.jx3api.getArchivedPetEvent({ server });
      if (res.msg !== "success") return <>{res.msg}</>;
      const screenshot = await ctx.jx3render.render("ArchivedPetEvent", res.data, `ArchivedPetEvent-${server}`, false);
      return (
        <>
          <p>蹲宠：{server}</p>
          <img src={"data:image/png;base64," + screenshot} />
        </>
      );
    });

  //查询名剑大会排行榜
  ctx
    .guild()
    .command("名剑排行 [模式]", "查询名剑大会排行榜")
    .alias("jjc排行")
    .action(async (_, mode) => {
      const res = await ctx.jx3api.getArenaAwesome({ mode, limit: 50 });
      if (res.msg !== "success") return <>{res.msg}</>;
      const screenshot = await ctx.jx3render.render("ArenaAwesome", res.data, `ArenaAwesome-${mode}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  ctx
    .guild()
    .command("战绩 [服务器] [模式] [角色名]", "查询角色战绩信息")
    .action(async (_, ...arg) => {
      const parser = new ArgParser(arg);
      const server = parser.tryMatch("server", serverList);
      const mode = parser.tryMatch("mode", jjcModel) || 33; //22 33 55 默认33
      const name = parser.getRemaining()[0] || "";
      if (!server || !name) return <p>你发送的格式不正确，请按格式发送[战绩 服务器 角色名]...</p>;
      const res = await ctx.jx3api.getArenaRecent({ server, name, mode });
      if (res.msg !== "success") return <>{res.msg}</>;
      const pvpType = parseInt(String(mode)[0]);
      const key = `${pvpType}v${pvpType}`;
      const performance = res.data.performance[key];
      const screenshot = await ctx.jx3render.render("ArenaRecent", { ...res.data, performance }, `ArenaRecent-${server}-${name}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  ctx
    .guild()
    .command("门派表现 [模式]", "查询门派jjc表现信息")
    .action(async (_, mode = "33") => {
      const res = await ctx.jx3api.getArenaSchools({ mode });
      if (res.msg !== "success") return <>{res.msg}</>;
      res.data.sort((a, b) => b.this - a.this);
      const renderData = res.data.map((item) => ({ ...item, current: item.this }));
      const screenshot = await ctx.jx3render.render("ArenaSchools", renderData, `ArenaSchools-${mode}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });
  //赤兔
  ctx
    .guild()
    .command("赤兔", "查询赤兔幼驹刷新信息")
    .action(async (_) => {
      const res = await ctx.jx3api.getChituRecords();
      if (res.msg !== "success") return <>{res.msg}</>;
      return (
        <>
          <p>{dayjs().format("YYYY年MM月DD日")} 赤兔幼驹刷新预计</p>
          {res.data.map((item) => (
            <p>
              {item.server}-{item.map_name}
            </p>
          ))}
        </>
      );
    });

  //服务器马场信息
  ctx
    .guild()
    .command("马场 [服务器]", "查询马场信息")
    .channelFields(["groupServer"])
    .userFields(["userServer"])
    .action(async ({ session }, server) => {
      if (!server) server = session.channel.groupServer || session.user.userServer;
      const res = await ctx.jx3api.getHorseRanch({ server });
      if (res.msg !== "success") return <>{res.msg}</>;
      return (
        <>
          <p>{res.data.server} 马场信息</p>
          <br />
          {Object.keys(res.data.data).map((item) => (
            <p>
              {item}:{res.data.data[item].join(",")}
            </p>
          ))}
          {res.data.note && <p>{res.data.note}</p>}
        </>
      );
    });

  //在线
  ctx
    .guild()
    .command("在线 [...arg]", "查询在线信息")
    .action(async (_, ...arg) => {
      return "在线查询功能暂不可用，我们将会持续跟进，敬请期待功能恢复 ꒰꧞˃ 𛱊 ˂꒱";
      const parser = new ArgParser(arg);
      const server = parser.tryMatch("server", serverList);
      const name = parser.getRemaining()[0] || "";
      if (!server || !name) return <p>请输入服务器和角色名</p>;
      const res = await ctx.jx3api.getRoleOnlineStatus({ server, name });
      if (res.msg !== "success") return <>{res.msg}</>;
      return (
        <p>
          {res.data.serverName} 的 {res.data.roleName} 在线状态为：{res.data.onlineStatus ? "在线" : "离线"}
        </p>
      );
    });

  ctx
    .guild()
    .command("名片墙 [服务器] [角色名称]", "查询全部名片信息")
    .channelFields(["groupServer"])
    .userFields(["userServer", "roleName"])
    .action(async ({ session }, ...arg) => {
      const parser = new ArgParser(arg);
      let server = parser.tryMatch("server", serverList);
      if (!server) server = session.channel.groupServer || session.user.userServer;
      let name = parser.getRemaining()[0] || session.user.roleName || "";
      if (!name) {
        await session.send("请输入要查询的角色名称：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getShowRecords({ server, name });
      if (res.msg !== "success") return <>{res.msg}</>;
      return (
        <>
          <p>{name} 的名片墙</p>
          <p>
            {res.data.map((item) => (
              <img src={item.showAvatar} alt={`${item.serverName}-${item.roleName}`} />
            ))}
          </p>
        </>
      );
    });
  ctx
    .guild()
    .command("物价 [物品名称]", "统计指定物品的黑市价格信息")
    .action(async ({ session }, name) => {
      if (!name) {
        await session.send("请输入要查询的物品名称：");
        name = await session.prompt();
        if (!name) return "输入超时。";
      }
      const res = await ctx.jx3api.getTradeRecords({ name });
      if (res.msg !== "success") return <>{res.msg}</>;
      const screenshot = await ctx.jx3render.render("TradeRecords", res.data, `TradeRecords-${name}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  // ctx
  //   .guild()
  //   .command("群发")
  //   .action(async ({ session }) => {
  //     console.log(session);
  //     return;
  //     // 1. 定义你要发送的群号列表
  //     const groupIds = ["829022114"];
  //     // 2. 转换为 Koishi 的标准频道 ID 格式 (platform:id)
  //     const targetChannels = groupIds.map((id) => `onebot:${id}`);
  //     // 3. 发送消息
  //     // Koishi 会自动找到负责这些群的 OneBot 机器人并发送
  //     await ctx.broadcast(targetChannels, "群发测试");

  //     return <p>群发测试中...</p>;
  //   });
}
