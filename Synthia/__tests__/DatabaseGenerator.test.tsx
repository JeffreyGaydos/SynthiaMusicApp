/**
 * @format
 */

import 'react-native';

import { TEST_TrackSynchronizer } from '../Backend/Synchronizers/TrackSynchronizer';
import { DatabaseLogger, LogLevel } from '../Settings/ScreenSettings';
import { TrackData } from '../Backend/Schema';

// describe("getExtension regex method", () => {
//     test('given valid path with 3 char extension, returns extension', () => {
//         expect(1 == 1).toBe(true)
//     })
// });

describe("getExtension regex method", () => {
    test('given valid path with 3 char extension, returns extension', () => {
        expect(TEST_TrackSynchronizer.getExtension("storage/emulated/01/Music/Nothing but Theives/Sorry.mp3")).toBe("mp3")
    });
    test('given valid path with 4 char extension, returns extension', () => {
        expect(TEST_TrackSynchronizer.getExtension("storage/emulated/01/Music/Nothing but Theives/Sorry.jpeg")).toBe("jpeg")
    });
    test('given valid path with 2 char extension, returns extension', () => {
        expect(TEST_TrackSynchronizer.getExtension("storage/emulated/01/Music/Nothing but Theives/Sorry.js")).toBe("js")
    });
    test('given path with multiple extension-looking strings, returns last extension', () => {
        expect(TEST_TrackSynchronizer.getExtension("storage/emulated/01/Music.mp4/Nothing but Theives/Sorry.mp3")).toBe("mp3")
    });
});

describe("favored priority list logic", () => {
    test('given existing wav, incoming mp3, favor mp3', () => {
        expect(
            TEST_TrackSynchronizer.getFavoredFile(
                "mp3",
                "/path/incoming title.mp3",
                "wav",
                "/path/existing title.wav"
            )
        )
        .toStrictEqual({
            path: "/path/incoming title.mp3",
            favor: 1
        })
    });
    test('given existing unranked, incoming ranked, favor incoming', () => {
        expect(
            TEST_TrackSynchronizer.getFavoredFile(
                "mp3",
                "/path/incoming title.mp3",
                "jpeg",
                "/path/existing title.jpeg"
            )
        )
        .toStrictEqual({
            path: "/path/incoming title.mp3",
            favor: 1
        })
    });
    test('given existing unranked, incoming unranked, keep existing', () => {
        expect(
            TEST_TrackSynchronizer.getFavoredFile(
                "jpeg",
                "/path/incoming title.jpeg",
                "js",
                "/path/existing title.js"
            )
        )
        .toStrictEqual({
            path: "/path/existing title.js",
            favor: -1
        })
    });
    test('given existing flac, incoming flac, favor existing', () => {
        expect(
            TEST_TrackSynchronizer.getFavoredFile(
                "flac",
                "/path/incoming title.flac",
                "flac",
                "/path/existing title.flac"
            )
        )
        .toStrictEqual({
            path: "/path/existing title.flac",
            favor: 0
        })
    });
    test('given existing flac, incoming mp3, favor existing', () => {
        expect(
            TEST_TrackSynchronizer.getFavoredFile(
                "mp3",
                "/path/incoming title.mp3",
                "flac",
                "/path/existing title.flac"
            )
        )
        .toStrictEqual({
            path: "/path/existing title.flac",
            favor: 0
        })
    });
});

const defaultDuplicateTrackData = {
    trackID: null,
    title: "Duplicate Track",
    duration: 1,
    filePath: "/path/duplicate track.mp2",
    generatedDate: null,
    lastModifiedDate: null,
    linkedTrackPlaylistID: null,
    rating: null,
    volume: 0
};

