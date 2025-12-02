import { Context, Service } from "koishi";
import { Config, name } from "../index";
export class Jx3Auth extends Service {
  constructor(ctx: Context, config: Config) {
    super(ctx, name, true);
  }
}

declare module "koishi" {
  interface Context {
    jx3auth: Jx3Auth;
  }
}
