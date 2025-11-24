export interface JX3APIResponse {
  code: number;
  msg: string;
}

// 活动日历
export interface ActiveCalendar extends JX3APIResponse {
  data: {
    date: string;
    week: string;
    war: string;
    battle: string;
    orecar: string;
    school: string;
    rescue: string;
    luck: string[];
    card: string[];
    team: string[];
    draw: string;
  };
}

export interface ActiveCalendarParams {
  server?: string;
  num?: number;
}

// 活动列表日历
export interface ActiveListCalendar extends JX3APIResponse {
  data: {
    today: {
      date: string;
      week: string;
      year: string;
      month: string;
      day: string;
    };
    data: Array<{
      date: string;
      day: string;
      week: string;
      war: string;
      battle: string;
      orecar: string;
      school: string;
      rescue: string;
      luck: string[];
      card: string[];
    }>;
  };
}

export interface ActiveListCalendarParams {
  num?: number;
}

// 查询当前时间的楚天社或云从社的进度。
export interface ActiveCelebs extends JX3APIResponse {
  data: Array<{
    map: string;
    stage: string;
    site: string;
    desc: string;
    icon: string;
    time: string;
  }>;
}

export interface ActiveCelebsParams {
  name: "楚天社" | "云从社" | "披风会";
}

// 科举答案查询
export interface ExamAnswer extends JX3APIResponse {
  data: Array<{
    id: number;
    question: string;
    answer: string;
    correctness: number;
    index: number;
    pinyin: string;
  }>;
}

export interface ExamAnswerParams {
  subject: string;
  limit?: number;
}

// 家园花卉查询
export interface HomeFlower extends JX3APIResponse {
  data: {
    [mapName: string]: Array<{
      name: string;
      color: string;
      price: number;
      line: string[];
    }>;
  };
}

export interface HomeFlowerParams {
  server: string;
  name?: string;
  map?: string;
}

// 家园装饰查询
export interface HomeFurniture extends JX3APIResponse {
  data: Array<{
    id: number;
    name: string;
    type: number;
    color: number;
    source: string;
    architecture: number;
    limit: number;
    quality: number;
    view: number;
    practical: number;
    hard: number;
    geomantic: number;
    interesting: number;
    produce: string | null;
    image: string;
    tip: string;
  }>;
}

export interface HomeFurnitureParams {
  name: string;
}

// 地图家具查询
export interface HomeTravel extends JX3APIResponse {
  data: Array<{
    id: number;
    name: string;
    type: number;
    color: number;
    source: string;
    architecture: number;
    limit: number;
    quality: number;
    view: number;
    practical: number;
    hard: number;
    geomantic: number;
    interesting: number;
    produce: string;
    image: string;
    tip: string;
  }>;
}

export interface HomeTravelParams {
  name: string;
}

// 新闻公告
export interface NewsItem extends JX3APIResponse {
  data: Array<{
    id: number;
    token: number;
    class: string;
    title: string;
    date: string;
    url: string;
  }>;
}

export interface NewsParams {
  limit?: number;
}

// 服务器信息查询
export interface ServerMaster extends JX3APIResponse {
  data: {
    id: string;
    zone: string;
    name: string;
    column: string;
    duowan: {
      [key: string]: number[];
    };
    abbreviation: string[];
    subordinate: string[];
  };
}

export interface ServerMasterParams {
  name: string;
}

// 维护公告
export interface NewsAnnounce extends JX3APIResponse {
  data: Array<{
    id: number;
    token: number;
    class: string;
    title: string;
    date: string;
    url: string;
  }>;
}

export interface NewsAnnounceParams {
  limit?: number;
}

// 技能记录查询
export interface SkillRecord extends JX3APIResponse {
  data: Array<{
    id: string;
    title: string;
    url: string;
    time: string;
  }>;
}
// 开服检查
export interface ServerCheck extends JX3APIResponse {
  data: {
    id: number;
    zone: string;
    server: string;
    status: number;
    time: number;
  };
}

export interface ServerCheckParams {
  server?: string;
}

