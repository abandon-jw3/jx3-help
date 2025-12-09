import { Context } from "koishi";

declare module "koishi" {
  interface Channel {
    expireTime: string; //到期时间
    groupServer: string; //默认区服
    qiyu: boolean;
    maju: boolean;
    fuyao: boolean;
    yanhua: boolean;
    xuanjing: boolean;
    zhuihun: boolean;
    zhue: boolean;
    dilu: boolean;
  }
  interface User {
    roleName: string; //角色名称
    userServer: string; //默认区服
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
