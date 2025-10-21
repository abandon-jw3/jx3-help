import { Context, Schema, Service } from "koishi";
import {
  ActiveCalendar,
  ActiveCalendarParams,
  ActiveListCalendar,
  ActiveListCalendarParams,
  ActiveCelebs,
  ActiveCelebsParams,
  ExamAnswer,
  ExamAnswerParams,
  HomeFlower,
  HomeFlowerParams,
  HomeFurniture,
  HomeFurnitureParams,
  HomeTravel,
  HomeTravelParams,
  NewsItem,
  NewsParams,
  ServerMaster,
  ServerMasterParams,
  NewsAnnounce,
  NewsAnnounceParams,
  SkillRecord,
  ServerCheck,
  ServerCheckParams,
  ServerStatus,
  ServerStatusParams,
  ActiveMonster,
  FireworksCollect,
  FireworksCollectParams,
  FireworksRecord,
  FireworksRecordParams,
  AuctionRecord,
  AuctionRecordParams,
  DiluRecord,
  DiluRecordParams,
  FireworksStatistical,
  FireworksStatisticalParams,
  FraudDetailed,
  FraudDetailedParams,
  LuckStatistical,
  LuckStatisticalParams,
  LuckRecent,
  LuckRecentParams,
  LuckAdventure,
  LuckAdventureParams,
  LuckUnfinished,
  LuckUnfinishedParams,
  RankServerStatistical,
  RankServerStatisticalParams,
  RankStatistical,
  RankStatisticalParams,
  MemberStudent,
  MemberStudentParams,
  MemberRecruit,
  MemberRecruitParams,
  MemberTeacher,
  MemberTeacherParams,
  TeamCdList,
  TeamCdListParams,
  SaveRoleDetailed,
  SaveRoleDetailedParams,
  RewardServerStatistical,
  RewardServerStatisticalParams,
  RewardStatistical,
  RewardStatisticalParams,
  RoleDetailed,
  RoleDetailedParams,
  SchoolForce,
  SchoolForceParams,
  RoleMonster,
  RoleMonsterParams,
  RoleAchievement,
  RoleAchievementParams,
  RoleAttribute,
  RoleAttributeParams,
  SchoolMatrix,
  SchoolMatrixParams,
  ServerSand,
  ServerSandParams,
  ServerAntivice,
  ServerEvent,
  SchoolSeniority,
  SchoolSeniorityParams,
  SchoolSkill,
  SchoolSkillParams,
  ServerLeader,
  ShowCache,
  ShowCacheParams,
  ShowRandom,
  ShowRandomParams,
  ShowCard,
  ShowCardParams,
  TiebaItemRecord,
  TiebaItemRecordsParams,
  TradeDemon,
  TradeDemonParams,
  TuilanAchievement,
  TuilanAchievementParams,
  IdiomSolitaire,
  IdiomSolitaireParams,
  MixedChat,
  MixedChatParams,
  TiebaRandom,
  TiebaRandomParams,
  KugouMusic,
  KugouMusicParams,
  NeteaseMusic,
  NeteaseMusicParams,
  TencentMusic,
  TencentMusicParams,
  SaohuaRandom,
  SaohuaContent,
  SoundConverter,
  SoundConverterParams,
  ActiveNextEvent,
  ActiveNextEventParams,
  ArchivedPendant,
  ArchivedPendantParams,
  ArchivedPetEvent,
  ArchivedPetEventParams,
  ArenaAwesome,
  ArenaAwesomeParams,
  ArenaRecent,
  ArenaRecentParams,
  ArenaSchool,
  ArenaSchoolsParams,
  ChituRecord,
  HorseRanch,
  HorseRanchParams,
  LuckCollect,
  LuckCollectParams,
  LuckServerStatistical,
  LuckServerStatisticalParams,
  RoleOnlineStatus,
  RoleOnlineStatusParams,
  ShowRecord,
  ShowRecordsParams,
  TradeItemRecord,
  TradeItemRecordsParams,
  TradeMarket,
  TradeMarketParams,
  TradeRecord,
  TradeRecordsParams,
  TradeSearch,
  TradeSearchParams,
  SaveClientCalendar,
  SaveClientCalendarParams,
  SaveTuilanCalendar,
  SaveTuilanCalendarParams,
  SaveWeekCalendar,
  SaveWeekCalendarParams,
} from "./types";
export const name = "jx3api";
export const inject = ["http"];

