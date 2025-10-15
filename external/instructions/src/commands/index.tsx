import { Context, Binary } from "koishi";
import * as fs from "fs";

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

  ctx.command("花价 [server]", "查询服务器花价").action(async ({ session }, server) => {
    const res = await ctx.jx3api.getHomeFlower({ server });
    console.log(res.data);
    console.log(res.data["枫叶泊·乐苑"][0]);

    return;
  });
}
