import chalk from "chalk";

interface formatOptions {
    box: string;
}

export default class Logger {
    public success(...content: string[]) {
        return console.log(`${this.format({
             box: "success"
        })} ${chalk.green(content.join(" "))}`);
    }

    public warn(...content: string[]) {
        return console.log(`${this.format({
            box: "warn"
        })} ${chalk.yellow(content.join(" "))}`);
    }

    public info(...content: string[]) {
        return console.log(`${this.format({
            box: "info"
        })} ${chalk.blue(content.join(" "))}`);
    }

    public error(...content: string[]) {
        return console.log(`${this.format({
            box: "error"
        })} ${chalk.red(content.join(" "))}`);
    }

    public shard(id: number, content: Error|string|null) {
        return console.warn(`${this.format({
            box: "shard"
        })} [ id: ${chalk.magenta(id)} ]\n${chalk.magenta(content)}`);
    }

    private format(opts: formatOptions) {
        return `[ ${chalk.blue(new Date().toISOString())} ] [ ${opts.box.toLocaleUpperCase()} ] >>`;
    }
}