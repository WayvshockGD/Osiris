import Eris, { Role } from "eris";

export default class RoleUtil {

    compare(role1: string, role2: string, guild: Eris.Guild): boolean {
        let gotRole1 = this.getRole(guild, role1) || {position: 0};
        let gotRole2 = this.getRole(guild, role2) || {position: 0};

        return gotRole1.position > gotRole2.position;
    }

    sort(roles: string[], guild: Eris.Guild) {
        let roleArray = [];

        for (let r of roles) {
            let rol = this.getRole(guild, r);
            roleArray.push(rol);
        }

        roleArray.sort((a, b) => b?.position || 0 - a?.position || 0) || [];
    }

    private getRole(guild: Eris.Guild, id: string) {
        return guild.roles.get(id);
    }
}