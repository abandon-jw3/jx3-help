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
}