export interface Config {
  apiUrl: string;
  token: string;
  ticket?: string;
}

export const Config: Schema<Config> = Schema.object({
  apiUrl: Schema.string().required().default("https://www.jx3api.com"),
  token: Schema.string().required(),
  ticket: Schema.string(),
});

export class JX3_api_service extends Service {
  private http: any; // Koishi HTTP 客户端实例

  constructor(
    ctx: Context,
    public config: Config
  ) {
    super(ctx, "jx3api", true);
    // 创建一个带有统一 baseURL 的 HTTP 客户端实例
    this.http = ctx.http.extend({
      baseURL: config.apiUrl,
      headers: {
        token: config.token,
      },
    });
  }

  /**
   * 获取活动日历
   * @param data.server 服务器名（可选）
   * @param data.num 日期偏移值：0-当天，1-明天，2-后天（可选）
   */
  getActiveCalendar(data?: ActiveCalendarParams): Promise<ActiveCalendar> {
    // 现在只需要写相对路径即可
    return this.http.post("/data/active/calendar", data);
  }

  /**
   * 获取活动列表日历
   * @param data.num 预测时间范围，返回指定日期的月历，默认15天
   */
  getActiveListCalendar(data?: ActiveListCalendarParams): Promise<ActiveListCalendar> {
    return this.http.post("/data/active/list/calendar", data);
  }

  /**
   * 查询当前时间的楚天社或云从社的进度。
   * @param data.name 目标名称：楚天社、云从社、披风会
   */
  getActiveCelebs(data: ActiveCelebsParams): Promise<ActiveCelebs> {
    return this.http.post("/data/active/celebs", data);
  }

  /**
   * 获取科举答案
   * @param data.subject 科举题目内容，支持模糊查询和拼音首字母
   * @param data.limit 限制返回数量，默认10，范围1-20
   */
  getExamAnswer(data: ExamAnswerParams): Promise<ExamAnswer> {
    return this.http.post("/data/exam/answer", data);
  }

  /**
   * 获取家园花卉信息
   * @param data.server 服务器名
   * @param data.name 花卉名称（可选）
   * @param data.map 地图名称（可选）
   */
  getHomeFlower(data: HomeFlowerParams): Promise<HomeFlower> {
    return this.http.post("/data/home/flower", data);
  }

  /**
   * 获取家园装饰信息
   * @param data.name 装饰名称
   */
  getHomeFurniture(data: HomeFurnitureParams): Promise<HomeFurniture> {
    return this.http.post("/data/home/furniture", data);
  }

  /**
   * 获取地图产出的家具
   * @param data.name 地图名称
   */
  getHomeTravel(data: HomeTravelParams): Promise<HomeTravel> {
    return this.http.post("/data/home/travel", data);
  }

  /**
   * 获取新闻公告
   * @param data.limit 限制返回的新闻条数，默认10，范围1-50（可选）
   */
  getAllNews(data?: NewsParams): Promise<NewsItem> {
    return this.http.post("/data/news/allnews", data);
  }

  /**
   * 获取服务器信息
   * @param data.name 服务器名称或简称
   */
  getServerMaster(data: ServerMasterParams): Promise<ServerMaster> {
    return this.http.post("/data/server/master", data);
  }

  /**
   * 获取维护公告
   * @param data.limit 限制返回的公告条数，默认10，范围1-50（可选）
   */
  getNewsAnnounce(data?: NewsAnnounceParams): Promise<NewsAnnounce> {
    return this.http.post("/data/news/announce", data);
  }

  /**
   * 获取技改记录
   */
  getSkillRecords(): Promise<SkillRecord> {
    return this.http.post("/data/skills/records");
  }

