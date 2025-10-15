# koishi-plugin-jx3api

[![npm](https://img.shields.io/npm/v/koishi-plugin-jx3api?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-jx3api)

剑网3游戏数据 API 接口服务，为 Koishi 提供剑网3游戏数据查询功能。

## ⚙️ 配置

在 Koishi 配置文件中添加以下配置：

```yaml
plugins:
  jx3api:
    apiUrl: https://www.jx3api.com # API 服务器地址
    token: your_token_here # 必填：你的 API Token
    ticket: your_ticket_here # 可选：推栏 Ticket
```

### 配置项说明

| 配置项   | 类型   | 默认值                   | 说明                                                                 |
| -------- | ------ | ------------------------ | -------------------------------------------------------------------- |
| `apiUrl` | string | `https://www.jx3api.com` | JX3API 服务器地址                                                    |
| `token`  | string | -                        | **必填**：API 访问令牌，请前往 [JX3API](https://www.jx3api.com) 申请 |
| `ticket` | string | -                        | 可选：推栏应用的 Ticket，用于访问需要推栏授权的接口                  |

## 🚀 使用

安装并配置后，即可在其他插件中通过服务调用的方式使用：

```typescript
import { Context } from "koishi";

export function apply(ctx: Context) {
  // 查询活动日历
  const calendar = await ctx.jx3api.getActiveCalendar({
    server: "幽月轮",
    num: 0, // 0-当天，1-明天，2-后天
  });

  // 查询服务器状态
  const status = await ctx.jx3api.getServerStatus({
    server: "幽月轮",
  });

  // 查询角色信息
  const roleInfo = await ctx.jx3api.getRoleDetailed({
    server: "幽月轮",
    name: "角色名",
    ticket: "your_ticket",
  });
}
```

## 📚 功能列表

### 活动相关

- `getActiveCalendar` - 查询活动日历
- `getActiveListCalendar` - 查询活动列表日历
- `getActiveCelebs` - 查询楚天社/云从社进度
- `getActiveMonster` - 查询本周百战异闻录首领
- `getActiveNextEvent` - 查询下次扶摇九天活动时间

### 服务器相关

- `getServerCheck` - 服务器开服检查
- `getServerStatus` - 查询服务器状态
- `getServerMaster` - 查询服务器信息
- `getServerSand` - 查询服务器沙盘信息
- `getServerAntivice` - 查询诛恶事件
- `getServerEvent` - 查询跨服阵营事件
- `getServerLeader` - 查询服务器关隘首领

### 角色相关

- `getRoleDetailed` - 查询角色详情
- `getRoleAttribute` - 查询角色属性
- `getRoleAchievement` - 查询角色成就
- `getRoleMonster` - 查询角色精力信息
- `getRoleOnlineStatus` - 查询角色在线状态
- `saveRoleDetailed` - 保存/更新角色详情

### 副本相关

- `getTeamCdList` - 查询角色副本进度

### 奇遇相关

- `getLuckRecent` - 查询近期奇遇
- `getLuckStatistical` - 查询奇遇统计
- `getLuckAdventure` - 查询角色奇遇记录
- `getLuckUnfinished` - 查询未完成奇遇
- `getLuckCollect` - 查询奇遇汇总统计
- `getLuckServerStatistical` - 查询全服奇遇统计

### 交易相关

- `getTradeMarket` - 查询交易行价格
- `getTradeDemon` - 查询金价比例
- `getTradeSearch` - 模糊搜索外观物品
- `getTradeRecords` - 查询黑市价格统计
- `getTradeItemRecords` - 查询黑市物品价格
- `getAuctionRecords` - 查询拍卖记录

### 名剑大会

- `getArenaAwesome` - 查询名剑排行榜
- `getArenaRecent` - 查询角色名剑战绩
- `getArenaSchools` - 查询各门派表现统计

### 烟花相关

- `getFireworksRecords` - 查询烟花记录
- `getFireworksCollect` - 查询烟花统计
- `getFireworksStatistical` - 查询烟花汇总

### 排行榜

- `getRankStatistical` - 查询区服排行榜
- `getRankServerStatistical` - 查询全服排行榜

### 物品掉落

- `getRewardStatistical` - 查询区服物品掉落
- `getRewardServerStatistical` - 查询全服物品掉落

### 门派心法

- `getSchoolForce` - 查询心法奇穴
- `getSchoolMatrix` - 查询心法阵眼
- `getSchoolSkills` - 查询心法技能
- `getSchoolSeniority` - 查询心法资历排行

### 师徒系统

- `getMemberTeacher` - 查询师傅信息
- `getMemberStudent` - 查询徒弟信息
- `getMemberRecruit` - 查询团队招募信息

### 家园相关

- `getHomeFlower` - 查询家园花卉
- `getHomeFurniture` - 查询家园装饰
- `getHomeTravel` - 查询家园游历

### 宠物马匹

- `getArchivedPetEvent` - 查询宠物出现记录
- `getHorseRanch` - 查询马场马驹信息
- `getChituRecords` - 查询赤兔幼驹刷新
- `getDiluRecords` - 查询的卢记录

### 名片墙

- `getShowCard` - 查询名片墙信息
- `getShowCache` - 查询名片墙缓存
- `getShowRandom` - 查询随机名片
- `getShowRecords` - 查询所有名片墙记录

### 游戏资料

- `getExamAnswer` - 查询科举答案
- `getSkillRecords` - 查询技改记录
- `getArchivedPendant` - 查询挂件信息
- `getTuilanAchievement` - 查询推栏成就

### 新闻公告

- `getAllNews` - 查询新闻公告
- `getNewsAnnounce` - 查询维护公告

### 贴吧相关

- `getTiebaRandom` - 查询贴吧随机帖子
- `getTiebaItemRecords` - 查询贴吧物价记录

### 音乐搜索

- `getKugouMusic` - 酷狗音乐搜索
- `getNeteaseMusic` - 网易云音乐搜索
- `getTencentMusic` - 腾讯音乐搜索

### 娱乐功能

- `getIdiomSolitaire` - 成语接龙
- `getMixedChat` - 智能聊天
- `getSaohuaRandom` - 随机骚话
- `getSaohuaContent` - 舔狗日记
- `getSoundConverter` - 语音转换（需要阿里云配置）

### 其他功能

- `getFraudDetailed` - 查询骗子记录
- `saveClientCalendar` - 上报客户端日常任务
- `saveTuilanCalendar` - 上报推栏日常任务
- `saveWeekCalendar` - 更新推栏周常任务

## 📖 API 示例

### 查询活动日历

```typescript
const calendar = await ctx.jx3api.getActiveCalendar({
  server: "幽月轮",
  num: 0,
});

console.log(calendar.data);
```

### 查询角色奇遇

```typescript
const adventures = await ctx.jx3api.getLuckAdventure({
  server: "幽月轮",
  name: "角色名",
  ticket: "your_ticket",
});

console.log(adventures.data);
```

### 查询交易行价格

```typescript
const price = await ctx.jx3api.getTradeMarket({
  server: "幽月轮",
  name: "物品名称",
});

console.log(price.data);
```

## 📝 类型定义

本插件提供完整的 TypeScript 类型定义，所有接口的参数和返回值类型都已定义，可以获得完整的代码提示和类型检查。

```typescript
import type { ActiveCalendar, ActiveCalendarParams, ServerStatus, ServerStatusParams } from "koishi-plugin-jx3api";
```

## 🔗 相关链接

- [JX3API 官网](https://www.jx3api.com)
- [Koishi 官网](https://koishi.chat)
- [API 文档](https://www.jx3api.com/docs)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## ⚠️ 注意事项

1. 使用本插件需要先申请 JX3API 的 Token
2. 部分接口需要推栏 Ticket 才能访问
3. 请遵守 JX3API 的使用规范，避免频繁请求
4. 建议在生产环境中使用缓存机制减少 API 调用次数
