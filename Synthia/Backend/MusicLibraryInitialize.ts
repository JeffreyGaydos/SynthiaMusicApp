/*
    sqlite_initialize.sql

    This script must be run at least once to create the necessary tables that this
    generator adds to. This file will be maintained to be backwards compatible and will
    update tables with any new constraints or columns as necessary
*/

import SQLite from "react-native-sqlite-storage";

var playlistSql = `
CREATE TABLE IF NOT EXISTS Playlist (
	PlaylistID INTEGER PRIMARY KEY,
	PlaylistName NVARCHAR(450),
	PlaylistDescription NVARCHAR(4000),
	CreationDate DATETIME,
	LastEditDate DATETIME,
	CONSTRAINT UC_PlaylistName UNIQUE (PlaylistName)
)`;

var playlistTracksSql = `
CREATE TABLE IF NOT EXISTS PlaylistTracks (
	PlaylistID INT NOT NULL,
	TrackID INT NULL,
	TrackOrder INT NULL, --NULL denotes system generated playlists
	LastKnownPath VARCHAR(260),
	SurrogateKey INTEGER PRIMARY KEY,
	CONSTRAINT UC_PlaylistID_TrackID UNIQUE (PlaylistID, TrackID),
	CONSTRAINT UC_PlaylistID_TrackOrder UNIQUE (PlaylistID, TrackOrder)
)`;

var artistSql = `
CREATE TABLE IF NOT EXISTS Artist (
	ArtistID INTEGER PRIMARY KEY,
	PrimaryPersonID INT,
	ArtistName NVARCHAR(100),
	CONSTRAINT UC_Artist UNIQUE (PrimaryPersonID, ArtistName)
)`;

var artistTracksSql = `
CREATE TABLE IF NOT EXISTS ArtistTracks (
	ArtistID INT,
	TrackID INT,
	PRIMARY KEY (ArtistID, TrackID)
)`;

var artistPersons = `
CREATE TABLE IF NOT EXISTS ArtistPersons (
		PersonID INTEGER PRIMARY KEY,
		ArtistID INT,
		PersonName NVARCHAR(200),
		CONSTRAINT UC_ArtistPerson UNIQUE (ArtistID, PersonName)
)`;

var trackPersons = `
CREATE TABLE IF NOT EXISTS TrackPersons (
	TrackID INT,
	PersonID INT,
	PRIMARY KEY (TrackID, PersonID)
)`;

var genreSql = `
CREATE TABLE IF NOT EXISTS Genre (
	GenreID INTEGER PRIMARY KEY,
	GenreName NVARCHAR(100),
	CONSTRAINT UC_GenreName UNIQUE (GenreName)
)`;

var genreTracks = `
CREATE TABLE IF NOT EXISTS GenreTracks (
	GenreID INT,
	TrackID INT,
	PRIMARY KEY (GenreID, TrackID)
)`;

var albumSql = `
CREATE TABLE IF NOT EXISTS Album (
	AlbumID INTEGER PRIMARY KEY,
	AlbumName NVARCHAR(446),
	TrackCount INT,
	ReleaseYear INT,
	CONSTRAINT UC_Album UNIQUE (AlbumName, TrackCount, ReleaseYear)
)`;

var albumTracksSql = `
CREATE TABLE IF NOT EXISTS AlbumTracks (
	AlbumID INT,
	TrackID INT,
	TrackOrder INT,
	PRIMARY KEY (AlbumID, TrackID)
)`;

var albumArtSql = `
CREATE TABLE IF NOT EXISTS AlbumArt (
	AlbumArtPath VARCHAR(260) PRIMARY KEY, --windows max path length
	PrimaryColor VARCHAR(7), --mode color in hex format (#000000)
	AlbumID INT
)`;

var playLogsSql = `
CREATE TABLE IF NOT EXISTS PlayLogs (
	TrackID INT PRIMARY KEY,
	DatePlayed DATETIME
)`;

var trackSql = `
CREATE TABLE IF NOT EXISTS Track (
	TrackID INTEGER PRIMARY KEY,
	Title NVARCHAR(435), --The max key length is 900, this takes the rest of the bits
	Duration DECIMAL,
	FilePath VARCHAR(260), --windows max path length = 260 characters
	Volume INT, --A user defined value to help when manually matching volume across multiple files
	[Owner] NVARCHAR(1000), --defaults to the computer username, but can be used for however
	ReleaseYear INT,
	Lyrics NVARCHAR(4000),
	Comment NVARCHAR(4000),
	BeatsPerMin INT,
	Copyright NVARCHAR(1000),
	Publisher NVARCHAR(1000),
	ISRC VARCHAR(12), --ISRC codes are explicitly 12 characters long
	Bitrate INT,
	Channels INT,
	SampleRate INT,
	BitsPerSample INT,
	LinkedTrackPlaylistID INT, --Linked Tracks are any tracks that are best when played back-to-back. This mini-playlist defines the order
	Rating INT, --User defined only; Not generated because ratings "on" mp3 files are specific to the Windows OS (might consider adding support)
	AddDate DATETIME, --will attempt to persist this value during update operations
	LastModifiedDate DATETIME,
	GeneratedDate DATETIME, --used to determine if updates are needed
	CONSTRAINT UC_Main UNIQUE (
		Title,
		ISRC,
		Duration
	)
)`;

var settingsSql = `
CREATE TABLE IF NOT EXISTS Settings (
	SettingsID INTEGER PRIMARY KEY,
	SettingName VARCHAR(1000),
	SettingValue VARCHAR(1000)
)`;

async function InitializeSchema(db: SQLite.SQLiteDatabase) {
	await db.executeSql(albumArtSql);
	await db.executeSql(albumSql);
	await db.executeSql(albumTracksSql);
	await db.executeSql(artistPersons);
	await db.executeSql(artistSql);
	await db.executeSql(artistTracksSql);
	await db.executeSql(genreSql);
	await db.executeSql(genreTracks);
	await db.executeSql(playLogsSql);
	await db.executeSql(playlistSql);
	await db.executeSql(playlistTracksSql);
	await db.executeSql(trackPersons);
	await db.executeSql(trackSql);
	await db.executeSql(settingsSql);
}

export {
	InitializeSchema
}