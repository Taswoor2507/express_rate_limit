import { welcomeEmailTemplate } from "../emailTemplates/welcome.template.js";
import { eventBus } from "../events/EventBus.js";
import { UserEvents } from "../events/event.constants.js";
import { sendEmail } from "../utils/sendEmail.js";
eventBus.on(UserEvents.REGISTER, async (user) => {
    try {
        const welcomeTemplate = welcomeEmailTemplate(user.firstName, user.email)
        await sendEmail(user.email, "WELCOME TO OUR APPLICATION", welcomeTemplate)
        console.log("[USER] REGISTERED EMAIL SENT IN BACKGROUND")
    } catch (error) {
        console.error("[USER] FAILED TO SEND WELCOME EMAIL", error)
    }
})

// const MONUSEVLICK = "click"
//   addEventListener(MOUSECLICK , (e)=>{
//})
//