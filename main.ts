namespace SpriteKind {
    export const Title = SpriteKind.create()
    export const Mouse = SpriteKind.create()
    export const Tutorial = SpriteKind.create()
}
function Game_Mode () {
    if (Mode == 1) {
        Mode = 2
    } else if (Mode == 2) {
        Mode = 0
        Steve.setFlag(SpriteFlag.GhostThroughWalls, true)
        platformer.setGravityEnabled(Steve, false)
        controller.moveSprite(Steve, 200, 200)
    } else {
        Mode = 1
        Steve.setFlag(SpriteFlag.GhostThroughWalls, false)
        platformer.setGravityEnabled(Steve, true)
        controller.moveSprite(Steve, 0, 0)
    }
}
function minerals () {
    for (let valor of tiles.getTilesByType(assets.tile`dark_rock`)) {
        if (Math.percentChance(5)) {
            tiles.setTileAt(valor, assets.tile`miMosaico0`)
        }
    }
    for (let valor2 of tiles.getTilesByType(assets.tile`dark_rock`)) {
        if (Math.percentChance(4)) {
            tiles.setTileAt(valor2, assets.tile`miMosaico2`)
        }
    }
    for (let valor3 of tiles.getTilesByType(assets.tile`dark_rock`)) {
        if (Math.percentChance(1)) {
            tiles.setTileAt(valor3, assets.tile`diamond`)
        }
    }
}
browserEvents.G.onEvent(browserEvents.KeyEvent.Pressed, function () {
    Game_Mode()
})
function Place () {
    if (1 <= Slots[Slot]) {
        Slots[Slot] = Slots[Slot] - 1
        if (Block == assets.tile`Wood` || Block == assets.tile`miMosaico`) {
            tiles.setTileAt(Select.tilemapLocation(), Block)
            tiles.setWallAt(Select.tilemapLocation(), false)
        } else {
            tiles.setTileAt(Select.tilemapLocation(), Block)
            tiles.setWallAt(Select.tilemapLocation(), true)
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`miMosaico6`, function (sprite, location) {
    if (World == 1) {
        World = 0
        LoadWorld("Overworld")
        tiles.placeOnTile(Steve, tiles.getTileLocation(26, 23))
    } else {
        World = 1
        SaveWorld("Overworld")
        tiles.setCurrentTilemap(tilemap`Nether`)
        tiles.placeOnTile(Steve, tiles.getTileLocation(21, 7))
    }
})
function SaveWorld (World: string) {
    Save = []
    for (let índice = 0; índice <= 31; índice++) {
        for (let indice2 = 0; indice2 <= 31; indice2++) {
            Save.push(ID.indexOf(tiles.tileImageAtLocation(tiles.getTileLocation(indice2, índice))))
        }
    }
    blockSettings.writeNumberArray(World, Save)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Game_Mode()
})
function craft (crft: string) {
    if (crft == "Planks") {
        craft2 = [assets.tile`Wood`]
        out = assets.tile`Planks`
        craftn = [1]
        outn = 4
    } else if (crft == "Diamond Block") {
        craft2 = [assets.tile`diamond`]
        out = assets.tile`miMosaico9`
        craftn = [9]
        outn = 1
    } else if (crft == "Diamond") {
        craft2 = [assets.tile`miMosaico9`]
        out = assets.tile`diamond`
        craftn = [1]
        outn = 9
    }
    Crafting()
}
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    if (!(tiles.tileAtLocationEquals(Select.tilemapLocation(), assets.tile`transparency16`))) {
        myImage = tiles.tileImageAtLocation(Select.tilemapLocation())
        Give(myImage)
    } else {
        Place()
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Mode == 2) {
        Craft()
    }
})
platformer.onRuleBecomesTrue(platformer.rule(platformer.PlatformerSpriteState.FacingRight), platformer.EventHandlerCondition.BecomesTrue, function (sprite) {
    Steve.setImage(assets.image`steve_right0`)
})
function Crafting () {
    for (let valor4 of craft2) {
        if (!(0 < Slots[Blocks.indexOf(valor4)])) {
            return
        }
    }
    for (let valor5 of craft2) {
        if (0 < Slots[Blocks.indexOf(valor5)]) {
            Slots[Blocks.indexOf(valor5)] = Slots[Blocks.indexOf(valor5)] - craftn[Blocks.indexOf(valor5)]
        }
    }
    Slots[Blocks.indexOf(out)] = Slots[Blocks.indexOf(out)] + outn
}
browserEvents.R.onEvent(browserEvents.KeyEvent.Pressed, function () {
    Craft()
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
    col2 = Math.floor(worldX / 16)
    fila2 = Math.floor(worldY / 16)
    tiles.placeOnTile(Select, tiles.getTileLocation(col2, fila2))
})
function addCrafts () {
    miniMenu.insertMenuItem(myMenu, miniMenu.createMenuItem("Planks", assets.tile`Planks`), 0)
    miniMenu.insertMenuItem(myMenu, miniMenu.createMenuItem("Diamond Block", assets.tile`miMosaico9`), 0)
    miniMenu.insertMenuItem(myMenu, miniMenu.createMenuItem("Diamond", assets.tile`diamond`), 0)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Mode == 2) {
        Change_Slot()
    }
})
function Change_Slot () {
    Slot += 1
    if (Slots.length == Slot) {
        Slot = 0
    }
}
function Give (Image2: Image) {
    if (Blocks.indexOf(Image2) == -1) {
        Slots.push(0 + 0)
        if (Image2 == sprites.castle.tilePath2) {
            Blocks.push(sprites.castle.tilePath5)
        } else {
            Blocks.push(Image2)
        }
    }
    if (Image2 == sprites.castle.tilePath2) {
        Slots[Blocks.indexOf(sprites.castle.tilePath5)] = Slots[Slot] + 1
    } else {
        Slots[Blocks.indexOf(Image2)] = Slots[Slot] + 1
    }
    if (!(Image2 == assets.tile`miMosaico3`)) {
        tiles.setTileAt(Select.tilemapLocation(), assets.tile`transparency16`)
        tiles.setWallAt(Select.tilemapLocation(), false)
    }
}
browserEvents.MouseRight.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    Change_Slot()
})
function Craft () {
    if (menu == 0) {
        menu = 1
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
            menu = 0
            craft(selection)
            miniMenu.close(myMenu)
        })
    }
}
function LoadWorld (World: string) {
    tempLoad = blockSettings.readNumberArray(World)
    // Si no hay datos guardados, no intentes cargar
    if (!(tempLoad) || tempLoad.length == 0) {
        game.showLongText("No hay mundo guardado", DialogLayout.Bottom)
        return
    }
    Load = tempLoad
    // ¡Asegúrate que sea de 32x32!
    tiles.setCurrentTilemap(tilemap`blank`)
    for (let fila = 0; fila <= 31; fila++) {
        for (let col = 0; col <= 31; col++) {
            dataIndex = col + fila * 32
            tileId = Load[dataIndex]
            // Verificamos que el ID sea válido antes de pintar
            if (tileId < ID.length) {
                tiles.setTileAt(tiles.getTileLocation(col, fila), ID[tileId])
                if (ID[tileId] != assets.tile`transparency16`) {
                    tiles.setWallAt(tiles.getTileLocation(col, fila), true)
                }
            }
        }
    }
}
let tileId = 0
let dataIndex = 0
let Load: number[] = []
let tempLoad: number[] = []
let myMenu: Sprite = null
let fila2 = 0
let col2 = 0
let worldY = 0
let worldX = 0
let myImage: Image = null
let outn = 0
let craftn: number[] = []
let out: Image = null
let craft2: Image[] = []
let Save: number[] = []
let menu = 0
let Block: Image = null
let Slot = 0
let ID: Image[] = []
let Blocks: Image[] = []
let Slots: number[] = []
let Mode = 0
let Select: Sprite = null
let Steve: Sprite = null
let World = 0
let Console = false
if (game.ask("PC A CONSOLE B")) {
    Console = false
} else {
    Console = true
}
tiles.setCurrentTilemap(tilemap`Nether`)
SaveWorld("Nether")
tiles.setCurrentTilemap(tilemap`World`)
SaveWorld("Overworld")
World = 0
let mySprite = sprites.create(img`
    ................................................................................................
    ....ff.fff.ff.f.fff.fff.fff.f...fff.............................................................
    ....f..f.f.f.ff..f..f.f.f.f.f...f...............................................................
    ....f..f.f.f..f..f..ff..f.f.f...fff.............................................................
    ....f..f.f.f..f..f..f.f.f.f.f.....f.............................................................
    ....ff.fff.f..f..f..f.f.fff.fff.fff.............................................................
    ................................................................................................
    ................................................................................................
    ................................................................................................
    ................................................................................................
    .....f..ff................fff...................................fff.............................
    ....f.f.f.f...............f.f...................................f...............................
    ....fff.f.f...............ff....................................f.f.............................
    ....f.f.ff................f.f...................................fff.............................
    ................................................................................................
    ....ff.ff.fff.f.f.ff......ff.fff.fff.fff.fff....................fff.fff.ff.ff.ff................
    ....f.f.f.f.f.f.f.f.......f..f.f.f.f.f....f.....................f...f.f.f.f.f.f.................
    ....f...f.f.f.f.f.ff......f..ff..fff.ff...f.....................f...fff.f...f.ff................
    ....f...f.f.f.f.f.f.......f..f.f.f.f.f....f.....................f.f.f.f.f...f.f.................
    ....f...f.fff..f..ff......ff.f.f.f.f.f....f.....................fff.f.f.f...f.ff................
    ................................................................................................
    ................................................................................................
    ................................................................ff.ff.fff.ff..ff................
    ....fff.fff.fff.ff.ff....fff.f.f.ff.ff.fff......................f.f.f.f.f.f.f.f.................
    ....f...f.f.f.f.f..f.......f.f.f.f.f.f.f.f......................f...f.f.f.f.f.ff................
    ....fff.fff.fff.f..ff......f.f.f.f...f.fff......................f...f.f.f.f.f.f.................
    ......f.f...f.f.f..f.....f.f.f.f.f...f.f........................f...f.fff.ff..ff................
    ....fff.f...f.f.ff.ff....fff.fff.f...f.f........................................................
    ................................................................................................
    ................................................................................................
    ................................................................................................
    ................................................................................................
    `, SpriteKind.Tutorial)
