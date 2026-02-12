import chalk from 'chalk';
import app from './app.js';
import ConnectDB from './config/db.config.js';
const PORT = process.env.PORT || 7070;

ConnectDB()
.then(()=>{
    app.listen(PORT , ()=>{
        console.log(chalk.green.bgBlack.bold.underline("Server is running on port " , PORT))
    })
})
.catch((err)=>{
    console.log(chalk.red("Failed to run database and server due to ") )
})