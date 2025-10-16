import { Command, Context } from "koishi";
import dayjs from "dayjs";
export const name = "instructions-commands";
export interface Config {}

export function instructionsCommands(ctx: Context, config: Config) {
  //服务器活动日历查询
  ctx
    .command("日常 [server]", "查询服务器活动日历")
    .alias("每日")
    .action(async (context, server) => {
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
          <br />
          <p>家园声望·加倍道具</p>
          <p>{res.data.card.join(";")}</p>
          <p>武林通鉴·公共任务</p>
          <p>{res.data.team[0]}</p>
          <p>武林通鉴·秘境任务</p>
          <p>{res.data.team[1]}</p>
          <p>武林通鉴·团队秘境</p>
          <p>{res.data.team[2]}</p>
        </>
      );
    });

  // 基础命令
  ctx.command("月历", "查询服务器活动月历").action(async () => {
    const res = await ctx.jx3api.getActiveListCalendar({ num: 15 });
    if (res.msg !== "success") return <p>查询服务器活动月历失败</p>;
    const screenshot = await ctx.jx3Render.render("ActiveList", res.data, "ActiveList", false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });
  //楚天社
  ctx.command("楚天社", "查询楚天社进度").action(async () => {
    const res = await ctx.jx3api.getActiveCelebs({ name: "楚天社" });
    if (res.msg !== "success") return <p>查询楚天社进度失败</p>;
    const screenshot = await ctx.jx3Render.render("celebs", res.data, "celebs楚天社", false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });
  //云从社
  ctx.command("云从社", "查询云从社进度").action(async () => {
    const res = await ctx.jx3api.getActiveCelebs({ name: "云从社" });
    if (res.msg !== "success") return <p>查询云从社进度失败</p>;
    const screenshot = await ctx.jx3Render.render("celebs", res.data, "celebs云从社", false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });
  //披风会
  ctx.command("披风会", "查询披风会进度").action(async () => {
    const res = await ctx.jx3api.getActiveCelebs({ name: "披风会" });
    if (res.msg !== "success") return <p>查询披风会进度失败</p>;
    const screenshot = await ctx.jx3Render.render("celebs", res.data, "celebs披风会", false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });

  //科举答案查询
  ctx.command("科举 [string]", "查询科举").action(async ({ session }, string) => {
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
  ctx.command("装饰 [name]", "查询家园装饰信息").action(async ({ session }, name) => {
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
  ctx.command("器物谱 [mapName]", "查阅地图产出的家具").action(async ({ session }, name) => {
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
  ctx.command("开服 [server]", "查询服务器开服信息").action(async ({ session }, server) => {
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
  ctx.command("服务器 [server]", "查询服务器状态").action(async ({ session }, server) => {
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
  ctx.command("技改", "查询技改记录").action(async () => {
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
  ctx.command("百战", "查询百战异闻录").action(async () => {
    const res = await ctx.jx3api.getActiveMonster();
    if (res.msg !== "success") return <p>查询百战异闻录失败</p>;
    const screenshot = await ctx.jx3Render.render("baizhan", res.data, `baizhan`, false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });

  //烟花统计
  ctx.command("烟花统计 [server] <num:number>", "查询烟花统计").action(async ({ session }, server, num = 1) => {
    const res = await ctx.jx3api.getFireworksCollect({ server, num });
    if (res.msg !== "success") return <p>未找到烟花统计：{server}</p>;
    const screenshot = await ctx.jx3Render.render("FireworksRecords", res.data, `FireworksRecords-${server}`, false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });

  //烟花记录查询
  ctx.command("烟花记录 [server] [name]", "查询烟花记录").action(async ({ session }, server, name) => {
    const res = await ctx.jx3api.getFireworksRecords({ server, name });
    if (res.msg !== "success") return <p>未找到烟花记录</p>;
    const screenshot = await ctx.jx3Render.render("UserFireworksRecords", res.data, `UserFireworksRecords-${server}-${name}`, false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });

  //拍卖纪录查询
  ctx.command("拍卖纪录 [server] [name]", "查询拍卖纪录").action(async ({ session }, server, name) => {
    const res = await ctx.jx3api.getAuctionRecords({ server, name });
    if (!(Array.isArray(res.data) && res.data.length)) return <p>查询拍卖纪录失败</p>;
    const screenshot = await ctx.jx3Render.render("AuctionRecord", res.data, `AuctionRecord-${server}-${name}`, false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });

  //的卢查询
  ctx
    .command("的卢 [server]", "查询的卢记录")
    .alias("的卢记录")
    .action(async ({ session }, server) => {
      const res = await ctx.jx3api.getDiluRecords({ server });
      if (!(Array.isArray(res.data) && res.data.length)) return <p>查询的卢记录失败</p>;
      const screenshot = await ctx.jx3Render.render("DiluRecord", res.data, `DiluRecord-${server}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  //黑历史查询
  ctx.command("查人 [uid:number]", "查询qq号黑历史").action(async ({ session }, uid) => {
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
  ctx.command("奇遇统计 [server] [name]", "查询奇遇统计").action(async ({ session }, server, name) => {
    const res = await ctx.jx3api.getLuckStatistical({ server, name });

    const screenshot = await ctx.jx3Render.render("ServerQiyuRecord", res.data, `ServerQiyuRecord-${server}-${name}`, false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });

  //奇遇汇总查询
  ctx.command("奇遇汇总 [server]", "查询奇遇汇总").action(async ({ session }, server) => {
    const res = await ctx.jx3api.getLuckRecent({ server });
    if (!(Array.isArray(res.data) && res.data.length)) return <p>没有查到奇遇数据</p>;
    const screenshot = await ctx.jx3Render.render("ServerQiyuSummary", res.data, `ServerQiyuSummary-${server}`, false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });

  //奇遇记录查询
  ctx.command("奇遇记录 [server] [name]", "查询奇遇记录").action(async ({ session }, server, name) => {
    const res = await ctx.jx3api.getLuckAdventure({ server, name });
    if (!(Array.isArray(res.data) && res.data.length)) return <p>没有查到奇遇记录</p>;
    const screenshot = await ctx.jx3Render.render("UserQiyuRecord", res.data, `UserQiyuRecord-${server}-${name}`, false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });
  //未出奇遇查询
  ctx
    .command("未出奇遇 [server] [name]", "查询缺失奇遇")
    .alias("缺失奇遇", "缺少奇遇")
    .action(async ({ session }, server, name) => {
      const res = await ctx.jx3api.getLuckUnfinished({ server, name });
      if (!(Array.isArray(res.data) && res.data.length)) return <p>没有查到缺失奇遇</p>;
      return (
        <>
          {res.data.map((item) => (
            <p>
              {item.type}-{item.name}
            </p>
          ))}
        </>
      );
    });

  ctx.command("招募 [server] [keyword]", "查询招募信息").action(async ({ session }, server, keyword) => {
    const res = await ctx.jx3api.getMemberRecruit({ server, keyword, table: 1 });
    if (!(Array.isArray(res.data.data) && res.data.data.length)) return <p>没有查到招募信息</p>;
    const screenshot = await ctx.jx3Render.render("MemberRecruit", res.data, `MemberRecruit-${server}-${keyword}`, false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });
  ctx
    .command("师父 [server] [keyword]", "查询师父信息")
    .alias("拜师")
    .action(async ({ session }, server, keyword) => {
      const res = await ctx.jx3api.getMemberTeacher({ server, keyword });
      if (!(Array.isArray(res.data.data) && res.data.data.length)) return <p>没有查到师父信息</p>;
      const screenshot = await ctx.jx3Render.render("MemberTeacher", res.data, `MemberTeacher-${server}`, false);
      return <img src={"data:image/png;base64," + screenshot} />;
    });

  ctx.command("徒弟 [server] [keyword]", "查询徒弟信息").action(async ({ session }, server, keyword) => {
    const res = await ctx.jx3api.getMemberStudent({ server, keyword });
    if (!(Array.isArray(res.data.data) && res.data.data.length)) return <p>没有查到徒弟信息</p>;
    const screenshot = await ctx.jx3Render.render("MemberStudent", res.data, `MemberStudent-${server}-${keyword}`, false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });
}
