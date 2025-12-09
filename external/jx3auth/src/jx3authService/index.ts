import { Context, Service, Channel } from "koishi";
import { Config, name } from "../index";
import dayjs from "dayjs";
export class Jx3Auth extends Service {
  constructor(ctx: Context, config: Config) {
    super(ctx, name, true);
  }
  //根据server获取还在服务期限内的所有群
  async getChannelsByServer<T extends (keyof Channel)[]>(server?: string, fields?: T): Promise<Pick<Channel, T[number]>[]> {
    const channels = await this.ctx.database.getAssignedChannels(fields);
    const filteredChannels = channels.filter((channel) => {
      if (server) {
        return channel.groupServer === server && dayjs(channel.expireTime).isAfter(dayjs());
      } else {
        return dayjs(channel.expireTime).isAfter(dayjs());
      }
    });
    return filteredChannels;
  }
}

declare module "koishi" {
  interface Context {
    jx3auth: Jx3Auth;
  }
}
