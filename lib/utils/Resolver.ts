import Eris from "eris";

export class Resolver {
    member(args: string, guild: Eris.Guild) {
        return guild.members.find((user) => user.id === this.clean(args)) ||
               guild.members.find((user) => user.username === args);
               guild.members.find((user) => `${user.username}#${user.discriminator}` === args) ||
               false;
    }

    private clean(arg: string) {
        return arg.replace("<", "")
                  .replace(">", "")
                  .replace("#", "")
                  .replace("@", "")
                  .replace("!", "");
    }
}