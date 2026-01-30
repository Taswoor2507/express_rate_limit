import app from './app.js';

const PORT = process.env.PORT || 7070;

// listen 
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})