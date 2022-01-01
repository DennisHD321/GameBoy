let BilSpill = 0
let X = 0
let LydBar = 0
let Termometer = 0
let Kompass = 0
let Snake = 0
let Y = 0
let SnakeDone = 0
let snakeX: number[] = []
let snakeY: number[] = []
let foodX = 0
let foodY = 0
let dy = 0
let timeDelayGame = 0
let levelGame = 0
let dx = 0
let acc_x = 0
let acc_y = 0
let isEast = false
let isWest = false
let isNorth = false
let isSouth = false
let preDx = 0
let preDy = 0
let px = 0
let py = 0
let Score = 0
let fStop = false
let checkX = 0
let checkY = 0
let Hinder: game.LedSprite = null
let HinderReady = 0
let Retning = 0
let Bil: game.LedSprite = null
// GameBoy
input.onButtonPressed(Button.A, function () {
    if (BilSpill == 0) {
        X += 1
        basic.clearScreen()
    }
})
/**
 * Spillmeny
 */
// GameBoy
input.onButtonPressed(Button.B, function () {
    if (LydBar == 0) {
        if (Termometer == 0) {
            if (Kompass == 0) {
                if (Snake == 0) {
                    if (BilSpill == 0) {
                        if (X == 0 && Y == 0) {
                            basic.showString("FlappyBird")
                            basic.pause(1000)
                            basic.clearScreen()
                        }
                        if (X == 1 && Y == 0) {
                            BilSpill = 1
                        }
                        if (X == 2 && Y == 0) {
                            Snake = 1
                        }
                        if (X == 3 && Y == 0) {
                            Kompass = 1
                        }
                        if (X == 4 && Y == 0) {
                            Termometer = 1
                        }
                        if (X == 0 && Y == 1) {
                            LydBar = 1
                        }
                        if (X == 1 && Y == 1) {
                            basic.showNumber(7)
                            basic.pause(100)
                            basic.clearScreen()
                        }
                        if (X == 2 && Y == 1) {
                            basic.showNumber(8)
                            basic.pause(100)
                            basic.clearScreen()
                        }
                        if (X == 3 && Y == 1) {
                            basic.showNumber(9)
                            basic.pause(100)
                            basic.clearScreen()
                        }
                        if (X == 4 && Y == 1) {
                            basic.showNumber(10)
                            basic.pause(200)
                            basic.clearScreen()
                        }
                        if (X == 0 && Y == 2) {
                            basic.showNumber(11)
                            basic.pause(200)
                            basic.clearScreen()
                        }
                        if (X == 1 && Y == 2) {
                            basic.showNumber(12)
                            basic.pause(200)
                            basic.clearScreen()
                        }
                    }
                }
            }
        }
    }
})
basic.forever(function () {
    if (SnakeDone == 0) {
        if (Snake == 1) {
            snakeX.insertAt(0, 2)
            snakeY.insertAt(0, 4)
            foodX = randint(0, 4)
            foodY = randint(0, 4)
            led.plotBrightness(foodX, foodY, 21)
            dy = -1
            timeDelayGame = 800
            levelGame = 1
            basic.showNumber(levelGame)
            SnakeDone = 1
        }
    }
})
// Snake
basic.forever(function () {
    if (Snake == 1) {
        if (snakeX.length == 20) {
            basic.pause(2000)
            snakeX = [2]
            snakeY = [4]
            foodX = randint(0, 4)
            foodY = randint(0, 4)
            dx = 0
            dy = -1
            timeDelayGame = timeDelayGame - 200
            if (timeDelayGame < 200) {
                timeDelayGame = 200
            }
            levelGame = levelGame + 1
            basic.showNumber(levelGame)
            basic.clearScreen()
        }
        acc_x = input.acceleration(Dimension.X)
        acc_y = input.acceleration(Dimension.Y)
        isEast = acc_x > 256
        isWest = acc_x < -256
        isNorth = acc_y < -256
        isSouth = acc_y > 256
        preDx = dx
        preDy = dy
        if (isEast) {
            dx = 1
            dy = 0
        } else if (isNorth) {
            dx = 0
            dy = -1
        } else if (isSouth) {
            dx = 0
            dy = 1
        } else if (isWest) {
            dx = -1
            dy = 0
        }
        px = snakeX[snakeX.length - 1] + dx
        py = snakeY[snakeX.length - 1] + dy
        if (snakeX.length > 1) {
            if (px == snakeX[snakeX.length - 2] && py == snakeY[snakeY.length - 2]) {
                px = snakeX[snakeX.length - 1] + preDx
                py = snakeY[snakeX.length - 1] + preDy
            }
        }
        if (px == foodX && py == foodY) {
            Score = Score + 20
            game.setScore(Score)
            snakeX.insertAt(snakeX.length, foodX)
            snakeY.insertAt(snakeY.length, foodY)
            // while (1) { foodX = Math.random(5) foodY = Math.random(5) let fStop = false for (let index2 = 0; index2 <= snakeX.length - 1; index2++) { if (foodX != snakeX[index2] && foodY != snakeY[index2]) { fStop = true; break; } if (fStop == true) break; } }foodX = Math.random(5)
            // foodY = Math.random(5)
            led.plotBrightness(foodX, foodY, 255)
            fStop = false
            while (fStop == false) {
                foodX = randint(0, 4)
                foodY = randint(0, 4)
                fStop = true
                for (let index = 0; index <= snakeX.length - 1; index++) {
                    checkX = snakeX[index]
                    checkY = snakeY[index]
                    if (checkX == foodX && checkY == foodY) {
                        fStop = false
                    }
                }
            }
        } else {
            if (px < 0 || px > 4 || (py < 0 || py > 4)) {
                game.gameOver()
            }
            for (let index2 = 0; index2 <= snakeX.length - 2; index2++) {
                if (px == snakeX[index2] && py == snakeY[index2]) {
                    game.gameOver()
                }
            }
            for (let index3 = 0; index3 <= snakeX.length - 2; index3++) {
                snakeX[index3] = snakeX[index3 + 1]
                snakeY[index3] = snakeY[index3 + 1]
            }
            snakeX[snakeX.length - 1] = px
            snakeY[snakeX.length - 1] = py
        }
        basic.clearScreen()
        for (let index4 = 0; index4 <= snakeX.length - 1; index4++) {
            led.plot(snakeX[index4], snakeY[index4])
        }
        // while (1) { foodX = Math.random(5) foodY = Math.random(5) let fStop = false for (let index2 = 0; index2 <= snakeX.length - 1; index2++) { if (foodX != snakeX[index2] && foodY != snakeY[index2]) { fStop = true; break; } if (fStop == true) break; } }foodX = Math.random(5)
        // foodY = Math.random(5)
        led.plotBrightness(foodX, foodY, 21)
        basic.pause(timeDelayGame)
    }
})
// CarGame
basic.forever(function () {
    basic.pause(4800)
    while (BilSpill == 1) {
        Hinder = game.createSprite(randint(0, 4), 0)
        HinderReady = 1
        basic.pause(1600)
    }
})
basic.forever(function () {
    if (game.isGameOver()) {
        basic.pause(20500)
        control.reset()
    }
})
// Kompass
basic.forever(function () {
    if (Kompass == 1) {
        Retning = input.compassHeading()
        if (input.buttonIsPressed(Button.A)) {
            control.reset()
        } else if (input.buttonIsPressed(Button.B)) {
            control.reset()
        }
        if (Retning < 22.5) {
            basic.showArrow(ArrowNames.North)
        } else if (Retning < 67.5) {
            basic.showArrow(ArrowNames.NorthWest)
        } else if (Retning < 112.5) {
            basic.showArrow(ArrowNames.West)
        } else if (Retning < 157) {
            basic.showArrow(ArrowNames.SouthWest)
        } else if (Retning < 202.5) {
            basic.showArrow(ArrowNames.South)
        } else if (Retning < 247.5) {
            basic.showArrow(ArrowNames.SouthEast)
        } else if (Retning < 192.5) {
            basic.showArrow(ArrowNames.East)
        } else if (Retning < 337.5) {
            basic.showArrow(ArrowNames.NorthEast)
        } else {
            basic.showArrow(ArrowNames.North)
        }
    }
})
/**
 * Bilspill
 */
