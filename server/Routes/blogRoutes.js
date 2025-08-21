import express from 'express'
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish }  from '../controllers/blogController.js'
import upload from '../middlewares/multer.js'
import auth from '../middlewares/auth.js'


const blogRouter = express.Router()

blogRouter.post('/add', upload.single('image'), auth, addBlog)
blogRouter.route('/all').get(getAllBlogs)
blogRouter.route('/:blogId').get(getBlogById)
blogRouter.route('/delete').post(auth , deleteBlogById)
blogRouter.route('/toggle-publish').post(auth, togglePublish)

blogRouter.post('/add-comment',addComment)
blogRouter.post('/comments', getBlogComments)
blogRouter.post('/generate',auth ,generateContent)

export default blogRouter

