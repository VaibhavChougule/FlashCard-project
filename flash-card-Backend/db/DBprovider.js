// Step 1. Import the 'mysql' and 'dotenv' packages.
import { createConnection } from "mysql2/promise";
import dotenv from "dotenv";
import * as fs from "fs";


dotenv.config();

async function main() {
  
   const options = {
      host: process.env.TIDB_HOST || '127.0.0.1',
      port: process.env.TIDB_PORT || 4000,
      user: process.env.TIDB_USER || 'root',
      password: process.env.TIDB_PASSWORD || '',
      database: process.env.TIDB_DATABASE || 'test',
      ssl: process.env.TIDB_ENABLE_SSL === 'true' ? {
         minVersion: 'TLSv1.2',
         ca: process.env.TIDB_CA_PATH ? fs.readFileSync(process.env.TIDB_CA_PATH) : undefined
      } : null,
      enableKeepAlive: true,
      connectTimeout: 10000, 
      //acquireTimeout: 10000, 
   }
   try {
    
       const conn = await createConnection(options);
       
       console.log("connection successfull with database..")
       return conn;
      
   } catch (error) {
    console.log("error is:" ,error);
    return error;
    
   }
   


  
   //await conn.end();
}
export default main
