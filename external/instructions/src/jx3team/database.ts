import { Context } from "koishi";

declare module "koishi" {
  interface Tables {
    jx3_teams: JX3Team;
    jx3_team_members: JX3TeamMember;
  }
}

export interface JX3Team {
  id: number;
  channel_id: string;
  leader_id: string;
  name: string;
  time: string;
  description: string;
  status: number; // 0: Recruiting, 1: Full, 2: Finished, 3: Cancelled
  max_count: number;
  created_at: Date;
}

export interface JX3TeamMember {
  id: number;
  team_id: number;
  user_id: string;
  role_name: string;
  school: string;
  created_at: Date;
}

declare module "koishi" {
  interface User {
    roleName: string;
  }
}


export function applyDatabase(ctx: Context) {
  ctx.model.extend(
    "jx3_teams",
    {
      id: "unsigned",
      channel_id: "string",
      leader_id: "string",
      name: "string",
      time: "string",
      description: "string",
      status: "integer",
      max_count: "integer",
      created_at: "timestamp",
    },
    {
      autoInc: true,
    }
  );

  ctx.model.extend(
    "jx3_team_members",
    {
      id: "unsigned",
      team_id: "unsigned",
      user_id: "string",
      role_name: "string",
      school: "string",
      created_at: "timestamp",
    },
    {
      autoInc: true,
    }
  );
}
