import { Context } from "koishi";
export const name = "instructions-commands";
export interface Config {}

export function instructionsCommands(ctx: Context, config: Config) {
  ctx.on("jx3ws.1001", (data) => {
    console.log(data);
  });
  ctx.on("jx3ws.2004", (data) => {
    console.log(data);
  });
  // 基础命令
  ctx
    .command("日常 [server]", "查询服务器活动日历")
    .alias("每日")
    .action(async ({ session }, server) => {
      const res = await ctx.jx3api.getActiveCalendar({ server, num: 0 });
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

    //调用render渲染图片，并返回base64
    const screenshot = await ctx.jx3Render.render("ActiveList", res.data, "ActiveList", false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });
  //楚天社
  ctx.command("楚天社", "查询楚天社进度").action(async () => {
    const res = await ctx.jx3api.getActiveCelebs({ name: "楚天社" });

    //调用render渲染图片，并返回base64
    const screenshot = await ctx.jx3Render.render("celebs", res.data, "celebs楚天社", false);
    //将screenshot buffer转换为base64
    return <img src={"data:image/png;base64," + screenshot} />;
  });
  //云从社
  ctx.command("云从社", "查询云从社进度").action(async () => {
    const res = await ctx.jx3api.getActiveCelebs({ name: "云从社" });
    //调用render渲染图片，并返回base64
    const screenshot = await ctx.jx3Render.render("celebs", res.data, "celebs云从社", false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });
  //披风会
  ctx.command("披风会", "查询披风会进度").action(async () => {
    const res = await ctx.jx3api.getActiveCelebs({ name: "披风会" });
    //调用render渲染图片，并返回base64
    const screenshot = await ctx.jx3Render.render("celebs", res.data, "celebs披风会", false);
    return <img src={"data:image/png;base64," + screenshot} />;
  });
  //科举
  ctx.command("科举 [string]", "查询科举").action(async ({ session }, string) => {
    const res = await ctx.jx3api.getExamAnswer({ subject: string, limit: 3 });
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

  ctx
    .command("新闻", "查询新闻")
    .alias("公告")
    .action(async () => {
      const res = await ctx.jx3api.getAllNews({ limit: 3 });

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

  ctx.command("开服 [server]", "查询服务器开服信息").action(async ({ session }, server) => {
    const res = await ctx.jx3api.getServerCheck({ server });
    console.log(res);

    return (
      <>
        <p>服务器：{res.data.server}</p>
        <p>状 态：{res.data.status == 1 ? "已开服" : "维护中"}</p>
      </>
    );
  });
  ctx.command("服务器 [server]", "查询服务器状态").action(async ({ session }, server) => {
    const res = await ctx.jx3api.getServerStatus({ server });
    console.log(res);

    return (
      <>
        <p>服务器：{res.data.server}</p>
        <p>热 度：{res.data.status}</p>
      </>
    );
  });

  ctx
    .command("维护", "查询维护公告")
    .alias("维护公告")
    .action(async () => {
      const res = await ctx.jx3api.getNewsAnnounce({ limit: 3 });

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

  ctx.command("技改", "查询技改记录").action(async () => {
    const res = await ctx.jx3api.getSkillRecords();
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

  ctx.command("百战", "查询百战异闻录").action(async () => {
    const res = await ctx.jx3api.getActiveMonster();
    console.log(res);

    return null;
  });
}
