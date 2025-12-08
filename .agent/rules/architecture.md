---
trigger: always_on
glob:
description: JX3-Help 项目架构与业务逻辑说明
---

# 项目架构与业务逻辑

本文档帮助AI理解 jx3-help 项目的整体架构、数据流、插件依赖关系和业务逻辑。

---

## 核心架构

```

                      Koishi 机器人框架                        
─
      ─  
   instructions     jx3ws             jx3auth          
    (指令层)      (WebSocket)       (权限/绑定)         
        
                                                          
                                                          
  
                       jx3api (数据层)                      │
                封装 JX3API.com 的所有接口                   
  
                                                            
                                                            
  
                      jx3render (渲染层)                    
             Handlebars模板 + Puppeteer截图                 
  
                                                            
                                                            
  
                     jx3assets (资源层)                     
                静态图片、图标等资源托管                      
  

```

---

## 插件依赖关系

```
jx3auth     database (Koishi内置)
jx3api      http (Koishi内置)
jx3render   puppeteer (koishi-plugin-puppeteer)
jx3ws       (无外部依赖)
jx3assets   server (Koishi内置)

instructions  jx3api, jx3render, jx3auth (所有核心服务)
```

---

## 数据流详解

### 1. 用户查询流程

```
用户发送指令 "奇遇 梦江南 角色名"
        
        

  instructions 插件接收指令   
  ArgParser 解析无序参数      
  - 识别服务器: "梦江南"      
  - 剩余参数: "角色名"        

               
               

  ctx.jx3api.getLuckAdventure
  调用 JX3API 获取数据        

               
               

  ctx.jx3render.render()     
  1. 选择模板 UserQiyuRecord 
  2. 编译 Handlebars 模板    
  3. 保存为临时 HTML 文件    
  4. Puppeteer 访问并截图    
  5. 返回 Base64 图片        

               
               

  返回 JSX: <img src=.../>   
  机器人发送图片消息          

```

### 2. 服务器参数优先级

```
用户输入参数 > 群组绑定(groupServer) > 用户绑定(userServer)
```

### 3. WebSocket 推送流程

```
JX3API WebSocket 服务器
        
         (推送事件)

  jx3ws 插件接收事件          
  解析事件类型和数据           

               
               

  根据事件类型分发到对应处理器 
  如：开服通知、新闻推送等     

               
               

  广播到订阅了该事件的群组     

```

---

## 核心服务 API

### jx3api 服务 (ctx.jx3api)

| 方法分类 | 方法示例 | 说明 |
|---------|---------|------|
| 日常活动 | `getActiveCalendar`, `getActiveListCalendar`, `getActiveMonster` | 日常、月历、百战 |
| 奇遇相关 | `getLuckAdventure`, `getLuckRecent`, `getLuckUnfinished` | 奇遇记录/汇总/未出 |
| 角色信息 | `getRoleDetailed`, `getRoleAttribute`, `getRoleMonster` | 角色详情/属性/精耐 |
| 交易物价 | `getTradeRecords`, `getAuctionRecords`, `getDiluRecords` | 物价/拍卖/的卢 |
| 团队招募 | `getMemberRecruit`, `getMemberTeacher`, `getMemberStudent` | 招募/师父/徒弟 |
| 服务器 | `getServerCheck`, `getServerStatus`, `getServerSand` | 开服/状态/沙盘 |

### jx3render 服务 (ctx.jx3render)

```typescript
// 核心渲染方法
render(
  templateName: string,  // 模板名（不含.hbs）
  data: any,             // 传入模板的数据
  imgName: string,       // 缓存图片名称
  isCache: boolean       // 是否使用缓存
): Promise<string>       // 返回 Base64 字符串
```

### jx3auth 服务 (ctx.jx3auth)

- 用户数据绑定：服务器、角色名
- 群组数据绑定：默认服务器
- 服务有效期管理

---

## 数据库表结构

### channel 表扩展字段

| 字段 | 类型 | 说明 |
|-----|------|------|
| groupServer | string | 群组绑定的默认服务器 |

### user 表扩展字段

| 字段 | 类型 | 说明 |
|-----|------|------|
| userServer | string | 用户绑定的默认服务器 |
| roleName | string | 用户绑定的角色名 |

---

## 模板与数据对应关系