  /**
   * 开服检查
   * @param data.server 服务器名称（可选，不传则返回所有服务器状态）
   */
  getServerCheck(data?: ServerCheckParams): Promise<ServerCheck> {
    return this.http.post("/data/server/check", data);
  }

  /**
   * 获取服务器状态
   * @param data.server 服务器名称
   */
  getServerStatus(data: ServerStatusParams): Promise<ServerStatus> {
    return this.http.post("/data/server/status", data);
  }

  /**
   * 获取本周百战异闻录刷新的首领以及它们的特殊效果
   */
  getActiveMonster(): Promise<ActiveMonster> {
    return this.http.post("/data/active/monster");
  }

  /**
   * 获取烟花统计
   * @param data.server 服务器名
   * @param data.num 统计时间范围（天数），默认7天，范围1-30（可选）
   */
  getFireworksCollect(data: FireworksCollectParams): Promise<FireworksCollect> {
    return this.http.post("/data/fireworks/collect", data);
  }

  /**
   * 获取烟花记录
   * @param data.server 服务器名
   * @param data.name 角色名
   */
  getFireworksRecords(data: FireworksRecordParams): Promise<FireworksRecord> {
    return this.http.post("/data/fireworks/records", data);
  }

  /**
   * 获取拍卖记录
   * @param data.server 服务器名
   * @param data.name 物品名称（可选）
   * @param data.limit 返回记录数量限制，默认50，范围1-100（可选）
   */
  getAuctionRecords(data: AuctionRecordParams): Promise<AuctionRecord> {
    return this.http.post("/data/auction/records", data);
  }

  /**
   * 获取的卢记录
   * @param data.server 服务器名（可选）
   */
  getDiluRecords(data: DiluRecordParams): Promise<DiluRecord> {
    return this.http.post("/data/dilu/records", data);
  }

  /**
   * 获取烟花汇总
   * @param data.server 服务器名
   * @param data.name 烟花名称
   * @param data.limit 返回记录数量限制，默认20，范围1-50（可选）
   */
  getFireworksStatistical(data: FireworksStatisticalParams): Promise<FireworksStatistical> {
    return this.http.post("/data/fireworks/statistical", data);
  }

  /**
   * 获取骗子查询
   * @param data.uid QQ号
   */
  getFraudDetailed(data: FraudDetailedParams): Promise<FraudDetailed> {
    return this.http.post("/data/fraud/detailed", data);
  }

  /**
   * 获取奇遇统计
   * @param data.server 服务器名
   * @param data.name 奇遇名称
   * @param data.limit 返回记录数量限制，默认50，范围1-50（可选）
   */
  getLuckStatistical(data: LuckStatisticalParams): Promise<LuckStatistical> {
    return this.http.post("/data/luck/statistical", data);
  }

  /**
   * 获取近期奇遇
   * @param data.server 服务器名
   */
  getLuckRecent(data: LuckRecentParams): Promise<LuckRecent> {
    return this.http.post("/data/luck/recent", data);
  }

