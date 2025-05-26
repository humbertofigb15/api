import { pool } from "../db/db.js";
import { getSalt, hashPassword } from "../utils/hash.js";


export const getUsers = (req, res) => {
    pool.query('select * from users', (error, results)=> {
        if (error) {
            res.status(500).json({msg: error, users: []});
            return;
        }
        res.status(200).json({msg: "OK",  users: results });
});
};
export const getUser = (req, res) => {
    const id = req.params.id;
    pool.execute('select * from users where id = ?',[id], (error, results)=> {
        if (error) {
            res.status(500).json({msg: error, users: []});
            return;
        }
        res.status(200).json({msg: "OK",  users: results });
});

};
export const postUser = (req, res) => {
    const { name, username, password, age} = req.body;
    const salt = getSalt();
    const hash = hashPassword(password, salt);
    const hashedPassword = salt + hash;
    
    pool.execute("insert into users (name,username, password, age) values (?, ?, ?, ?)", [name, username, hashedPassword, age], (error, results)=> {
        if (error) {
            res.status(500).json({msg: error, users: []});
            return;
        }
        res.status(200).json({msg: "OK",  users: results });
});

};
export const putUser = (req, res) => {
    const {name, username, password, age} = req.body;
    pool.execute("update users set name = ?, username = ?, password = ?, age = ? where id = ?", [name, username, password, age, req.params.id], (error, results)=> {
        if (error) {
            res.status(500).json({msg: error, users: []});
            return;
        }
        res.status(200).json({msg: "OK",  users: results });
    });

} ;
export const deleteUser = (req, res) => {
    const id = req.params.id;
    pool.execute("delete from users where id = ?", [id], (error, results)=> {
        if (error) {
            res.status(500).json({msg: error, users: []});
            return;
        }
        res.status(200).json({msg: "OK",  users: results });
    });
} ;
export const login = (req, res) => {
    const { username, password } = req.body;

    pool.execute("SELECT * FROM users WHERE username = ?", [username], (error, results) => {
        if (error) {
            console.log("DB error:", error);
            return res.status(500).json({ msg: error, users: [] });
        }

        if (results.length < 1) {
            console.log("Usuario no encontrado");
            return res.status(401).json({ isLogin: false, msg: "No autorizado", user: {} });
        }

        const saltLength = parseInt(process.env.SALT_LENGTH);
        const storedPassword = results[0].password;
        const salt = storedPassword.substring(0, saltLength);
        const hash = hashPassword(password, salt);

        if (storedPassword === salt + hash) {
            return res.status(200).json({ isLogin: true, msg: "OK", user: results[0] });
        } else {
            return res.status(401).json({ isLogin: false, msg: "Invalid credentials", user: {} });
        }
    });
};
