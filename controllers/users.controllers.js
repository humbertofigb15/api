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
    pool.execute("select * from users where username = ? ", [username], (error, results)=> {
        if (error) {
            res.status(500).json({msg: error, users: []});
            return;
        }
        if (results.length <1){
            res.status(401).json({isLogin: false, msg: "No autorizado",  user: {} });
            return;
        }
        const salt = results[0].password.substring(0, process.env.SALT_LENGTH);
        const hash = hashPassword(password, salt);

        if (results[0].password  === salt + hash){ 
            res.status(200).json({isLogin: true, msg: "OK",  user: results[0] });
        } else {
            res.status(401).json({isLogin: false, msg: "Invalid credentials",  user: {} });
        }
});
} ;