// 服务器状态
export interface ServerStatus extends JX3APIResponse {
  data: {
    zone: string;
    server: string;
    status: string;
  };
}

export interface ServerStatusParams {
  server: string;
}

// 本周百战异闻录
export interface ActiveMonster extends JX3APIResponse {
  data: {
    start: number;
    end: number;
    data: Array<{
      level: number;
      name: string;
      skill: string[];
      data: {
        id: number;
        name: string;
        list: string[];
        desc: string;
        time: number;
      };
    }>;
  };
}

// 烟花统计
export interface FireworksCollect extends JX3APIResponse {
  data: Array<{
    zone: string;
    server: string;
    sender: string;
    receive: string;
    name: string;
    count: number;
    time: number;
  }>;
}

export interface FireworksCollectParams {
  server: string;
  num?: number | string;
}

// 烟花记录
export interface FireworksRecord extends JX3APIResponse {
  data: Array<{
    id: number;
    zone: string;
    server: string;
    name: string;
    map_name: string;
    sender: string;
    receive: string;
    status: number;
    time: number;
  }>;
}

export interface FireworksRecordParams {
  server: string;
  name: string;
}

// 拍卖记录
export interface AuctionRecord extends JX3APIResponse {
  data: Array<{
    id: number;
    zone: string;
    server: string;
    role_name: string;
    camp_name: string;
    name: string;
    amount: string;
    time: number;
  }>;
}

export interface AuctionRecordParams {
  server: string;
  name?: string;
  limit?: number;
}

// 的卢记录
export interface DiluRecord extends JX3APIResponse {
  data: Array<{
    id: number;
    zone: string;
    server: string;
    name: string;
    level: number;
    map_name: string;
    refresh_time: number;
    capture_role_name: string;
    capture_camp_name: string;
    capture_time: number;
    auction_role_name: string;
    auction_camp_name: string;
    auction_time: number;
    auction_amount: string;
    start_time: number;
    end_time: number;
  }>;
}

export interface DiluRecordParams {
  server?: string;
}

// 烟花汇总
export interface FireworksStatistical extends JX3APIResponse {
  data: Array<{
    id: number;
    zone: string;
    server: string;
    name: string;
    map_name: string;
    sender: string;
    receive: string;
    mode: number;
    status: number;
    time: number;
  }>;
}

export interface FireworksStatisticalParams {
  server: string;
  name: string;
  limit?: number;
}

// 诈骗记录查询
export interface FraudDetailed extends JX3APIResponse {
  data: {
    records: Array<{
      server: string;
      tieba: string;
      data: Array<{
        title: string;
        tid: number;
        text: string;
        time: number;
      }>;
    }>;
  };
}

export interface FraudDetailedParams {
  uid: number;
}

// 奇遇统计查询
export interface LuckStatistical extends JX3APIResponse {
  data: Array<{
    id: number;
    zone: string;
    server: string;
    name: string;
    event: string;
    status: number;
    time: number;
  }>;
}

export interface LuckStatisticalParams {
  server: string;
  name: string;
  limit?: number;
}

// 近期奇遇查询
export interface LuckRecent extends JX3APIResponse {
  data: Array<{
    id: number;
    zone: string;
    server: string;
    name: string;
    event: string;
    status: number;
    time: number;
  }>;
}

export interface LuckRecentParams {
  server: string;
}

// 奇遇记录查询
export interface LuckAdventure extends JX3APIResponse {
  data: Array<{
    zone: string;
    server: string;
    name: string;
    event: string;
    level: number;
    status: number;
    time: number;
  }>;
}

export interface LuckAdventureParams {
  server: string;
  name: string;
  ticket?: string;
}

// 未完成奇遇查询
export interface LuckUnfinished extends JX3APIResponse {
  data: Array<{
    name: string;
    type: string;
    level: number;
  }>;
}

export interface LuckUnfinishedParams {
  server: string;
  name: string;
  ticket?: string;
}

