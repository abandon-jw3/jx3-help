import { Context, Random } from "koishi";

import dayjs from "dayjs";
export const name = "instructions-events";

export interface Config {}

export function instructionsEvents(ctx: Context, config: Config) {
  type event1001 = {
    action: 1001;
    data: {
      zone: string;
      server: string;
      name: string;
      event: string;
      level: 1 | 2;
      time: number;
    };
  };
  //奇遇报时
  ctx.on("jx3ws.1001", async (data: event1001) => {
    const { server, name, event } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "qiyu"]);
    const list = channels.filter((channel) => channel.qiyu);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>奇遇播报</p>
        <p>
          {server}的【{name}】触发了 {event}
        </p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });

  type event1002 = {
    action: 1002;
    data: {
      zone: string;
      server: string;
      map_name: string;
      min_time: number;
      max_time: number;
      level: 1 | 2;
      time: number;
    };
  };
  //刷马事件
  ctx.on("jx3ws.1002", async (data: event1002) => {
    const { server, map_name, min_time, max_time } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "maju"]);
    const list = channels.filter((channel) => channel.maju);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>马驹播报</p>
        <p>位置：约5~10分钟后有宝马良驹在{map_name}出没</p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });
  type event1003 = {
    action: 1003;
    data: {
      zone: string;
      server: string;
      name: string;
      map_name: string;
      level: 1 | 2;
      horse: string;
      time: number;
    };
  };
  //抓马事件
  ctx.on("jx3ws.1003", async (data: event1003) => {
    const { server, map_name, horse } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "maju"]);
    const list = channels.filter((channel) => channel.maju);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>抓马播报</p>
        <p>
          {map_name}的【{horse}】被【{name}】抓到了！
        </p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });

  //扶摇预告
  type event1004 = {
    action: 1004;
    data: {
      zone: string;
      server: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1004", async (data: event1004) => {
    const { server, time } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "fuyao"]);
    const list = channels.filter((channel) => channel.fuyao);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>扶摇预告</p>
        <p>梅花桩试炼将在{dayjs.unix(time).format("YYYY-MM-DD HH:mm:ss")}开始</p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });

  //扶摇开始
  type event1005 = {
    action: 1005;
    data: {
      zone: string;
      server: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1005", async (data: event1005) => {
    const { server, time } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "fuyao"]);
    const list = channels.filter((channel) => channel.fuyao);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>扶摇开始</p>
        <p>梅花桩试炼已经开始啦！</p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });

  //扶摇结束
  type event1006 = {
    action: 1006;
    data: {
      zone: string;
      server: string;
      name: string[];
      time: number;
    };
  };
  ctx.on("jx3ws.1006", async (data: event1006) => {
    const { server, name, time } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "fuyao"]);
    const list = channels.filter((channel) => channel.fuyao);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>扶摇结束</p>
        <p>梅花桩试炼已经结束啦！</p>
        <p>请{name.join("、")}、快去找唐文羽！</p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });

  //烟花报时
  type event1007 = {
    action: 1007;
    data: {
      zone: string;
      server: string;
      name: string;
      map_name: string;
      sender: string;
      receive: string;
      time: number;
    };
  };

  ctx.on("jx3ws.1007", async (data: event1007) => {
    const { server, name, time, sender, receive, map_name } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "yanhua"]);
    const list = channels.filter((channel) => channel.yanhua);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>
          {sender}在{map_name}为{receive}燃放了{name}！！！
        </p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });

  //玄晶报时
  type event1008 = {
    action: 1008;
    data: {
      zone: string;
      server: string;
      role_name: string;
      map_name: string;
      name: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1008", async (data: event1008) => {
    const { server, name, time, role_name, map_name } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "xuanjing"]);
    const list = channels.filter((channel) => channel.xuanjing);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>
          恭喜{role_name}在{map_name}将{name}收入囊中！！！
        </p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });

  //追魂点名
  type event1009 = {
    action: 1009;
    data: {
      zone: string;
      server: string;
      subserver: string;
      name: string;
      time: number;
      realm: string;
    };
  };
  ctx.on("jx3ws.1009", async (data: event1009) => {
    const { server, name, time, subserver, realm } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "zhuihun"]);
    const list = channels.filter((channel) => channel.zhuihun);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>
          先锋队执事：请[{name}·{subserver}]侠士速来{realm}，有要事相商！
        </p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });

  //诛恶事件
  type event1010 = {
    action: 1010;
    data: {
      zone: string;
      server: string;
      map_name: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1010", async (data: event1010) => {
    const { server, map_name } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "zhue"]);
    const list = channels.filter((channel) => channel.zhue);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>诛恶事件触发！强龙偏压地头蛇，山乐盟为了黄叶帮竟主动上门挑衅烂柯山鬼寨！众侠士可前往【{map_name}】一探究竟。</p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });

  //的卢刷新
  type event1012 = {
    action: 1011;
    data: {
      zone: "电信五区";
      server: "斗转星移";
      name: "'的卢";
      map_name: "龙泉府";
      time: 1640438124;
    };
  };
  ctx.on("jx3ws.1012", async (data: event1012) => {
    const { server, map_name } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "dilu"]);
    const list = channels.filter((channel) => channel.dilu);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>的卢在{map_name}现身，众侠士可前捕获</p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });

  //的卢捕获
  type event1013 = {
    action: 1013;
    data: {
      zone: string;
      server: string;
      role_name: string;
      camp_name: string;
      map_name: string;
      level: string;
      name: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1013", async (data: event1013) => {
    const { server, map_name, role_name } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "dilu"]);
    const list = channels.filter((channel) => channel.dilu);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>
          侠士 {role_name} 在{map_name}捕获了马驹【{name}】
        </p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });

  //的卢拍卖
  type event1014 = {
    action: 1014;
    data: {
      zone: string;
      server: string;
      role_name: string;
      camp_name: string;
      name: string;
      amount: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1014", async (data: event1014) => {
    const { server, name, role_name, amount } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "dilu"]);
    const list = channels.filter((channel) => channel.dilu);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>
          侠士 {role_name} 以{amount}获得了马驹【{name}】
        </p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });
}
