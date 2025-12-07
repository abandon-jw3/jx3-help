import { Context, Schema } from "koishi";
import { Service } from "koishi";
import * as fs from "fs";
import * as path from "path";
import handlebars from "handlebars";
import "koishi-plugin-puppeteer";
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
  imgDir: string;
  constructor(ctx: Context) {
    super(ctx, "jx3render", true);
    // 注册 helper：让索引从 1 开始
    handlebars.registerHelper("inc", function (value) {
      return parseInt(value) + 1;
    });

    //计算两个时间之间时长
    handlebars.registerHelper("duration", function (start, end) {
      if (!start || !end) return "";

      const totalSeconds = dayjs.unix(end).diff(dayjs.unix(start), "second");
      if (totalSeconds >= 60) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return minutes + "分" + seconds + "秒";
      }
      return totalSeconds + "秒";
    });
    //格式化时间
    handlebars.registerHelper("formatTime", function (value, format) {
      if (!value) return "";

      //如果value全是数字或数字组成的字符串
      if (typeof value === "number" || value.match(/^\d+$/)) {
        return dayjs.unix(value).format(format);
      } else {
        return dayjs(value).format(format);
      }
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

    handlebars.registerHelper("json", function (value) {
      return JSON.stringify(value);
    });

    handlebars.registerHelper("tradeType", function (value) {
      const map = {
        "1": "出售",
        "2": "收购",
        "3": "想出",
        "4": "想收",
        "5": "成交",
        "6": "在售",
        "7": "公示",
      };
      return map[String(value)] || value;
    });

    handlebars.registerHelper("limit", function (arr, limit) {
      if (!Array.isArray(arr)) {
        return [];
      }
      return arr.slice(0, limit);
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
    this.imgDir = path.join(ctx.baseDir, "data", "jx3render", "img");
    fs.mkdirSync(this.dataDir, { recursive: true });
    fs.mkdirSync(this.imgDir, { recursive: true });
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
    const imageFile = path.join(this.imgDir, `${imgName}.png`);
    //如果缓存图片存在，则直接返回缓存图片
    if (isCache && fs.existsSync(imageFile)) return fs.readFileSync(imageFile).toString("base64");

    const html = this.template[templateName](data); //根据数据编译成html
    const randomName = `${templateName}-${Math.random().toString(36).substring(2, 15)}`; //随机生成一个16位文件名
    const tempHtmlFile = path.join(this.dataDir, `${randomName}.html`); // 将 HTML 保存为临时文件
    fs.writeFileSync(tempHtmlFile, html, "utf-8");

    const page = await this.ctx.puppeteer.page(); //创建游览器标签页实例
    try {
      await page.goto(`http://localhost:5140/jx3html/${randomName}.html`, {
        waitUntil: "networkidle0", // 等待网络完全空闲，确保所有资源已加载
      });
      const screenshot = await page.screenshot({
        path: imageFile,
        fullPage: true,
        // encoding: "base64",//不能直接使用base64，否则无法自动保存图片
      });

      const base64 = screenshot.toString("base64");
      return base64;
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
