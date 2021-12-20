BilSpill = 0
X = 0
LydBar = 0
Termometer = 0
Kompass = 0
Snake = 0
Y = 0
SnakeDone = 0
snakeX: List[number] = []
snakeY: List[number] = []
foodX = 0
foodY = 0
dy = 0
timeDelayGame = 0
levelGame = 0
dx = 0
acc_x = 0
acc_y = 0
isEast = False
isWest = False
isNorth = False
isSouth = False
preDx = 0
preDy = 0
px = 0
py = 0
Score = 0
fStop = False
checkX = 0
checkY = 0
Hinder: game.LedSprite = None
HinderReady = 0
Retning = 0
Bil: game.LedSprite = None
# GameBoy

def on_button_pressed_a():
    global X
    if BilSpill == 0:
        X += 1
        basic.clear_screen()
input.on_button_pressed(Button.A, on_button_pressed_a)

"""

Spillmeny

"""
# GameBoy

def on_button_pressed_b():
    global BilSpill, Snake, Kompass, Termometer, LydBar
    if LydBar == 0:
        if Termometer == 0:
            if Kompass == 0:
                if Snake == 0:
                    if BilSpill == 0:
                        if X == 0 and Y == 0:
                            basic.show_string("FlappyBird")
                            basic.pause(1000)
                            basic.clear_screen()
                        if X == 1 and Y == 0:
                            BilSpill = 1
                        if X == 2 and Y == 0:
                            Snake = 1
                        if X == 3 and Y == 0:
                            Kompass = 1
                        if X == 4 and Y == 0:
                            Termometer = 1
                        if X == 0 and Y == 1:
                            LydBar = 1
                        if X == 1 and Y == 1:
                            basic.show_number(7)
                            basic.pause(100)
                            basic.clear_screen()
                        if X == 2 and Y == 1:
                            basic.show_number(8)
                            basic.pause(100)
                            basic.clear_screen()
                        if X == 3 and Y == 1:
                            basic.show_number(9)
                            basic.pause(100)
                            basic.clear_screen()
                        if X == 4 and Y == 1:
                            basic.show_number(10)
                            basic.pause(200)
                            basic.clear_screen()
                        if X == 0 and Y == 2:
                            basic.show_number(11)
                            basic.pause(200)
                            basic.clear_screen()
                        if X == 1 and Y == 2:
                            basic.show_number(12)
                            basic.pause(200)
                            basic.clear_screen()
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_forever():
    global foodX, foodY, dy, timeDelayGame, levelGame, SnakeDone
    if SnakeDone == 0:
        if Snake == 1:
            snakeX.insert_at(0, 2)
            snakeY.insert_at(0, 4)
            foodX = randint(0, 4)
            foodY = randint(0, 4)
            led.plot_brightness(foodX, foodY, 21)
            dy = -1
            timeDelayGame = 800
            levelGame = 1
            basic.show_number(levelGame)
            SnakeDone = 1
basic.forever(on_forever)

# Snake

def on_forever2():
    global snakeX, snakeY, foodX, foodY, dx, dy, timeDelayGame, levelGame, acc_x, acc_y, isEast, isWest, isNorth, isSouth, preDx, preDy, px, py, Score, fStop, checkX, checkY
    if Snake == 1:
        if len(snakeX) == 20:
            basic.pause(2000)
            snakeX = [2]
            snakeY = [4]
            foodX = randint(0, 4)
            foodY = randint(0, 4)
            dx = 0
            dy = -1
            timeDelayGame = timeDelayGame - 200
            if timeDelayGame < 200:
                timeDelayGame = 200
            levelGame = levelGame + 1
            basic.show_number(levelGame)
            basic.clear_screen()
        acc_x = input.acceleration(Dimension.X)
        acc_y = input.acceleration(Dimension.Y)
        isEast = acc_x > 256
        isWest = acc_x < -256
        isNorth = acc_y < -256
        isSouth = acc_y > 256
        preDx = dx
        preDy = dy
        if isEast:
            dx = 1
            dy = 0
        elif isNorth:
            dx = 0
            dy = -1
        elif isSouth:
            dx = 0
            dy = 1
        elif isWest:
            dx = -1
            dy = 0
        px = snakeX[len(snakeX) - 1] + dx
        py = snakeY[len(snakeX) - 1] + dy
        if len(snakeX) > 1:
            if px == snakeX[len(snakeX) - 2] and py == snakeY[len(snakeY) - 2]:
                px = snakeX[len(snakeX) - 1] + preDx
                py = snakeY[len(snakeX) - 1] + preDy
        if px == foodX and py == foodY:
            Score = Score + 20
            game.set_score(Score)
            snakeX.insert_at(len(snakeX), foodX)
            snakeY.insert_at(len(snakeY), foodY)
            # while (1) { foodX = Math.random(5) foodY = Math.random(5) let fStop = false for (let index2 = 0; index2 <= snakeX.length - 1; index2++) { if (foodX != snakeX[index2] && foodY != snakeY[index2]) { fStop = true; break; } if (fStop == true) break; } }foodX = Math.random(5)
            # foodY = Math.random(5)
            led.plot_brightness(foodX, foodY, 255)
            fStop = False
            while fStop == False:
                foodX = randint(0, 4)
                foodY = randint(0, 4)
                fStop = True
                index = 0
                while index <= len(snakeX) - 1:
                    checkX = snakeX[index]
                    checkY = snakeY[index]
                    if checkX == foodX and checkY == foodY:
                        fStop = False
                    index += 1
        else:
            if px < 0 or px > 4 or (py < 0 or py > 4):
                game.game_over()
            index2 = 0
            while index2 <= len(snakeX) - 2:
                if px == snakeX[index2] and py == snakeY[index2]:
                    game.game_over()
                index2 += 1
            index3 = 0
            while index3 <= len(snakeX) - 2:
                snakeX[index3] = snakeX[index3 + 1]
                snakeY[index3] = snakeY[index3 + 1]
                index3 += 1
            snakeX[len(snakeX) - 1] = px
            snakeY[len(snakeX) - 1] = py
        basic.clear_screen()
        index4 = 0
        while index4 <= len(snakeX) - 1:
            led.plot(snakeX[index4], snakeY[index4])
            index4 += 1
        # while (1) { foodX = Math.random(5) foodY = Math.random(5) let fStop = false for (let index2 = 0; index2 <= snakeX.length - 1; index2++) { if (foodX != snakeX[index2] && foodY != snakeY[index2]) { fStop = true; break; } if (fStop == true) break; } }foodX = Math.random(5)
        # foodY = Math.random(5)
        led.plot_brightness(foodX, foodY, 21)
        basic.pause(timeDelayGame)
