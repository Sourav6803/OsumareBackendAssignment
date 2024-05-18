
const { generateToken } = require('../utils/auths') ;

const bcrypt = require('bcryptjs');

let users = [];
let userId = 1;

  
const findUser = (username) => users.find(user => user.username === username);


 const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        
        if (findUser(username)) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = { id: userId++, username, password: hashedPassword };
        users.push(user);

        res.status(201).json({message: "User registration success", user: user, });
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

 const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = findUser(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = generateToken(user,res);
        
        res.status(200).json({message: "Login Success", username:user.username, token: token })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

module.exports.register = register
module.exports.login = login
module.exports.users = users