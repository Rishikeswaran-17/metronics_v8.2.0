const sql = require('mssql');
const config = require('./dbConfigSeed');
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

const registerUser = async (username, email, passwordHash) => {
  try {
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }
    console.log('Received email in dbOperation:', email);
    console.log('Received passwordHash in dbOperation:', passwordHash);
    let pool1 = await sql.connect(config);
    await pool1
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
    let pool = await sql.connect(config);
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
    let pool = await sql.connect(config);
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

const getTablenames = async () => {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .query("SELECT TABLE_NAME FROM [Ceruleanseed].[INFORMATION_SCHEMA].[TABLES] WHERE TABLE_SCHEMA = 'dbo';");
    return result;
  } catch (error) {
    throw new Error('Failed to get Table Name');
  }
};


const getCategoriesForTable = async (tableName) => {
  try {
    // Make sure the connection is established before executing the query
    await poolConnect;

    // Use parameterized query to avoid SQL injection
    const result = await pool.request()
      .input('tableName', sql.NVarChar, tableName)
      .query(`SELECT column_name
      FROM information_schema.columns
      WHERE table_name = @tableName
      AND COLUMNPROPERTY(OBJECT_ID(TABLE_SCHEMA + '.' + TABLE_NAME), COLUMN_NAME, 'IsIdentity') <> 1;       
      `);
    
    const categories = result.recordset.map((row) => row.column_name);
    return categories;
  } catch (error) {
    console.log("Error:", error);
    throw new Error('Failed to get Categories for Table');
  }
};

const insertData = async (tableName, dataToInsert) => {
  try {
    const pool = await sql.connect(config);

    // Construct your SQL query based on the tableName and the data
    const columnNames = Object.keys(dataToInsert).join(', ');
    const values = Object.keys(dataToInsert).map((key) => `@${key}`).join(', ');
    const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${values})`;

    const inputParams = Object.entries(dataToInsert).map(([key, value]) => ({
      name: key,
      type: sql.NVarChar(255), // Change the type based on your column's data type
      value: value,
    }));

    const request = pool.request();
    inputParams.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    await request.query(query);

    console.log('Data inserted successfully');
  } catch (error) {
    console.log('Error inserting data:', error);
    throw new Error('Failed to insert data');
  }
};

const UpdateData = async (tableName, dataToUpdate) => {
  try {
    console.log('tableName:', tableName);
    console.log('dataToUpdate:', dataToUpdate);

    const pool = await sql.connect(config);

    // Construct your SQL query based on the tableName and dataToUpdate
    const setClause = Object.keys(dataToUpdate)
      .map((key) => `${key} = @${key}`)
      .join(', ');

    // Construct the WHERE clause dynamically based on matching columns and values
    const whereConditions = Object.keys(dataToUpdate)
      .map((key) => `${key} = @${key}_condition`)
      .join(' OR ');

    const query = `UPDATE ${tableName} SET ${setClause} WHERE ${whereConditions}`;

    const inputParams = Object.entries(dataToUpdate).map(([key, value]) => ({
      name: key,
      type: sql.NVarChar(255), // Change the type based on your column's data type
      value: value,
    }));

    const request = pool.request();
    inputParams.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    // Duplicate the input parameters to use for the condition
    inputParams.forEach((param) => {
      request.input(`${param.name}_condition`, param.type, param.value);
    });

    await request.query(query);

    console.log('Data updated successfully');
  } catch (error) {
    console.log('Error updating data:', error);
    throw new Error('Failed to update data');
  }
};

const getTablenameswithvalue = async (tableName) => {
  try {
    console.log('Attempting to connect to the database...');
    await poolConnect;

    console.log(`Executing query for table: ${tableName}`);
    const result = await pool.request()
      .input('tableName', sql.NVarChar, tableName)
      .query(`SELECT * FROM ${tableName};`);
    
    console.log('Query executed successfully. Result:', result);

    if (result.recordset.length === 0) {
      console.log('No rows found.');
    }

    return result.recordset; // Return the array of rows
  } catch (error) {
    console.error('Error occurred:', error);
    throw new Error('Failed to get table rows');
  }
};



module.exports = {
  sql,
  registerUser,
  getUserByEmail,
  loginUser,
  getTablenames,
  getCategoriesForTable,
  insertData,
  UpdateData,
  getTablenameswithvalue,
};

