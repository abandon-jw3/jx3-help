import { Schema } from "koishi";

export const name = "jx3auth";
export const inject = ["database"];

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export * from "./jx3authService";
export * from "./apply";
export * from "./permissions";
export * from "./db";
