export type DatabaseAction = "INSERT" | "UPDATE" | "DELETE" | "SKIP"

export interface TrackData {
    trackID: number | null,
    title: string,
    duration: number,
    filePath: string,
    volume: number,
    linkedTrackPlaylistID: number | null,
    rating: number | null,
    lastModifiedDate: Date | null,
    generatedDate: Date | null
};

export interface TrackNaturalKey {
    title: string,
    duration: number
}

/**
 * Required when string data possibly contains single quotes and you are using
 * single quotes to define a variable within the SQL.
 * @param data Data that you are interpolating into a SQL query string
 * @returns the escaped string
 */
export function EscapeForSingleQuotes(data: string): string {
    return data.replaceAll("'", "''");
}