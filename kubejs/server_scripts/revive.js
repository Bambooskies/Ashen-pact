/* global BlockEvents */
// Revive a nearby spectator by right-clicking a Wither Skeleton Skull with kubejs:soul_ember.
// Both players permanently lose 1 heart (2 HP) of max health each time.

BlockEvents.rightClicked(event => {
  const { player, item, block, server } = event

  if (!block || block.id !== 'minecraft:wither_skeleton_skull') return
  if (!item || item.id !== 'kubejs:soul_ember') return

  const pos = block.pos
  if (!pos) return

  const x = pos.x + 0.5
  const y = pos.y + 1
  const z = pos.z + 0.5
  const spectators = server.players.filter(p => {
    if (!p.isSpectator()) return false
    const dx = p.x - pos.x
    const dy = p.y - pos.y
    const dz = p.z - pos.z
    return dx * dx + dy * dy + dz * dz <= 20 * 20
  })

  if (spectators.length === 0) {
    player.tell('§7No nearby souls respond to the ember...')
    return
  }

  const target = spectators[0]

  target.setGameMode('survival')
  target.setHealth(10)
  target.potionEffects.add('minecraft:weakness', 60 * 20, 1)
  target.potionEffects.add('minecraft:slowness', 60 * 20, 1)
  item.count--

  server.runCommand(`particle minecraft:totem_of_undying ${x} ${y} ${z} 0.3 0.3 0.3 0.1 100`)
  server.runCommand(`playsound minecraft:item.totem.use master @a ${x} ${y} ${z} 1 1`)
  server.runCommand(`summon lightning_bolt ${x} ${y} ${z}`)

  player.tell('§6The ember flares. Something lost stirs once more.')
  target.tell('§cYou rise through ash and smoke — less than before.')

  const applyHealthCut = p => {
    const cuts = (p.persistentData.health_cuts ?? 0) + 1
    p.persistentData.health_cuts = cuts

    const newBase = 20 - cuts * 2
    const safeHealth = Math.max(newBase, 0)

    server.runCommand(
      `execute as ${p.username} run attribute @s minecraft:generic.max_health base set ${newBase}`,
    )
    p.setHealth(Math.min(p.health, safeHealth))

    p.tell(`§8Your essence fades (§c-${cuts} heart${cuts === 1 ? '' : 's'} total§8).`)
  }

  applyHealthCut(target)
  applyHealthCut(player)
})
