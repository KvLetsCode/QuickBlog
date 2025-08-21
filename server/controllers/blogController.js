import fs from 'fs';
import imagekit from '../config/imageKit.js'
import Blog from '../Models/Blog.js'
import Comment from '../Models/Comment.js'
import main from '../config/gemini.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog)
        
        const imageFile = req.file;

        //check if all filed are present
        if (!title || !description || !category || !imageFile) {
            return res.json({
                success: false,
                message:"Missing required fields"
            })
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        //Upload Image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder : '/blogs'
        })

        // optimize through imageKit URL transformation
        const optimzeimageurl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: "auto" },
                { format: 'webp' },
                {width:'1280'}
            ]
        })
        const image = optimzeimageurl;

        await Blog.create({ title, subTitle, description, category, isPublished,image })
        
        res.json({
            success: true,
            message:"Blog added successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getAllBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
        
        res.json({
            success: true,
            blogs
        })
    } catch (error) {
         res.json({
            success: false,
            message:error.message
        })
    }
}

export const getBlogById = async (req, res) => {

    try {
        const {blogId} = req.params
        const blog = await Blog.findById(blogId)

        if (!blog) {
            return  res.json({
            success: false,
            message:'Blog not found'
        })
        }

        res.json({
            success: true,
            blog
        })
    } catch (error) {
        res.json({
            success: false,
            message:error.message
        })
    }
    
}

export const deleteBlogById = async (req, res) => {
    try {
        const {id} = req.body
        await Blog.findByIdAndDelete(id)


        // Delete all comments associated with the blog
        await Comment.deleteMany({blog:id})

        res.json({
            success: true,
            message:"Blog deleted successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message:error.message
        })
    }
}

export const togglePublish = async (req,res) => {
    try {
        const { id } = req.body
        const blog = await Blog.findById(id)
        blog.isPublished = !blog.isPublished
        await blog.save()

        res.json({
            success: true,
            message:"Blog Status Updated"
        })

    } catch (error) {
        res.json({
            success: false,
            message:error.message
        })
    
    }
}


export const addComment = async (req,res) => {
    try {
        const { blog, name, content } = req.body
        await Comment.create({ blog, name, content });

        res.json({
            success: true,
            message:"Comment Added for review"
        })
        
    } catch (error) {
        res.json({
            success: false,
            message:error.message
        })
    }
}

export const getBlogComments = async (req,res) => {
    try {
        const { blogId } = req.body
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 })
        
        res.json({
            success: true,
            comments
        })
    } catch (error) {
        res.json({
            success: false,
            message:error.message
        })
    }
}

export const generateContent = async (req,res) => {
    try {
        const { prompt } = req.body;
        const content = await main(`You are a professional blog writer who creates engaging, well-structured, and SEO-friendly blog posts. Write a blog post on the topic in text format: "${prompt}"`)

        res.json({
            success: true,
            content
        })
    } catch (error) {
         res.json({
            success: false,
            message:error.message
        })
    }
}