  /**
   * 获取奇遇记录
   * @param data.server 服务器名
   * @param data.name 角色名
   * @param data.ticket 推栏标识（可选）
   */
  getLuckAdventure(data: LuckAdventureParams): Promise<LuckAdventure> {
    return this.http.post("/data/luck/adventure", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 获取未完成奇遇
   * @param data.server 服务器名
   * @param data.name 角色名
   * @param data.ticket 推栏标识（可选）
   */
  getLuckUnfinished(data: LuckUnfinishedParams): Promise<LuckUnfinished> {
    return this.http.post("/data/luck/unfinished", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 获取服务器排行榜统计
   * @param data.table 榜单类型：个人、帮会、阵营、试炼
   * @param data.name 榜单名称
   */
  getRankServerStatistical(data: RankServerStatisticalParams): Promise<RankServerStatistical> {
    return this.http.post("/data/rank/server/statistical", data);
  }

  /**
   * 获取区服排行榜统计
   * @param data.server 服务器名
   * @param data.table 榜单类型：个人、帮会、阵营、试炼
   * @param data.name 榜单名称
   */
  getRankStatistical(data: RankStatisticalParams): Promise<RankStatistical> {
    return this.http.post("/data/rank/statistical", data);
  }

  /**
   * 获取师徒系统-徒弟信息
   * @param data.server 服务器名
   * @param data.keyword 关键字（可选）
   */
  getMemberStudent(data: MemberStudentParams): Promise<MemberStudent> {
    return this.http.post("/data/member/student", data);
  }

  /**
   * 获取团队招募信息
   * @param data.server 服务器名
   * @param data.keyword 关键字（可选）
   * @param data.table 数据记录范围：1-本服+跨服，2-仅本服，3-仅跨服（可选）
   */
  getMemberRecruit(data: MemberRecruitParams): Promise<MemberRecruit> {
    return this.http.post("/data/member/recruit", data);
  }

  /**
   * 获取师徒系统-师傅信息
   * @param data.server 服务器名
   * @param data.keyword 关键字（可选）
   */
  getMemberTeacher(data: MemberTeacherParams): Promise<MemberTeacher> {
    return this.http.post("/data/member/teacher", data);
  }

  /**
   * 获取角色副本进度
   * @param data.server 服务器名
   * @param data.name 角色名称
   * @param data.ticket 推栏标识
   */
  getTeamCdList(data: TeamCdListParams): Promise<TeamCdList> {
    return this.http.post("/data/role/teamCdList", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 保存或更新角色的详细信息。
   * @param data.server 服务器名
   * @param data.roleid 角色ID
   * @param data.ticket 推栏标识
   */
  saveRoleDetailed(data: SaveRoleDetailedParams): Promise<SaveRoleDetailed> {
    return this.http.post("/save/role/detailed", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 获取全服物品掉落统计
   * @param data.name 物品名称
   * @param data.limit 返回记录数量限制，默认30，范围1-100（可选）
   */
  getRewardServerStatistical(data: RewardServerStatisticalParams): Promise<RewardServerStatistical> {
    return this.http.post("/data/reward/server/statistical", data);
  }

  /**
   * 获取区服物品掉落统计
   * @param data.server 服务器名
   * @param data.name 物品名称
   * @param data.limit 返回记录数量限制，默认20，范围1-100（可选）
   */
  getRewardStatistical(data: RewardStatisticalParams): Promise<RewardStatistical> {
    return this.http.post("/data/reward/statistical", data);
  }

  /**
   * 获取角色详情
   * @param data.server 服务器名
   * @param data.name 角色名称
   * @param data.ticket 推栏标识
   */
  getRoleDetailed(data: RoleDetailedParams): Promise<RoleDetailed> {
    return this.http.post("/data/role/detailed", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 获取心法奇穴信息
   * @param data.name 心法名称
   * @param data.ticket 推栏标识
   */
  getSchoolForce(data: SchoolForceParams): Promise<SchoolForce> {
    return this.http.post("/data/school/force", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 获取角色精耐信息
   * @param data.server 服务器名
   * @param data.name 角色名
   */
  getRoleMonster(data: RoleMonsterParams): Promise<RoleMonster> {
    return this.http.post("/data/role/monster", data);
  }

  /**
   * 获取角色成就信息
   * @param data.server 服务器名
   * @param data.role 角色名
   * @param data.name 成就名称
   * @param data.ticket 推栏标识
   */
  getRoleAchievement(data: RoleAchievementParams): Promise<RoleAchievement> {
    return this.http.post("/data/role/achievement", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 获取角色属性信息
   * @param data.server 服务器名
   * @param data.name 角色名
   * @param data.ticket 推栏标识
   */
  getRoleAttribute(data: RoleAttributeParams): Promise<RoleAttribute> {
    return this.http.post("/data/role/attribute", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 获取心法阵眼信息
   * @param data.name 心法名称
   * @param data.ticket 推栏标识
   */
  getSchoolMatrix(data: SchoolMatrixParams): Promise<SchoolMatrix> {
    return this.http.post("/data/school/matrix", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 获取服务器沙盘信息
   * @param data.server 服务器名称
   */
  getServerSand(data: ServerSandParams): Promise<ServerSand> {
    return this.http.post("/data/server/sand", data);
  }

  /**
   * 获取诛恶事件
   */
  getServerAntivice(): Promise<ServerAntivice> {
    return this.http.post("/data/server/antivice");
  }

  /**
   * 获取跨服阵营事件
   */
  getServerEvent(): Promise<ServerEvent> {
    return this.http.post("/data/server/event");
  }

  /**
   * 获取心法资历排行
   * @param data.school 心法名称
   * @param data.ticket 推栏标识
   */
  getSchoolSeniority(data: SchoolSeniorityParams): Promise<SchoolSeniority> {
    return this.http.post("/data/school/seniority", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 获取心法技能信息
   * @param data.name 心法名称
   * @param data.ticket 推栏标识
   */
  getSchoolSkills(data: SchoolSkillParams): Promise<SchoolSkill> {
    return this.http.post("/data/school/skills", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 获取服务器关隘首领
   */
  getServerLeader(): Promise<ServerLeader> {
    return this.http.post("/data/server/leader");
  }

  /**
   * 获取名片墙缓存
   * @param data.server 服务器名称
   * @param data.name 角色名称
   */
  getShowCache(data: ShowCacheParams): Promise<ShowCache> {
    return this.http.post("/data/show/cache", data);
  }

  /**
   * 获取随机名片
   * @param data.server 服务器名称（可选）
   * @param data.body 角色体型（可选）
   * @param data.force 门派名称（可选）
   */
  getShowRandom(data: ShowRandomParams): Promise<ShowRandom> {
    return this.http.post("/data/show/random", data);
  }

  /**
   * 获取名片墙信息
   * @param data.server 服务器名称
   * @param data.name 角色名称
   */
  getShowCard(data: ShowCardParams): Promise<ShowCard> {
    return this.http.post("/data/show/card", data);
  }

  /**
   * 获取贴吧物价记录
   * @param data.server 服务器名称（可选）
   * @param data.name 物品名称
   * @param data.limit 返回记录数量限制，默认10，范围1-50（可选）
   */
  getTiebaItemRecords(data: TiebaItemRecordsParams): Promise<TiebaItemRecord> {
    return this.http.post("/data/tieba/item/records", data);
  }

  /**
   * 获取金价比例信息
   * @param data.server 服务器名称（可选）
   * @param data.limit 返回数量，默认10，范围1-100（可选）
   */
  getTradeDemon(data: TradeDemonParams): Promise<TradeDemon> {
    return this.http.post("/data/trade/demon", data);
  }

  /**
   * 获取推栏成就信息
   * @param data.server 目标服务器名称，用于查询该服务器的角色数据
   * @param data.name 角色名称，用于查找指定角色的资历分布信息
   * @param data.class 资历主分类，1：江湖行，2：独步江湖，3：江湖行+独步江湖
   * @param data.subclass 资历子分类
   * @param data.ticket 推栏标识
   */
  getTuilanAchievement(data: TuilanAchievementParams): Promise<TuilanAchievement> {
    return this.http.post("/data/tuilan/achievement", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 成语接龙
   * @param data.name 输入的四字成语，用于进行成语接龙
   */
  getIdiomSolitaire(data: IdiomSolitaireParams): Promise<IdiomSolitaire> {
    return this.http.post("/data/idiom/solitaire", data);
  }

  /**
   * 智能聊天
   * @param data.name 机器人的名称，返回结果中的回答会使用该名称
   * @param data.text 输入的对话内容
   */
  getMixedChat(data: MixedChatParams): Promise<MixedChat> {
    return this.http.post("/data/mixed/chat", data);
  }

  /**
   * 获取贴吧随机帖子
   * @param data.class 帖子分类：818、616、鬼网三、鬼网3、树洞、记录、教程、街拍、故事、避雷、吐槽、提问
   * @param data.server 区服名称，用于查询指定区服的帖子记录，默认值为 - 表示全区服（可选）
   * @param data.limit 查询结果数量的限制，默认值为 10（可选）
   */
  getTiebaRandom(data: TiebaRandomParams): Promise<TiebaRandom> {
    return this.http.post("/data/tieba/random", data);
  }

  /**
   * 获取酷狗音乐搜索结果
   * @param data.name 歌曲名称，用于搜索酷狗音乐的相关内容
   */
  getKugouMusic(data: KugouMusicParams): Promise<KugouMusic> {
    return this.http.post("/data/music/kugou", data);
  }

  /**
   * 获取网易云音乐搜索结果
   * @param data.name 歌曲名称，用于搜索网易云音乐的相关内容
   */
  getNeteaseMusic(data: NeteaseMusicParams): Promise<NeteaseMusic> {
    return this.http.post("/data/music/netease", data);
  }

  /**
   * 获取腾讯音乐搜索结果
   * @param data.name 歌曲名称，用于搜索腾讯音乐的相关内容
   */
  getTencentMusic(data: TencentMusicParams): Promise<TencentMusic> {
    return this.http.post("/data/music/tencent", data);
  }

  /**
   * 获取随机骚话
   */
  getSaohuaRandom(): Promise<SaohuaRandom> {
    return this.http.post("/data/saohua/random");
  }

  /**
   * 获取舔狗日记
   */
  getSaohuaContent(): Promise<SaohuaContent> {
    return this.http.post("/data/saohua/content");
  }

  /**
   * 语音转换
   * @param data.appkey 阿里云应用标识
   * @param data.access 阿里云 Access Key
   * @param data.secret 阿里云 Secret Key
   * @param data.voice 发音人名称，默认值：Aitong
   * @param data.format 音频格式，支持 PCM、WAV 和 MP3，默认值：MP3
   * @param data.sample_rate 音频采样率，支持 8000 和 16000，默认值：16000
   * @param data.volume 音量大小，范围为 0 到 100，默认值：50
   * @param data.speech_rate 语速调节，范围为 -500 到 500，默认值：0
   * @param data.pitch_rate 音调调节，范围为 -500 到 500，默认值：0
   * @param data.text 待合成的文本内容
   */
  getSoundConverter(data: SoundConverterParams): Promise<SoundConverter> {
    return this.http.post("/data/sound/converter", data);
  }

  /**
   * 获取下一次扶摇九天活动开启的时间
   * @param data.server 服务器名（可选）
   */
  getActiveNextEvent(data?: ActiveNextEventParams): Promise<ActiveNextEvent> {
    return this.http.post("/data/active/next/event", data);
  }

  /**
   * 查询挂件的效果及获取方式
   * @param data.name 挂件名称
   */
  getArchivedPendant(data: ArchivedPendantParams): Promise<ArchivedPendant> {
    return this.http.post("/data/archived/pendant", data);
  }

  /**
   * 查询宠物的出现记录
   * @param data.server 服务器名
   */
  getArchivedPetEvent(data: ArchivedPetEventParams): Promise<ArchivedPetEvent> {
    return this.http.post("/data/archived/petEvent", data);
  }

  /**
   * 查询名剑大会的排行榜信息
   * @param data.mode 比赛模式，默认33
   * @param data.limit 返回数量，默认20
   * @param data.ticket 推栏ticket
   */
  getArenaAwesome(data: ArenaAwesomeParams): Promise<ArenaAwesome> {
    return this.http.post("/data/arena/awesome", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 查询角色近期的名剑战绩记录
   * @param data.server 服务器名
   * @param data.name 角色名
   * @param data.mode 比赛模式
   * @param data.ticket 推栏ticket
   */
  getArenaRecent(data: ArenaRecentParams): Promise<ArenaRecent> {
    return this.http.post("/data/arena/recent", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 统计角色近期的名剑战绩数据
   * @param data.mode 比赛模式，默认33
   * @param data.ticket 推栏ticket
   */
  getArenaSchools(data: ArenaSchoolsParams): Promise<ArenaSchool> {
    return this.http.post("/data/arena/schools", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 获取今天刷新出的赤兔幼驹相关信息
   */
  getChituRecords(): Promise<ChituRecord> {
    return this.http.post("/data/chitu/records");
  }

  /**
   * 查询指定区服的马场里即将刷新的马驹信息
   * @param data.server 服务器名
   */
  getHorseRanch(data: HorseRanchParams): Promise<HorseRanch> {
    return this.http.post("/data/horse/ranch", data);
  }

  /**
   * 统计指定区服内奇遇的近期触发角色记录
   * @param data.server 服务器名
   * @param data.num 汇总时间范围，默认7天
   */
  getLuckCollect(data: LuckCollectParams): Promise<LuckCollect> {
    return this.http.post("/data/luck/collect", data);
  }

  /**
   * 统计全服指定奇遇的近期触发记录
   * @param data.name 奇遇名称
   * @param data.limit 返回数量，默认10
   */
  getLuckServerStatistical(data: LuckServerStatisticalParams): Promise<LuckServerStatistical> {
    return this.http.post("/data/luck/server/statistical", data);
  }

  /**
   * 查询指定角色的当前在线状态
   * @param data.server 服务器名
   * @param data.name 角色名
   */
  getRoleOnlineStatus(data: RoleOnlineStatusParams): Promise<RoleOnlineStatus> {
    return this.http.post("/data/role/online/status", data);
  }

  /**
   * 查询指定角色的所有名片墙信息
   * @param data.server 服务器名
   * @param data.name 角色名
   */
  getShowRecords(data: ShowRecordsParams): Promise<ShowRecord> {
    return this.http.post("/data/show/records", data);
  }

  /**
   * 查询指定物品的黑市价格信息
   * @param data.server 服务器名（可选）
   * @param data.name 物品名称
   */
  getTradeItemRecords(data: TradeItemRecordsParams): Promise<TradeItemRecord> {
    return this.http.post("/data/trade/item/records", data);
  }

  /**
   * 查询指定物品的交易行价格信息
   * @param data.server 服务器名
   * @param data.name 物品名称
   */
  getTradeMarket(data: TradeMarketParams): Promise<TradeMarket> {
    return this.http.post("/data/trade/market", data);
  }

  /**
   * 统计指定物品的黑市价格信息
   * @param data.server 服务器名（可选）
   * @param data.name 物品名称
   */
  getTradeRecords(data: TradeRecordsParams): Promise<TradeRecord> {
    return this.http.post("/data/trade/records", data);
  }

  /**
   * 模糊搜索外观物品
   * @param data.name 物品名称
   */
  getTradeSearch(data: TradeSearchParams): Promise<TradeSearch> {
    return this.http.post("/data/trade/search", data);
  }

  /**
   * 上报客户端的日常任务信息
   * @param data.szWar 大战任务
   * @param data.szCommon 公共周常
   * @param data.szDungeons 五人周常
   * @param data.szTeamDungeons 十人周常
   */
  saveClientCalendar(data: SaveClientCalendarParams): Promise<SaveClientCalendar> {
    return this.http.post("/save/client/calendar", data);
  }

  /**
   * 上报推栏app中的日常任务信息
   * @param data.ticket 推栏ticket
   */
  saveTuilanCalendar(data: SaveTuilanCalendarParams): Promise<SaveTuilanCalendar> {
    return this.http.post("/save/tuilan/calendar", { ...data, ticket: this.config.ticket || null });
  }

  /**
   * 更新推栏app中的周常任务信息
   * @param data.ticket 推栏ticket
   */
  saveWeekCalendar(data: SaveWeekCalendarParams): Promise<SaveWeekCalendar> {
    return this.http.post("/save/week/calendar", { ...data, ticket: this.config.ticket || null });
  }
}

// 声明服务类型，让 ctx.jx3api 在 TypeScript 中可用
declare module "koishi" {
  interface Context {
    jx3api: JX3_api_service;
  }
}

export function apply(ctx: Context, config: Config) {
  ctx.plugin(JX3_api_service, config);
}
