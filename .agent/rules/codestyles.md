---
trigger: always_on
glob:
description: JX3-Help 剑网3 Koishi 机器人项目编码规范
---

# 项目概述

这是一个基于 [Koishi](https://koishi.chat/) 框架开发的剑网3游戏助手机器人项目。项目采用插件化架构，使用 TypeScript 开发，通过 Puppeteer 渲染 Handlebars 模板生成图片报表。

## 技术栈

- **框架**: Koishi v4.18.x 机器人框架
- **运行环境**: Node.js 22.x
- **包管理器**: Yarn 4.1.0 (Yarn Berry)
- **语言**: TypeScript 5.x
- **模板引擎**: Handlebars
- **渲染工具**: Puppeteer
- **日期处理**: Day.js
- **数据库**: PostgreSQL (通过 Koishi 插件)

---

## 项目结构

```
jx3-help/
 external/              # 自定义插件目录(核心业务代码)
    instructions/      # 指令集成插件 - 业务逻辑核心
    jx3api/            # JX3API 服务插件 - 数据获取层
    jx3assets/         # 静态资源服务插件 - 图片资源
    jx3auth/           # 权限验证服务插件 - 数据绑定
    jx3render/         # 图片渲染服务插件 - HTML/图片生成
    jx3ws/             # WebSocket 服务插件 - 实时推送
 data/                  # 运行时数据目录
 koishi.yml            # Koishi 主配置文件
 package.json          # 项目依赖配置
```

---

## TypeScript 编码规范

### 命名约定

- **文件名**: 使用 `camelCase` (如 `index.ts`, `parameter.ts`)
- **类名**: 使用 `PascalCase` (如 `ArgParser`, `RenderService`)
- **接口名**: 使用 `PascalCase` (如 `Config`, `JX3APIResponse`)
- **函数名**: 使用 `camelCase` (如 `getDefaultServerAndName`)
- **常量**: 使用 `camelCase` (如 `serverList`, `jjcModel`)
- **API 方法**: 使用 `get` + `PascalCase` 前缀 (如 `getActiveCalendar`)

### 类型定义规范

```typescript
//  API 响应类型应继承基础响应接口
export interface ActiveCalendar extends JX3APIResponse {
  data: {
    // 具体数据字段
  };
}

//  参数类型使用 Params 后缀
export interface ActiveCalendarParams {
  server?: string;
  num?: number;
}

//  使用 interface 而非 type alias
export interface Config {}
```

### 导入规范

```typescript
// 1. 框架核心导入
import { Context, Schema, Service } from "koishi";

// 2. 第三方库
import dayjs from "dayjs";
import handlebars from "handlebars";

// 3. 本地模块
import { ArgParser, serverList } from "../tools";
import { ActiveCalendar, ActiveCalendarParams } from "./types";
```

### 格式化配置 (Prettier)

```json
{
  "printWidth": 180,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

---

## Koishi 插件开发规范

### 插件结构

每个插件应遵循以下结构：

```typescript
import { Context, Schema } from "koishi";

// 导出插件名称
export const name = "plugin-name";

// 声明依赖注入
export const inject = ["dependency1", "dependency2"];

// 配置接口定义
export interface Config {}

// Schema 配置验证
export const Config: Schema<Config> = Schema.object({});

// 插件应用函数 或 服务类
export function apply(ctx: Context, config: Config) {
  // 插件逻辑
}
```

### 服务类模式

```typescript
export class MyService extends Service {
  constructor(ctx: Context) {
    super(ctx, "serviceName", true); // 第三个参数表示立即可用
  }
}

// 声明类型扩展
declare module "koishi" {
  interface Context {
    serviceName: MyService;
  }
}

export function apply(ctx: Context) {
  ctx.plugin(MyService);
}
```

### 命令定义规范

```typescript
ctx
  .guild() // 限制为群聊
  .command("命令名 [参数]", "命令描述")
  .channelFields(["groupServer"]) // 所需的频道字段
  .userFields(["userServer", "roleName"]) // 所需的用户字段
  .alias("别名1", "别名2") // 命令别名
  .action(async ({ session }, ...args) => {
    // 命令处理逻辑
  });
```

### 参数解析最佳实践

```typescript
import { ArgParser, serverList } from "../tools";

.action(async ({ session }, ...arg) => {
  const parser = new ArgParser(arg);

  // 尝试匹配服务器参数
  let server = parser.tryMatch("server", serverList);
  if (!server) {
    server = session.channel.groupServer || session.user.userServer;
  }

  // 获取剩余参数
  let name = parser.getRemaining()[0] || session.user.roleName;

  // 交互式输入
  if (!name) {
    await session.send("请输入角色名：");
    name = await session.prompt();
    if (!name) return "输入超时。";
  }
});
```

---

## API 服务规范

### HTTP 请求封装

```typescript
private async request<T>(path: string, data?: any): Promise<T> {
  return await this.http.post(path, data);
}
```

### API 方法文档注释

```typescript
/**
 * 获取活动日历
 * @param data.server 服务器名（可选）
 * @param data.num 日期偏移值：0-当天，1-明天，2-后天（可选）
 */
getActiveCalendar(data?: ActiveCalendarParams): Promise<ActiveCalendar> {
  return this.request("/data/active/calendar", data);
}
```

---

## 渲染模板规范 (Handlebars)

### 模板文件位置

所有 `.hbs` 模板文件放置在 `external/jx3render/templates/` 目录下。

### 模板命名

使用 `PascalCase` 命名，如 `ActiveList.hbs`, `ServerSand.hbs`。

### 可用 Helper 函数

| Helper | 用法 | 说明 |
|--------|------|------|
| `inc` | `{{inc index}}` | 索引从 1 开始 |
| `duration` | `{{duration start end}}` | 计算时长 |
| `formatTime` | `{{formatTime timestamp "YYYY-MM-DD"}}` | 格式化时间 |
| `formatInterval` | `{{formatInterval timestamp}}` | 相对时间 |
| `eq` | `{{#if (eq a b)}}` | 相等判断 |
| `default` | `{{default value "默认值"}}` | 默认值 |
| `json` | `{{json object}}` | JSON 序列化 |
| `tradeType` | `{{tradeType code}}` | 交易类型映射 |
| `limit` | `{{#each (limit arr 10)}}` | 数组截取 |

### 模板调用

```typescript
const screenshot = await ctx.jx3render.render(
  "TemplateName",  // 模板名称（不含 .hbs）
  data,            // 数据对象
  "cache-key",     // 缓存标识
  false            // 是否使用缓存
);
return <img src={"data:image/png;base64," + screenshot} />;
```

---

## UI 设计规范

### 统一设计风格

模板应采用现代柔和设计风格（Modern Pastel Style）：

#### 颜色配置

```css
/* 背景 */
background-color: #fceef5;  /* 柔和粉色基底 */
background-image: radial-gradient(#ffc0cb 15%, transparent 16%);  /* 圆点纹理 */

/* 主题色 */
--primary: #6c5ce7;     /* 紫罗兰色 - 标题/重点 */
--accent: #ff7675;      /* 珊瑚红 - 高亮/警告 */
--secondary: #74b9ff;   /* 天蓝色 - 徽章/辅助 */
--muted: #a29bfe;       /* 淡紫色 - 次要元素 */

/* 文字 */
color: #2d3436;         /* 主文字 */
color: #636e72;         /* 次要文字 */
color: #b2bec3;         /* 辅助文字 */
```

#### 布局规范

```css
/* 容器宽度 */
body { width: 1400px; }  /* 或 1600px */

/* 标题样式 - 倾斜设计 */
.page-title {
  background: #fff;
  padding: 12px 50px;
  border-radius: 60px;
  transform: skew(-10deg);
  box-shadow: 0 6px 20px rgba(108, 92, 231, 0.2);
}

/* 卡片样式 */
.card {
  background: #fff;
  border-radius: 16px;
  padding: 15px;
  box-shadow: 0 4px 15px rgba(230, 230, 250, 0.6);
}
```

#### 字体配置

```css
font-family: "Microsoft YaHei", "Heiti SC", sans-serif;
```

---

## JSX 返回规范

### 文本消息

```tsx
return (
  <>
    <p>标题信息</p>
    <p>字段1：{data.field1}</p>
    <p>字段2：{data.field2}</p>
    <br />
    <p>分组标题</p>
    <p>{data.items.join(";")}</p>
  </>
);
```

### 图片消息

```tsx
const screenshot = await ctx.jx3render.render("Template", data, "cache-key", false);
return <img src={"data:image/png;base64," + screenshot} />;
```

### 错误处理

```tsx
// API 错误
if (res.msg !== "success") return <p>{res.msg}</p>;

// 空数据
if (!(Array.isArray(res.data) && res.data.length)) {
  return <p>没有查到相关数据</p>;
}

// 自定义错误
return <p>未找到角色：{name}</p>;
```

---

## 最佳实践

###  推荐做法

1. 使用 `ctx.guild()` 限制命令仅在群聊可用
2. 优先从 `session.channel.groupServer` 获取服务器，其次从 `session.user.userServer`
3. 使用 `ArgParser` 处理无序参数
4. 使用 `session.prompt()` 进行交互式输入
5. API 响应类型应明确定义 `data` 结构
6. 渲染图片时使用有意义的缓存 key

###  避免做法

1. 不要硬编码服务器名或角色名
2. 不要忽略 API 响应的错误处理
3. 不要在模板中使用复杂逻辑，应在 TS 层预处理数据
4. 不要创建过大的单文件，按功能拆分模块

---

## 开发命令

```bash
# 开发模式（支持热重载）
yarn dev

# 生产模式
yarn start

# 构建所有插件
yarn build

# 清理构建产物
yarn clean
```

---

## 相关资源

- [Koishi 官方文档](https://koishi.chat/)
- [JX3API 文档](https://www.jx3api.com/)
- [Handlebars 官方文档](https://handlebarsjs.com/)
- [Day.js 官方文档](https://day.js.org/)
