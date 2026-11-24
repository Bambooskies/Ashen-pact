# Ashen Pact

A KubeJS server-side resurrection ritual with a small interactive project showcase.

Right-click a Wither Skeleton Skull with a `kubejs:soul_ember` to revive a nearby spectator. The returning player rises with 5 hearts and temporary weakness and slowness. The ember is consumed, and both players permanently lose one heart of maximum health for every use.

## KubeJS installation

1. Use Minecraft 1.20.1 with KubeJS 6 installed on the server.
2. Make sure your modpack or another KubeJS script registers the `kubejs:soul_ember` item. This project does not define the item or its recipe.
3. Copy [`kubejs/server_scripts/revive.js`](./kubejs/server_scripts/revive.js) into your instance's `kubejs/server_scripts/` directory.
4. Restart the server or reload server scripts.

The script selects the first spectator in the server's player list who is within 20 blocks of the skull. If none are nearby, it leaves the ember untouched and tells the player. A successful ritual revives the target in survival, applies the effects for 60 seconds, consumes one ember, and plays the ritual effects.

### Permanent health loss

Each player's cut count is stored in their persistent player data as `health_cuts`. The script sets the max-health base to `20 - (2 × cuts)` and clamps current health to that new maximum. There is intentionally no script-defined cap. At ten cuts the formula reaches 0 HP; Minecraft's attribute bounds and the resulting death behavior can depend on the exact game/mod version.

## Project showcase

The React/Vite site includes a responsive overview, a ritual simulator, and the live KubeJS source. The simulator is illustrative only and does not connect to a Minecraft server.

```sh
npm install
npm run dev
```

Build and lint the showcase with:

```sh
npm run build
npm run lint
```
