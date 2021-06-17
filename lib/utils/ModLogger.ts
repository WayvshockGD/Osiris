export = function(reason: string) {
    return {
        embed: {
            description: reason,
            footer: {
                text: `${new Date()}`
            }
        }
    };
}