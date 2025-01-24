import { DatabaseLogger } from "../../Settings/ScreenSettings";
import { DatabaseAction, TrackData, TrackNaturalKey } from "../Schema";
import { useMusicLibrary } from "../MusicLibraryProvider";
import SQLite from "react-native-sqlite-storage";

const RGX_extension = new RegExp(/(?<=\.)[a-zA-Z0-9]+$/);

export interface TEST_TrackSynchronizer {
    getExtension(path: string): string,
    getFavoredFile(incomingExtension: string, incomingFile: string, existingExtension: string, existingFile: string): {path: string, favor: number}
    determineDatabaseAction(incoming: TrackData, duplicateTracks: TrackData[], logger: DatabaseLogger, seenThisRun: TrackNaturalKey[]): DatabaseAction,
}

export interface TrackSynchronizer {
    synchronize(data: TrackData, logger: DatabaseLogger): void
};

const FileTypeFavorList = [
    "FLAC",
    "MP3",
    "WAV",
    "WMA"
]

const seenThisRun: TrackNaturalKey[] = [];

// Scenarios:
// - Duplicates
//   - Duplicate found as different file extension - Use the favor list to determine which one stays
//   - Duplicate found with same file extension in different location - If selected as favorite, update
//   - Duplicate found with same file extension in multiple locations - If selected as favorite, skip
// Plan: Insert + Update & same extension = duplicate; Update + Update & same extension = duplicate

function getExtension(path: string): string {
    return RGX_extension.exec(path)![0];
}

function getFavoredFile(incomingExtension: string, incomingFile: string, existingExtension: string, existingFile: string): {path: string, favor: number} {
    const incoming: {path: string, favor: number} = {
        path: incomingFile,
        favor: FileTypeFavorList.indexOf(incomingExtension.toUpperCase())
    };
    const existing: {path: string, favor: number} = {
        path: existingFile,
        favor: FileTypeFavorList.indexOf(existingExtension.toUpperCase())
    };

    if(incoming.favor === -1) {
        return existing;
    }
    if(existing.favor === -1) {
        return incoming;
    }
    //now neither are -1, meaning they are one of the prioritized extensions
    if(incoming.favor === existing.favor) {
        return existing;
    }
    if(incoming.favor < existing.favor) {
        return incoming;
    }
    return existing; //if here, existing ranked more favorably and incoming was ranked less favorably
}

function determineDatabaseAction(incoming: TrackData, duplicateTracks: TrackData[], logger: DatabaseLogger, seenThisRun: TrackNaturalKey[]): DatabaseAction {
    if(duplicateTracks.length == 1) {
        if(duplicateTracks[0].filePath == incoming.filePath) {
            return "UPDATE";
        } else {
            const incomingExtension = getExtension(incoming.filePath);
            const existingExtension = getExtension(duplicateTracks[0].filePath);
            const existingFile = duplicateTracks[0].filePath;
            const favoredFile = getFavoredFile(incomingExtension, incoming.filePath, existingExtension, existingFile);

            logger.pushLog(`${favoredFile.path}: ${favoredFile.favor}`, "Information");

            if(incomingExtension === existingExtension) {
                if(seenThisRun.filter(k => k.title === incoming.title && k.duration === incoming.duration).length > 0) {
                    logger.pushLog(`True duplicate of track '${incoming.title}' found at '${incoming.filePath}'. This file will be skipped. Remove the duplicate file to speed up processing`, "Error");
                    return "SKIP";
                } else {
                    logger.pushLog(`Track '${incoming.title}' was moved from '${existingFile}' to '${incoming.filePath}'`, "Warning");
                    return "UPDATE"
                }
            }

            if(favoredFile.path === existingFile) {
                logger.pushLog(`Existing track data was favored over '${incoming.filePath}'. This file was skipped, consider deleting it`, "Warning");
                return "SKIP";
            } else { //favoredFile.path === incoming.filePath implied true
                logger.pushLog(`Incoming track data was favored over '${existingFile}'. Consider deleting it.`, "Warning");
                return "UPDATE"
            }            
        }
    } else if(duplicateTracks.length > 1) {
        logger.pushLog("Found duplicates within database. Database is corrupt, reset database.", "Error");
        return "SKIP";
    } else {
        return "INSERT";
    }
}

async function setupDatabaseConnection(): Promise<SQLite.SQLiteDatabase> {
    const db = useMusicLibrary();
    return await db.getDatabase();
}

async function synchronize(data: TrackData, logger: DatabaseLogger): Promise<DatabaseAction> {
    seenThisRun.push({
        title: data.title,
        duration: data.duration
    });
    const instance = await setupDatabaseConnection();
    const duplicationTracks = await getDuplicateTracks(data, instance);
    
    const action = determineDatabaseAction(data, duplicationTracks, logger, seenThisRun);
    switch(action) {
        case "INSERT":
            insert(data, instance);
            break;
        case "UPDATE":
            update(data, instance);
            break;
        //No code necessary for "SKIP" action; "DELETE" action not allowed here
    }
    return action;
}

async function getDuplicateTracks(data: TrackData, db: SQLite.SQLiteDatabase): Promise<TrackData[]> {
    let query = `
        SELECT
            TrackID,
            Title,
            Duration,
            FilePath,
            Volume,
            LinkedTrackPlaylistID,
            Rating,
            LastModifiedDate,
            GeneratedDate
        FROM Track
        WHERE
            Title = '${data.title}'
            AND Duration = ${data.duration}
    `;
    const results = await db.executeSql(query);
    const tracks : TrackData[] = [];
    for(let i = 0; i < results[0].rows.length; i++) {
        const rawTrackData = results[0].rows.item(i);
        tracks.push({
            trackID: rawTrackData["TrackID"],
            title: rawTrackData["Title"],
            duration: rawTrackData["Duration"],
            filePath: rawTrackData["FilePath"],
            volume: rawTrackData["Volume"],
            linkedTrackPlaylistID: rawTrackData["LinkedTrackPlaylistID"],
            rating: rawTrackData["Rating"],
            lastModifiedDate: rawTrackData["LastModifiedDate"],
            generatedDate: rawTrackData["GeneratedDate"],
        });
    }
    return tracks
}

async function insert(data: TrackData, db: SQLite.SQLiteDatabase): Promise<DatabaseAction> {
    await db.executeSql(`
        INSERT INTO Track
        VALUES
        (NULL, '${data.title}', ${data.duration}, '${data.filePath}', ${data.volume}, ${data.linkedTrackPlaylistID}, ${data.rating}, '${data.lastModifiedDate}', '${data.generatedDate}')
    `);
    return "INSERT";
}

async function update(data: TrackData, db: SQLite.SQLiteDatabase): Promise<DatabaseAction> {
    await db.executeSql(`
        UPDATE Track
        SET
            Title = '${data.title}',
            Duration = ${data.duration},
            FilePath = '${data.filePath}',
            Volume = ${data.volume},
            LinkedTrackPlaylistID = ${data.linkedTrackPlaylistID},
            Rating = ${data.rating},
            LastModifiedDate = '${data.lastModifiedDate}',
            GeneratedDate = '${data.generatedDate}'
        WHERE Title = '${data.title}' AND Duration = ${data.duration}
    `);
    return "UPDATE";
}

export const TrackSynchronizer: TrackSynchronizer = {
    synchronize
};

export const TEST_TrackSynchronizer: TEST_TrackSynchronizer = {
    getExtension,
    getFavoredFile,
    determineDatabaseAction
};