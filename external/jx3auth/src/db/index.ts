import { Context } from "koishi";

declare module "koishi" {
  interface Channel {
    expireTime: string; //到期时间
    groupServer: string; //群组默认区服
    qiyu: boolean; //奇遇播报开关
    maju: boolean; //马驹播报开关
    fuyao: boolean; //扶摇播报开关
    yanhua: boolean; //烟花播报开关
    xuanjing: boolean; //玄晶播报开关
    zhuihun: boolean; //追魂播报开关
    zhue: boolean; //追魂点名开关
    dilu: boolean; //的卢播报开关
    judian: boolean; //据点播报开关
    xuanzhan: boolean; //帮会宣战开关
    kaifu: boolean; //开服播报开关
    xinwen: boolean; //新闻播报开关
    gengxin: boolean; //更新播报开关
    bagua: boolean; //八卦播报开关
  }
  interface User {
    roleName: string; //角色名称
    userServer: string; //用户默认区服
  }
}

export function initTable(ctx: Context) {
  ctx.model.extend("channel", {
    //服务到期时间
    expireTime: {
      type: "string",
      length: 16,
      initial: null,
    },
    //群组默认绑定区服
    groupServer: {
      type: "string",
      length: 16,
      initial: "梦江南",
    },
    qiyu: {
      type: "boolean",
      initial: false,
    },
    maju: {
      type: "boolean",
      initial: false,
    },
    fuyao: {
      type: "boolean",
      initial: false,
    },
    yanhua: {
      type: "boolean",
      initial: false,
    },
    xuanjing: {
      type: "boolean",
      initial: false,
    },
    zhuihun: {
      type: "boolean",
      initial: false,
    },
    zhue: {
      type: "boolean",
      initial: false,
    },

    dilu: {
      type: "boolean",
      initial: false,
    },
    judian: {
      type: "boolean",
      initial: false,
    },
    xuanzhan: {
      type: "boolean",
      initial: false,
    },
    kaifu: {
      type: "boolean",
      initial: false,
    },
    xinwen: {
      type: "boolean",
      initial: false,
    },
    gengxin: {
      type: "boolean",
      initial: false,
    },
    bagua: {
      type: "boolean",
      initial: false,
    },
  });
  ctx.model.extend("user", {
    //用户默认绑定角色
    roleName: {
      type: "string",
      length: 32,
      initial: null,
    },
    //用户默认绑定区服
    userServer: {
      type: "string",
      length: 16,
      initial: null,
    },
  });
}
