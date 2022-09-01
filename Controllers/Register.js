import usermodel from '../model/UserSchema.js'
import CryptoJS from 'crypto-js';
import bcrypt from 'bcrypt';
import blogmodel from '../model/blogschema.js';



const register = async(req, res) => {
    const salt = await bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hashSync(req.body.password, salt);
    // console.log(hashed);
    const newUser = new usermodel({

        username: req.body.username,
        email: req.body.email,
        password: hashed,

    })
    try {
        const saveduser = await newUser.save();
        res.status(201).json(saveduser);
    } catch (err) {
        res.status(500).json(err);
    }
}

const login = async(req, res) => {
    try {
        const user = await usermodel.findOne({ username: req.body.username });
        !user && res.status(401).json("Username not matched")
        const validated = await bcrypt.compare(req.body.password, user.password);

        !validated && res.status(401).json("Credencial not match")
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }

}

const admin = async(req, res, next) => {
    const users = await usermodel.findById(req.params.id);
    console.log(users.isAdmin)
    if (!users.isAdmin) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    } else {
        next();
    }


}

//get all the users

const getallusers = async(req, res) => {
    try {
        const users = await usermodel.find();
        res.status(200).json(users);
    } catch {
        res.status(400).json("sorry there is an issue");
    }
}

//add blog by admin

const adminblog = async(req, res) => {

    const blog = new blogmodel({

        title: req.body.title,
        Content: req.body.Content,
        date: req.body.date

    })

    try {
        const saveblogs = await blog.save();
        res.status(200).json(saveblogs)
    } catch (err) {
        res.status(401).json("sorry for the inconvience ")
    }
}

//update blogs by admin

const updateblogs = async(req, res) => {
    try {
        const ublog = await blogmodel.findOneAndUpdate(
            req.body.title, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(ublog);
    } catch {
        res.status(501).json("sorry not able to update")
    }
}

// view all blogs

const viewblogs = async(req, res) => {

    try {
        const blogs = await blogmodel.find();
        res.status(200).json(blogs);
    } catch {
        res.status(500).json("Sorry there is an problem")
    }
}


//delete all blogs

const deleteblogs = async(req, res) => {

    try {
        const delblog = await blogmodel.findByIdAndDelete(req.params.id);

        res.status(200).json("deleted");

    } catch {

        res.status(401).json("sorry there is an problem to delete blogs ")
    }
}

//

export { register, login, admin, getallusers, adminblog, viewblogs, deleteblogs, updateblogs }