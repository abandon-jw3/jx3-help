import { Context } from "koishi";
import { JX3TeamMember } from "./database";

export function applyLeave(ctx: Context) {
  ctx
    .guild()
    .command("取消报名 [roleName]", "取消报名或踢出成员")
    .alias("取消")
    .action(async ({ session }, roleName) => {
      const channelId = session.channelId;
      const userId = session.userId;

      // 1. Get Active Team
      const teams = await ctx.database.get(
        "jx3_teams",
        {
          channel_id: channelId,
          status: 0,
        },
        { sort: { id: "desc" }, limit: 1 }
      );

      if (teams.length === 0) return "当前没有正在招募的团队。";
      const team = teams[0];

      // 2. Find records to delete
      let query: any = { team_id: team.id };

      if (roleName) {
        // Targeted cancellation
        query.role_name = roleName;
      } else {
        // Self cancellation (default)
        query.user_id = userId;
      }

      const members = await ctx.database.get("jx3_team_members", query);

      if (members.length === 0) {
        if (roleName) return `团队中没有找到角色 ${roleName}。`;
        return "你没有报名该团队。";
      }

      // 3. Permission Check & Execution
      const toDeleteIds: number[] = [];
      const deleteNames: string[] = [];

      for (const member of members) {
        // Check permission: Own entry OR Leader
        if (member.user_id === userId || team.leader_id === userId) {
          toDeleteIds.push(member.id);
          deleteNames.push(member.role_name);
        } else if (roleName) {
          return "你没有权限取消该角色的报名（非本人或团长）。";
        }
      }

      // If user didn't specify name but has multiple entries
      if (!roleName && members.length > 1) {
        return `你有多个报名记录 (${members.map((m) => m.role_name).join(", ")})，请指定要取消的角色名: 取消报名 <角色名>`;
      }

      if (toDeleteIds.length > 0) {
        await ctx.database.remove("jx3_team_members", { id: toDeleteIds });
        return `已取消报名: ${deleteNames.join(", ")}`;
      }

      return "操作失败。";
    });
}
