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
      <p>
        {server}的【{name}】触发了 {event}
      </p>
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
    const message = <p>位置：约5~10分钟后有宝马良驹在{map_name}出没</p>;
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
      <p>
        {map_name}的【{horse}】被【{name}】抓到了！
      </p>
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
    const message = <p>梅花桩试炼将在{dayjs.unix(time).format("YYYY-MM-DD HH:mm:ss")}开始</p>;
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
    const message = <p>梅花桩试炼已经开始啦！</p>;
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
      <p>
        {sender}在{map_name}为{receive}燃放了{name}！！！
      </p>
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
      <p>
        恭喜{role_name}在{map_name}将{name}收入囊中！！！
      </p>
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
      <p>
        先锋队执事：请[{name}·{subserver}]侠士速来{realm}，有要事相商！
      </p>
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
    const message = <p>诛恶事件触发！强龙偏压地头蛇，山乐盟为了黄叶帮竟主动上门挑衅烂柯山鬼寨！众侠士可前往【{map_name}】一探究竟。</p>;
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
    const message = <p>的卢在{map_name}现身，众侠士可前捕获</p>;
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
      <p>
        侠士 {role_name} 在{map_name}捕获了马驹【{name}】
      </p>
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
      <p>
        侠士 {role_name} 以{amount}获得了马驹【{name}】
      </p>
    );
    await ctx.broadcast(sendList, message);
  });

  //抢占粮仓
  type event1101 = {
    action: 1101;
    data: {
      zone: string;
      server: string;
      castle: string;
      camp_name: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1101", async (data: event1101) => {
    const { server, castle, camp_name } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "judian"]);
    const list = channels.filter((channel) => channel.judian);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <p>
        江湖快报！{castle}据点粮仓被一群{camp_name}人士洗劫，损失一半据点资金。
      </p>
    );
    await ctx.broadcast(sendList, message);
  });
  //大将重置
  type event1102 = {
    action: 1102;
    data: {
      zone: string;
      server: string;
      name: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1102", async (data: event1102) => {
    const { server, name } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "judian"]);
    const list = channels.filter((channel) => channel.judian);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = <p>【{name}】据点大旗长时间无人守护，被据点大将重置回初始位置！</p>;
    await ctx.broadcast(sendList, message);
  });

  //大旗被夺
  type event1103 = {
    action: 1103;
    data: {
      zone: string;
      server: string;
      camp_name: string;
      map_name: string;
      castle: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1103", async (data: event1103) => {
    const { server, camp_name, map_name, castle } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "judian"]);
    const list = channels.filter((channel) => channel.judian);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <p>
        {camp_name}位于{map_name}的【{castle}】据点大旗被夺，10分钟后若未能夺回大旗，则会丢失此据点！
      </p>
    );
    await ctx.broadcast(sendList, message);
  });

  //据点占领(有帮会)
  type event1104 = {
    action: 1104;
    data: {
      zone: string;
      server: string;
      camp_name: string;
      tong_name: string;
      castle: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1104", async (data: event1104) => {
    const { server, camp_name, tong_name, castle } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "judian"]);
    const list = channels.filter((channel) => channel.judian);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <p>
        江湖快马飞报！ {camp_name}的{tong_name}帮会占领了【{castle}】据点！
      </p>
    );
    await ctx.broadcast(sendList, message);
  });

  //据点占领(无帮会)
  type event1105 = {
    action: 1105;
    data: {
      zone: string;
      server: string;
      camp_name: string;
      castle: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1105", async (data: event1105) => {
    const { server, camp_name, castle } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "judian"]);
    const list = channels.filter((channel) => channel.judian);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <p>
        江湖快马飞报！ {camp_name}占领了【{castle}】据点！
      </p>
    );
    await ctx.broadcast(sendList, message);
  });

  //贡献排行
  type event1106 = {
    action: 1106;
    data: {
      zone: string;
      server: string;
      camp_name: string;
      tong_list: string[];
      time: number;
    };
  };
  ctx.on("jx3ws.1106", async (data: event1106) => {
    const { server, camp_name, tong_list } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "judian"]);
    const list = channels.filter((channel) => channel.judian);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <p>
        逐鹿中原活动结束，本次{camp_name}贡献前五十的开战据点帮会和贡献前列的非开战据点帮会：{tong_list.join(",")}。
      </p>
    );
    await ctx.broadcast(sendList, message);
  });

  //攻防拍卖
  type event1107 = {
    action: 1107;
    data: {
      zone: string;
      server: string;
      camp_name: string;
      role_name: string;
      item_name: string;
      amount: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1107", async (data: event1107) => {
    const { server, camp_name, role_name, item_name, amount } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "judian"]);
    const list = channels.filter((channel) => channel.judian);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <p>
        恭喜{camp_name}侠士“{role_name}”以{amount}夺得竞拍战利品[{item_name}]，可喜可贺！
      </p>
    );
    await ctx.broadcast(sendList, message);
  });

  //帮会宣战
  type event1108 = {
    action: 1108;
    data: {
      zone: string;
      server: string;
      tong_a_name: string;
      tong_b_name: string;
      hour: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1108", async (data: event1108) => {
    const { server, tong_a_name, tong_b_name, hour } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "xuanzhan"]);
    const list = channels.filter((channel) => channel.xuanzhan);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <p>
        驿马快报！【{tong_a_name}】帮会已向【{tong_b_name}】帮会发起为期{hour}小时的野外宣战，两方帮会成员将在争夺区域决一雌雄，究竟谁更技高一筹，我们拭目以待！
      </p>
    );
    await ctx.broadcast(sendList, message);
  });

  //宣战结束
  type event1109 = {
    action: 1109;
    data: {
      zone: string;
      server: string;
      tong_a_name: string;
      tong_b_name: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1109", async (data: event1109) => {
    const { server, tong_a_name, tong_b_name } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "xuanzhan"]);
    const list = channels.filter((channel) => channel.xuanzhan);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <p>
        驿马快报！【{tong_a_name}】帮会对【{tong_b_name}】帮会的宣战已经结束。
      </p>
    );
    await ctx.broadcast(sendList, message);
  });

  //领地宣战开始
  type event1110 = {
    action: 1110;
    data: {
      zone: string;
      server: string;
      tong_a_name: string;
      tong_b_name: string;
      tong_map_name: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1110", async (data: event1110) => {
    const { server, tong_a_name, tong_b_name, tong_map_name } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "xuanzhan"]);
    const list = channels.filter((channel) => channel.xuanzhan);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <p>
        驿马快报！【{tong_a_name}】帮会已向【{tong_b_name}】帮会发起领地宣战，两方帮会成员将在【{tong_map_name}】的帮会领地，决一雌雄，究竟谁更技高一筹，我们拭目以待！
      </p>
    );
    await ctx.broadcast(sendList, message);
  });

  //领地选战结束
  type event1111 = {
    action: 1111;
    data: {
      zone: string;
      server: string;
      tong_a_name: string;
      tong_b_name: string;
      tong_map_name: string;
      victory_tong_name: string;
      score: string;
      time: number;
    };
  };
  ctx.on("jx3ws.1111", async (data: event1111) => {
    const { server, tong_a_name, tong_b_name, tong_map_name, victory_tong_name, score } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "xuanzhan"]);
    const list = channels.filter((channel) => channel.xuanzhan);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <p>
        驿马快报！【{tong_a_name}】帮会对【{tong_b_name}】帮会的宣战已经结束，【{tong_a_name}】帮会在进攻【{tong_b_name}】帮会领地中获得3000分。此役【{victory_tong_name}】胜！
      </p>
    );
    await ctx.broadcast(sendList, message);
  });

  //服务器开服/维护
  type event2001 = {
    action: 2001;
    data: {
      zone: string;
      server: string;
      status: 1 | 0;
    };
  };
  ctx.on("jx3ws.2001", async (data: event2001) => {
    const { server, status } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(server, ["expireTime", "groupServer", "guildId", "kaifu"]);
    const list = channels.filter((channel) => channel.kaifu);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <p>
        【{server}】-{status === 1 ? "开服" : "维护"}了！
      </p>
    );
    await ctx.broadcast(sendList, message);
  });

  //官方新闻
  type event2002 = {
    action: 2002;
    data: {
      class: string;
      title: string;
      url: string;
      date: string;
    };
  };
  ctx.on("jx3ws.2002", async (data: event2002) => {
    const { class: newsType, title, url, date } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(null, ["expireTime", "groupServer", "guildId", "xinwen"]);
    const list = channels.filter((channel) => channel.xinwen);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>{newsType}</p>
        <p>{title}</p>
        <p>{url}</p>
        <p>{date}</p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });

  //游戏更新
  type event2003 = {
    action: 2003;
    data: {
      now_version: string;
      new_version: string;
      package_num: number;
      package_size: string;
    };
  };
  ctx.on("jx3ws.2003", async (data: event2003) => {
    const { now_version, new_version, package_num, package_size } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(null, ["expireTime", "groupServer", "guildId", "gengxin"]);
    const list = channels.filter((channel) => channel.gengxin);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>游戏客户端检查到新版本</p>
        <p>当前版本：{now_version}</p>
        <p>新版本：{new_version}</p>
        <p>更新包数：{package_num}</p>
        <p>更新包大小：{package_size}</p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });

  //八卦速报
  type event2004 = {
    action: 2004;
    data: {
      class: string;
      server: string;
      name: string;
      title: string;
      url: string;
      date: string;
    };
  };
  ctx.on("jx3ws.2004", async (data: event2004) => {
    const { title, url, date, name } = data.data;
    const channels = await ctx.jx3auth.getChannelsByServer(null, ["expireTime", "groupServer", "guildId", "bagua"]);
    const list = channels.filter((channel) => channel.bagua);
    const sendList = list.map((channel) => `onebot:${channel.guildId}`);
    const message = (
      <>
        <p>{title}</p>
        <p>{url}</p>
        <p>{date}</p>
        <p>来自{name}吧</p>
      </>
    );
    await ctx.broadcast(sendList, message);
  });
}