// 服务器排行榜统计
export interface RankServerStatistical extends JX3APIResponse {
  data: Array<{
    id: number;
    class: string;
    zone: string;
    server: string;
    school: string;
    name: string;
    rank: number;
    level: number;
    camp_name: string;
    tong_name: string;
    score: number;
    datetime: string;
  }>;
}

export interface RankServerStatisticalParams {
  table: "个人" | "帮会" | "阵营" | "试炼";
  name: string;
}

// 区服排行榜统计
export interface RankStatistical extends JX3APIResponse {
  data: Array<{
    id: number;
    class: string;
    zone: string;
    server: string;
    school: string;
    name: string;
    index: number;
    level: number;
    camp_name: string;
    tong_name: string;
    score: number;
    datetime: string;
  }>;
}

export interface RankStatisticalParams {
  server: string;
  table: "个人" | "帮会" | "阵营" | "试炼";
  name: string;
}

// 师徒系统-徒弟信息
export interface MemberStudent extends JX3APIResponse {
  data: {
    zone: string;
    server: string;
    data: Array<{
      roleId: number;
      roleName: string;
      roleLevel: number;
      campName: string;
      tongName: string;
      tongMasterName: string;
      bodyId: number;
      bodyName: string;
      forceId: number;
      forceName: string;
      comment: string;
      time: number;
    }>;
  };
}

export interface MemberStudentParams {
  server: string;
  keyword?: string;
}

// 团队招募信息
export interface MemberRecruit extends JX3APIResponse {
  data: {
    zone: string;
    server: string;
    time: number;
    data: Array<{
      crossServer: boolean;
      activityId: number;
      activity: string;
      level: number;
      leader: string;
      pushId: number;
      roomID: string;
      roleId: number;
      createTime: number;
      number: number;
      maxNumber: number;
      label: string[];
      content: string;
    }>;
  };
}

export interface MemberRecruitParams {
  server: string;
  keyword?: string;
  table?: 1 | 2 | 3;
}

// 师徒系统-师傅信息
export interface MemberTeacher extends JX3APIResponse {
  data: {
    zone: string;
    server: string;
    data: Array<{
      roleId: number;
      roleName: string;
      roleLevel: number;
      campName: string;
      tongName: string;
      tongMasterName: string;
      bodyId: number;
      bodyName: string;
      forceId: number;
      forceName: string;
      comment: string;
      time: number;
    }>;
  };
}

export interface MemberTeacherParams {
  server: string;
  keyword?: string;
}

// 角色副本进度
export interface TeamCdList extends JX3APIResponse {
  data: {
    zoneName: string;
    serverName: string;
    roleName: string;
    roleId: string;
    globalRoleId: string;
    forceName: string;
    forceId: string;
    bodyName: string;
    bodyId: string;
    tongName: string | null;
    tongId: string | null;
    campName: string;
    campId: string;
    personName: string;
    personId: string;
    personAvatar: string;
    data: Array<{
      mapIcon: string;
      mapId: string;
      mapName: string;
      mapType: string;
      bossCount: number;
      bossFinished: number;
      bossProgress: Array<{
        finished: boolean;
        icon: string;
        index: string;
        name: string;
        progressId: string;
      }>;
    }>;
  };
}

export interface TeamCdListParams {
  server: string;
  name: string;
  ticket?: string;
}

// 保存角色详情
export interface SaveRoleDetailed extends JX3APIResponse {
  data: {
    zoneName: string;
    serverName: string;
    roleName: string;
    roleId: string;
    globalRoleId: string;
    forceName: string;
    forceId: string;
    bodyName: string;
    bodyId: string;
    tongName: string | null;
    tongId: string | null;
    campName: string;
    campId: string;
    personName: string;
    personId: string;
    personAvatar: string;
  };
}

export interface SaveRoleDetailedParams {
  server: string;
  roleid: string;
  ticket?: string;
}

// 全服物品掉落统计
export interface RewardServerStatistical extends JX3APIResponse {
  data: Array<{
    id: number;
    zone: string;
    server: string;
    name: string;
    role_name: string;
    map_name: string;
    source: number;
    time: number;
  }>;
}

