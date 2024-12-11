const User = require('../models/users');

const createUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        
       
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                error: 'Email or username already exists' 
            });
        }

        const user = new User({ username, email, password });
        await user.save();

        const token = user.generateAuthToken();
        
        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

       
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        
        const token = user.generateAuthToken();

        res.json({
            message: 'Logged in successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createUser, loginUser };