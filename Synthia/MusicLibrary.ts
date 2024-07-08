import SQLite from "react-native-sqlite-storage";
import { AddTrack } from "react-native-track-player";
import RNFS, { ReadDirItem } from 'react-native-fs';

export interface MusicLibrary {
    getCountAll(): Promise<number>;
    getTracks(limit?: number): Promise<AddTrack[]>
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;

async function open() : Promise<SQLite.SQLiteDatabase> {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    if(!databaseInstance) {
        databaseInstance = await SQLite.openDatabase({
            name: "musiclibrary.db",
            createFromLocation: "~/musiclibrary.db" //requires a pre-populated database file at /android/app/src/main/assets. Rebuild/Reinstall app if this needs to change
        });
        console.log("Database open!");
    }

    return databaseInstance;
}

//not sure if I'll ever need this, but it's here
async function close() {
    if(databaseInstance) {
        databaseInstance.close();
    }
}

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
    if(!databaseInstance) {
        return open();
    }
    return databaseInstance;
}

async function getCountAll(): Promise<number> {
    const db = await getDatabase();
    return (await db.executeSql("SELECT COUNT(*) FROM Main"))[0].rows.item(0)["COUNT(*)"];
}

async function getTracks(limit: number | undefined = undefined): Promise<AddTrack[]> {
    let query = `
        SELECT 
            FilePath AS id,
            FilePath AS url,
            Title AS title,
            Artist.ArtistName AS trackArtist,
            group_concat(AlbumArtPath, "$") AS image
        FROM Main
        JOIN ArtistTracks ON Main.TrackID = ArtistTracks.TrackID
        JOIN Artist ON Artist.ArtistID = ArtistTracks.ArtistID
        JOIN AlbumTracks ON AlbumTracks.TrackID = Main.TrackID
        JOIN Album ON Album.AlbumID = AlbumTracks.AlbumID
        JOIN AlbumArt ON AlbumArt.AlbumID = Album.AlbumID
        GROUP BY Main.FilePath, Main.Title, Artist.ArtistName
        `;
    if(limit) {
        query += `LIMIT ${limit}`;
    }
    const result = await (await getDatabase()).executeSql(query);
    const tracks : AddTrack[] = [];
    // const dirItmes : ReadDirItem[] = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + "/Music/" + "GUNSHIP" + "/" + "GUNSHIP/GUNSHIP - GUNSHIP - 01 The Mountain.flac");
    // console.log(RNFS.ExternalStorageDirectoryPath + "/Music/" + "GUNSHIP" + "/" + "GUNSHIP/");
    const exists = await RNFS.exists(RNFS.ExternalStorageDirectoryPath + "/Music/GUNSHIP/UNICORN/cover.jpg");
    console.log("This vv");
    console.log(exists);
    for(let i = 0; i < result[0].rows.length; i++) {
        const trackData = result[0].rows.item(i);
        const addTrack : AddTrack = {
            id: trackData["id"],
            url: trackData["url"].replace("C:\\Users\\jeff1\\", RNFS.ExternalStorageDirectoryPath + "/").replaceAll("\\", "/"),
            title: trackData["title"],
            artist: trackData["trackArtist"],
            artwork: RNFS.ExternalStorageDirectoryPath + "/Music/GUNSHIP/UNICORN/cover.jpg"//(trackData["image"] as string).split("$")[0].replaceAll("\\", "/")
        };
        tracks.push(addTrack);
    }
    return tracks;
}

export const SQLiteMusicLibrary: MusicLibrary = {
    getCountAll,
    getTracks
};