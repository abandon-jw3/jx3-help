# JX3 Help - 剑网3 Koishi 机器人

一个基于 [Koishi](https://koishi.chat/) 框架开发的剑网3游戏助手机器人，提供游戏数据查询、WebSocket 实时推送、图片渲染等功能。

## ✨ 特性

- 🎮 **完整的游戏数据查询** - 支持日常、战绩、奇遇、物价、攻略等全方位数据查询
- 📡 **WebSocket 实时推送** - 实时接收游戏开服、新闻等事件推送
- 🎨 **图片渲染服务** - 将查询结果渲染为精美的图片报表
- 🔌 **模块化插件架构** - 采用微服务架构，各功能模块解耦
- 🤖 **多平台支持** - 基于 Koishi，支持 OneBot、Satori 等多种协议

## 📦 项目结构

```
jx3-help/
├── external/                  # 自定义插件目录
│   ├── instructions/         # 指令集成插件 (业务逻辑核心)
│   ├── jx3api/              # JX3API 服务插件 (数据获取)
│   ├── jx3assets/           # 静态资源服务插件 (图片资源)
│   ├── jx3render/           # 图片渲染服务插件 (HTML/图片生成)
│   └── jx3ws/               # WebSocket 服务插件 (实时推送)
├── data/                     # 数据目录
├── docker/                   # Docker 配置文件
├── koishi.yml               # Koishi 配置文件
└── package.json             # 项目依赖配置
```

## 🔧 核心插件

### koishi-plugin-jx3api

JX3API 接口服务，封装了 [JX3API](https://www.jx3api.com) 的各种查询功能。

**提供的服务：**

- `ctx.jx3api` - 游戏数据查询服务

### koishi-plugin-jx3ws

JX3API WebSocket 服务，实时接收游戏事件推送。

**提供的服务：**

- `ctx.jx3ws` - WebSocket 连接管理
- 事件推送（如：开服通知、新闻推送等）

### koishi-plugin-jx3render

图片渲染服务，使用 Puppeteer 将数据和模板渲染为图片。

**提供的服务：**

- `ctx.jx3render` - 模板渲染服务

### koishi-plugin-jx3assets

静态资源服务，提供游戏图标、背景等静态资源。

**提供的服务：**

- 静态文件托管 (`/jx3assets`, `/jx3html`)

### koishi-plugin-instructions

指令集成插件，整合所有游戏查询指令。

**可用指令：**

#### 📅 日常与活动

- `日常 [服务器]` - 查询今日日常活动（别名：每日）
- `月历` - 查询服务器活动月历
- `开服 [服务器]` - 查询服务器开服状态
- `服务器 [服务器]` - 查询服务器热度状态
- `维护` - 查询维护公告
- `新闻` - 查询官方新闻
- `技改` - 查询技改记录
- `百战` - 查询百战异闻录BOSS
- `楚天社` / `云从社` / `披风会` - 查询各声望活动进度

#### 👤 角色与战绩

- `角色详情 <服务器> <角色名>` - 查询角色详细信息
- `名剑排行 <模式>` - 查询名剑大会排行榜（别名：jjc排行）
- `属性 <服务器> <角色名>` - 查询角色属性
- `奇穴 <心法>` - 查询心法奇穴
- `阵眼 <心法>` - 查询心法阵眼
- `精耐 <服务器> <角色名>` - 查询角色精力耐力
- `名片 <服务器> <角色名>` - 查询角色名片
- `名片墙 <服务器> <角色名>` - 查询名片墙
- `随机名片` - 随机查看一张名片
- `查人 <QQ号>` - 查询贴吧黑历史
- `门派表现` - 查询门派竞技场表现
- `在线 [名称]` - 查询角色在线信息（暂不开放）

#### 🌟 奇遇与宠物

- `奇遇统计 <服务器> [角色名]` - 查询奇遇统计
- `奇遇汇总 <服务器>` - 查询服务器近期奇遇
- `奇遇记录 <服务器> <角色名>` - 查询个人奇遇记录
- `未出奇遇 <服务器> <角色名>` - 查询缺失奇遇（别名：缺失奇遇）
- `蹲宠 <服务器>` - 查询服务器宠物刷新记录
- `赤兔` - 查询赤兔幼驹刷新信息
- `马场` - 查询马场信息

#### 💰 交易与物品

- `金价 [服务器]` - 查询金价比例
- `物价 <物品名称>` - 查询物价信息
- `贴吧物价 <服务器> <物品名>` - 查询贴吧物价
- `拍卖纪录 <服务器> <物品名>` - 查询拍卖行记录
- `的卢 <服务器>` - 查询的卢刷新记录
- `全服掉落 <物品名>` - 查询全服掉落统计
- `掉落 <服务器> <副本名>` - 查询副本掉落统计
- `挂件 <名称>` - 查询挂件详细信息
- `装饰 <名称>` - 查询家园装饰属性
- `器物谱 <地图>` - 查询地图产出家具

#### 🛡️ 阵营与帮会

- `沙盘 [服务器]` - 查询阵营沙盘
- `关隘` - 查询据点关隘信息
- `诛恶 [服务器]` - 查询诛恶活动信息
- `招募 <服务器> <关键词>` - 查询团队招募
- `师父 <服务器> <关键词>` - 查询师父招募
- `徒弟 <服务器> <关键词>` - 查询徒弟招募

#### 🎉 其他

- `副本 <服务器> <副本名>` - 查询副本CD
- `烟花统计 [服务器]` - 查询烟花接收统计
- `烟花记录 <服务器> <角色名>` - 查询烟花接收记录
- `科举 <题目>` - 查询科举答案
- `骚话` / `舔狗日记` - 随机骚话

## 🚀 快速开始

### 环境要求

- Node.js 22.x
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

   # JX3API 配置 (https://www.jx3api.com)
   API_TOKEN=your_jx3api_token
   API_TICKET=your_推栏_ticket
   WS_TOKEN=your_jx3ws_token

   # 管理员配置
   ADMIN_ID="管理员QQ"
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

```yaml
plugins:
  # ... 其他插件配置 ...

  # 剑网3 插件组
  jx3api:
    token: ${{env.API_TOKEN}}
    apiUrl: https://www.jx3api.com
    ticket: ${{env.API_TICKET}}

  jx3ws:
    wsUrl: ws://socket.jx3api.com
    wstoken: ${{env.WS_TOKEN}}

  jx3render: {}

  jx3assets: {} # 静态资源服务

  instructions: {} # 指令集
```

## 📝 开发指南

### 添加新指令

1. 在 `external/instructions/src/commands/index.tsx` 中添加指令逻辑：

```typescript
ctx.command("新指令 <参数>", "指令说明").action(async ({ session }, param) => {
  const data = await ctx.jx3api.someMethod(param);
  return `结果：${data}`;
});
```

2. 如果需要新的 API，请在 `external/jx3api` 中添加。
3. 如果需要新的渲染模板，请在 `external/jx3render` 中添加 `.hbs` 模板。

## 🔨 可用脚本

- `yarn dev` - 开发模式启动（支持热重载）
- `yarn start` - 生产模式启动
- `yarn build` - 构建所有插件
- `yarn clean` - 清理构建产物

## 📖 相关文档

- [Koishi 官方文档](https://koishi.chat/)
- [JX3API 文档](https://www.jx3api.com/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT License](./License.txt)