export interface RewardServerStatisticalParams {
  name: string;
  limit?: number;
}

// 区服物品掉落统计
export interface RewardStatistical extends JX3APIResponse {
  data: Array<{
    id: number;
    zone: string;
    server: string;
    name: string;
    role_name: string;
    map_name: string;
    source: number;
    time: number;
  }>;
}

export interface RewardStatisticalParams {
  server: string;
  name: string;
  limit?: number;
}

// 角色详情查询
export interface RoleDetailed extends JX3APIResponse {
  data: {
    zoneName: string;
    serverName: string;
    roleName: string;
    roleId: string;
    globalRoleId: string;
    forceName: string;
    forceId: string;
    bodyName: string;
    bodyId: string;
    tongName: string | null;
    tongId: string | null;
    campName: string;
    campId: string;
    personName: string;
    personId: string;
    personAvatar: string;
  };
}

export interface RoleDetailedParams {
  server: string;
  name: string;
  ticket?: string;
}

// 心法奇穴
export interface SchoolForce extends JX3APIResponse {
  data: Array<{
    level: number; //位置
    data: Array<{
      name: string; //名称
      class: number;
      desc: string; //简介
      icon: string; //图标URL
      kind: string; //类型
      subKind: string;
    }>;
  }>;
}

export interface SchoolForceParams {
  name: string;
  ticket?: string;
}

// 角色精力
export interface RoleMonster extends JX3APIResponse {
  data: {
    zoneName: string;
    serverName: string;
    roleName: string;
    roleId: string;
    globalRoleId: string;
    gameEnergy: string;
    gameStamina: string;
    skillCount: string;
    skillList: Array<{
      bDeprecated: boolean;
      dwInSkillID: number;
      dwOutSkillID: number;
      nColor: number;
      nCost: number;
      nLevel: number;
      szBossName: string;
      szSkillName: string;
      szType: string;
    }>;
    updateTime: number;
  };
}

export interface RoleMonsterParams {
  server: string;
  name: string;
}

// 角色成就
export interface RoleAchievement extends JX3APIResponse {
  data: {
    zoneName: string;
    serverName: string;
    roleName: string;
    roleId: string;
    globalRoleId: string;
    forceName: string;
    forceId: string;
    bodyName: string;
    bodyId: string;
    tongName: string | null;
    tongId: string | null;
    campName: string;
    campId: string;
    personName: string;
    personId: string;
    personAvatar: string;
    data: Array<{
      id: number;
      icon: string;
      likes: number;
      name: string;
      class: string;
      subClass: string;
      desc: string;
      detail: string;
      maps: string[];
      isFinished: boolean;
      isFav: boolean;
      type: string;
      currentValue: number;
      triggerValue: number;
      subset: any[];
      rewardItem: any;
      rewardPoint: number;
      rewardPrefix: string;
      rewardSuffix: string;
    }>;
  };
}

export interface RoleAchievementParams {
  server: string;
  role: string;
  name: string;
  ticket?: string;
}

// 角色属性
export interface RoleAttribute extends JX3APIResponse {
  data: {
    zoneName: string;
    serverName: string;
    roleName: string;
    roleId: string;
    globalRoleId: string;
    forceName: string;
    forceId: string;
    bodyName: string;
    bodyId: string;
    tongName: string | null;
    tongId: string | null;
    campName: string;
    campId: string;
    personName: string;
    personId: string;
    personAvatar: string;
    kungfuName: string;
    kungfuId: string;
    equipList: Array<{
      name: string;
      class: string;
      icon: string;
      kind: string;
      subKind: string;
      quality: string;
      strengthLevel: string;
      maxStrengthLevel: string;
      color: string;
      desc: string;
      source: string | null;
      fiveStone?: Array<{
        name: string;
        level: string;
        max: string;
        min: string;
        icon: string;
        kind: string;
        subKind: string;
        desc: string;
        percent: boolean;
      }>;
      modifyType: Array<{
        name: string;
        max: string;
        min: string;
        desc: string;
        percent: boolean;
      }>;
      permanentEnchant?: Array<{
        id: string;
        name: string;
        level: string;
        icon: string;
        attributes: Array<{
          max: string;
          min: string;
          attrib: Array<{
            desc: string;
          }>;
        }>;
      }>;
    }>;
    qixueList: Array<{
      name: string;
      level: number;
      icon: string;
      kind: string;
      subKind: string;
      desc: string;
    }>;
    panelList: {
      score: number;
      panel: Array<{
        name: string;
        percent: boolean;
        value: number;
      }>;
    };
  };
}

