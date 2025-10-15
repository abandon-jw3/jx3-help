import { Context, Schema, Service } from "koishi";
export const inject = ["http"];

export const name = "jx3ws";

export interface Config {
  wsUrl: string;
  wstoken: string;
}

export const Config: Schema<Config> = Schema.object({
  wsUrl: Schema.string().required(),
  wstoken: Schema.string().required(),
});

// 定义 JX3API 服务类
export class JX3_ws_service extends Service {
  private ws?: WebSocket;

  constructor(ctx: Context, config?: Config) {
    super(ctx, "jx3ws", true);

    // 如果提供了 WebSocket 配置，则初始化 WebSocket
    if (config?.wsUrl && config?.wstoken) {
      this.ws = ctx.http.ws(`${config.wsUrl}?token=${config.wstoken}`);
    }
    this.ws?.addEventListener("message", ({ data }) => {
      const msg = JSON.parse(data.toString()) as { action: string; data: any };
      ctx.emit(`jx3ws.${msg.action}`, msg.data);

      ctx.logger("jx3ws").info("收到消息:", msg);
    });
    this.ws?.addEventListener("error", (error) => {
      ctx.logger("jx3ws").error("WebSocket 错误:", error);
    });
    this.ws?.addEventListener("close", () => {
      ctx.logger("jx3ws").warn("WebSocket 已断开");
    });
    this.ws?.addEventListener("open", () => {
      ctx.logger("jx3ws").info("WebSocket 已连接");
    });
  }
}

// 声明服务类型，让 ctx.jx3api 在 TypeScript 中可用
declare module "koishi" {
  interface Context {
    jx3ws: JX3_ws_service;
  }
  interface Events {
    [K: `jx3ws.${number}`]: (...args: any[]) => void;
  }
}
// 导出 apply 函数以注册插件
export function apply(ctx: Context, config: Config) {
  ctx.plugin(JX3_ws_service, config);
}
