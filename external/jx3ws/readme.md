# koishi-plugin-jx3ws

[![npm](https://img.shields.io/npm/v/koishi-plugin-jx3ws?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-jx3ws)

JX3API WebSocket 服务插件，为 Koishi 提供剑网3游戏数据实时推送功能。

## 📦 功能特性

- 🔌 **实时推送**：通过 WebSocket 接收 JX3API 的实时游戏数据推送
- 📡 **事件驱动**：基于 Koishi 事件系统，自动分发推送消息
- 🔄 **自动重连**：支持断线自动重连机制
- 🎯 **类型安全**：提供完整的 TypeScript 类型定义
- 🔌 **服务注入**：作为 Koishi 服务，可被其他插件调用

## 🔧 依赖

该插件依赖以下服务：

- `http`：用于建立 WebSocket 连接

Koishi 核心已提供此服务，无需额外安装。

## ⚙️ 配置

在 Koishi 配置文件中添加以下配置：

```yaml
plugins:
  jx3ws:
    wsUrl: wss://socket.nicemoe.cn # WebSocket 服务器地址
    wstoken: your_token_here # 必填：你的 WebSocket Token
```

### 配置项说明

| 配置项    | 类型   | 说明                                                                       |
| --------- | ------ | -------------------------------------------------------------------------- |
| `wsUrl`   | string | **必填**：JX3API WebSocket 服务器地址                                      |
| `wstoken` | string | **必填**：WebSocket 访问令牌，请前往 [JX3API](https://www.jx3api.com) 申请 |

## 🚀 使用

安装并配置后，即可在其他插件中监听 WebSocket 推送事件：

```typescript
import { Context } from "koishi";

export function apply(ctx: Context) {
  // 监听所有 WebSocket 推送事件
  ctx.on("jx3ws.1001", (data) => {
    console.log("开服推送:", data);
  });

  ctx.on("jx3ws.2001", (data) => {
    console.log("奇遇推送:", data);
  });

  ctx.on("jx3ws.2002", (data) => {
    console.log("烟花推送:", data);
  });
}
```

## 📚 事件列表

### 服务器相关

- `jx3ws.1001` - 开服推送
- `jx3ws.1002` - 服务器状态变更

### 奇遇相关

- `jx3ws.2001` - 奇遇播报
- `jx3ws.2003` - 全服奇遇播报

### 烟花相关

- `jx3ws.2002` - 烟花播报
- `jx3ws.2004` - 全服烟花播报

### 交易相关

- `jx3ws.3001` - 金价变动推送
- `jx3ws.3002` - 交易行价格变动

### 新闻相关

- `jx3ws.5001` - 新闻公告推送
- `jx3ws.5002` - 维护公告推送

### 其他事件

- `jx3ws.4001` - 阵营战争推送
- `jx3ws.4002` - 攻防战推送
- `jx3ws.6001` - 扶摇九天推送

> 注：具体事件代码以 JX3API 官方文档为准

## 📖 API 示例

### 监听开服推送

```typescript
export function apply(ctx: Context) {
  ctx.on("jx3ws.1001", (data) => {
    const { server, status, time } = data;
    console.log(`服务器 ${server} ${status ? "已开服" : "已维护"}`);

    // 发送消息到频道
    ctx.broadcast([`服务器 ${server} 已开服！`]);
  });
}
```

### 监听奇遇播报

```typescript
export function apply(ctx: Context) {
  ctx.on("jx3ws.2001", (data) => {
    const { server, name, serendipity, time } = data;
    const message = `【奇遇播报】${server} 服务器 ${name} 触发了 ${serendipity}！`;

    ctx.broadcast([message]);
  });
}
```

### 监听烟花播报

```typescript
export function apply(ctx: Context) {
  ctx.on("jx3ws.2002", (data) => {
    const { server, sender, recipient, name, map, time } = data;
    const message = `【烟花播报】${server} ${sender} 送给 ${recipient} 一个 ${name}`;

    ctx.broadcast([message]);
  });
}
```

## 🔍 技术细节

### 消息格式

WebSocket 接收到的消息格式如下：

```json
{
  "action": 1001,
  "data": {
    // 具体数据内容
  }
}
```

插件会自动解析消息，并触发对应的事件：`jx3ws.${action}`

### 事件监听

所有 WebSocket 推送都会转换为 Koishi 事件，事件名称格式为：`jx3ws.${action}`

```typescript
// 监听指定事件
ctx.on("jx3ws.1001", (data) => {
  // 处理开服推送
});

// 使用模式匹配监听多个事件
ctx.on(/^jx3ws\.200\d$/, (data, eventName) => {
  // 处理所有 2001-2009 的事件
  console.log(`收到事件 ${eventName}:`, data);
});
```

## 📝 类型定义

本插件提供完整的 TypeScript 类型定义：

```typescript
declare module "koishi" {
  interface Context {
    jx3ws: JX3_ws_service;
  }

  interface Events {
    [K: `jx3ws.${number}`]: (...args: any[]) => void;
  }
}
```

## 🔗 相关链接

- [JX3API 官网](https://www.jx3api.com)
- [JX3API WebSocket 文档](https://www.jx3api.com/docs/websocket)
- [Koishi 官网](https://koishi.chat)
- [WebSocket 协议](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## ⚠️ 注意事项

1. 使用本插件需要先申请 JX3API 的 WebSocket Token
2. 请确保网络环境支持 WebSocket 连接
3. 建议在生产环境中添加错误处理和重连逻辑
4. WebSocket 连接断开时会自动尝试重连
5. 请遵守 JX3API 的使用规范，避免滥用推送服务

## 🐛 故障排查

### WebSocket 无法连接

1. 检查 `wsUrl` 和 `wstoken` 配置是否正确
2. 确认网络环境支持 WebSocket 连接
3. 查看控制台日志，确认连接状态

### 无法接收推送消息

1. 确认 WebSocket 已成功连接（查看日志）
2. 检查事件监听代码是否正确
3. 确认订阅的事件类型是否正确

### 连接频繁断开

1. 检查网络稳定性
2. 确认 Token 是否有效
3. 查看服务器日志排查问题

---

Made with ❤️ for 剑网3玩家
