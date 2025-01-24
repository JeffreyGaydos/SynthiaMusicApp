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