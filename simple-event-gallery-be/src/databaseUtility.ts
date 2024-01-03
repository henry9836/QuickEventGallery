import mariadb, {PoolConnection} from "mariadb";
import {generateUniqueFilename} from "./tools.js";
import config from "./config.json";

const mariadbPool = mariadb.createPool(config.databaseInfo);

async function insertNewFile(dbConnection, fileName : string){
    try {
        console.log("ATTEMPTING TO INSERT...")
        const insert = await dbConnection.query("INSERT INTO gallery (filename) VALUES (?)", fileName);

        console.log(insert);
        const rows = await dbConnection.query("SELECT * FROM gallery");
        console.log(rows);

        return fileName;
    } catch (error) {
        console.error(error);
        return "ERROR";
    }
}

export async function getNewGalleryData(offset : number){
    const conn = await mariadbPool.getConnection();

    const results = await conn.query("SELECT * FROM gallery ORDER BY id DESC LIMIT 70 OFFSET ?", [offset]);

    await conn.release();

    return results;
}

export async function uploadNewFileDb(fileName : string) {
    const MaxAttempts = 3;
    const conn = await mariadbPool.getConnection();
    let InsertedSuccessfully = false;

    // Attempt to make the new file
    for (let attempt = 0; attempt < MaxAttempts; attempt++) {
        console.log(`${attempt} Attempting to create file: ${fileName}`);
        await insertNewFile(conn, fileName).then((result) => {
            console.log(`insert new file result: ${result}`)

            if (result == "ERROR") {
                fileName = generateUniqueFilename(fileName);
            } else {
                attempt = MaxAttempts + 1;
                InsertedSuccessfully = true;
            }
        })
    }

    // Release our connection
    if (conn){
        await conn.release();
    }

    if (InsertedSuccessfully){
        return fileName;
    }
    else{
        return "ERROR";
    }
}