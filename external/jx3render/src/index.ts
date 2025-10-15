import { Context, Schema } from "koishi";
import { Service } from "koishi";
import * as fs from "fs";
import * as path from "path";
import handlebars from "handlebars";
import type Puppeteer from "koishi-plugin-puppeteer";
export const name = "jx3Render";

export interface Config {}
export const inject = ["puppeteer"];

export const Config: Schema<Config> = Schema.object({});

export class RenderService extends Service {
  template: Record<string, handlebars.TemplateDelegate<any>> = {};
  puppeteer: Puppeteer;
  constructor(ctx: Context) {
    super(ctx, "jx3Render", true);
    const templatePath = path.join(__dirname, "../templates");
    //读取目录下所有模板文件
    const templateFiles = fs.readdirSync(templatePath);
    templateFiles.forEach((file: string) => {
      //完整路径
      const fullPath = path.join(templatePath, file);
      //取出文件名
      const fileName = path.basename(fullPath, ".hbs");
      //预编译模板
      this.template[fileName] = handlebars.compile(fs.readFileSync(fullPath, "utf-8"));
    });
    this.puppeteer = ctx.puppeteer;
  }
  /**
   * 根据指定模板名称与数据渲染HTML，并生成该HTML的图片截图。
   *
   * @param {string} templateName - 模板名称，对应预编译的Handlebars模板。
   * @param {any} data - 传递给模板的数据对象。
   * @param {string} imgName - 生成图片的名称（当前参数在截图中未被直接使用）。
   * @param {boolean} imgName - 当已经有缓存图片时是否缓存图片，默认为false。
   * @returns {Promise<Buffer>} 返回生成的图片Buffer。
   */
  async render(templateName: string, data: any, imgName: string, isCache: boolean = false): Promise<string> {
    //图片缓存目录
    const imageFile = path.join(__dirname, "../screenshot", `${imgName}.png`);

    //如果缓存图片存在，则直接返回缓存图片
    if (isCache && fs.existsSync(imageFile)) return fs.readFileSync(imageFile).toString("base64");
    //根据数据编译成html
    const html = this.template[templateName](data);
    //将html渲染为图片
    const page = await this.puppeteer.page();
    await page.setViewport({
      width: 1400,
      height: 200,
    });
    await page.setContent(html);

    const screenshot = await page.screenshot({
      path: imageFile,
      fullPage: true,
      encoding: "base64",
    });
    return screenshot;
  }
}

declare module "koishi" {
  interface Context {
    jx3Render: RenderService;
  }
}
export function apply(ctx: Context) {
  ctx.plugin(RenderService);
}
