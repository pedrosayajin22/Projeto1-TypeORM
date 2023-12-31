import Handlebars from "handlebars";
import fs from "fs"
import { encode } from "punycode";

interface ItemplateVariable {
  [key:string]:string | number;
}

interface IparserMailTemplete{
  file:string,
  variables: ItemplateVariable
}

export default class HandlebarsMailTemplate{
  public async parser({file,variables}:IparserMailTemplete):Promise<string> {
    const templateFileContent = await fs.promises.readFile(file,{
      encoding:"utf-8"
    })
    const parserTemplate = Handlebars.compile(templateFileContent);

    return parserTemplate(variables);

    }
}

