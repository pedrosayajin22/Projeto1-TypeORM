import nodemailer from "nodemailer"
import HandlebarsMailTemplate from "./HandlebarsMailTemplate";


interface ImailContact{
  name:string;
  email:string;
}

interface ItemplateVariable {
  [key:string]:string | number;
}

interface IparserMailTemplete{
  file:string,
  variables: ItemplateVariable
}

interface IsendMail{
  to:ImailContact;
  from?:ImailContact;
  subject:string;
  templateData:IparserMailTemplete;
}



export default class EtherealMail{
  static async sendMail({to,templateData,from,subject}:IsendMail):Promise<void>{
    const account = await nodemailer.createTestAccount();
    const handleMailTemplate = new HandlebarsMailTemplate()

    const transport =  nodemailer.createTransport({
      host:account.smtp.host,
      port:account.smtp.port,
      secure:account.smtp.secure,
      auth:{
        user:account.user,
        pass:account.pass
      }
    });

    const message = await transport.sendMail({
      from:{
        name:from?.name || "Equipe API Vendas",
        address:from?.email || "equipePedro@apiVendas.com.br"
      },
      to:{
        name:to.name,
        address:to.email
      },
      subject,
      html:await handleMailTemplate.parser(templateData)
    });

    console.log("Message sent: %s",message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));


  }
}