export interface RoleAttributeParams {
  server: string;
  name: string;
  ticket?: string;
}

// 心法阵眼
export interface SchoolMatrix extends JX3APIResponse {
  data: {
    name: string;
    skillName: string;
    descs: Array<{
      desc: string;
      level: number;
      name: string;
    }>;
  };
}

export interface SchoolMatrixParams {
  name: string;
  ticket?: string;
}

// 服务器沙盘
export interface ServerSand extends JX3APIResponse {
  data: {
    zone: string;
    server: string;
    reset: number;
    update: number;
    data: Array<{
      tongId: number;
      tongName: string;
      castleId: number;
      castleName: string;
      masterId: number;
      masterName: string;
      campId: number;
      campName: string;
    }>;
  };
}

export interface ServerSandParams {
  server: string;
}

// 诛恶事件
export interface ServerAntivice extends JX3APIResponse {
  data: Array<{
    id: number;
    zone: string;
    server: string;
    map_name: string;
    time: number;
  }>;
}
export interface ServerAntiviceParams {
  server: string;
}
// 跨服阵营事件
export interface ServerEvent extends JX3APIResponse {
  data: Array<{
    id: number;
    camp_name: string;
    fenxian_zone_name: string;
    fenxian_server_name: string;
    friend_zone_name: string;
    friend_server_name: string;
    role_name: string;
    set_time: number;
  }>;
}

// 心法资历
export interface SchoolSeniority extends JX3APIResponse {
  data: Array<{
    Value: number;
    avatarUrl: string;
    forceIcon: string;
    forceId: number;
    gameVersion: number;
    nickName: string;
    personId: string;
    personNum: number;
    roleId: number;
    roleName: string;
    serverName: string;
    zoneName: string;
    zoneServerName: string;
    forceName: string;
  }>;
}

export interface SchoolSeniorityParams {
  school: string;
  ticket?: string;
}

// 心法技能
export interface SchoolSkill extends JX3APIResponse {
  data: Array<{
    class: string;
    data: Array<{
      name: string;
      simpleDesc: string;
      desc: string;
      specialDesc: string;
      interval: string;
      consumption: string;
      distance: string;
      icon: string;
      kind: string;
      subKind: string;
      releaseType: string;
      weapon: string;
    }>;
    time: number;
  }>;
}

export interface SchoolSkillParams {
  name: string;
  ticket?: string;
}

// 服务器首领
export interface ServerLeader extends JX3APIResponse {
  data: Array<{
    server: string;
    data: Array<{
      id: number;
      zone: string;
      server: string;
      leader: string;
      camp_name: string;
      castle: string;
      status: number;
      str_status: string;
      start_time: number;
      end_time: number;
    }>;
  }>;
}

// 名片墙缓存
export interface ShowCache extends JX3APIResponse {
  data: {
    zoneName: string;
    serverName: string;
    roleName: string;
    showHash: string;
    showAvatar: string;
  };
}

export interface ShowCacheParams {
  server: string;
  name: string;
}

// 随机名片
export interface ShowRandom extends JX3APIResponse {
  data: {
    zoneName: string;
    serverName: string;
    roleName: string;
    showHash: string;
    showAvatar: string;
    showStatus: number;
  };
}

export interface ShowRandomParams {
  server?: string;
  body?: string;
  force?: string;
}

// 名片墙信息
export interface ShowCard extends JX3APIResponse {
  data: {
    zoneName: string;
    serverName: string;
    roleName: string;
    showHash: string;
    showAvatar: string;
    cacheTime: number;
  };
}