basic.forever(on_forever2)

# CarGame

def on_forever3():
    global Hinder, HinderReady
    while BilSpill == 1:
        Hinder = game.create_sprite(randint(0, 4), 0)
        HinderReady = 1
        basic.pause(1600)
basic.forever(on_forever3)

def on_forever4():
    if game.is_game_over():
        basic.pause(20500)
        control.reset()
basic.forever(on_forever4)

# Kompass

def on_forever5():
    global Retning
    if Kompass == 1:
        Retning = input.compass_heading()
        if input.button_is_pressed(Button.A):
            control.reset()
        elif input.button_is_pressed(Button.B):
            control.reset()
        if Retning < 22.5:
            basic.show_arrow(ArrowNames.NORTH)
        elif Retning < 67.5:
            basic.show_arrow(ArrowNames.NORTH_WEST)
        elif Retning < 112.5:
            basic.show_arrow(ArrowNames.WEST)
        elif Retning < 157:
            basic.show_arrow(ArrowNames.SOUTH_WEST)
        elif Retning < 202.5:
            basic.show_arrow(ArrowNames.SOUTH)
        elif Retning < 247.5:
            basic.show_arrow(ArrowNames.SOUTH_EAST)
        elif Retning < 192.5:
            basic.show_arrow(ArrowNames.EAST)
        elif Retning < 337.5:
            basic.show_arrow(ArrowNames.NORTH_EAST)
        else:
            basic.show_arrow(ArrowNames.NORTH)
basic.forever(on_forever5)

"""

Bilspill

"""
# CarGame

def on_forever6():
    global Score, Bil
    if BilSpill == 1:
        Score = 0
        game.set_life(3)
        basic.show_string("GO!")
        Bil = game.create_sprite(2, 2)
        while BilSpill == 1:
            if input.rotation(Rotation.PITCH) > 10:
                Bil.change(LedSpriteProperty.Y, 1)
                basic.pause(200)
            if input.rotation(Rotation.PITCH) < -10:
                Bil.change(LedSpriteProperty.Y, -1)
                basic.pause(200)
            if input.rotation(Rotation.ROLL) > 4:
                Bil.change(LedSpriteProperty.X, 1)
                basic.pause(200)
            if input.rotation(Rotation.ROLL) < -4:
                Bil.change(LedSpriteProperty.X, -1)
                basic.pause(200)
            if Bil.is_touching(Hinder):
                game.remove_life(1)
                Hinder.delete()
                basic.show_leds("""
                    # . . . #
                                        . # . # .
                                        . . # . .
                                        . # . # .
                                        # . . . #
                """)
basic.forever(on_forever6)

# LydGraf
# 

def on_forever7():
    if LydBar == 1:
        led.plot_bar_graph(input.sound_level(), 255)
        if input.button_is_pressed(Button.A):
            control.reset()
        if input.button_is_pressed(Button.B):
            control.reset()
basic.forever(on_forever7)

# CarGame

def on_forever8():
    global Score
    while BilSpill == 1:
        basic.pause(370)
        Score += 1
        game.set_score(Score)
basic.forever(on_forever8)

# GameBoy

def on_forever9():
    global Y, X
    if LydBar == 0:
        if Termometer == 0:
            if Kompass == 0:
                if Snake == 0:
                    if BilSpill == 0:
                        if input.button_is_pressed(Button.B):
                            if Y >= 2:
                                basic.pause(1800)
                            basic.pause(1000)
                        else:
                            led.plot(X, Y)
                            if X >= 5:
                                Y += 1
                                X = 0
                            if Y >= 5:
                                Y = 0
basic.forever(on_forever9)

# Termometer

def on_forever10():
    if Termometer == 1:
        basic.show_number(input.temperature())
        if input.button_is_pressed(Button.A):
            control.reset()
        elif input.button_is_pressed(Button.B):
            control.reset()
basic.forever(on_forever10)

# CarGame

def on_forever11():
    if HinderReady == 1:
        while BilSpill == 1:
            Hinder.change(LedSpriteProperty.Y, 1)
            basic.pause(350)
basic.forever(on_forever11)
