import { Context, Schema } from "koishi";
import { Service } from "koishi";
import * as fs from "fs";
import * as path from "path";
import handlebars from "handlebars";
import {} from "koishi-plugin-puppeteer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");
export const name = "jx3render";

export interface Config {}
export const inject = ["puppeteer"];

export const Config: Schema<Config> = Schema.object({});

export class RenderService extends Service {
  template: Record<string, handlebars.TemplateDelegate<any>> = {};
  dataDir: string;
  constructor(ctx: Context) {
    super(ctx, "jx3render", true);
    // 注册 helper：让索引从 1 开始
    handlebars.registerHelper("inc", function (value) {
      return parseInt(value) + 1;
    });
    //格式化时间
    handlebars.registerHelper("formatTime", function (value) {
      if (!value) return "";
      return dayjs.unix(value).format("YYYY-MM-DD HH:mm:ss");
    });
    handlebars.registerHelper("formatDateHour", function (value) {
      if (!value) return "";
      return dayjs.unix(value).format("YYYY-MM-DD HH");
    });
    handlebars.registerHelper("time", function (value) {
      if (!value) return "";
      return dayjs.unix(value).format("HH:mm:ss");
    });
    //格式化日期
    handlebars.registerHelper("formatDate", function (value) {
      if (!value) return "";
      return dayjs.unix(value).format("YYYY-MM-DD");
    });
    //格式化间隔时间
    handlebars.registerHelper("formatInterval", function (value) {
      if (!value) return "";
      return dayjs.unix(value).fromNow();
    });

    handlebars.registerHelper("eq", function (a, b) {
      return a === b;
    });

    handlebars.registerHelper("default", function (value, defaultValue) {
      return value || defaultValue;
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
    this.dataDir = path.join(ctx.baseDir, "data", "jx3render", "public");
    fs.mkdirSync(this.dataDir, { recursive: true });

    // 确保截图目录存在
    const screenshotDir = path.join(__dirname, "../screenshot");
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  }
  /**
   * 根据指定模板名称与数据渲染HTML，并生成该HTML的图片截图。
   *
   * @param {string} templateName - 模板名称，对应预编译的Handlebars模板。
   * @param {any} data - 传递给模板的数据对象。
   * @param {string} imgName - 生成图片的名称（当前参数在截图中未被直接使用）。
   * @param {boolean} isCache - 当已经有缓存图片时是否缓存图片，默认为false。
   * @returns {Promise<Buffer>} 返回生成的图片Buffer。
   */
  async render(templateName: string, data: any, imgName: string, isCache: boolean = false): Promise<string> {
    this.ctx.logger("jx3render").info(`渲染模板: ${templateName}`);
    //图片缓存目录
    const imageFile = path.join(__dirname, "../screenshot", `${imgName}.png`);
    //如果缓存图片存在，则直接返回缓存图片
    if (isCache && fs.existsSync(imageFile)) return fs.readFileSync(imageFile).toString("base64");

    //根据数据编译成html
    const html = this.template[templateName](data);

    //随机生成一个16位文件名
    const randomName = Math.random().toString(36).substring(2, 15);

    // 将 HTML 保存为临时文件，以便支持 file:// 协议加载本地资源
    const tempHtmlFile = path.join(this.dataDir, `${randomName}.html`);
    fs.writeFileSync(tempHtmlFile, html, "utf-8");

    //将html渲染为图片
    const page = await this.ctx.puppeteer.page();
    try {
      await page.goto(`http://localhost:5140/jx3html/${randomName}.html`, {
        waitUntil: "networkidle0", // 等待网络完全空闲，确保所有资源已加载
      });

      const screenshot = await page.screenshot({
        path: imageFile,
        fullPage: true,
        encoding: "base64",
      });
      return screenshot;
    } finally {
      await page.close();
      // 删除临时 HTML 文件
      // fs.unlinkSync(tempHtmlFile);
    }
  }
}

declare module "koishi" {
  interface Context {
    jx3render: RenderService;
  }
}
export function apply(ctx: Context) {
  ctx.plugin(RenderService);
}
