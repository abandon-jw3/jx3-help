import { Context } from "koishi";

export function applyManage(ctx: Context) {
  ctx
    .guild()
    .command("解散 [teamId:number]", "解散团队")
    .action(async ({ session }, teamId) => {
      const channelId = session.channelId;
      const userId = session.userId;

      let team;
      if (teamId) {
        [team] = await ctx.database.get("jx3_teams", { id: teamId });
      } else {
        // Find latest active
        const teams = await ctx.database.get(
          "jx3_teams",
          {
            channel_id: channelId,
            status: 0,
          },
          { sort: { id: "desc" }, limit: 1 }
        );
        team = teams[0];
      }

      if (!team) return "未找到可解散的团队。";

      // Permission check: Leader or Admin?
      // Assuming session has permission info or just check leader_id
      if (team.leader_id !== userId) {
        // Here we could check session.author.roles or permissions if available
        return "只有团长可以解散团队。";
      }

      await ctx.database.set("jx3_teams", { id: team.id }, { status: 3 });
      return `团队 [${team.id}] ${team.name} 已解散。`;
    });
}
