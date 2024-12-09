import * as v from "valibot";

export const RoomReadySchema = v.object({
    room: v.string(),
    players: v.array(
        v.object({
            name: v.string(),
            your: v.boolean(),
        }),
    ),
});

export const ShotResultSchema = v.object({
    x: v.pipe(v.number(), v.integer()),
    y: v.pipe(v.number(), v.integer()),
    hit: v.boolean(),
});

export const WinResultSchema = v.object({
    message: v.string(),
});
