# JX3 Help - 剑网3 Koishi 机器人

一个基于 [Koishi](https://koishi.chat/) 框架开发的剑网3游戏助手机器人，提供游戏数据查询、WebSocket 实时推送、图片渲染等功能。

## ✨ 特性

- 🎮 **完整的游戏数据查询** - 支持日常、开服、金价、角色等信息查询
- 📡 **WebSocket 实时推送** - 实时接收游戏事件推送
- 🎨 **图片渲染服务** - 将游戏数据渲染为精美图片
- 🔌 **模块化插件架构** - 服务与指令解耦，易于扩展
- 🤖 **多平台支持** - 基于 Koishi，支持 OneBot、Satori 等多种协议

## 📦 项目结构

```
jx3-help/
├── external/                  # 自定义插件目录
│   ├── instructions/         # 指令集成插件
│   ├── jx3api/              # JX3API 服务插件
│   ├── jx3render/           # 图片渲染服务插件
│   └── jx3ws/               # WebSocket 服务插件
├── data/                     # 数据目录
├── docker/                   # Docker 配置文件
├── koishi.yml               # Koishi 配置文件
└── package.json             # 项目依赖配置
```

## 🔧 核心插件

### koishi-plugin-jx3api

JX3API 接口服务，封装了剑网3 API 的各种查询功能。

**提供的服务：**

- `ctx.jx3api` - 游戏数据查询服务

### koishi-plugin-jx3ws

JX3API WebSocket 服务，实时接收游戏事件推送。

**提供的服务：**

- `ctx.jx3ws` - WebSocket 连接管理
- 事件推送（如：开服通知、新闻推送等）

### koishi-plugin-jx3render

图片渲染服务，使用 Puppeteer 将数据渲染为图片。

**提供的服务：**

- `ctx.jx3render` - 模板渲染服务

### koishi-plugin-instructions

指令集成插件，整合所有游戏查询指令。

**可用指令：**

- `instructions` - 显示帮助信息
- `jx3.日常 [服务器]` - 查询今日日常活动
- `jx3.开服 <服务器>` - 查询服务器开服状态
- `jx3.金价 [服务器]` - 查询金价信息
- `jx3.角色 <服务器> <角色名>` - 查询角色详细信息

## 🚀 快速开始

### 环境要求

- Node.js 20.x
- Yarn 4.1.0+

### 安装步骤

1. **克隆仓库**

   ```bash
   git clone <repository-url>
   cd jx3-help
   ```

2. **安装依赖**

   ```bash
   yarn install
   ```

3. **配置环境变量**

   创建 `.env` 文件：

   ```env
   # 数据库配置
   DB_HOST=localhost
   DB_PASSWORD=your_password

   # JX3API 配置
   API_TOKEN=your_jx3api_token
   API_TICKET=your_jx3api_ticket
   WS_TOKEN=your_jx3ws_token
   ```

4. **启动机器人**

   开发模式：

   ```bash
   yarn dev
   ```

   生产模式：

   ```bash
   yarn build
   yarn start
   ```

5. **访问控制台**

   打开浏览器访问：`http://localhost:5140`

## ⚙️ 配置说明

### koishi.yml 配置示例

`已知问题：jx3api的wss协议所使用证书会在windows平台的node 22以上版本出现证书验证错误，如果使用windows，请降级到node20或者使用ws协议，其他平台正常`

```yaml
plugins:
  # 适配器配置
  adapter-onebot:
    selfId: "your_bot_qq"
    token: your_token
    protocol: ws
    endpoint: ws://127.0.0.1:3001

  # 剑网3插件配置
  jx3api:
    token: ${{env.API_TOKEN}}
    apiUrl: https://www.jx3api.com
    ticket: ${{env.API_TICKET}}

  jx3ws:
    wsUrl: wss://socket.jx3api.com
    wstoken: ${{env.WS_TOKEN}}

  jx3render: {}

  instructions: {}

  # 数据库配置
  database-postgres:
    database: koishi
    password: ${{env.DB_PASSWORD}}
    host: ${{env.DB_HOST}}
```

## 📝 开发指南

### 添加新指令

1. 在 `external/instructions/src/commands/index.tsx` 中添加指令：

```typescript
ctx.command("jx3.新指令 <参数>", "指令说明").action(async ({ session }, param) => {
  const data = await ctx.jx3api.someMethod(param);
  return `结果：${data}`;
});
```

2. 重新构建并启动：
   ```bash
   ##开启Corepack
   corepack enable
   ##安装依赖
   yarn
   ##构建
   yarn build
   yarn start
   ```

## 🔨 可用脚本

- `yarn dev` - 开发模式启动（支持热重载）
- `yarn start` - 生产模式启动
- `yarn build` - 构建所有插件
- `yarn clean` - 清理构建产物
- `yarn new` - 创建新插件
- `yarn setup` - 初始化项目配置

## 📖 相关文档

- [Koishi 官方文档](https://koishi.chat/)
- [JX3API 文档](https://www.jx3api.com/)
- [Koishi 插件开发指南](https://koishi.chat/guide/plugin/)
- [Koishi 服务开发](https://koishi.chat/guide/plugin/service.html)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT License](./License.txt)

## 🙏 致谢

- [Koishi](https://koishi.chat/) - 优秀的聊天机器人框架
- [JX3API](https://www.jx3api.com/) - 剑网3数据接口
- [团子机器人](https://github.com/JustUndertaker/mini_jx3_bot) - 剑网3团子机器人
- 所有贡献者和使用者

## 📮 联系方式

如有问题或建议，欢迎通过 Issue 反馈。
