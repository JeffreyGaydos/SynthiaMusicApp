import SQLite from "react-native-sqlite-storage";

var trackSql = "DROP TABLE IF EXISTS Track";
var playlistSql = "DROP TABLE IF EXISTS Playlist";
var playlistTracksSql = "DROP TABLE IF EXISTS PlaylistTracks"        
var artistSql = "DROP TABLE IF EXISTS Artist";
var artistTracksSql = "DROP TABLE IF EXISTS ArtistTracks";
var artistPersonsSql = "DROP TABLE IF EXISTS ArtistPersons";
var trackPersonsSql = "DROP TABLE IF EXISTS TrackPersons";
var genreSql = "DROP TABLE IF EXISTS Genre";
var genreTracksSql = "DROP TABLE IF EXISTS GenreTracks";
var albumSql = "DROP TABLE IF EXISTS Album";
var albumTracksSql = "DROP TABLE IF EXISTS AlbumTracks";
var albumArtSql = "DROP TABLE IF EXISTS AlbumArt";
var playLogsSql = "DROP TABLE IF EXISTS PlayLogs";
var settingsSql = "DROP TABLE IF EXISTS Settings";

async function DropSchema(db: SQLite.SQLiteDatabase) {
    await db.executeSql(albumArtSql);
    await db.executeSql(albumSql);
    await db.executeSql(albumTracksSql);
    await db.executeSql(artistPersonsSql);
    await db.executeSql(artistSql);
    await db.executeSql(artistTracksSql);
    await db.executeSql(genreSql);
    await db.executeSql(genreTracksSql);
    await db.executeSql(playLogsSql);
    await db.executeSql(playlistSql);
    await db.executeSql(playlistTracksSql);
    await db.executeSql(trackPersonsSql);
    await db.executeSql(trackSql);
    await db.executeSql(settingsSql);
}

export {
    DropSchema
}