const express = require('express') 
const app = express() 
const cors = require("cors")


app.use(express.json())
app.use(cors())

const db = require("./models")

// Routers ************************

const cliRouter = require('./Routes/Client')
app.use("/Clients", cliRouter)

const companyRouter = require('./Routes/Company')
app.use("/Company", companyRouter)

const reclamRouter = require('./Routes/Reclamation')
app.use("/Reclamations", reclamRouter)

const commentsRouter = require('./Routes/Comment')
app.use("/Comments", commentsRouter)

const SuggestionRouter = require('./Routes/Suggestion')
app.use("/Suggestions", SuggestionRouter)

const ResponseRouter = require('./Routes/Response')
app.use("/Responses", ResponseRouter)

//******************************** */
db.sequelize.sync().then(() => {
    app.listen(2024, () => {
        console.log("\nServer is running...\nDatabase is updated...") ;
    });
}) ;
