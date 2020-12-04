const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

// Student Model
const Student = require('../../models/StudentModel');
const Company = require('../../models/CompanyModel');

const response = {};

const handle_request = async(payload, callback) => {
    const { topic } = payload;
    console.log('In topic: ', topic);
    switch (topic) {
        case 'studentSignup':
            return studentSignup(payload, callback);
        case 'studentLogin':
            return studentLogin(payload, callback);
        case 'companySignup':
            return companySignup(payload, callback);
        case 'companyLogin':
            return companyLogin(payload, callback);
        case 'adminSignup':
            return adminSignup(payload, callback);
        case 'adminLogin':
            return adminLogin(payload, callback);
    }
};

async function studentSignup(msg, callback) {
    const { name, email, password } = msg.body;
    // See if user exists
    try {
        student = new Student({
            name,
            email,
        });

        await student.save();
        mysqlConnectionPool.query(
            `SELECT email FROM student WHERE email= '${email}'`,
            async(error, result) => {
                if (error) {
                    console.log(error);
                    response.status = 500;
                    response.message = 'Server Error';
                    return callback(null, response);
                }
                if (result.length > 0) {
                    response.status = 400;
                    response.message = 'Student already exists';
                    return callback(null, response);
                }

                //Encrypt password using bcrypt
                const salt = await bcrypt.genSalt(10);
                const passwordEncrypted = await bcrypt.hash(password, salt);

                mysqlConnectionPool.query(
                    `INSERT into student (name, email, password) 
                        VALUES ('${name}', '${email}', '${passwordEncrypted}')`,
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            response.status = 500;
                            response.message = 'Server Error';
                            return callback(null, response);
                        }
                        const payload = {
                            user: {
                                id: student._id,
                                name: name,
                                email: email,
                                usertype: 'student',
                            },
                        };
                        jwt.sign(
                            payload,
                            config.get('jwtSecret'), { expiresIn: 6000000 },
                            (error, token) => {
                                if (error) throw error;
                                const result = {
                                    token,
                                    id: student._id,
                                    name: name,
                                    email: email,
                                };
                                response.status = 200;
                                response.message = result;
                                return callback(null, response);
                            },
                        );
                    },
                );
            },
        );
    } catch (error) {
        console.error(error.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}

async function studentLogin(msg, callback) {
    const { email, password } = msg.body;
    // See if user exists
    try {
        const student = await Student.findOne({ email: email });
        mysqlConnectionPool.query(
            `SELECT * FROM student WHERE email= '${email}'`,
            async(error, result) => {
                if (error) {
                    response.status = 500;
                    response.message = 'Server Error';
                    return callback(null, response);
                }
                if (result.length === 0) {
                    response.status = 400;
                    response.message = 'Invalid Credentials';
                    return callback(null, response);
                }

                const isMatch = await bcrypt.compare(password, result[0].password);

                if (!isMatch) {
                    response.status = 400;
                    response.message = 'Invalid Credentials';
                    return callback(null, response);
                }
                const payload = {
                    user: {
                        id: student._id,
                        name: result[0].name,
                        email: email,
                        usertype: 'student',
                    },
                };

                jwt.sign(
                    payload,
                    config.get('jwtSecret'), { expiresIn: 6000000 },
                    (error, token) => {
                        if (error) {
                            console.log(error);
                        }
                        response.status = 200;
                        response.message = {
                            token,
                            id: student._id,
                            name: result[0].name,
                            email: email,
                        };
                        return callback(null, response);
                    },
                );
            },
        );
    } catch (error) {
        console.error(error.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}


async function companySignup(msg, callback) {
    const { name, email, password } = msg.body;
    // See if user exists
    try {
        company = new Company({
            name,
            email,
        });

        await company.save();
        mysqlConnectionPool.query(
            `SELECT email FROM company WHERE email= '${email}'`,
            async(error, result) => {
                if (error) {
                    console.log(error);
                    response.status = 500;
                    response.message = 'Server Error';
                    return callback(null, response);
                }
                if (result.length > 0) {
                    response.status = 400;
                    response.message = 'Student already exists';
                    return callback(null, response);
                }

                //Encrypt password using bcrypt
                const salt = await bcrypt.genSalt(10);
                const passwordEncrypted = await bcrypt.hash(password, salt);

                mysqlConnectionPool.query(
                    `INSERT into company (name, email, password) 
                      VALUES ('${name}', '${email}', '${passwordEncrypted}')`,
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            response.status = 500;
                            response.message = 'Server Error';
                            return callback(null, response);
                        }
                        const payload = {
                            company: {
                                // id: result.insertId,
                                id: company._id,
                                name: name,
                                email: email,
                                usertype: 'company'
                            },
                        };
                        console.log("payload", payload)
                        jwt.sign(
                            payload,
                            config.get('jwtSecret'), { expiresIn: 6000000 },
                            (error, token) => {
                                if (error) throw error;
                                // const result = {
                                //     token,
                                //     id: company._id,
                                //     name: name,
                                //     email: email,
                                // };
                                response.status = 200;
                                response.message = {
                                    token,
                                    id: company._id,
                                    name: name,
                                    email: email,
                                };
                                return callback(null, response);
                            },
                        );
                    },
                );
            },
        );
    } catch (error) {
        console.error(error.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}

async function companyLogin(msg, callback) {
    const { email, password } = msg.body;
    // See if user exists
    try {
        const company = await Company.findOne({ email: email });
        mysqlConnectionPool.query(
            `SELECT * FROM company WHERE email= '${email}'`,
            async(error, result) => {
                if (error) {
                    console.log(error);
                    response.status = 500;
                    response.message = 'Server Error';
                    return callback(null, response);
                }
                if (result.length === 0) {
                    response.status = 400;
                    response.message = 'Invalid Credentials';
                    return callback(null, response);
                }

                const isMatch = await bcrypt.compare(
                    password,
                    result[0].password
                );

                if (!isMatch) {
                    response.status = 400;
                    response.message = 'Invalid Credentials';
                    return callback(null, response);
                }
                const payload = {
                    company: {
                        // id: result[0].id,
                        id: company._id,
                        name: result[0].name,
                        email: email,
                        usertype: 'company'
                    },
                };

                console.log("company login", payload)



                jwt.sign(
                    payload,
                    config.get('jwtSecret'), { expiresIn: 6000000 },
                    (error, token) => {
                        if (error) throw error;
                        console.log("company login2", payload)
                        response.status = 200;
                        const result = {
                                token,
                                id: company._id,
                                name: result[0].name,
                                email: email,
                            }
                            // response.message = {
                            //     token,
                            //     id: company._id,
                            //     name: result[0].name,
                            //     email: email,
                            // };

                        return callback(null, result);
                    }
                );
                console.log("After Jwt Sign")

            }
        );
        //res.send('Customer Registered');
    } catch (error) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}

async function adminLogin(msg, callback) {
    const { email, password } = msg.body;
    // See if user exists
    try {
        mysqlConnectionPool.query(
            `SELECT * FROM admin WHERE email= '${email}'`,
            async(error, result) => {
                if (error) {
                    console.log(error);
                    response.status = 500;
                    response.message = 'Server Error';
                    return callback(null, response);
                }
                if (result.length === 0) {
                    response.status = 400;
                    response.message = 'Invalid Credentials';
                    return callback(null, response);
                }
                const isMatch = await bcrypt.compare(password, result[0].password);
                if (!isMatch) {
                    response.status = 400;
                    response.message = 'Invalid Credentials';
                    return callback(null, response);
                }
                const payload = {
                    admin: {
                        id: result[0].id,
                        name: result[0].name,
                        email: email,
                        usertype: 'admin'
                    },
                };

                jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 6000000 }, (error, token) => {
                    if (error) {
                        console.log(error);
                    }
                    response.status = 200;
                    response.message = {
                        token,
                        id: result[0]._id,
                        name: result[0].name,
                        email: email,
                    };
                    return callback(null, response);
                }, );
            },
        );
    } catch (error) {
        console.error(error.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}

async function adminSignup(msg, callback) {
    const { name, email, password } = msg.body;
    // See if user exists
    try {
        mysqlConnectionPool.query(
            `SELECT email FROM admin WHERE email= '${email}'`,
            async(error, result) => {
                if (error) {
                    console.log(error);
                    response.status = 500;
                    response.message = 'Server Error';
                    return callback(null, response);
                }
                if (result.length > 0) {
                    response.status = 400;
                    response.message = 'Admin already exists';
                    return callback(null, response);
                }

                //Encrypt password using bcrypt
                const salt = await bcrypt.genSalt(10);
                const passwordEncrypted = await bcrypt.hash(password, salt);

                mysqlConnectionPool.query(
                    `INSERT into admin (name, email, password) 
                        VALUES ('${name}', '${email}', '${passwordEncrypted}')`,
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            response.status = 500;
                            response.message = 'Server Error';
                            return callback(null, response);
                        }
                        const payload = {
                            admin: {
                                id: result.insertId,
                                name: name,
                                email: email,
                                usertype: 'admin'
                            },
                        };
                        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 6000000 }, (error, token) => {
                            if (error) {
                                response.status = 400;
                                response.message = 'JWT generation error Error';;
                                return callback(null, response);
                            }
                            const result = {
                                token,
                                id: result.insertId,
                                name: name,
                                email: email,
                            };
                            response.status = 200;
                            response.message = result;
                            return callback(null, response);
                        }, );
                    },
                );
            },
        );
    } catch (error) {
        console.error(error.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}

exports.handle_request = handle_request;