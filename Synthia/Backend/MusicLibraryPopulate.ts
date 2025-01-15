import SQLite from "react-native-sqlite-storage";

async function PopulateDatabase(db: SQLite.SQLiteDatabase) {
	PopulateTracks(db);
}

async function PopulateTracks(db: SQLite.SQLiteDatabase) {
    
}

export {
    PopulateDatabase
}