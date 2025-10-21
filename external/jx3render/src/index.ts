import { Context, Schema } from "koishi";
import { Service } from "koishi";
import * as fs from "fs";
import * as path from "path";
import handlebars from "handlebars";
import "koishi-plugin-puppeteer";
import dayjs from "dayjs";
export const name = "jx3Render";

export interface Config {}
export const inject = ["puppeteer"];

export const Config: Schema<Config> = Schema.object({});

export class RenderService extends Service {
  template: Record<string, handlebars.TemplateDelegate<any>> = {};
  tempDir: string;
  constructor(ctx: Context) {
    super(ctx, "jx3Render", true);
    // 注册 helper：让索引从 1 开始
    handlebars.registerHelper("inc", function (value) {
      return parseInt(value) + 1;
    });
    //格式化时间
    handlebars.registerHelper("formatTime", function (value) {
      return dayjs.unix(value).format("YYYY-MM-DD HH:mm:ss");
    });
    handlebars.registerHelper("formatDateHour", function (value) {
      return dayjs.unix(value).format("YYYY-MM-DD HH");
    });
    //格式化日期
    handlebars.registerHelper("formatDate", function (value) {
      return dayjs.unix(value).format("YYYY-MM-DD");
    });
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
    this.tempDir = path.join(ctx.baseDir, "temp", "jx3render");
    fs.mkdirSync(this.tempDir, { recursive: true });
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
    this.ctx.logger("jx3Render").info(`渲染模板: ${templateName}`);
    //图片缓存目录
    const imageFile = path.join(__dirname, "../screenshot", `${imgName}.png`);
    //如果缓存图片存在，则直接返回缓存图片
    if (isCache && fs.existsSync(imageFile)) return fs.readFileSync(imageFile).toString("base64");

    // 添加 assets 绝对路径到数据对象
    const assetsPath = path.join(__dirname, "../assets").replace(/\\/g, "/");
    const renderData = { ...data, assetsPath };

    //根据数据编译成html
    const html = this.template[templateName](renderData);

    //随机生成一个16位文件名
    const randomName = Math.random().toString(36).substring(2, 15);

    // 将 HTML 保存为临时文件，以便支持 file:// 协议加载本地资源
    const tempHtmlFile = path.join(this.tempDir, `${randomName}.html`);
    fs.writeFileSync(tempHtmlFile, html, "utf-8");

    //将html渲染为图片
    const page = await this.ctx.puppeteer.page();
    // await page.setViewport({ width: 1400, height: 768 });

    // 使用 goto 加载本地 HTML 文件，这样可以正确加载 file:// 协议的资源
    await page.goto(`file://${tempHtmlFile}`);

    const screenshot = await page.screenshot({
      path: imageFile,
      fullPage: true,
      encoding: "base64",
    });
    // await page.close();
    // 删除临时 HTML 文件
    fs.unlinkSync(tempHtmlFile);
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
