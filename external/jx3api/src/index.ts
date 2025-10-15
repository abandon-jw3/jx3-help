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
        ...(config.ticket && { ticket: config.ticket }),
      },
    });
  }

  /**
   * 获取活动日历
   * @param params.server 服务器名（可选）
   * @param params.num 日期偏移值：0-当天，1-明天，2-后天（可选）
   */
  getActiveCalendar(params?: ActiveCalendarParams): Promise<ActiveCalendar> {
    // 现在只需要写相对路径即可
    return this.http.post("/data/active/calendar", params);
  }

  /**
   * 获取活动列表日历
   * @param params.num 预测时间范围，返回指定日期的月历，默认15天
   */
  getActiveListCalendar(params?: ActiveListCalendarParams): Promise<ActiveListCalendar> {
    return this.http.post("/data/active/list/calendar", params);
  }

  /**
   * 查询当前时间的楚天社或云从社的进度。
   * @param params.name 目标名称：楚天社、云从社、披风会
   */
  getActiveCelebs(params: ActiveCelebsParams): Promise<ActiveCelebs> {
    return this.http.post("/data/active/celebs", params);
  }

  /**
   * 获取科举答案
   * @param params.subject 科举题目内容，支持模糊查询和拼音首字母
   * @param params.limit 限制返回数量，默认10，范围1-20
   */
  getExamAnswer(params: ExamAnswerParams): Promise<ExamAnswer> {
    return this.http.post("/data/exam/answer", params);
  }

  /**
   * 获取家园花卉信息
   * @param params.server 服务器名
   * @param params.name 花卉名称（可选）
   * @param params.map 地图名称（可选）
   */
  getHomeFlower(params: HomeFlowerParams): Promise<HomeFlower> {
    return this.http.post("/data/home/flower", params);
  }

  /**
   * 获取家园装饰信息
   * @param params.name 装饰名称
   */
  getHomeFurniture(params: HomeFurnitureParams): Promise<HomeFurniture> {
    return this.http.post("/data/home/furniture", params);
  }

  /**
   * 获取家园游历信息
   * @param params.name 地图名称
   */
  getHomeTravel(params: HomeTravelParams): Promise<HomeTravel[]> {
    return this.http.post("/data/home/travel", params);
  }

  /**
   * 获取新闻公告
   * @param params.limit 限制返回的新闻条数，默认10，范围1-50（可选）
   */
  getAllNews(params?: NewsParams): Promise<NewsItem[]> {
    return this.http.post("/data/news/allnews", params);
  }

  /**
   * 获取服务器信息
   * @param params.name 服务器名称或简称
   */
  getServerMaster(params: ServerMasterParams): Promise<ServerMaster> {
    return this.http.post("/data/server/master", params);
  }

  /**
   * 获取维护公告
   * @param params.limit 限制返回的公告条数，默认10，范围1-50（可选）
   */
  getNewsAnnounce(params?: NewsAnnounceParams): Promise<NewsAnnounce[]> {
    return this.http.post("/data/news/announce", params);
  }

  /**
   * 获取技改记录
   */
  getSkillRecords(): Promise<SkillRecord[]> {
    return this.http.post("/data/skills/records");
  }

  /**
   * 开服检查
   * @param params.server 服务器名称（可选，不传则返回所有服务器状态）
   */
  getServerCheck(params?: ServerCheckParams): Promise<ServerCheck> {
    return this.http.post("/data/server/check", params);
  }

  /**
   * 获取服务器状态
   * @param params.server 服务器名称
   */
  getServerStatus(params: ServerStatusParams): Promise<ServerStatus> {
    return this.http.post("/data/server/status", params);
  }

  /**
   * 获取本周百战异闻录刷新的首领以及它们的特殊效果
   */
  getActiveMonster(): Promise<ActiveMonster> {
    return this.http.post("/data/active/monster");
  }

  /**
   * 获取烟花统计
   * @param params.server 服务器名
   * @param params.num 统计时间范围（天数），默认7天，范围1-30（可选）
   */
  getFireworksCollect(params: FireworksCollectParams): Promise<FireworksCollect[]> {
    return this.http.post("/data/fireworks/collect", params);
  }

  /**
   * 获取烟花记录
   * @param params.server 服务器名
   * @param params.name 角色名
   */
  getFireworksRecords(params: FireworksRecordParams): Promise<FireworksRecord[]> {
    return this.http.post("/data/fireworks/records", params);
  }

  /**
   * 获取拍卖记录
   * @param params.server 服务器名
   * @param params.name 物品名称（可选）
   * @param params.limit 返回记录数量限制，默认50，范围1-100（可选）
   */
  getAuctionRecords(params: AuctionRecordParams): Promise<AuctionRecord[]> {
    return this.http.post("/data/auction/records", params);
  }

  /**
   * 获取的卢记录
   * @param params.server 服务器名（可选）
   */
  getDiluRecords(params: DiluRecordParams): Promise<DiluRecord[]> {
    return this.http.post("/data/dilu/records", params);
  }

  /**
   * 获取烟花汇总
   * @param params.server 服务器名
   * @param params.name 烟花名称
   * @param params.limit 返回记录数量限制，默认20，范围1-50（可选）
   */
  getFireworksStatistical(params: FireworksStatisticalParams): Promise<FireworksStatistical[]> {
    return this.http.post("/data/fireworks/statistical", params);
  }

  /**
   * 获取骗子查询
   * @param params.uid QQ号
   */
  getFraudDetailed(params: FraudDetailedParams): Promise<FraudDetailed> {
    return this.http.post("/data/fraud/detailed", params);
  }

  /**
   * 获取奇遇统计
   * @param params.server 服务器名
   * @param params.name 奇遇名称
   * @param params.limit 返回记录数量限制，默认50，范围1-50（可选）
   */
  getLuckStatistical(params: LuckStatisticalParams): Promise<LuckStatistical[]> {
    return this.http.post("/data/luck/statistical", params);
  }

  /**
   * 获取近期奇遇
   * @param params.server 服务器名
   */
  getLuckRecent(params: LuckRecentParams): Promise<LuckRecent[]> {
    return this.http.post("/data/luck/recent", params);
  }

  /**
   * 获取奇遇记录
   * @param params.server 服务器名
   * @param params.name 角色名
   * @param params.ticket 推栏标识（可选）
   */
  getLuckAdventure(params: LuckAdventureParams): Promise<LuckAdventure[]> {
    return this.http.post("/data/luck/adventure", params);
  }

  /**
   * 获取未完成奇遇
   * @param params.server 服务器名
   * @param params.name 角色名
   * @param params.ticket 推栏标识（可选）
   */
  getLuckUnfinished(params: LuckUnfinishedParams): Promise<LuckUnfinished[]> {
    return this.http.post("/data/luck/unfinished", params);
  }

  /**
   * 获取服务器排行榜统计
   * @param params.table 榜单类型：个人、帮会、阵营、试炼
   * @param params.name 榜单名称
   */
  getRankServerStatistical(params: RankServerStatisticalParams): Promise<RankServerStatistical[]> {
    return this.http.post("/data/rank/server/statistical", params);
  }

  /**
   * 获取区服排行榜统计
   * @param params.server 服务器名
   * @param params.table 榜单类型：个人、帮会、阵营、试炼
   * @param params.name 榜单名称
   */
  getRankStatistical(params: RankStatisticalParams): Promise<RankStatistical[]> {
    return this.http.post("/data/rank/statistical", params);
  }

  /**
   * 获取师徒系统-徒弟信息
   * @param params.server 服务器名
   * @param params.keyword 关键字（可选）
   */
  getMemberStudent(params: MemberStudentParams): Promise<MemberStudent> {
    return this.http.post("/data/member/student", params);
  }

  /**
   * 获取团队招募信息
   * @param params.server 服务器名
   * @param params.keyword 关键字（可选）
   * @param params.table 数据记录范围：1-本服+跨服，2-仅本服，3-仅跨服（可选）
   */
  getMemberRecruit(params: MemberRecruitParams): Promise<MemberRecruit> {
    return this.http.post("/data/member/recruit", params);
  }

  /**
   * 获取师徒系统-师傅信息
   * @param params.server 服务器名
   * @param params.keyword 关键字（可选）
   */
  getMemberTeacher(params: MemberTeacherParams): Promise<MemberTeacher> {
    return this.http.post("/data/member/teacher", params);
  }

  /**
   * 获取角色副本进度
   * @param params.server 服务器名
   * @param params.name 角色名称
   * @param params.ticket 推栏标识
   */
  getTeamCdList(params: TeamCdListParams): Promise<TeamCdList> {
    return this.http.post("/data/role/teamCdList", params);
  }

  /**
   * 保存或更新角色的详细信息。
   * @param params.server 服务器名
   * @param params.roleid 角色ID
   * @param params.ticket 推栏标识
   */
  saveRoleDetailed(params: SaveRoleDetailedParams): Promise<SaveRoleDetailed> {
    return this.http.post("/save/role/detailed", params);
  }

  /**
   * 获取全服物品掉落统计
   * @param params.name 物品名称
   * @param params.limit 返回记录数量限制，默认30，范围1-100（可选）
   */
  getRewardServerStatistical(params: RewardServerStatisticalParams): Promise<RewardServerStatistical[]> {
    return this.http.post("/data/reward/server/statistical", params);
  }

  /**
   * 获取区服物品掉落统计
   * @param params.server 服务器名
   * @param params.name 物品名称
   * @param params.limit 返回记录数量限制，默认20，范围1-100（可选）
   */
  getRewardStatistical(params: RewardStatisticalParams): Promise<RewardStatistical[]> {
    return this.http.post("/data/reward/statistical", params);
  }

  /**
   * 获取角色详情
   * @param params.server 服务器名
   * @param params.name 角色名称
   * @param params.ticket 推栏标识
   */
  getRoleDetailed(params: RoleDetailedParams): Promise<RoleDetailed> {
    return this.http.post("/data/role/detailed", params);
  }

  /**
   * 获取心法奇穴信息
   * @param params.name 心法名称
   * @param params.ticket 推栏标识
   */
  getSchoolForce(params: SchoolForceParams): Promise<SchoolForce[]> {
    return this.http.post("/data/school/force", params);
  }

  /**
   * 获取角色精力信息
   * @param params.server 服务器名
   * @param params.name 角色名
   */
  getRoleMonster(params: RoleMonsterParams): Promise<RoleMonster> {
    return this.http.post("/data/role/monster", params);
  }

  /**
   * 获取角色成就信息
   * @param params.server 服务器名
   * @param params.role 角色名
   * @param params.name 成就名称
   * @param params.ticket 推栏标识
   */
  getRoleAchievement(params: RoleAchievementParams): Promise<RoleAchievement> {
    return this.http.post("/data/role/achievement", params);
  }

  /**
   * 获取角色属性信息
   * @param params.server 服务器名
   * @param params.name 角色名
   * @param params.ticket 推栏标识
   */
  getRoleAttribute(params: RoleAttributeParams): Promise<RoleAttribute> {
    return this.http.post("/data/role/attribute", params);
  }

  /**
   * 获取心法阵眼信息
   * @param params.name 心法名称
   * @param params.ticket 推栏标识
   */
  getSchoolMatrix(params: SchoolMatrixParams): Promise<SchoolMatrix> {
    return this.http.post("/data/school/matrix", params);
  }

  /**
   * 获取服务器沙盘信息
   * @param params.server 服务器名称
   */
  getServerSand(params: ServerSandParams): Promise<ServerSand> {
    return this.http.post("/data/server/sand", params);
  }

  /**
   * 获取诛恶事件
   */
  getServerAntivice(): Promise<ServerAntivice[]> {
    return this.http.post("/data/server/antivice");
  }

  /**
   * 获取跨服阵营事件
   */
  getServerEvent(): Promise<ServerEvent[]> {
    return this.http.post("/data/server/event");
  }

  /**
   * 获取心法资历排行
   * @param params.school 心法名称
   * @param params.ticket 推栏标识
   */
  getSchoolSeniority(params: SchoolSeniorityParams): Promise<SchoolSeniority[]> {
    return this.http.post("/data/school/seniority", params);
  }

  /**
   * 获取心法技能信息
   * @param params.name 心法名称
   * @param params.ticket 推栏标识
   */
  getSchoolSkills(params: SchoolSkillParams): Promise<SchoolSkill[]> {
    return this.http.post("/data/school/skills", params);
  }

  /**
   * 获取服务器关隘首领
   */
  getServerLeader(): Promise<ServerLeader[]> {
    return this.http.post("/data/server/leader");
  }

  /**
   * 获取名片墙缓存
   * @param params.server 服务器名称
   * @param params.name 角色名称
   */
  getShowCache(params: ShowCacheParams): Promise<ShowCache> {
    return this.http.post("/data/show/cache", params);
  }

  /**
   * 获取随机名片
   * @param params.server 服务器名称（可选）
   * @param params.body 角色体型（可选）
   * @param params.force 门派名称（可选）
   */
  getShowRandom(params: ShowRandomParams): Promise<ShowRandom> {
    return this.http.post("/data/show/random", params);
  }

  /**
   * 获取名片墙信息
   * @param params.server 服务器名称
   * @param params.name 角色名称
   */
  getShowCard(params: ShowCardParams): Promise<ShowCard> {
    return this.http.post("/data/show/card", params);
  }

  /**
   * 获取贴吧物价记录
   * @param params.server 服务器名称（可选）
   * @param params.name 物品名称
   * @param params.limit 返回记录数量限制，默认10，范围1-50（可选）
   */
  getTiebaItemRecords(params: TiebaItemRecordsParams): Promise<TiebaItemRecord[]> {
    return this.http.post("/data/tieba/item/records", params);
  }

  /**
   * 获取金价比例信息
   * @param params.server 服务器名称（可选）
   * @param params.limit 返回数量，默认10，范围1-100（可选）
   */
  getTradeDemon(params: TradeDemonParams): Promise<TradeDemon[]> {
    return this.http.post("/data/trade/demon", params);
  }

  /**
   * 获取推栏成就信息
   * @param params.server 目标服务器名称，用于查询该服务器的角色数据
   * @param params.name 角色名称，用于查找指定角色的资历分布信息
   * @param params.class 资历主分类，1：江湖行，2：独步江湖，3：江湖行+独步江湖
   * @param params.subclass 资历子分类
   * @param params.ticket 推栏标识
   */
  getTuilanAchievement(params: TuilanAchievementParams): Promise<TuilanAchievement> {
    return this.http.post("/data/tuilan/achievement", params);
  }

  /**
   * 成语接龙
   * @param params.name 输入的四字成语，用于进行成语接龙
   */
  getIdiomSolitaire(params: IdiomSolitaireParams): Promise<IdiomSolitaire> {
    return this.http.post("/data/idiom/solitaire", params);
  }

  /**
   * 智能聊天
   * @param params.name 机器人的名称，返回结果中的回答会使用该名称
   * @param params.text 输入的对话内容
   */
  getMixedChat(params: MixedChatParams): Promise<MixedChat> {
    return this.http.post("/data/mixed/chat", params);
  }

  /**
   * 获取贴吧随机帖子
   * @param params.class 帖子分类：818、616、鬼网三、鬼网3、树洞、记录、教程、街拍、故事、避雷、吐槽、提问
   * @param params.server 区服名称，用于查询指定区服的帖子记录，默认值为 - 表示全区服（可选）
   * @param params.limit 查询结果数量的限制，默认值为 10（可选）
   */
  getTiebaRandom(params: TiebaRandomParams): Promise<TiebaRandom[]> {
    return this.http.post("/data/tieba/random", params);
  }

  /**
   * 获取酷狗音乐搜索结果
   * @param params.name 歌曲名称，用于搜索酷狗音乐的相关内容
   */
  getKugouMusic(params: KugouMusicParams): Promise<KugouMusic[]> {
    return this.http.post("/data/music/kugou", params);
  }

  /**
   * 获取网易云音乐搜索结果
   * @param params.name 歌曲名称，用于搜索网易云音乐的相关内容
   */
  getNeteaseMusic(params: NeteaseMusicParams): Promise<NeteaseMusic[]> {
    return this.http.post("/data/music/netease", params);
  }

  /**
   * 获取腾讯音乐搜索结果
   * @param params.name 歌曲名称，用于搜索腾讯音乐的相关内容
   */
  getTencentMusic(params: TencentMusicParams): Promise<TencentMusic[]> {
    return this.http.post("/data/music/tencent", params);
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
   * @param params.appkey 阿里云应用标识
   * @param params.access 阿里云 Access Key
   * @param params.secret 阿里云 Secret Key
   * @param params.voice 发音人名称，默认值：Aitong
   * @param params.format 音频格式，支持 PCM、WAV 和 MP3，默认值：MP3
   * @param params.sample_rate 音频采样率，支持 8000 和 16000，默认值：16000
   * @param params.volume 音量大小，范围为 0 到 100，默认值：50
   * @param params.speech_rate 语速调节，范围为 -500 到 500，默认值：0
   * @param params.pitch_rate 音调调节，范围为 -500 到 500，默认值：0
   * @param params.text 待合成的文本内容
   */
  getSoundConverter(params: SoundConverterParams): Promise<SoundConverter> {
    return this.http.post("/data/sound/converter", params);
  }

  /**
   * 获取下一次扶摇九天活动开启的时间
   * @param params.server 服务器名（可选）
   */
  getActiveNextEvent(params?: ActiveNextEventParams): Promise<ActiveNextEvent[]> {
    return this.http.post("/data/active/next/event", params);
  }

  /**
   * 查询挂件的效果及获取方式
   * @param params.name 挂件名称
   */
  getArchivedPendant(params: ArchivedPendantParams): Promise<ArchivedPendant[]> {
    return this.http.post("/data/archived/pendant", params);
  }

  /**
   * 查询宠物的出现记录
   * @param params.server 服务器名
   */
  getArchivedPetEvent(params: ArchivedPetEventParams): Promise<ArchivedPetEvent[]> {
    return this.http.post("/data/archived/petEvent", params);
  }

  /**
   * 查询名剑大会的排行榜信息
   * @param params.mode 比赛模式，默认33
   * @param params.limit 返回数量，默认20
   * @param params.ticket 推栏ticket
   */
  getArenaAwesome(params: ArenaAwesomeParams): Promise<ArenaAwesome[]> {
    return this.http.post("/data/arena/awesome", params);
  }

  /**
   * 查询角色近期的名剑战绩记录
   * @param params.server 服务器名
   * @param params.name 角色名
   * @param params.mode 比赛模式
   * @param params.ticket 推栏ticket
   */
  getArenaRecent(params: ArenaRecentParams): Promise<ArenaRecent> {
    return this.http.post("/data/arena/recent", params);
  }

  /**
   * 统计角色近期的名剑战绩数据
   * @param params.mode 比赛模式，默认33
   * @param params.ticket 推栏ticket
   */
  getArenaSchools(params: ArenaSchoolsParams): Promise<ArenaSchool[]> {
    return this.http.post("/data/arena/schools", params);
  }

  /**
   * 获取今天刷新出的赤兔幼驹相关信息
   */
  getChituRecords(): Promise<ChituRecord[]> {
    return this.http.post("/data/chitu/records");
  }

  /**
   * 查询指定区服的马场里即将刷新的马驹信息
   * @param params.server 服务器名
   */
  getHorseRanch(params: HorseRanchParams): Promise<HorseRanch> {
    return this.http.post("/data/horse/ranch", params);
  }

  /**
   * 统计指定区服内奇遇的近期触发角色记录
   * @param params.server 服务器名
   * @param params.num 汇总时间范围，默认7天
   */
  getLuckCollect(params: LuckCollectParams): Promise<LuckCollect[]> {
    return this.http.post("/data/luck/collect", params);
  }

  /**
   * 统计全服指定奇遇的近期触发记录
   * @param params.name 奇遇名称
   * @param params.limit 返回数量，默认10
   */
  getLuckServerStatistical(params: LuckServerStatisticalParams): Promise<LuckServerStatistical[]> {
    return this.http.post("/data/luck/server/statistical", params);
  }

  /**
   * 查询指定角色的当前在线状态
   * @param params.server 服务器名
   * @param params.name 角色名
   */
  getRoleOnlineStatus(params: RoleOnlineStatusParams): Promise<RoleOnlineStatus> {
    return this.http.post("/data/role/online/status", params);
  }

  /**
   * 查询指定角色的所有名片墙信息
   * @param params.server 服务器名
   * @param params.name 角色名
   */
  getShowRecords(params: ShowRecordsParams): Promise<ShowRecord[]> {
    return this.http.post("/data/show/records", params);
  }

  /**
   * 查询指定物品的黑市价格信息
   * @param params.server 服务器名（可选）
   * @param params.name 物品名称
   */
  getTradeItemRecords(params: TradeItemRecordsParams): Promise<TradeItemRecord[]> {
    return this.http.post("/data/trade/item/records", params);
  }

  /**
   * 查询指定物品的交易行价格信息
   * @param params.server 服务器名
   * @param params.name 物品名称
   */
  getTradeMarket(params: TradeMarketParams): Promise<TradeMarket[]> {
    return this.http.post("/data/trade/market", params);
  }

  /**
   * 统计指定物品的黑市价格信息
   * @param params.server 服务器名（可选）
   * @param params.name 物品名称
   */
  getTradeRecords(params: TradeRecordsParams): Promise<TradeRecord> {
    return this.http.post("/data/trade/records", params);
  }

  /**
   * 模糊搜索外观物品
   * @param params.name 物品名称
   */
  getTradeSearch(params: TradeSearchParams): Promise<TradeSearch[]> {
    return this.http.post("/data/trade/search", params);
  }

  /**
   * 上报客户端的日常任务信息
   * @param params.szWar 大战任务
   * @param params.szCommon 公共周常
   * @param params.szDungeons 五人周常
   * @param params.szTeamDungeons 十人周常
   */
  saveClientCalendar(params: SaveClientCalendarParams): Promise<SaveClientCalendar> {
    return this.http.post("/save/client/calendar", params);
  }

  /**
   * 上报推栏app中的日常任务信息
   * @param params.ticket 推栏ticket
   */
  saveTuilanCalendar(params: SaveTuilanCalendarParams): Promise<SaveTuilanCalendar> {
    return this.http.post("/save/tuilan/calendar", params);
  }

  /**
   * 更新推栏app中的周常任务信息
   * @param params.ticket 推栏ticket
   */
  saveWeekCalendar(params: SaveWeekCalendarParams): Promise<SaveWeekCalendar> {
    return this.http.post("/save/week/calendar", params);
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