export interface ShowCardParams {
  server: string;
  name: string;
}

// 贴吧物价记录
export interface TiebaItemRecord extends JX3APIResponse {
  data: Array<{
    id: number;
    zone: string;
    server: string;
    name: string;
    url: number;
    context: string;
    reply: number;
    floor: number;
    time: number;
  }>;
}

export interface TiebaItemRecordsParams {
  server?: string;
  name: string;
  limit?: number;
}

// 金价比例信息
export interface TradeDemon extends JX3APIResponse {
  data: Array<{
    id: number;
    zone: string;
    server: string;
    tieba: string;
    wanbaolou: string;
    dd373: string;
    uu898: string;
    "5173": string;
    "7881": string;
    time: number;
    date: string;
  }>;
}

export interface TradeDemonParams {
  server?: string;
  limit?: number;
}

// 推栏成就查询
export interface TuilanAchievement extends JX3APIResponse {
  data: {
    zoneName: string;
    serverName: string;
    roleName: string;
    roleId: string;
    globalRoleId: string;
    forceName: string;
    forceId: string;
    bodyName: string;
    bodyId: string;
    tongName: string | null;
    tongId: string | null;
    campName: string;
    campId: string;
    personName: string;
    personId: string;
    personAvatar: string;
    data: {
      total: {
        [key: string]: {
          pieces: {
            total: number;
            speed: number;
          };
          seniority: {
            total: number;
            speed: number;
          };
        };
      };
      dungeons: {
        [key: string]: {
          [key: string]: {
            pieces: {
              total: number;
              speed: number;
            };
            seniority: {
              total: number;
              speed: number;
            };
          };
        };
      };
      maps: {
        [key: string]: {
          pieces: {
            total: number;
            speed: number;
          };
          seniority: {
            total: number;
            speed: number;
          };
        };
      };
      score: number;
      totalScore: number;
    };
  };
}

export interface TuilanAchievementParams {
  server: string;
  name: string;
  class: 1 | 2 | 3;
  subclass: "杂闻" | "武学" | "修为" | "装备" | "技艺" | "阅读" | "任务" | "足迹" | "战斗" | "声望" | "秘境" | "帮会" | "阵营" | "节日" | "活动" | "风雨江湖路" | "家园" | "剑侠录";
  ticket?: string;
}

// 成语接龙
export interface IdiomSolitaire extends JX3APIResponse {
  data: {
    question: {
      id: number;
      name: string;
      tone: string;
      pinyin: string;
      abbreviation: string;
      first: string;
      last: string;
      derivation: string;
      example: string;
      explanation: string;
    };
    answer: {
      id: number;
      name: string;
      tone: string;
      pinyin: string;
      abbreviation: string;
      first: string;
      last: string;
      derivation: string;
      example: string;
      explanation: string;
    };
  };
}

export interface IdiomSolitaireParams {
  name: string;
}

// 智能聊天
export interface MixedChat extends JX3APIResponse {
  data: {
    id: number;
    answer: string;
  };
}

export interface MixedChatParams {
  name: string;
  text: string;
}

// 贴吧随机帖子
export interface TiebaRandom extends JX3APIResponse {
  data: Array<{
    id: number;
    class: string;
    zone: string;
    server: string;
    name: string;
    title: string;
    url: number;
    date: string;
  }>;
}

export interface TiebaRandomParams {
  class: "818" | "616" | "鬼网三" | "鬼网3" | "树洞" | "记录" | "教程" | "街拍" | "故事" | "避雷" | "吐槽" | "提问";
  server?: string;
  limit?: number;
}

// 酷狗音乐搜索
export interface KugouMusic extends JX3APIResponse {
  data: Array<{
    SongName: string;
    AlbumID: string;
    FileHash: string;
    SQFileHash: string;
    HQFileHash: string;
    MvHash: string;
    Audioid: number;
    SingerName: string;
    PlayUrl: string;
    Img: string;
  }>;
}

export interface KugouMusicParams {
  name: string;
}

