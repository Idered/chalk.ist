import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { RoomProvider } from "./liveblocks.config";

function AppRoot() {
  return (
    <RoomProvider
      id="my-room"
      // 😎 Replace with your own data!
      initialPresence={{ cursor: { x: 0, y: 0 } }}
      // 😎 Replace with your own data!
      initialStorage={() => ({
        animals: new LiveList(["🦁", "🦊", "🐵"]),

        mathematician: new LiveObject({
          firstName: "Ada",
          lastName: "Lovelace",
        }),

        fruitsByName: new LiveMap([
          ["apple", "🍎"],
          ["banana", "🍌"],
          ["cherry", "🍒"],
        ]),
      })}
    >
      {/* children */}
    </RoomProvider>
  );
}
