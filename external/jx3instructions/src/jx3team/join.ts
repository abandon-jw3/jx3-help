import { Context } from "koishi";
import { ArgParser } from "../tools";
import { JX3Team, JX3TeamMember } from "./database";

export function applyJoin(ctx: Context) {
  // 1. Join Self
  ctx
    .guild()
    .command("报名 <school> [roleName] [teamId:number]", "报名参与当前团队")
    .userFields(["roleName"])
    .action(async ({ session }, school, roleName, teamId) => {
      if (!school) return "请输入心法/职业";

      const channelId = session.channelId;
      const userId = session.userId;

      // 参数调整：如果 roleName 是数字且 teamId 未定义，则将其视为 teamId
      if (roleName && /^\d+$/.test(roleName) && !teamId) {
        teamId = parseInt(roleName);
        roleName = undefined;
      }

      // 如果未提供 roleName，尝试使用绑定角色或用户名
      const finalRoleName = roleName || session.user?.roleName || session.username;

      if (!finalRoleName) return "未检测到绑定角色，请输入角色名：报名 <心法> <角色名> [团队ID]";

      return await handleJoin(ctx, session, channelId, userId, school, finalRoleName, false, teamId);
    });

  // 2. Proxy Join
  ctx
    .guild()
    .command("代报 <school> <roleName> [teamId:number]", "代替他人报名")
    .action(async ({ session }, school, roleName, teamId) => {
      if (!school || !roleName) return "请输入心法和角色名: 代报 <心法> <角色名> [团队ID]";

      const channelId = session.channelId;
      const userId = session.userId; // 操作者 ID

      return await handleJoin(ctx, session, channelId, userId, school, roleName, true, teamId);
    });
}

async function handleJoin(ctx: Context, session: any, channelId: string, userId: string, school: string, roleName: string, isProxy: boolean = false, specifiedTeamId?: number) {
  let team;

  if (specifiedTeamId) {
    // 1. If Team ID specified, verify it
    const teams = await ctx.database.get("jx3_teams", {
      id: specifiedTeamId,
      channel_id: channelId,
      status: 0,
    });
    if (teams.length === 0) return `未找到ID为 ${specifiedTeamId} 的招募中团队。`;
    team = teams[0];
  } else {
    // 2. Fetch all active teams
    const teams = await ctx.database.get(
      "jx3_teams",
      {
        channel_id: channelId,
        status: 0,
      },
      { sort: { id: "desc" } }
    );

    if (teams.length === 0) return "当前没有正在招募的团队。";

    if (teams.length === 1) {
      team = teams[0];
    } else {
      // 3. Interactive Selection
      const teamList = teams.map((t) => `${t.id}. ${t.name} (${t.time})`).join("\n");
      await session.send(`当前有多个正在招募的团队，请输入序号选择：\n${teamList}`);

      const answer = await session.prompt(30000); // 30s timeout
      if (!answer) return "输入超时，报名取消。";

      const selectedId = parseInt(answer);
      if (isNaN(selectedId)) return "输入无效，请输入数字ID。";

      team = teams.find((t) => t.id === selectedId);
      if (!team) return "未找到该ID的团队。";
    }
  }

  // Check if team is full
  const members = await ctx.database.get("jx3_team_members", { team_id: team.id });
  if (members.length >= team.max_count) {
    return "该团队已满员。";
  }

  // Check duplicate role
  const existing = members.find((m) => m.role_name === roleName);
  if (existing) {
    return `角色 ${roleName} 已经在列表中了。`;
  }

  // Add Member
  await ctx.database.create("jx3_team_members", {
    team_id: team.id,
    user_id: userId,
    role_name: roleName,
    school,
    created_at: new Date(),
  });

  return `${isProxy ? "代报" : "报名"}成功！\n${roleName} (${school}) 已加入团队 [${team.id}] ${team.name}。`;
}
