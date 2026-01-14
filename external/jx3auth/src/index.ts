import { Schema } from "koishi";
import {} from "koishi-plugin-jx3render";

export const name = "jx3auth";
export const inject = ["database", "jx3render"];

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export * from "./jx3authService";
export * from "./apply";
export * from "./permissions";
export * from "./db";
