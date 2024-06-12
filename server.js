const app = require('./app')
const connectDatabase = require('./config/database')

connectDatabase()
const server = () => app.listen(process.env.PORT, () => {
    console.log(`The server is launched on port ${process.env.PORT}`)
})

server()