describe("decide database action should figure out duplication and warn the user as needed", () => {
    test("Incoming data has same path, should be normal update", () => {
        //setup; not part of test
        var mock_logs: {message: string, level: LogLevel}[] = [];
        function mock_pushLog(message: string, level: LogLevel) {
            mock_logs.push({message, level});
        }
        const mockDatabaseLogger: DatabaseLogger = { pushLog: mock_pushLog };

        const action = TEST_TrackSynchronizer.determineDatabaseAction(
            defaultDuplicateTrackData,
            [defaultDuplicateTrackData],
            mockDatabaseLogger,
            []
        );
        expect(action).toBe("UPDATE");
        expect(mock_logs.length).toBe(0);
    });
    
    test("Incoming data has different path, not seen this run, should be normal update, warn user", () => {
        //setup; not part of test
        var mock_logs: {message: string, level: LogLevel}[] = [];
        function mock_pushLog(message: string, level: LogLevel) {
            mock_logs.push({message, level});
        }
        const mockDatabaseLogger: DatabaseLogger = { pushLog: mock_pushLog };

        const differentPath = { ...defaultDuplicateTrackData };
        differentPath.filePath = "/different/path.mp3"
        const action = TEST_TrackSynchronizer.determineDatabaseAction(
            differentPath,
            [defaultDuplicateTrackData],
            mockDatabaseLogger,
            []
        );
        expect(mock_logs).toContainEqual(
            {
                message: `Incoming track data was favored over '${defaultDuplicateTrackData.filePath}'. Consider deleting it.`,
                level: "Warning"
            }
        );
        expect(action).toBe("UPDATE");
    });

    test("Incoming data has different path, already seen this run, should be normal update, warn user", () => {
        //setup; not part of test
        var mock_logs: {message: string, level: LogLevel}[] = [];
        function mock_pushLog(message: string, level: LogLevel) {
            mock_logs.push({message, level});
        }
        const mockDatabaseLogger: DatabaseLogger = { pushLog: mock_pushLog };

        const differentPath = { ...defaultDuplicateTrackData };
        differentPath.filePath = "/different/path.mp3"
        const action = TEST_TrackSynchronizer.determineDatabaseAction(
            differentPath,
            [defaultDuplicateTrackData],
            mockDatabaseLogger,
            [{
                title: defaultDuplicateTrackData.title,
                duration: defaultDuplicateTrackData.duration
            }]
        );
        expect(mock_logs).toContainEqual(
            {
                message: `Incoming track data was favored over '${defaultDuplicateTrackData.filePath}'. Consider deleting it.`,
                level: "Warning"
            }
        );
        expect(action).toBe("UPDATE");
    });

    test("Incoming data has different path same extension, already seen this run, should be true duplicate, error user", () => {
        //setup; not part of test
        var mock_logs: {message: string, level: LogLevel}[] = [];
        function mock_pushLog(message: string, level: LogLevel) {
            mock_logs.push({message, level});
        }
        const mockDatabaseLogger: DatabaseLogger = { pushLog: mock_pushLog };
        
        const differentPath = { ...defaultDuplicateTrackData };
        differentPath.filePath = "/different/path.mp2"
        const action = TEST_TrackSynchronizer.determineDatabaseAction(
            differentPath,
            [defaultDuplicateTrackData],
            mockDatabaseLogger,
            [{
                title: defaultDuplicateTrackData.title,
                duration: defaultDuplicateTrackData.duration
            }]
        );
        expect(mock_logs).toContainEqual(
            {
                message: `True duplicate of track '${differentPath.title}' found at '${differentPath.filePath}'. This file will be skipped. Remove the duplicate file to speed up processing`,
                level: "Error"
            }
        );
        expect(action).toBe("SKIP");
    });

    test("Incoming data has different path and different unfavorable extension, should favor existing, warn user", () => {
        //setup; not part of test
        var mock_logs: {message: string, level: LogLevel}[] = [];
        function mock_pushLog(message: string, level: LogLevel) {
            mock_logs.push({message, level});
        }
        const mockDatabaseLogger: DatabaseLogger = { pushLog: mock_pushLog };
        
        const differentPath = { ...defaultDuplicateTrackData };
        differentPath.filePath = "/different/path.mp1"
        const action = TEST_TrackSynchronizer.determineDatabaseAction(
            differentPath,
            [defaultDuplicateTrackData],
            mockDatabaseLogger,
            []
        );
        expect(mock_logs).toContainEqual(
            {
                message: `Existing track data was favored over '${differentPath.filePath}'. This file was skipped, consider deleting it`,
                level: "Warning"
            }
        );
        expect(action).toBe("SKIP");
    });

    test("Incoming data has different path and same extension, not seen this run, should update as 'move', warn user", () => {
        //setup; not part of test
        var mock_logs: {message: string, level: LogLevel}[] = [];
        function mock_pushLog(message: string, level: LogLevel) {
            mock_logs.push({message, level});
        }
        const mockDatabaseLogger: DatabaseLogger = { pushLog: mock_pushLog };
        
        const differentPath = { ...defaultDuplicateTrackData };
        differentPath.filePath = "/different/path.mp2"
        const action = TEST_TrackSynchronizer.determineDatabaseAction(
            differentPath,
            [defaultDuplicateTrackData],
            mockDatabaseLogger,
            []
        );
        expect(mock_logs).toContainEqual(
            {
                message: `Track '${differentPath.title}' was moved from '${defaultDuplicateTrackData.filePath}' to '${differentPath.filePath}'`,
                level: "Warning"
            }
        );
        expect(action).toBe("UPDATE");
    });

    test("Found multiple duplicates, should skip, error user", () => {
        //setup; not part of test
        var mock_logs: {message: string, level: LogLevel}[] = [];
        function mock_pushLog(message: string, level: LogLevel) {
            mock_logs.push({message, level});
        }
        const mockDatabaseLogger: DatabaseLogger = { pushLog: mock_pushLog };
        
        const differentPath = { ...defaultDuplicateTrackData };
        differentPath.filePath = "/different/path.mp2"
        const action = TEST_TrackSynchronizer.determineDatabaseAction(
            differentPath,
            [defaultDuplicateTrackData, differentPath],
            mockDatabaseLogger,
            []
        );
        expect(mock_logs).toContainEqual(
            {
                message: "Found duplicates within database. Database is corrupt, reset database.",
                level: "Error"
            }
        );
        expect(action).toBe("SKIP");
    });

    test("Typical insert, no logs", () => {
        //setup; not part of test
        var mock_logs: {message: string, level: LogLevel}[] = [];
        function mock_pushLog(message: string, level: LogLevel) {
            mock_logs.push({message, level});
        }
        const mockDatabaseLogger: DatabaseLogger = { pushLog: mock_pushLog };
        
        const action = TEST_TrackSynchronizer.determineDatabaseAction(
            defaultDuplicateTrackData,
            [],
            mockDatabaseLogger,
            []
        );
        expect(mock_logs.length).toBe(0);
        expect(action).toBe("INSERT");
    });

    test("Incoming data has different path same extension, already seen this run twice, should be true duplicate, error user", () => {
        //setup; not part of test
        var mock_logs: {message: string, level: LogLevel}[] = [];
        function mock_pushLog(message: string, level: LogLevel) {
            mock_logs.push({message, level});
        }
        const mockDatabaseLogger: DatabaseLogger = { pushLog: mock_pushLog };
        
        const differentPath = { ...defaultDuplicateTrackData };
        differentPath.filePath = "/different/path.mp2"
        const action = TEST_TrackSynchronizer.determineDatabaseAction(
            differentPath,
            [defaultDuplicateTrackData],
            mockDatabaseLogger,
            [{
                title: defaultDuplicateTrackData.title,
                duration: defaultDuplicateTrackData.duration
            },
            {
                title: defaultDuplicateTrackData.title,
                duration: defaultDuplicateTrackData.duration
            }]
        );
        expect(mock_logs).toContainEqual(
            {
                message: `True duplicate of track '${differentPath.title}' found at '${differentPath.filePath}'. This file will be skipped. Remove the duplicate file to speed up processing`,
                level: "Error"
            }
        );
        expect(action).toBe("SKIP");
    });
});