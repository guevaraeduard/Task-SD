import * as v from "valibot";

export const RoomReadySchema = v.object({
    room: v.string(),
});

export const ShotResultSchema = v.object({
    x: v.pipe(v.number(), v.integer()),
    y: v.pipe(v.number(), v.integer()),
    hit: v.boolean(),
});

export const OpponentDisconnectionSchema = v.object({
    message: v.string(),
});
