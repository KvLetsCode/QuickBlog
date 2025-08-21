import express from 'express'
import 'dotenv/config' 
import cors from 'cors'
import connectDB from './config/db.js'
import adminRouter from './Routes/adminRoutes.js'
import blogRouter from './Routes/blogRoutes.js'

const app = express()

await connectDB()

// Middleware
app.use(cors())
app.use(express.json())

//Routes
app.get('/', (req, res) => res.send('API is Working'))
app.use('/api/admin', adminRouter)
app.use('/api/blog',blogRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
    
})

export default app;