// 网易云音乐搜索
export interface NeteaseMusic extends JX3APIResponse {
  data: Array<{
    id: number;
    name: string;
    singer: string;
  }>;
}

export interface NeteaseMusicParams {
  name: string;
}

// 腾讯音乐搜索
export interface TencentMusic extends JX3APIResponse {
  data: Array<{
    id: string;
    name: string;
    singer: string;
  }>;
}

export interface TencentMusicParams {
  name: string;
}

// 随机骚话
export interface SaohuaRandom extends JX3APIResponse {
  data: {
    id: number;
    text: string;
  };
}

// 舔狗日记
export interface SaohuaContent extends JX3APIResponse {
  data: {
    id: number;
    text: string;
  };
}

// 语音转换
export interface SoundConverter extends JX3APIResponse {
  data: {
    text: string;
    token: string;
    url: string;
  };
}

export interface SoundConverterParams {
  appkey: string;
  access: string;
  secret: string;
  voice?: string;
  format?: "PCM" | "WAV" | "MP3";
  sample_rate?: 8000 | 16000;
  volume?: number;
  speech_rate?: number;
  pitch_rate?: number;
  text: string;
}

// 下一次扶摇九天活动
export interface ActiveNextEvent extends JX3APIResponse {
  data: Array<{
    zone: string;
    server: string;
    status: number;
    time: number;
  }>;
}

export interface ActiveNextEventParams {
  server?: string;
}

// 挂件信息
export interface ArchivedPendant extends JX3APIResponse {
  data: Array<{
    id: number;
    class: string;
    name: string;
    ui: string;
    source: string;
    desc: string;
  }>;
}

export interface ArchivedPendantParams {
  name: string;
}

// 宠物出现记录
export interface ArchivedPetEvent extends JX3APIResponse {
  data: Array<{
    zone: string; //区服
    server: string; //服务器
    name: string; //宠物名称
    data: {
      npc_name: string; //触发NPC名称
      map_name: string; //地图名称
      min_time: number;
      max_time: number;
    };
    time: number; //触发时间
  }>;
}

export interface ArchivedPetEventParams {
  server: string;
}

// 名剑大会排行榜
export interface ArenaAwesome extends JX3APIResponse {
  data: Array<{
    zoneName: string;
    serverName: string; //服务器名称
    roleName: string; //角色名称
    forceName: string; //门派
    avatarUrl: string; //头像URL
    rankNum: string; //排名
    score: string; //积分
    upNum: string; //上升名次
    winRate: string; //胜率
  }>;
}

export interface ArenaAwesomeParams {
  mode?: number | string;
  limit?: number | string;
  ticket?: string;
}

// 角色近期名剑战绩
export interface ArenaRecent extends JX3APIResponse {
  data: {
    zoneName: string;
    serverName: string;
    roleName: string;
    roleId: string;
    globalRoleId: string;
    forceName: string;
    forceId: string;
    bodyName: string;
    bodyId: string;
    tongName: string | null;
    tongId: string | null;
    campName: string;
    campId: string;
    personName: string;
    personId: string;
    personAvatar: string;
    performance: {
      [key: string]: {
        mmr: number;
        grade: number;
        ranking: string;
        winCount: number;
        totalCount: number;
        mvpCount: number;
        pvpType: string;
        winRate: number;
      };
    };
    history: Array<{
      zone: string;
      server: string;
      avgGrade: number;
      totalMmr: number;
      mmr: number;
      kungfu: string;
      pvpType: number;
      won: boolean;
      mvp: boolean;
      startTime: number;
      endTime: number;
    }>;
    trend: Array<{
      matchDate: number;
      mmr: number;
      winRate: number;
    }>;
  };
}

export interface ArenaRecentParams {
  server: string;
  name: string;
  mode?: number | string;
  ticket?: string;
}

// 名剑大会各门派表现
export interface ArenaSchool extends JX3APIResponse {
  data: Array<{
    name: string; //门派名称
    this: number; //当前排名
    last: number; //上周排名
  }>;
}

export interface ArenaSchoolsParams {
  mode?: number | string;
  ticket?: string;
}

