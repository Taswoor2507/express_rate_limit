import chalk from "chalk"
import { transporter } from "../config/nodemailer.config.js"
// email  ,  to ,  subject , text/html  
const  sendEmail = async ( useremail , subject, html)=>{
     try {
       await transporter.sendMail({
           from:`UCONNECT INTERS Application < ${process.env.EMAIL}> `,
           to: useremail,
           subject:subject,
           html:html
        })
        console.log(chalk.green.bold("Email send succesfully"))
        return true;
     } catch (error) {
         console.log("Failed to send email dute to error ->" , error)
         throw error;
     }
}

export {sendEmail};