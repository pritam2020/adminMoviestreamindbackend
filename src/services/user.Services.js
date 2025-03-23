const connection = require('../utils/DB_connection');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');

// module.exports.createUser= async(username, password, FirstName, LastName, Email, Country, PinCode, City) =>{

//     console.log("inside create user");

//     try {
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//         const sqlQuery = 'INSERT INTO users (UserName, Password_Hash, FirstName, LastName, EmailId, County, PinCode, City) VALUES (?, ?, ?, ?, ?, ?, ?, ? )';
//         return new Promise((resolve, reject) => {
//             connection.query(sqlQuery, [username, hashedPassword, FirstName, LastName, Email, Country, PinCode, City], (err, result) => {
//                 if (err) {
//                     console.log(err);
//                     reject(err);
//                 } else {
//                     connection.query('SELECT * FROM users WHERE UserName = ?', username, (err, rows) => {
//                         if (err) {
//                             console.log(err);
//                             reject(err);
//                         } else {
//                             console.log("User created successfully");
//                             resolve(rows[0]);
//                         }
//                     });
//                 }
//             });
//         });
//     } catch (error) {
//         throw error;
//     }

// }

module.exports.createUser = async (username, password, FirstName, LastName, Email, Country, PinCode, City) => {
	try {
		const result = await userModel.create({
			UserName: username,
			Password_Hash: password,
			FirstName: FirstName,
			LastName: LastName,
			EmailId: Email,
			County: Country,
			PinCode: PinCode,
			City: City,
		});

		return await userModel.findOne({ where: { UserName: username } });
	} catch (err) {
		console.log(err);
		throw err;
	}
};
// module.exports.userExist = async (username, password) => {
//     return new Promise((resolve, reject) => {
//         connection.query(
//             `SELECT * FROM users where UserName=? `, [username],
//             async (err, results) => {
//                 if (err) {
//                     console.log(err);
//                     return reject(err);
//                 }
//                 else if (results.length !== 0) {
//                     const isMatch = await bcrypt.compare(password, results[0].Password_Hash);
//                     if (isMatch) {
//                         return resolve(results[0]);
//                     } else {
//                         console.log("inside userExists method","Password does not match");
//                         return reject(new Error("password dosenot match"));
//                     }
//                 } else {
//                     console.log("User does not exist");
//                     return resolve(false);
//                 }

//             }
//         );
//     });

// }

module.exports.getUserByUsername = async (username) => {
	try {
		return await userModel.findOne({ where: { UserName: username } });
	} catch (err) {
		console.log('in catch of user servics', err);
		throw err;
	}
};
