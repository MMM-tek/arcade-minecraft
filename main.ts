namespace SpriteKind {
    export const Title = SpriteKind.create()
    export const Mouse = SpriteKind.create()
}
function minerals () {
    for (let valor of tiles.getTilesByType(assets.tile`dark_rock`)) {
        if (Math.percentChance(8)) {
            tiles.setTileAt(valor, assets.tile`miMosaico0`)
        }
    }
    for (let valor of tiles.getTilesByType(assets.tile`dark_rock`)) {
        if (Math.percentChance(7)) {
            tiles.setTileAt(valor, assets.tile`miMosaico2`)
        }
    }
    for (let valor of tiles.getTilesByType(assets.tile`dark_rock`)) {
        if (Math.percentChance(4)) {
            tiles.setTileAt(valor, assets.tile`diamond`)
        }
    }
}
function Place () {
    if (1 <= Slots[Slot]) {
        Slots[Slot] = Slots[Slot] - 1
        if (Block == assets.tile`Wood`) {
            tiles.setTileAt(Select.tilemapLocation(), Block)
            tiles.setWallAt(Select.tilemapLocation(), false)
        } else {
            tiles.setTileAt(Select.tilemapLocation(), Block)
            tiles.setWallAt(Select.tilemapLocation(), true)
        }
    }
}
function craft (crft: string) {
    if (crft == "Planks") {
        craft2 = assets.tile`Wood`
        out = assets.tile`Planks`
        craftn = 1
        outn = 4
    }
    if (0 < Slots[Blocks.indexOf(craft2)]) {
        Slots[Blocks.indexOf(craft2)] = Slots[Blocks.indexOf(craft2)] - craftn
        Slots[Blocks.indexOf(out)] = Slots[Blocks.indexOf(out)] + outn
    }
}
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    if (!(tiles.tileAtLocationEquals(Select.tilemapLocation(), assets.tile`transparency16`))) {
        myImage = tiles.tileImageAtLocation(Select.tilemapLocation())
        Give(myImage)
    } else {
        Place()
    }
})
platformer.onRuleBecomesTrue(platformer.rule(platformer.PlatformerSpriteState.FacingRight), platformer.EventHandlerCondition.BecomesTrue, function (sprite) {
    Steve.setImage(assets.image`steve_right0`)
})
browserEvents.R.onEvent(browserEvents.KeyEvent.Pressed, function () {
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("CRAFT", img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, true)
    )
    addCrafts()
    myMenu.setFlag(SpriteFlag.RelativeToCamera, true)
    miniMenu.setDimensions(myMenu, 160, 120)
    myMenu.setPosition(80, 60)
    miniMenu.onButtonPressed(myMenu, miniMenu.Button.A, function (selection, selectedIndex) {
        craft(selection)
        miniMenu.close(myMenu)
    })
})
platformer.onRuleBecomesTrue(platformer.rule(platformer.PlatformerSpriteState.FacingLeft), platformer.EventHandlerCondition.BecomesTrue, function (sprite) {
    Steve.setImage(assets.image`steve_left2`)
})
// Evento de la extensión browser-events
browserEvents.onMouseMove(function (x, y) {
    // IMPORTANTE: 'x' e 'y' son relativos a la pantalla (0-160)
    // Para obtener la posición en el mapa real, sumamos el desplazamiento de la cámara
    worldX = x + scene.cameraLeft()
    worldY = y + scene.cameraTop()
    // Dividimos por 16 (tamaño de cada tile) y redondeamos hacia abajo
    col = Math.floor(worldX / 16)
    fila = Math.floor(worldY / 16)
    tiles.placeOnTile(Select, tiles.getTileLocation(col, fila))
})
function addCrafts () {
    miniMenu.insertMenuItem(myMenu, miniMenu.createMenuItem("Planks"), 0)
}
function Give (Image2: Image) {
    if (!(Image2 == sprites.castle.tilePath2)) {
        Slots[Blocks.indexOf(Image2)] = Slots[Slot] + 1
    } else {
        Slots[Blocks.indexOf(sprites.castle.tilePath5)] = Slots[Slot] + 1
    }
    tiles.setTileAt(Select.tilemapLocation(), assets.tile`transparency16`)
    tiles.setWallAt(Select.tilemapLocation(), false)
}
browserEvents.MouseRight.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    Slot += 1
    if (Slots.length == Slot) {
        Slot = 0
    }
})
let fila = 0
let col = 0
let worldY = 0
let worldX = 0
let myMenu: Sprite = null
let myImage: Image = null
let outn = 0
let craftn = 0
let out: Image = null
let craft2: Image = null
let Block: Image = null
let Slot = 0
let Blocks: Image[] = []
let Slots: number[] = []
let Select: Sprite = null
let Steve: Sprite = null
Steve = platformer.create(assets.image`steve_left1`, SpriteKind.Player)
Select = sprites.create(assets.image`cursor_6`, SpriteKind.Mouse)
scene.cameraFollowSprite(Steve)
tiles.setCurrentTilemap(tilemap`World`)
tiles.placeOnTile(Steve, tiles.getTileLocation(5, 13))
scene.setBackgroundColor(9)
let Title_Game = sprites.create(assets.image`MINECRAFT`, SpriteKind.Title)
Title_Game.setFlag(SpriteFlag.RelativeToCamera, true)
Title_Game.setPosition(52, 10)
let Mode = 1
platformer.moveSprite(Steve, true)
platformer.setGravity(500, platformer.Direction.Down)
Slots = [
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
]
Blocks = [
sprites.castle.tilePath5,
assets.tile`Wood`,
assets.tile`Stone`,
assets.tile`miMosaico`,
assets.tile`dark_rock`,
assets.tile`diamond`,
assets.tile`miMosaico0`,
assets.tile`miMosaico2`,
assets.tile`miMosaico1`,
assets.tile`Planks`
]
Slot = 0
let textSprite = textsprite.create("")
Block = assets.tile`transparency16`
textSprite.setPosition(120, 10)
textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
Debugger.setHitboxes(false)
minerals()
forever(function () {
    textSprite.setIcon(Block)
    textSprite.setText("x" + convertToText(Slots[Slot]))
})
forever(function () {
    for (let valor of tiles.getTilesByType(sprites.castle.tilePath5)) {
        if (tiles.tileAtLocationEquals(valor.getNeighboringLocation(CollisionDirection.Top), assets.tile`transparency16`)) {
            tiles.setTileAt(valor, sprites.castle.tilePath2)
        }
    }
    for (let valor2 of tiles.getTilesByType(sprites.castle.tilePath2)) {
        if (tiles.tileAtLocationEquals(valor2.getNeighboringLocation(CollisionDirection.Top), sprites.castle.tilePath5) || tiles.tileAtLocationEquals(valor2.getNeighboringLocation(CollisionDirection.Top), sprites.castle.tilePath2)) {
            tiles.setTileAt(valor2, sprites.castle.tilePath5)
        }
    }
})
forever(function () {
    if (0 <= Slots[Slot]) {
        Block = Blocks[Slot]
    }
    info.setScore(Slot)
})
