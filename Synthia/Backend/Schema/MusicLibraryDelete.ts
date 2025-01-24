import SQLite from "react-native-sqlite-storage";

var trackSql = "DELETE FROM Track";
var playlistSql = "DELETE FROM Playlist";
var playlistTracksSql = "DELETE FROM PlaylistTracks"        
var artistSql = "DELETE FROM Artist";
var artistTracksSql = "DELETE FROM ArtistTracks";
var artistPersonsSql = "DELETE FROM ArtistPersons";
var trackPersonsSql = "DELETE FROM TrackPersons";
var genreSql = "DELETE FROM Genre";
var genreTracksSql = "DELETE FROM GenreTracks";
var albumSql = "DELETE FROM Album";
var albumTracksSql = "DELETE FROM AlbumTracks";
var albumArtSql = "DELETE FROM AlbumArt";
var playLogsSql = "DELETE FROM PlayLogs";
var settingsSql = "DELETE FROM Settings";

async function DeleteData(db: SQLite.SQLiteDatabase) {
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
    DeleteData
}