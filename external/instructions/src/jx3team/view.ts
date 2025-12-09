import { Context } from "koishi";

export function applyView(ctx: Context) {
  ctx
    .guild()
    .command("查看车队", "查看当前团队列表")
    .alias("车队")
    .action(async ({ session }) => {
      const channelId = session.channelId;

      // 1. Get Active Teams
      const teams = await ctx.database.get(
        "jx3_teams",
        {
          channel_id: channelId,
          status: 0,
        },
        { sort: { id: "desc" } }
      );

      if (teams.length === 0) return "当前没有正在招募的团队。";

      // For now, render the first/latest team or list them
      // Plan: "List summary or render image"
      // If multiple, maybe list IDs? But usually one active team per group is common.
      // Let's render the latest one.
      const team = teams[0];

      const members = await ctx.database.get("jx3_team_members", { team_id: team.id });

      // Prepare data for template
      // Need to group by roles or just pass flat list and let helper handle?
      // Better to process in TS.
      
      const renderData = {
        name: team.name,
        time: team.time,
        description: team.description,
        id: team.id,
        current_count: members.length,
        max_count: team.max_count,
        members: members.map(m => ({
            name: m.role_name,
            school: m.school,
            is_leader: m.user_id === team.leader_id
        }))
      };

      try {
        const img = await ctx.jx3render.render(
            "TeamPoster", 
            renderData, 
            `team-${team.id}-${members.length}`, // Cache key changes when member count changes
            false // No long-term cache
        );
        return `<img src="data:image/png;base64,${img}"/>`;
      } catch (e) {
        return `渲染失败: ${e.message}\n${JSON.stringify(renderData, null, 2)}`;
      }
    });
}
