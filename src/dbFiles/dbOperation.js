const sql = require('mssql');
const config1 = require('./dbConfig');
const config = require('./dbConfigSeed');

const registerUser = async (username, email, passwordHash) => {
  try {
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }
    console.log('Received email in dbOperation:', email);
    console.log('Received passwordHash in dbOperation:', passwordHash);
    let pool = await sql.connect(config1);
    await pool
      .request()
      .input('UserName', sql.NVarChar(255), username)
      .input('Email', sql.NVarChar(255), email)
      .input('PasswordHash', sql.NVarChar(64), passwordHash)
      .execute('InsertAdminandUserLogin');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to register user');
  }
};

const getUserByEmail = async (email) => {
  try {
    let pool = await sql.connect(config1);
    const result = await pool
      .request()
      .input('Email', sql.NVarChar(255), email)
      .query('SELECT * FROM AdminandUserLogin WHERE Email = @Email');
    return result.recordset[0];
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch user by email');
  }
};

const loginUser = async (email, passwordHash) => {
  try {
    let pool = await sql.connect(config1);
    const result = await pool
      .request()
      .input("Email", sql.NVarChar(255), email)
      .input("PasswordHash", sql.NVarChar(64), passwordHash)
      .query("SELECT COUNT(*) AS UserCount FROM AdminandUserLogin WHERE Email = @Email AND PasswordHash = @PasswordHash");
    const userCount = result.recordset[0].UserCount;
    return userCount === 1; // Return true if user exists, false otherwise
  } catch (error) {
    //console.log(error);
  }
};



module.exports = {
     sql,
     registerUser,
     getUserByEmail,
     loginUser,
}
