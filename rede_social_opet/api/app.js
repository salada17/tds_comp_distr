import express from 'express'
import { routes } from './routes/v1/index.js'

const app = express()
const router = express.Router()
const port = 3000

app.use(express.json())
app.use('/api/v1', routes(router))

app.listen(port, () => {
	console.log(`Application running on port ${port}`)
})
