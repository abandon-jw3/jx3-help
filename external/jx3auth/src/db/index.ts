import { Context } from "koishi";

declare module "koishi" {
  interface Channel {
    expireTime: string; //到期时间
    groupServer: string; //默认区服
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
    //群组默认区服
    groupServer: {
      type: "string",
      length: 16,
      initial: null,
    },
  });
  ctx.model.extend("user", {
    //服务到期时间
    roleName: {
      type: "string",
      length: 32,
      initial: null,
    },
    //默认区服
    userServer: {
      type: "string",
      length: 16,
      initial: null,
    },
  });
}
