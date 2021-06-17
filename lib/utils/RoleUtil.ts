import Eris, { Role } from "eris";

export default class RoleUtil {

    compare(role1: string, role2: string, guild: Eris.Guild): boolean {
        let gotRole1 = this.getRole(guild, role1) || {position: 0};
        let gotRole2 = this.getRole(guild, role2) || {position: 0};

        return gotRole1.position > gotRole2.position;
    }

    private getRole(guild: Eris.Guild, id: string) {
        return guild.roles.get(id);
    }
}