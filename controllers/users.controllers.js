import {pool} from "../db/db.js";

export const getUsers = (req,res) => {
pool.query("select * from users", (error, results) => {
    if (error) {
        res.status(500).json({ msg: error.message, users: [] });
        return;
    }
    res.status(200).json({ msg: "OK", users: results });
});
};

export const getUser = (req,res) => {
    const id = req.params.id;
    pool.execute("select * from users where id = ?", [id], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error.message, users: [] });
            return;
        }
        res.status(200).json({ msg: "OK", users: results });
    });
    };

export const postUsers = (req,res) => {
    const {name, username, password, age} = req.body;
    //console.log(req.body);
    pool.execute("insert into users (name, username, password, age) values (?,?,?,?)", 
        [name, username, password, age],
        (error,results) =>
        {
        if (error) {
            res.status(500).json({ msg: error, users: [] });
            return;
        }
        res.status(200).json({ msg: "OK", users: results });
    });
};

export const putUser = (req,res) => {};
export const deleteUsers = (req,res) => {};
export const login = (req,res) => {};