| 模板名 | API 方法 | 用途 |
|-------|---------|------|
| `ActiveList` | `getActiveListCalendar` | 活动月历 |
| `baizhan` | `getActiveMonster` | 百战异闻录 |
| `celebs` | `getActiveCelebs` | 楚天社/云从社/披风会 |
| `UserQiyuRecord` | `getLuckAdventure` | 个人奇遇记录 |
| `ServerQiyuRecord` | `getLuckStatistical` | 服务器奇遇统计 |
| `ServerQiyuSummary` | `getLuckRecent` | 服务器奇遇汇总 |
| `UserQiyuUnfinished` | `getLuckUnfinished` | 未出奇遇 |
| `FireworksRecords` | `getFireworksCollect` | 烟花统计 |
| `UserFireworksRecords` | `getFireworksRecords` | 个人烟花记录 |
| `DiluRecord` | `getDiluRecords` | 的卢记录 |
| `AuctionRecord` | `getAuctionRecords` | 拍卖记录 |
| `TradeRecords` | `getTradeRecords` | 物价记录 |
| `MemberRecruit` | `getMemberRecruit` | 团队招募 |
| `MemberTeacher` | `getMemberTeacher` | 师父信息 |
| `MemberStudent` | `getMemberStudent` | 徒弟信息 |
| `TeamCdList` | `getTeamCdList` | 副本CD |
| `ServerSand` | `getServerSand` | 阵营沙盘 |
| `RoleAttribute` | `getRoleAttribute` | 角色属性 |
| `SchoolForce` | `getSchoolForce` | 心法奇穴 |
| `RewardStatistical` | `getRewardStatistical` | 区服掉落统计 |
| `RewardServerStatistical` | `getRewardServerStatistical` | 全服掉落统计 |

---

## 常见开发场景

### 场景1：添加新指令（返回文本）

```typescript
ctx
  .guild()
  .command("新指令 [参数]", "指令描述")
  .channelFields(["groupServer"])
  .userFields(["userServer"])
  .action(async ({ session }, param) => {
    // 1. 获取服务器（优先级：参数 > 群组 > 用户）
    if (!param) param = session.channel.groupServer || session.user.userServer;
    
    // 2. 调用API
    const res = await ctx.jx3api.getXxx({ server: param });
    
    // 3. 错误处理
    if (res.msg !== "success") return <p>{res.msg}</p>;
    
    // 4. 返回文本
    return (
      <>
        <p>字段1：{res.data.field1}</p>
        <p>字段2：{res.data.field2}</p>
      </>
    );
  });
```

### 场景2：添加新指令（返回图片）

```typescript
ctx
  .guild()
  .command("新指令 [服务器] [角色名]", "指令描述")
  .channelFields(["groupServer"])
  .userFields(["userServer", "roleName"])
  .action(async ({ session }, ...arg) => {
    // 1. 无序参数解析
    const parser = new ArgParser(arg);
    let server = parser.tryMatch("server", serverList);
    if (!server) server = session.channel.groupServer || session.user.userServer;
    let name = parser.getRemaining()[0] || session.user.roleName;
    
    // 2. 交互式补充参数
    if (!name) {
      await session.send("请输入角色名：");
      name = await session.prompt();
      if (!name) return "输入超时。";
    }
    
    // 3. 调用API
    const res = await ctx.jx3api.getXxx({ server, name });
    
    // 4. 空数据检查
    if (!(Array.isArray(res.data) && res.data.length)) {
      return <p>没有查到相关数据</p>;
    }
    
    // 5. 渲染图片
    const screenshot = await ctx.jx3render.render(
      "TemplateName", 
      res.data, 
      `TemplateName-${server}-${name}`, 
      false
    );
    
    return <img src={"data:image/png;base64," + screenshot} />;
  });
```

### 场景3：添加新API接口

```typescript
// 1. 在 jx3api/src/types.ts 添加类型定义
export interface NewFeature extends JX3APIResponse {
  data: {
    field1: string;
    field2: number;
  };
}

export interface NewFeatureParams {
  server: string;
  name?: string;
}

// 2. 在 jx3api/src/index.ts 添加方法
/**
 * 新功能说明
 * @param data.server 服务器名
 * @param data.name 角色名（可选）
 */
getNewFeature(data: NewFeatureParams): Promise<NewFeature> {
  return this.request("/data/new/feature", data);
}
```

### 场景4：添加新模板

1. 在 `external/jx3render/templates/` 创建 `NewTemplate.hbs`
2. 遵循 Modern Pastel Style 设计规范
3. 使用已有的 Handlebars Helper

---

## 服务器列表

项目中定义的服务器列表在 `external/instructions/src/tools/dicts.ts` 中：

```typescript
export const serverList = [
  "梦江南", "幽月轮", "长安城", "龙争虎斗", 
  "蝶恋花", "乾坤一掷", "剑胆琴心", ...
] as const;
```

使用 `ArgParser.tryMatch("server", serverList)` 可从用户输入中匹配服务器。

---

## 静态资源路径

| 路径 | 说明 |
|-----|------|
| `/jx3assets/images/` | 游戏图标、背景图等 |
| `/jx3html/` | 临时生成的HTML文件 |
| `http://localhost:5140/` | 本地开发服务器 |

---

## 关键配置文件

| 文件 | 说明 |
|-----|------|
| `koishi.yml` | Koishi 主配置，插件启用/配置 |
| `.env` | 环境变量模板 |
| `.env.local` | 本地环境变量（API Token等） |
| `package.json` | 依赖和脚本 |

---

## 调试技巧

1. **查看API响应**: 在指令中添加 `console.log(res)` 查看完整响应
2. **检查模板渲染**: 临时HTML文件保存在 `data/jx3render/public/`
3. **访问控制台**: 浏览器打开 `http://localhost:5140` 查看Koishi控制台
4. **热重载**: 使用 `yarn dev` 启动开发模式，代码修改后自动重载
