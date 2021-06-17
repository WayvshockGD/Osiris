type languages = "ts" 
               | "js" 
               | "py" 
               | "ruby"
               | "rust" 
               | "java" 
               | "cs";

export class Markdown {
    codeBlock(content: string, lang?: languages) {
        return `\`\`\`${lang || ""}\n${content}\n\`\`\``;
    }
}