// 赤兔幼驹刷新信息
export interface ChituRecord extends JX3APIResponse {
  data: Array<{
    id: number;
    server: string;
    map_name: string;
    horse: string;
    send: number;
    date: string;
  }>;
}

// 马场马驹刷新信息
export interface HorseRanch extends JX3APIResponse {
  data: {
    zone: string;
    server: string;
    data: {
      [key: string]: string[];
    };
    note: string;
  };
}

export interface HorseRanchParams {
  server: string;
}

// 奇遇统计
export interface LuckCollect extends JX3APIResponse {
  data: Array<{
    server: string;
    event: string;
    count: number;
    data: {
      name: string;
      time: number;
    };
  }>;
}

export interface LuckCollectParams {
  server: string;
  num?: number;
}

// 全服奇遇统计
export interface LuckServerStatistical extends JX3APIResponse {
  data: Array<{
    id: number;
    zone: string;
    server: string;
    name: string;
    event: string;
    status: number;
    time: number;
  }>;
}

export interface LuckServerStatisticalParams {
  name: string;
  limit?: number;
}

// 角色在线状态
export interface RoleOnlineStatus extends JX3APIResponse {
  data: {
    zoneName: string;
    serverName: string;
    roleName: string;
    onlineStatus: boolean;
  };
}

export interface RoleOnlineStatusParams {
  server: string;
  name: string;
}

// 角色所有名片墙信息
export interface ShowRecord extends JX3APIResponse {
  data: Array<{
    zoneName: string;
    serverName: string;
    roleName: string;
    showHash: string;
    showActive: boolean;
    showAvatar: string;
    saveTime: number;
  }>;
}

export interface ShowRecordsParams {
  server: string;
  name: string;
}

// 黑市物品价格信息
export interface TradeItemRecord extends JX3APIResponse {
  data: Array<{
    name: string;
    class: string;
    subclass: string;
    alias: string;
    subalias: string;
  }>;
}

export interface TradeItemRecordsParams {
  server?: string;
  name: string;
}

// 交易行价格信息
export interface TradeMarket extends JX3APIResponse {
  data: Array<{
    name: string;
    icon: number;
    type: number;
    avg: {
      lowestPrice: number;
      avgPrice: number;
      highestPrice: number;
    };
    data: Array<{
      created: number;
      n_count: number;
      n_money: number;
      server: string;
      unit_price: number;
    }>;
  }>;
}

export interface TradeMarketParams {
  server: string;
  name: string;
}

// 物品黑市价格信息
export interface TradeRecord extends JX3APIResponse {
  data: {
    id: number;
    class: string;
    subclass: string;
    name: string;
    alias: string;
    subalias: string;
    row: string;
    level: number;
    desc: string;
    view: string;
    date: string;
    data: Array<
      Array<{
        id: string;
        index: number;
        zone: string;
        server: string;
        value: number;
        sales: number;
        token: string;
        source: number;
        date: string;
        status: number;
        datetime: string;
      }>
    >;
  };
}

export interface TradeRecordsParams {
  server?: string;
  name: string;
}

// 模糊搜索外观物品
export interface TradeSearch extends JX3APIResponse {
  data: Array<{
    name: string;
    class: string;
    subclass: string;
    alias: string;
    subalias: string;
  }>;
}

export interface TradeSearchParams {
  name: string;
}

// 上报客户端日常任务
export interface SaveClientCalendar extends JX3APIResponse {
  data: {
    war_text: string;
    team_text: string;
  };
}

export interface SaveClientCalendarParams {
  szWar: string;
  szCommon?: string;
  szDungeons?: string;
  szTeamDungeons: string;
}

// 上报推栏日常任务
export interface SaveTuilanCalendar extends JX3APIResponse {
  data: {
    war: string;
  };
}

export interface SaveTuilanCalendarParams {
  ticket?: string;
}

// 更新推栏周常任务
export interface SaveWeekCalendar extends JX3APIResponse {
  data: {
    team: string;
  };
}

export interface SaveWeekCalendarParams {
  ticket?: string;
}