Steve = platformer.create(assets.image`steve_left1`, SpriteKind.Player)
Select = sprites.create(assets.image`cursor_6`, SpriteKind.Mouse)
scene.cameraFollowSprite(Steve)
tiles.placeOnTile(Steve, tiles.getTileLocation(5, 13))
tiles.placeOnTile(mySprite, tiles.getTileLocation(5, 12))
scene.setBackgroundColor(9)
let Title_Game = sprites.create(assets.image`MINECRAFT`, SpriteKind.Title)
Title_Game.setFlag(SpriteFlag.RelativeToCamera, true)
Title_Game.setPosition(52, 10)
Mode = 1
platformer.moveSprite(Steve, true)
platformer.setGravity(500, platformer.Direction.Down)
Slots = []
Blocks = []
ID = [
assets.tile`transparency16`,
assets.tile`Wood`,
assets.tile`Stone`,
assets.tile`miMosaico`,
assets.tile`dark_rock`,
assets.tile`diamond`,
assets.tile`miMosaico0`,
assets.tile`miMosaico1`,
assets.tile`miMosaico2`,
assets.tile`Planks`,
assets.tile`miMosaico3`,
assets.tile`miMosaico4`,
assets.tile`miMosaico5`,
assets.tile`miMosaico6`,
assets.tile`miMosaico9`,
sprites.castle.tilePath2,
sprites.castle.tilePath5
]
Slot = 0
let textSprite = textsprite.create("")
Block = assets.tile`transparency16`
textSprite.setPosition(120, 10)
textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
Debugger.setHitboxes(false)
Debugger.setFPS(false)
minerals()
menu = 0
forever(function () {
    textSprite.setIcon(Block)
    textSprite.setText("x" + convertToText(Slots[Slot]))
})
forever(function () {
    if (0 < Slots[Slot]) {
        Block = Blocks[Slot]
        for (let valor6 of Blocks) {
            if (Slots[Blocks.indexOf(valor6)] == 0) {
                Slots.removeAt(Blocks.indexOf(valor6))
                Blocks.removeAt(Blocks.indexOf(valor6))
            }
        }
    }
})
forever(function () {
    for (let valor42 of tiles.getTilesByType(sprites.castle.tilePath5)) {
        if (tiles.tileAtLocationEquals(valor42.getNeighboringLocation(CollisionDirection.Top), assets.tile`transparency16`)) {
            tiles.setTileAt(valor42, sprites.castle.tilePath2)
        }
    }
    for (let valor22 of tiles.getTilesByType(sprites.castle.tilePath2)) {
        if (tiles.tileAtLocationEquals(valor22.getNeighboringLocation(CollisionDirection.Top), sprites.castle.tilePath5) || tiles.tileAtLocationEquals(valor22.getNeighboringLocation(CollisionDirection.Top), sprites.castle.tilePath2)) {
            tiles.setTileAt(valor22, sprites.castle.tilePath5)
        }
    }
})
forever(function () {
    for (let valor62 of tiles.getTilesByType(assets.tile`Wood`)) {
        if (Steve.tilemapLocation().row < valor62.row) {
            tiles.setWallAt(valor62, true)
        } else {
            tiles.setWallAt(valor62, false)
        }
    }
    for (let valor7 of tiles.getTilesByType(assets.tile`miMosaico`)) {
        if (Steve.tilemapLocation().row < valor7.row) {
            tiles.setWallAt(valor7, true)
        } else {
            tiles.setWallAt(valor7, false)
        }
    }
    if (Steve.tileKindAt(TileDirection.Left, assets.tile`miMosaico3`)) {
        Mode = 1
        Steve.setFlag(SpriteFlag.GhostThroughWalls, false)
        platformer.setGravityEnabled(Steve, true)
        controller.moveSprite(Steve, 0, 0)
    }
    if (Steve.tileKindAt(TileDirection.Right, assets.tile`miMosaico3`)) {
        Mode = 1
        Steve.setFlag(SpriteFlag.GhostThroughWalls, false)
        platformer.setGravityEnabled(Steve, true)
        controller.moveSprite(Steve, 0, 0)
    }
})
