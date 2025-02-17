import SQLite from "react-native-sqlite-storage";
import { AddTrack } from "react-native-track-player";
import RNFS, { ReadDirItem } from 'react-native-fs';

export interface MusicLibrary {
    getCountAll(): Promise<number>;
    getTracks(orderBy?: string, limit?: number): Promise<AddTrack[]>;
    getArtists(orderBy?: string, limit?: number): Promise<{
        //TODO make this an object
        name: string,
        numTracks: number,
        sumDurationMsec: number,
        numAlbums: number
    }>;
    getPlaylists(orderBy?: string, limit?: number): Promise<{
        //TODO make this an object
        name: string,
        creationDate: Date,
        lastEditDate: Date,
        numTracks: number,
        numArtists: number
    }>
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

async function getTracks(orderBy: string | undefined = undefined, limit: number | undefined = undefined): Promise<AddTrack[]> {
    let query = `
        SELECT 
            FilePath AS id,
            FilePath AS url,
            Title AS title,
            Artist.ArtistName AS trackArtist,
            group_concat(AlbumArtPath, "$") AS image,
	        group_concat(PrimaryColor, "$") AS primaryColors
        FROM Main
        JOIN ArtistTracks ON Main.TrackID = ArtistTracks.TrackID
        JOIN Artist ON Artist.ArtistID = ArtistTracks.ArtistID
        JOIN AlbumTracks ON AlbumTracks.TrackID = Main.TrackID
        JOIN Album ON Album.AlbumID = AlbumTracks.AlbumID
        JOIN AlbumArt ON AlbumArt.AlbumID = Album.AlbumID
        GROUP BY Main.FilePath, Main.Title, Artist.ArtistName
        ${orderBy != undefined ? `ORDER BY ${orderBy}` : ""}
        ${limit != undefined ? `LIMIT ${limit}` : ""}
        `;
    const result = await (await getDatabase()).executeSql(query);
    const tracks : AddTrack[] = [];
    for(let i = 0; i < result[0].rows.length; i++) {
        const trackData = result[0].rows.item(i);
        const allCoverImages = (trackData["image"] as string).split("$");
        const primaryColors = (trackData["primaryColors"] as string).split("$");
        const bestImage = allCoverImages.filter(img => img.includes("AlbumArtSmall")).length > 0 ? allCoverImages.filter(img => img.includes("AlbumArtSmall"))[0] : primaryColors[0];
        const addTrack : AddTrack = {
            id: trackData["id"],
            url: trackData["url"].replace("C:\\Users\\jeff1\\", RNFS.ExternalStorageDirectoryPath + "/").replaceAll("\\", "/"),
            title: trackData["title"],
            artist: trackData["trackArtist"],
            artwork: bestImage.replace("C:\\Users\\jeff1\\", RNFS.ExternalStorageDirectoryPath + "/").replaceAll("\\", "/")
        };
        tracks.push(addTrack);
    }
    return tracks;
}

async function getArtists(orderBy: string | undefined = undefined, limit: number | undefined = undefined): Promise<{name: string,
    numTracks: number,
    sumDurationMsec: number,
    numAlbums: number}> {
    let query = `
        SELECT
            ArtistName AS name,
            COUNT(ArtistTracks.TrackID) AS numTracks,
            SUM(Main.Duration) AS sumDurationMsec,
            COUNT(DISTINCT Album.AlbumID) AS numAlbums
        FROM Artist
        JOIN ArtistTracks ON Artist.ArtistID = ArtistTracks.ArtistID
        JOIN Main ON ArtistTracks.TrackID = Main.TrackID
        JOIN AlbumTracks ON AlbumTracks.TrackID = Main.TrackID
        JOIN Album ON AlbumTracks.AlbumID = Album.AlbumID
        GROUP BY ArtistName
        ${orderBy != undefined ? `ORDER BY ${orderBy}` : ""}
        ${limit != undefined ? `LIMIT ${limit}` : ""}
        `;
    return {
        name: "TODO",
        numTracks: 0,
        sumDurationMsec: 0,
        numAlbums: 0
    };
}

async function getPlaylists(orderBy: string | undefined = undefined, limit: number | undefined = undefined): Promise<{
    name: string,
        creationDate: Date,
        lastEditDate: Date,
        numTracks: number,
        numArtists: number
}> { //TODO Add filter to "moods"
    let query = `
        SELECT
            Playlist.PlaylistName AS name,
            Playlist.CreationDate AS creationDate,
            Playlist.LastEditDate AS lastEditDate,
            COUNT(PlaylistTracks.TrackID) AS countTracks,
            COUNT(DISTINCT Artist.ArtistID) AS countArtists
        FROM Playlist
        JOIN PlaylistTracks ON Playlist.PlaylistID = PlaylistTracks.PlaylistID
        JOIN ArtistTracks ON ArtistTracks.TrackID = PlaylistTracks.TrackID
        JOIN Artist ON Artist.ArtistID = ArtistTracks.ArtistID
        GROUP BY Playlist.PlaylistName, Playlist.CreationDate, Playlist.LastEditDate
        ${orderBy != undefined ? `ORDER BY ${orderBy}` : ""}
        ${limit != undefined ? `LIMIT ${limit}` : ""}
        `;
    return {
        name: "TODO",
        creationDate: new Date(),
        lastEditDate: new Date(),
        numTracks: 0,
        numArtists: 0
    };
}

//TODO Get tracks of playlist
//TODO Get tracks of artist
//TODO Get tracks of album
//TODO Get Images for Artist
//TODO Get Images for Playlist

export const SQLiteMusicLibrary: MusicLibrary = {
    getCountAll,
    getTracks,
    getArtists,
    getPlaylists
};