// CarGame
basic.forever(function () {
    if (BilSpill == 1) {
        Score = 0
        game.setLife(3)
        basic.showString("GO!")
        Bil = game.createSprite(2, 2)
        while (BilSpill == 1) {
            Bil.set(LedSpriteProperty.Blink, 250)
            if (input.rotation(Rotation.Pitch) > 10) {
                Bil.change(LedSpriteProperty.Y, 1)
                basic.pause(200)
            }
            if (input.rotation(Rotation.Pitch) < -10) {
                Bil.change(LedSpriteProperty.Y, -1)
                basic.pause(200)
            }
            if (input.rotation(Rotation.Roll) > 4) {
                Bil.change(LedSpriteProperty.X, 1)
                basic.pause(200)
            }
            if (input.rotation(Rotation.Roll) < -4) {
                Bil.change(LedSpriteProperty.X, -1)
                basic.pause(200)
            }
            if (Bil.isTouching(Hinder)) {
                game.removeLife(1)
                Hinder.delete()
                basic.showLeds(`
                    # . . . #
                    . # . # .
                    . . # . .
                    . # . # .
                    # . . . #
                    `)
            }
        }
    }
})
// LydGraf
// 
basic.forever(function () {
    if (LydBar == 1) {
        led.plotBarGraph(
        input.soundLevel(),
        255
        )
        if (input.buttonIsPressed(Button.A)) {
            control.reset()
        }
        if (input.buttonIsPressed(Button.B)) {
            control.reset()
        }
    }
})
// CarGame
basic.forever(function () {
    while (BilSpill == 1) {
        basic.pause(370)
        Score += 1
        game.setScore(Score)
    }
})
// GameBoy
basic.forever(function () {
    if (LydBar == 0) {
        if (Termometer == 0) {
            if (Kompass == 0) {
                if (Snake == 0) {
                    if (BilSpill == 0) {
                        if (input.buttonIsPressed(Button.B)) {
                            if (Y >= 2) {
                                basic.pause(1800)
                            }
                            basic.pause(1000)
                        } else {
                            led.plot(X, Y)
                            if (X >= 5) {
                                Y += 1
                                X = 0
                            }
                            if (Y >= 5) {
                                Y = 0
                            }
                        }
                    }
                }
            }
        }
    }
})
// Termometer
basic.forever(function () {
    if (Termometer == 1) {
        basic.showNumber(input.temperature())
        if (input.buttonIsPressed(Button.A)) {
            control.reset()
        } else if (input.buttonIsPressed(Button.B)) {
            control.reset()
        }
    }
})
// CarGame
basic.forever(function () {
    if (HinderReady == 1) {
        while (BilSpill == 1) {
            Hinder.change(LedSpriteProperty.Y, 1)
            basic.pause(350)
        }
    }
})
