import { Context, Schema, Service } from "koishi";

export const inject = ["http"];
export const name = "jx3ws";

export interface Config {
  wsUrl: string;
  wstoken: string;
  /** 重连间隔（毫秒） */
  reconnectInterval?: number;
  /** 最大重连次数，0 表示无限重连 */
  maxReconnectAttempts?: number;
}

export const Config: Schema<Config> = Schema.object({
  wsUrl: Schema.string().required().description("WebSocket 地址"),
  wstoken: Schema.string().required().description("WebSocket Token"),
  reconnectInterval: Schema.number().default(5000).description("重连间隔（毫秒）"),
  maxReconnectAttempts: Schema.number().default(0).description("最大重连次数，0 表示无限重连"),
});

export class JX3_ws_service extends Service {
  private ws?: WebSocket;
  private wsConfig: Config;
  private reconnectAttempts = 0;
  private reconnectTimer?: NodeJS.Timeout;
  private isDisposed = false;

  // 暴露连接状态
  get connected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  constructor(ctx: Context, config: Config) {
    super(ctx, "jx3ws", true);
    this.wsConfig = config;
  }

  // 在 start 生命周期中建立连接
  async start() {
    this.connect();
  }

  // 在 stop 生命周期中清理资源
  async stop() {
    this.isDisposed = true;
    this.clearReconnectTimer();
    this.disconnect();
  }

  private connect() {
    if (this.isDisposed) return;

    const { wsUrl, wstoken } = this.wsConfig;
    const logger = this.ctx.logger("jx3ws");

    try {
      this.ws = this.ctx.http.ws(`${wsUrl}?token=${wstoken}`);
    } catch (error) {
      logger.error("WebSocket 创建失败:", error);
      this.scheduleReconnect();
      return;
    }

    this.ws.addEventListener("open", () => {
      logger.info("WebSocket 已连接");
      this.reconnectAttempts = 0; // 重置重连计数
    });

    this.ws.addEventListener("message", ({ data }) => {
      try {
        const msg = JSON.parse(data.toString()) as { action: string; data: any };
        this.ctx.emit(`jx3ws.${msg.action}`, msg);
        logger.info("收到消息:", msg);
      } catch (error) {
        logger.warn("消息解析失败:", error, data);
      }
    });

    this.ws.addEventListener("error", (error) => {
      logger.error("WebSocket 错误:", error);
    });

    this.ws.addEventListener("close", (event) => {
      logger.warn(`WebSocket 已断开 (code: ${event.code}, reason: ${event.reason})`);
      this.scheduleReconnect();
    });
  }

  private disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = undefined;
    }
  }

  private clearReconnectTimer() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = undefined;
    }
  }

  private scheduleReconnect() {
    if (this.isDisposed) return;

    const { reconnectInterval, maxReconnectAttempts } = this.wsConfig;
    const logger = this.ctx.logger("jx3ws");

    // 检查是否超过最大重连次数
    if (maxReconnectAttempts > 0 && this.reconnectAttempts >= maxReconnectAttempts) {
      logger.error(`已达到最大重连次数 (${maxReconnectAttempts})，停止重连`);
      return;
    }

    this.reconnectAttempts++;
    logger.info(`将在 ${reconnectInterval}ms 后进行第 ${this.reconnectAttempts} 次重连...`);

    this.clearReconnectTimer();
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, reconnectInterval);
  }

  // 提供手动重连方法
  reconnect() {
    this.disconnect();
    this.reconnectAttempts = 0;
    this.connect();
  }
}

declare module "koishi" {
  interface Context {
    jx3ws: JX3_ws_service;
  }
  interface Events {
    [K: `jx3ws.${string}`]: (...args: any[]) => void;
  }
}

export function apply(ctx: Context, config: Config) {
  ctx.plugin(JX3_ws_service, config);
}
