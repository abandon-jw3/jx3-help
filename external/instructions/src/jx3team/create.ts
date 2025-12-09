import { Context } from "koishi";
import { ArgParser } from "../tools";
import { JX3Team, JX3TeamMember } from "./database";

export function applyCreate(ctx: Context) {
  ctx
    .guild()
    .command("开团 <副本名> <时间> [备注:text]", "发布新的组队招募")
    .userFields(["roleName"])
    .action(async ({ session }, name, time, description) => {
      if (!name || !time) {
        return "请正确填写参数: 开团 <副本名> <时间> [备注]";
      }

      const channelId = session.channelId;
      const userId = session.userId;
      const userName = session.username || "团长";

      // 1. Check existing active teams
      const activeTeams = await ctx.database.get("jx3_teams", {
        channel_id: channelId,
        status: 0,
      });

      if (activeTeams.length >= 5) {
        return "本群已有过多正在招募的团队，请先清理旧团队。";
      }

      // 2. Create Team
      const team = await ctx.database.create("jx3_teams", {
        channel_id: channelId,
        leader_id: userId,
        name,
        time,
        description: description || "",
        status: 0,
        max_count: 25,
        created_at: new Date(),
      });

      // 3. 团长自动加入
      // 理论上需要先获取用户绑定的职业，但目前先使用会话名称或默认值
      // 理想情况下我们应该使用 jx3auth 获取绑定的职业，但目前假设会话有效
      // 或者我们可以要求用户先绑定。目前，我们直接使用会话名称插入。
      // 等等，在计划中我说过“尝试使用绑定的职业”。

      // 让我们依赖用户命令或 jx3auth（如果可用）？
      // 对于创建团队，通常是团长组织，也许我们可以将职业留空或设置为“团长”
      // 或者检查 session.user.roleName（如果我们已将其添加到用户字段）
      
      const roleName = session.user?.roleName || userName;

      await ctx.database.create("jx3_team_members", {
        team_id: team.id,
        user_id: userId,
        role_name: roleName,
        school: "团长", // Special school for leader? Or ask param? 
        // Let's default to "团长" or "未知" for now, they can update later.
        created_at: new Date(),
      });

      return `开团成功！\n团队ID: ${team.id}\n副本: ${name}\n时间: ${time}`;
    });
}
