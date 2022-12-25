"use strict";
const settings = {
    cell_size: 16,
    width: 8,
    height: 16
}
let board = {
    viruses: [],
    viruses_count: 4,
    level: 0,
    viruses_position: [],
    collision: false,
    end: false,
    points: 0,
    pill_throw: 0,
    dance_interval: 0,
    win: false,
    virus_beaten: "",
    board_colors: ["#901829", "#008267", "#ffb68c", "#837e85", "#123eb2"],
    magnifier: {
        graphics: [{ img: document.getElementById("br_magnifier"), color: "br", beaten: false }, { img: document.getElementById("bl_magnifier"), color: "bl", beaten: false }, { img: document.getElementById("yl_magnifier"), color: "yl", beaten: false }],
        positions: [
            [{ left: 2 * settings.cell_size, top: 16 * settings.cell_size }, { left: 6 * settings.cell_size, top: 19 * settings.cell_size }, { left: 7 * settings.cell_size, top: 14 * settings.cell_size }],
            [{ left: 2 * settings.cell_size, top: 17 * settings.cell_size }, { left: 7 * settings.cell_size, top: 19 * settings.cell_size }, { left: 6 * settings.cell_size, top: 14 * settings.cell_size }],
            [{ left: 3 * settings.cell_size, top: 18 * settings.cell_size }, { left: 8 * settings.cell_size, top: 18 * settings.cell_size }, { left: 5 * settings.cell_size, top: 14 * settings.cell_size }],
            [{ left: 3 * settings.cell_size, top: 19 * settings.cell_size }, { left: 8 * settings.cell_size, top: 17 * settings.cell_size }, { left: 4 * settings.cell_size, top: 14 * settings.cell_size }],
            [{ left: 4 * settings.cell_size, top: 19 * settings.cell_size }, { left: 8 * settings.cell_size, top: 16 * settings.cell_size }, { left: 3 * settings.cell_size, top: 15 * settings.cell_size }],
            [{ left: 5 * settings.cell_size, top: 19 * settings.cell_size }, { left: 8 * settings.cell_size, top: 15 * settings.cell_size }, { left: 2 * settings.cell_size, top: 16 * settings.cell_size }],
        ]
    },
    i: 0,
    position_i: 0,
    gameOver_i: 0,
    dance: function () {
        if (board.i == 1) {
            for (let j = 0; j < board.magnifier.graphics.length; j++) {
                if (!board.magnifier.graphics[j].beaten)
                    board.magnifier.graphics[j].img.src = "./img/magnifier/" + board.magnifier.graphics[j].color + "/1.png"
            }
        } else if (board.i == 2) {
            for (let j = 0; j < board.magnifier.graphics.length; j++) {
                if (!board.magnifier.graphics[j].beaten)
                    board.magnifier.graphics[j].img.src = "./img/magnifier/" + board.magnifier.graphics[j].color + "/2.png"
            }

        } else if (board.i == 3) {
            for (let j = 0; j < board.magnifier.graphics.length; j++) {
                if (!board.magnifier.graphics[j].beaten)
                    board.magnifier.graphics[j].img.src = "./img/magnifier/" + board.magnifier.graphics[j].color + "/3.png"
            }

        } else if (board.i == 4) {
            for (let j = 0; j < board.magnifier.graphics.length; j++) {
                if (!board.magnifier.graphics[j].beaten)
                    board.magnifier.graphics[j].img.src = "./img/magnifier/" + board.magnifier.graphics[j].color + "/2.png"
            }

        } else {
            board.i = 0
            if (board.virus_beaten == "") {
                for (let j = 0; j < board.magnifier.graphics.length; j++) {
                    board.magnifier.graphics[j].img.style.left = board.magnifier.positions[board.position_i][j].left + "px"
                    board.magnifier.graphics[j].img.style.top = board.magnifier.positions[board.position_i][j].top + "px"
                }
                board.position_i++
                if (board.position_i == board.magnifier.positions.length) {
                    board.position_i = 0
                    board.magnifier.graphics.unshift(board.magnifier.graphics[2])
                    board.magnifier.graphics.pop()
                }
            }
        }
        board.i++
    },
    defeat: function () {
        if (board.gameOver_i == 1) {
            for (let j = 0; j < board.magnifier.graphics.length; j++) {
                board.magnifier.graphics[j].img.src = "./img/magnifier/" + board.magnifier.graphics[j].color + "/2.png"
            }
        } else if (board.gameOver_i == 2) {
            for (let j = 0; j < board.magnifier.graphics.length; j++) {
                board.magnifier.graphics[j].img.src = "./img/magnifier/" + board.magnifier.graphics[j].color + "/4.png"
            }
        } else {
            board.gameOver_i = 0
        }
        board.gameOver_i++
    },
    board_generation: function () {
        board.viruses = []
        board.viruses_position = []
        board.collision = false
        board.end = false
        board.pill_throw = 0
        board.win = false
        board.viruses_count = (board.level + 1) * 4

        pill.dont_exist = true
        pill.falls = true
        pill.fell = false
        pill.pills_tab = []

        for (let i = 0; i < board.magnifier.graphics.length; i++) {
            board.magnifier.graphics[i].img.style.display = "inline"
        }

        let stage_bg_colors = document.getElementsByClassName("background")
        let stage_number = board.level
        while (stage_number > 4) stage_number -= 5
        for (let i = 0; i < stage_bg_colors.length; i++) {
            stage_bg_colors[i].style.backgroundColor = board.board_colors[stage_number]
        }

        board.dance_interval = setInterval(board.dance, 200)
        board.pill_throw_generation()
        //add viruses count
        let virus = document.getElementById("virus")
        virus.innerHTML = ""
        let viruses = "" + board.viruses_count
        for (let i = 0; i < viruses.length; i++) {
            let img = document.createElement("img")
            img.src = "./img/numbers/" + viruses[i] + ".png"
            img.style.width = settings.cell_size + "px"
            img.style.height = settings.cell_size + "px"
            virus.appendChild(img)
        }

        if (localStorage.getItem("topScore") == null)
            localStorage.setItem("topScore", 0)

        //add topScore
        let topScore = document.getElementById("topScore")
        topScore.innerHTML = ""
        let points = localStorage.getItem("topScore")
        for (let i = 0; i < points.length; i++) {
            let img = document.createElement("img")
            img.src = "./img/numbers/" + points[i] + ".png"
            img.style.width = settings.cell_size + "px"
            img.style.height = settings.cell_size + "px"
            topScore.appendChild(img)
        }
        //add level
        let levelDiv = document.getElementById("levelDiv")
        levelDiv.innerHTML = ""
        let level = "" + board.level
        for (let i = 0; i < level.length; i++) {
            let img = document.createElement("img")
            img.src = "./img/numbers/" + level[i] + ".png"
            img.style.width = settings.cell_size + "px"
            img.style.height = settings.cell_size + "px"
            levelDiv.appendChild(img)
        }

        document.getElementById("gameDiv").innerHTML = ""
        for (let y = -1; y <= settings.height; y++) {
            for (let x = 0; x <= settings.width; x++) {
                let div = document.createElement("div")
                if (y == settings.height || x == settings.width || (y == -1 && (x == 0 || x == 1 || x == 2 || x == 5 || x == 6 || x == 7))) {
                    div.classList.add("placed")
                }
                div.id = x + "x" + y
                div.style.width = settings.cell_size + "px"
                div.style.height = settings.cell_size + "px"
                let gameDiv = document.getElementById("gameDiv")
                gameDiv.style.width = settings.cell_size * (settings.width + 1) + "px"
                gameDiv.style.height = settings.cell_size * settings.height + "px"
                gameDiv.appendChild(div)
            }
        }
        // viruses colors draw
        for (let i = 0; i < board.viruses_count; i++) {
            if (i % 3 == 0)
                board.viruses.push("brown")
            if (i % 3 == 1)
                board.viruses.push("blue")
            if (i % 3 == 2)
                board.viruses.push("yellow")
        }
        for (let i = 0; i < board.viruses.length; i++) {
            if (board.level < 18) {
                var fields = 6
            } else if (board.level < 20) {
                var fields = 5
            } else if (board.level == 20) {
                var fields = 4
            }
            let x = Math.floor(Math.random() * settings.width)
            let y = Math.floor(Math.random() * (settings.height - fields)) + fields
            board.viruses_position.push([x, y])
            if (board.viruses_position.length > 1) {
                do {
                    board.collision = false
                    for (let j = 0; j < board.viruses_position.length; j++) {
                        if (board.viruses_position[board.viruses_position.length - 1].toString() == board.viruses_position[j].toString() && j != board.viruses_position.length - 1) {
                            board.collision = true
                            let xx = Math.floor(Math.random() * settings.width)
                            let yy = Math.floor(Math.random() * (settings.height - fields)) + fields
                            board.viruses_position[board.viruses_position.length - 1] = [xx, yy]
                        }
                    }
                } while (board.collision)
            }
            let div = document.getElementById(board.viruses_position[i][0] + "x" + board.viruses_position[i][1])
            div.classList.add("placed")
            div.classList.add("wirus")
            div.style.backgroundColor = board.viruses[i]
            div.style.backgroundImage = "url(./img/covid_" + board.viruses[i] + ".png)"
            div.style.backgroundSize = settings.cell_size + "px"
        }
        pill.pill_throw()
        pill.move = setInterval(pill.pill_throw, 1000)
    },
    change_points: function () {
        //virus
        let virus = document.getElementById("virus")
        virus.innerHTML = ""
        let viruses = "" + board.viruses_count
        for (let i = 0; i < viruses.length; i++) {
            let img = document.createElement("img")
            img.src = "./img/numbers/" + viruses[i] + ".png"
            img.style.width = settings.cell_size + "px"
            img.style.height = settings.cell_size + "px"
            virus.appendChild(img)
        }

        //score
        let score = document.getElementById("score")
        score.innerHTML = ""
        let points = "" + board.points
        for (let i = 0; i < points.length; i++) {
            let img = document.createElement("img")
            img.src = "./img/numbers/" + points[i] + ".png"
            img.style.width = settings.cell_size + "px"
            img.style.height = settings.cell_size + "px"
            score.appendChild(img)
        }
    },
    pill_throw_generation: function () {
        document.getElementById("pillThrow").innerHTML = ""
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 12; x++) {
                let div = document.createElement("div")
                div.id = x + "y" + y
                div.style.width = settings.cell_size + "px"
                div.style.height = settings.cell_size + "px"
                let pill_throw = document.getElementById("pillThrow")
                pill_throw.style.width = settings.cell_size * 12 + "px"
                pill_throw.style.height = settings.cell_size * 8 + "px"
                pill_throw.appendChild(div)
            }
        }
    },
    magnifier_contents_removal: function (color) {
        let color_shortcut = ""
        if (color == "brown") color_shortcut = "br"
        if (color == "blue") color_shortcut = "bl"
        if (color == "yellow") color_shortcut = "yl"
        board.virus_beaten = color_shortcut
        for (let i = 0; i < board.magnifier.graphics.length; i++) {
            if (board.magnifier.graphics[i].color == color_shortcut) {
                board.magnifier.graphics[i].beaten = true
            }
        }

        let viruses = document.getElementsByClassName("wirus")
        let br = 0
        let bl = 0
        let yl = 0
        for (let i = 0; i < viruses.length; i++) {
            if (viruses[i].style.backgroundColor == "brown") br++
            if (viruses[i].style.backgroundColor == "blue") bl++
            if (viruses[i].style.backgroundColor == "yellow") yl++
        }
        let br_magnifier = document.getElementById("br_magnifier")
        let bl_magnifier = document.getElementById("bl_magnifier")
        let yl_magnifier = document.getElementById("yl_magnifier")

        let i = 0
        let luppa = document.getElementById(color_shortcut + "_magnifier")
        let aua = setInterval(function () {
            if (i == 0) {
                i = 1
                luppa.src = "./img/magnifier/" + color_shortcut + "/d1.png"
            } else {
                i = 0
                luppa.src = "./img/magnifier/" + color_shortcut + "/d2.png"
            }
        }, 200)

        setTimeout(function () {
            board.virus_beaten = ""
            for (let i = 0; i < board.magnifier.graphics.length; i++) {
                if (board.magnifier.graphics[i].color == color_shortcut) {
                    board.magnifier.graphics[i].beaten = false
                }
            }
            clearInterval(aua)
            if (br == 0) br_magnifier.style.display = "none"
            if (bl == 0) bl_magnifier.style.display = "none"
            if (yl == 0) yl_magnifier.style.display = "none"
        }, 2000);
    }
}
let pill = {
    pills_tab: [],
    dont_exist: true,
    throwing: true,
    falls: true,
    fell: false,
    colors: ["", "brown", "blue", "yellow"],
    colors2: ["", "br", "bl", "yl"],
    move: 0,
    next: [Math.floor(Math.random() * 3) + 1, Math.floor(Math.random() * 3) + 1],

    to_down: function () {
        let id = pill.pills_tab.length - 1
        let pom0 = pill.pills_tab[id].position[0].split("x")
        let pom1 = pill.pills_tab[id].position[1].split("x")
        let div0 = document.getElementById(pom0.join("x"))
        let div1 = document.getElementById(pom1.join("x"))
        pom0[1]++
        pom1[1]++
        let spr0 = document.getElementById(pom0.join("x"))
        let spr1 = document.getElementById(pom1.join("x"))
        if (spr0.classList.contains('placed') || spr1.classList.contains('placed')) {
            pill.dont_exist = true
            div0.classList.add("placed")
            div1.classList.add("placed")
            pill.pill_beat()
            pill.pill_reduction()
            pill.fell_function()

            if (board.viruses_count == 0) {
                clearInterval(pill.move)
                board.end = true
                board.win = true
                if (board.points > parseInt(localStorage.getItem("topScore")))
                    localStorage.setItem("topScore", board.points)
                let stageCompletedDiv = document.getElementById("stageCompleted")
                stageCompletedDiv.style.display = "inline"
            }
            let d1 = document.getElementById("3x0")
            let d2 = document.getElementById("4x0")
            if (d1.classList.contains('placed') || d2.classList.contains('placed')) {
                clearInterval(pill.move)
                board.end = true
                if (board.points > parseInt(localStorage.getItem("topScore")))
                    localStorage.setItem("topScore", board.points)
                let gameOver = document.getElementById("gameOver")
                let gameOver_dr = document.getElementById("gameOver_dr")
                clearInterval(board.dance_interval)
                board.dance_interval = setInterval(board.defeat, 200)
                gameOver.style.display = "inline"
                gameOver_dr.style.display = "inline"
            }

            if (board.end) return

            //starting again
            clearInterval(pill.move)
            if (!pill.fell) {
                pill.pill_throw()
                pill.move = setInterval(pill.pill_throw, 1000)
                pill.falls = true
            }
        }
        else {
            pill.put_pill_up()
            let id = pill.pills_tab.length - 1
            pill.pills_tab[id].position.forEach((element, index) => {
                let pom = element.split("x")
                pom[1]++
                pill.pills_tab[id].position[index] = pom.join("x")
            })
            pill.put_pill_down()
        }
    },

    pill_throw: function () {
        if (pill.dont_exist) {
            pill.throwing = true
            pill.hand()
            let i = 0
            let xD = setInterval(function () {
                if (board.pill_throw[i].hand == "up") {
                    document.getElementById("11y7").style.backgroundImage = ""
                    for (let y = 1; y < 4; y++) {
                        let div = document.getElementById("11y" + (y + 3))
                        div.style.backgroundImage = "url(img/hands/up_" + y + ".png)"
                        div.style.backgroundSize = settings.cell_size + "px"
                    }
                } else if (board.pill_throw[i].hand == "middle") {
                    document.getElementById("11y4").style.backgroundImage = ""
                    for (let y = 1; y < 3; y++) {
                        for (let x = 1; x < 3; x++) {
                            let div = document.getElementById((x + 9) + "y" + (y + 4))
                            div.style.backgroundImage = "url(img/hands/middle" + y + x + ".png)"
                            div.style.backgroundSize = settings.cell_size + "px"
                        }
                    }
                } else if (board.pill_throw[i].hand == "down") {
                    let div = document.getElementById("11y5").style.backgroundImage = ""
                    div = document.getElementById("10y5").style.backgroundImage = ""
                    div = document.getElementById("10y6").style.backgroundImage = ""
                    for (let y = 1; y < 3; y++) {
                        let div = document.getElementById("11y" + (y + 5))
                        div.style.backgroundImage = "url(img/hands/down_" + y + ".png)"
                        div.style.backgroundSize = settings.cell_size + "px"
                    }
                }
                for (let j = 0; j < 2; j++) {
                    if (i > 0) {
                        let del = document.getElementById(board.pill_throw[i - 1].position[j])
                        del.style.backgroundImage = ""
                    }
                    let div = document.getElementById(board.pill_throw[i].position[j])
                    div.style.backgroundImage = "url(img/" + board.pill_throw[i].color[j] + ")"
                    div.style.backgroundSize = settings.cell_size + "px"
                }

                i++
                if (i == board.pill_throw.length) {
                    clearInterval(xD)
                    let del = document.getElementById("0y6")
                    del.style.backgroundImage = ""
                    del = document.getElementById("1y6")
                    del.style.backgroundImage = ""
                }
            }, 20)
            setTimeout(function () {
                pill.pills_tab.push({
                    colors: pill.next,
                    change_color: true,
                    position: ["3x0", "4x0"],
                    direction: "horizontal"
                })
                pill.next = [Math.floor(Math.random() * 3) + 1, Math.floor(Math.random() * 3) + 1]

                document.getElementById("11y7").style.backgroundImage = ""
                for (let y = 1; y < 4; y++) {
                    let div = document.getElementById("11y" + (y + 3))
                    div.style.backgroundImage = "url(img/hands/up_" + y + ".png)"
                    div.style.backgroundSize = settings.cell_size + "px"
                }
                let div1 = document.getElementById("10y3")
                div1.style.backgroundImage = "url(img/" + pill.colors2[pill.next[0]] + "_left.png)"
                let div2 = document.getElementById("11y3")
                div2.style.backgroundImage = "url(img/" + pill.colors2[pill.next[1]] + "_right.png)"


                pill.dont_exist = false
                pill.put_pill_down()
                pill.throwing = false
            }, 500)
        }
        else {
            pill.to_down()
        }
    },

    put_pill_down: function () {
        let id = pill.pills_tab.length - 1
        let poz = "left"
        pill.pills_tab[id].position.forEach((element, index) => {
            let div = document.getElementById(element)
            div.style.backgroundColor = pill.colors[pill.pills_tab[id].colors[index]]
            div.style.backgroundSize = settings.cell_size + "px"
            if (pill.pills_tab[id].direction == "horizontal") {
                if (index == 0) poz = "left"
                if (index == 1) poz = "right"
            } else if (pill.pills_tab[id].direction == "vertical") {
                if (index == 0) poz = "down"
                if (index == 1) poz = "up"
            } else if (pill.pills_tab[id].direction == "dot") {
                poz = "dot"
            }
            div.style.backgroundImage = "url(img/" + pill.colors2[pill.pills_tab[id].colors[index]] + "_" + poz + ".png)"
        })
    },

    put_pill_up: function () {
        let id = pill.pills_tab.length - 1
        pill.pills_tab[id].position.forEach((element) => {
            let div = document.getElementById(element)
            div.style.backgroundColor = ""
            div.style.backgroundImage = ""
        })
    },

    pill_beat: function () {
        let toRemove = []
        //horizontal
        for (let y = 0; y < settings.height; y++) {
            for (let x = 0; x < settings.width - 1; x++) {
                let i = 0
                let yes = false
                while (document.getElementById(x + i + "x" + y).style.backgroundColor == document.getElementById(x + i + 1 + "x" + y).style.backgroundColor && document.getElementById(x + i + "x" + y).style.backgroundColor != "") {
                    i++

                    if (!document.getElementById(x + i + "x" + y).classList.contains("wirus") || !document.getElementById(x + "x" + y).classList.contains("wirus")) {
                        yes = true
                    }

                    if (i >= 3 && document.getElementById(x + i + "x" + y).style.backgroundColor != document.getElementById(x + i + 1 + "x" + y).style.backgroundColor && yes) {
                        toRemove.push({
                            x: x,
                            y: y,
                            i: i,
                            direction: "horizontal"
                        })
                    }
                }
            }
        }
        //vertical
        for (let x = 0; x < settings.width; x++) {
            for (let y = 0; y < settings.height - 1; y++) {
                let i = 0
                let yes = false
                while (document.getElementById(x + "x" + (y + i)).style.backgroundColor == document.getElementById(x + "x" + (y + i + 1)).style.backgroundColor && document.getElementById(x + "x" + (y + i)).style.backgroundColor != "") {
                    i++

                    if (!document.getElementById(x + "x" + (y + i)).classList.contains("wirus") || !document.getElementById(x + "x" + y).classList.contains("wirus")) {
                        yes = true
                    }

                    if (i >= 3 && document.getElementById(x + "x" + (y + i)).style.backgroundColor != document.getElementById(x + "x" + (y + i + 1)).style.backgroundColor && yes) {
                        toRemove.push({
                            x: x,
                            y: y,
                            i: i,
                            direction: "vertical"
                        })
                    }
                }
            }
        }
        //toRemove
        while (toRemove.length > 0) {
            for (let j = 0; j <= toRemove[0].i; j++) {
                if (toRemove[0].direction == "horizontal") {
                    let div = document.getElementById(toRemove[0].x + j + "x" + toRemove[0].y)
                    if (div.classList.contains("wirus")) {
                        div.classList.remove("wirus")
                        board.points += 100
                        board.viruses_count--
                        board.change_points()
                        board.magnifier_contents_removal(div.style.backgroundColor)

                        let color = pill.colors.indexOf(div.style.backgroundColor)
                        if (!color == "") {
                            div.style.backgroundImage = "url(img/" + pill.colors2[color] + "_x.png)"
                            setTimeout(function () {
                                if (div.style.backgroundImage == 'url("img/br_x.png")' || div.style.backgroundImage == 'url("img/bl_x.png")' || div.style.backgroundImage == 'url("img/yl_x.png")' || div.style.backgroundImage == 'url("img/br_o.png")' || div.style.backgroundImage == 'url("img/bl_o.png")' || div.style.backgroundImage == 'url("img/yl_o.png")') {
                                    div.style.backgroundImage = ""
                                }
                            }, 300)
                        }
                    } else {
                        let color = pill.colors.indexOf(div.style.backgroundColor)
                        if (!color == "") {
                            div.style.backgroundImage = "url(img/" + pill.colors2[color] + "_o.png)"
                            setTimeout(function () {
                                if (div.style.backgroundImage == 'url("img/br_x.png")' || div.style.backgroundImage == 'url("img/bl_x.png")' || div.style.backgroundImage == 'url("img/yl_x.png")' || div.style.backgroundImage == 'url("img/br_o.png")' || div.style.backgroundImage == 'url("img/bl_o.png")' || div.style.backgroundImage == 'url("img/yl_o.png")') {
                                    div.style.backgroundImage = ""
                                }
                            }, 300)
                        }
                    }
                    div.style.backgroundColor = ""
                    div.classList.remove("placed")
                    pill.pill_division(toRemove[0].x, toRemove[0].y, j, toRemove[0].direction)
                }
                else {
                    let div = document.getElementById(toRemove[0].x + "x" + (toRemove[0].y + j))
                    if (div.classList.contains("wirus")) {
                        div.classList.remove("wirus")
                        board.points += 100
                        board.viruses_count--
                        board.change_points()
                        board.magnifier_contents_removal(div.style.backgroundColor)

                        let color = pill.colors.indexOf(div.style.backgroundColor)
                        if (!color == "") {
                            div.style.backgroundImage = "url(img/" + pill.colors2[color] + "_x.png)"
                            setTimeout(function () {
                                if (div.style.backgroundImage == 'url("img/br_x.png")' || div.style.backgroundImage == 'url("img/bl_x.png")' || div.style.backgroundImage == 'url("img/yl_x.png")' || div.style.backgroundImage == 'url("img/br_o.png")' || div.style.backgroundImage == 'url("img/bl_o.png")' || div.style.backgroundImage == 'url("img/yl_o.png")') {
                                    div.style.backgroundImage = ""
                                }
                            }, 300)
                        }
                    } else {
                        let color = pill.colors.indexOf(div.style.backgroundColor)
                        if (!color == "") {
                            div.style.backgroundImage = "url(img/" + pill.colors2[color] + "_o.png)"
                            setTimeout(function () {
                                if (div.style.backgroundImage == 'url("img/br_x.png")' || div.style.backgroundImage == 'url("img/bl_x.png")' || div.style.backgroundImage == 'url("img/yl_x.png")' || div.style.backgroundImage == 'url("img/br_o.png")' || div.style.backgroundImage == 'url("img/bl_o.png")' || div.style.backgroundImage == 'url("img/yl_o.png")') {
                                    div.style.backgroundImage = ""
                                }
                            }, 300)
                        }
                    }
                    div.style.backgroundColor = ""
                    div.classList.remove("placed")
                    pill.pill_division(toRemove[0].x, toRemove[0].y, j, toRemove[0].direction)
                }
            }
            toRemove.shift()
            pill.fell = true
        }
    },


    pill_division: function (x, y, j, direction) {
        if (direction == "horizontal") {
            for (let i = 0; i < pill.pills_tab.length; i++) {
                pill.pills_tab[i].position.forEach((element, index) => {
                    if (element == (x + j) + "x" + y) {
                        pill.pills_tab[i].position.splice(index, 1)
                        pill.pills_tab[i].colors.splice(index, 1)
                        pill.pills_tab[i].direction = "dot"
                    }
                })

            }
        }
        else {
            for (let i = 0; i < pill.pills_tab.length; i++) {
                pill.pills_tab[i].position.forEach((element, index) => {
                    if (element == x + "x" + (y + j)) {
                        pill.pills_tab[i].position.splice(index, 1)
                        pill.pills_tab[i].colors.splice(index, 1)
                        pill.pills_tab[i].direction = "dot"
                    }
                })
            }
        }
    },

    pill_reduction: function () {
        for (let i = pill.pills_tab.length - 1; i >= 0; i--) {
            if (pill.pills_tab[i].position.length == 0) {
                pill.pills_tab.splice(i, 1)
            }
        }

        for (let i = 0; i < pill.pills_tab.length; i++) {
            if (pill.pills_tab[i].direction == "dot") {
                let div = document.getElementById(pill.pills_tab[i].position[0])
                div.style.backgroundImage = "url(img/" + pill.colors2[pill.pills_tab[i].colors[0]] + "_dot.png)"
            }
        }
    },

    to_left: function () {
        pill.put_pill_up()
        let id = pill.pills_tab.length - 1
        let pom0 = pill.pills_tab[id].position[0].split("x")
        let pom1 = pill.pills_tab[id].position[1].split("x")
        if (pom0[0] > 0 && pom1[0] > 0) {
            pom0[0]--
            pom1[0]--
            let spr0 = document.getElementById(pom0.join("x"))
            let spr1 = document.getElementById(pom1.join("x"))
            if (!spr0.classList.contains('placed') && !spr1.classList.contains('placed')) {
                pill.pills_tab[id].position[0] = pom0.join("x")
                pill.pills_tab[id].position[1] = pom1.join("x")
            }
        }
        pill.put_pill_down()
    },

    to_right: function () {
        pill.put_pill_up()
        let id = pill.pills_tab.length - 1
        let pom0 = pill.pills_tab[id].position[0].split("x")
        let pom1 = pill.pills_tab[id].position[1].split("x")
        if (pom0[0] < settings.width - 1 && pom1[0] < settings.width - 1) {
            pom0[0]++
            pom1[0]++
            let spr0 = document.getElementById(pom0.join("x"))
            let spr1 = document.getElementById(pom1.join("x"))
            if (!spr0.classList.contains('placed') && !spr1.classList.contains('placed')) {
                pill.pills_tab[id].position[0] = pom0.join("x")
                pill.pills_tab[id].position[1] = pom1.join("x")
            }
        }
        pill.put_pill_down()
    },

    turn_left: function () {
        let id = pill.pills_tab.length - 1
        if (pill.pills_tab[id].direction == "horizontal") {
            let pom = pill.pills_tab[id].position[0].split("x")
            pom[1]--
            let spr = document.getElementById(pom.join("x"))
            if (!spr.classList.contains('placed')) {
                pill.put_pill_up()
                pill.pills_tab[id].position[1] = pom.join("x")
                pill.pills_tab[id].direction = "vertical"
                pill.put_pill_down()
            }
        }
        else {
            let pom = pill.pills_tab[id].position[0].split("x")
            if (pom[0] == settings.width - 1) {
                pom[0]--
                let spr = document.getElementById(pom.join("x"))
                if (!spr.classList.contains('placed')) {
                    pill.put_pill_up()
                    pill.pills_tab[id].position[1] = pill.pills_tab[id].position[0]
                    pill.pills_tab[id].position[0] = pom.join("x")
                    pill.pills_tab[id].colors.unshift(pill.pills_tab[id].colors[1])
                    pill.pills_tab[id].colors.pop()
                    pill.pills_tab[id].direction = "horizontal"
                    pill.put_pill_down()
                }
            }
            else {
                pom[0]++
                let spr = document.getElementById(pom.join("x"))
                if (!spr.classList.contains('placed')) {
                    pill.put_pill_up()
                    pill.pills_tab[id].position[1] = pom.join("x")
                    pill.pills_tab[id].colors.unshift(pill.pills_tab[id].colors[1])
                    pill.pills_tab[id].colors.pop()
                    pill.pills_tab[id].direction = "horizontal"
                    pill.put_pill_down()
                }
            }
        }
    },

    turn_right: function () {
        let id = pill.pills_tab.length - 1
        if (pill.pills_tab[id].direction == "horizontal") {
            let pom = pill.pills_tab[id].position[0].split("x")
            pom[1]--
            let spr = document.getElementById(pom.join("x"))
            if (!spr.classList.contains('placed')) {
                pill.put_pill_up()
                pill.pills_tab[id].position[1] = pom.join("x")
                pill.pills_tab[id].colors.unshift(pill.pills_tab[id].colors[1])
                pill.pills_tab[id].colors.pop()
                pill.pills_tab[id].direction = "vertical"
                pill.put_pill_down()
            }
        }
        else {
            let pom = pill.pills_tab[id].position[0].split("x")
            if (pom[0] == settings.width - 1) {
                pom[0]--
                let spr = document.getElementById(pom.join("x"))
                if (!spr.classList.contains('placed')) {
                    pill.put_pill_up()
                    pill.pills_tab[id].position[1] = pill.pills_tab[id].position[0]
                    pill.pills_tab[id].position[0] = pom.join("x")
                    pill.pills_tab[id].direction = "horizontal"
                    pill.put_pill_down()
                }
            }
            else {
                pom[0]++
                let spr = document.getElementById(pom.join("x"))
                if (!spr.classList.contains('placed')) {
                    pill.put_pill_up()
                    pill.pills_tab[id].position[1] = pom.join("x")
                    pill.pills_tab[id].direction = "horizontal"
                    pill.put_pill_down()
                }
            }
        }
    },

    falling: function () {
        clearInterval(pill.move)
        pill.move = setInterval(pill.pill_throw, 50)
        pill.falls = false
    },

    fell_function: function () {
        if (pill.fell) {
            let opad = setInterval(function () {
                pill.fell = false
                for (let i = settings.height; i >= 0; i--) {
                    pill.pills_tab.forEach((element, id) => {
                        if (element.position[0].split("x")[1] == i) {
                            if (element.direction == "vertical" || element.direction == "dot") {

                                let pom = element.position[0].split("x")
                                pom[1]++
                                let spr = document.getElementById(pom.join("x"))
                                if (!spr.classList.contains('placed')) {
                                    //put_pill_up()
                                    element.position.forEach((el) => {
                                        let div = document.getElementById(el)
                                        div.style.backgroundColor = ""
                                        div.style.backgroundImage = ""
                                        div.classList.remove("placed")
                                    })

                                    element.position.forEach((el, index) => {
                                        let pom = el.split("x")
                                        pom[1]++
                                        element.position[index] = pom.join("x")
                                    })

                                    //put_pill_down()
                                    let poz = "left"
                                    element.position.forEach((el, index) => {
                                        let div = document.getElementById(el)
                                        div.style.backgroundColor = pill.colors[pill.pills_tab[id].colors[index]]
                                        div.style.backgroundSize = settings.cell_size + "px"
                                        if (pill.pills_tab[id].direction == "horizontal") {
                                            if (index == 0) poz = "left"
                                            if (index == 1) poz = "right"
                                        } else if (pill.pills_tab[id].direction == "vertical") {
                                            if (index == 0) poz = "down"
                                            if (index == 1) poz = "up"
                                        } else if (pill.pills_tab[id].direction == "dot") {
                                            poz = "dot"
                                        }
                                        div.style.backgroundImage = "url(./img/" + pill.colors2[pill.pills_tab[id].colors[index]] + "_" + poz + ".png)"
                                        div.classList.add("placed")
                                    })
                                    pill.fell = true
                                }
                            }
                            else if (element.direction == "horizontal") {
                                let pom0 = element.position[0].split("x")
                                let pom1 = element.position[1].split("x")
                                pom0[1]++
                                pom1[1]++
                                let spr0 = document.getElementById(pom0.join("x"))
                                let spr1 = document.getElementById(pom1.join("x"))
                                if (!spr0.classList.contains('placed') && !spr1.classList.contains('placed')) {
                                    //put_pill_up()
                                    element.position.forEach((el) => {
                                        let div = document.getElementById(el)
                                        div.style.backgroundColor = ""
                                        div.style.backgroundImage = ""
                                        div.classList.remove("placed")
                                    })

                                    element.position.forEach((el, index) => {
                                        let pom = el.split("x")
                                        pom[1]++
                                        element.position[index] = pom.join("x")
                                    })

                                    //put_pill_down()
                                    let poz = "left"
                                    element.position.forEach((el, index) => {
                                        let div = document.getElementById(el)
                                        div.style.backgroundColor = pill.colors[pill.pills_tab[id].colors[index]]
                                        div.style.backgroundSize = settings.cell_size + "px"
                                        if (pill.pills_tab[id].direction == "horizontal") {
                                            if (index == 0) poz = "left"
                                            if (index == 1) poz = "right"
                                        } else if (pill.pills_tab[id].direction == "vertical") {
                                            if (index == 0) poz = "down"
                                            if (index == 1) poz = "up"
                                        } else if (pill.pills_tab[id].direction == "dot") {
                                            poz = "dot"
                                        }
                                        div.style.backgroundImage = "url(./img/" + pill.colors2[pill.pills_tab[id].colors[index]] + "_" + poz + ".png)"
                                        div.classList.add("placed")
                                    })
                                    pill.fell = true
                                }
                            }
                        }
                    })
                }
                if (!pill.fell) {
                    clearInterval(opad)
                    pill.pill_beat()
                    pill.pill_reduction()
                    pill.fell_function()
                    if (!pill.fell && !board.end)
                        pill.after_fell()
                }
            }, 50)
        }

    },
    after_fell: function () {
        pill.pill_throw()
        pill.move = setInterval(pill.pill_throw, 1000)
        pill.falls = true
    },
    hand: function () {
        board.pill_throw = [
            { hand: "up", color: [pill.colors2[pill.next[0]] + "_left.png", pill.colors2[pill.next[1]] + "_right.png"], position: ["10y3", "11y3"] },
            { hand: "up", color: [pill.colors2[pill.next[0]] + "_down.png", pill.colors2[pill.next[1]] + "_up.png"], position: ["10y3", "10y2"] },
            { hand: "up", color: [pill.colors2[pill.next[1]] + "_left.png", pill.colors2[pill.next[0]] + "_right.png"], position: ["9y2", "10y2"] },
            { hand: "up", color: [pill.colors2[pill.next[1]] + "_down.png", pill.colors2[pill.next[0]] + "_up.png"], position: ["9y2", "9y1"] },

            { hand: "middle", color: [pill.colors2[pill.next[0]] + "_left.png", pill.colors2[pill.next[1]] + "_right.png"], position: ["8y1", "9y1"] },
            { hand: "middle", color: [pill.colors2[pill.next[0]] + "_down.png", pill.colors2[pill.next[1]] + "_up.png"], position: ["8y1", "8y0"] },
            { hand: "middle", color: [pill.colors2[pill.next[1]] + "_left.png", pill.colors2[pill.next[0]] + "_right.png"], position: ["7y1", "8y1"] },
            { hand: "down", color: [pill.colors2[pill.next[1]] + "_down.png", pill.colors2[pill.next[0]] + "_up.png"], position: ["7y1", "7y0"] },

            { hand: "down", color: [pill.colors2[pill.next[0]] + "_left.png", pill.colors2[pill.next[1]] + "_right.png"], position: ["6y1", "7y1"] },
            { hand: "down", color: [pill.colors2[pill.next[0]] + "_down.png", pill.colors2[pill.next[1]] + "_up.png"], position: ["6y1", "6y0"] },
            { hand: "down", color: [pill.colors2[pill.next[1]] + "_left.png", pill.colors2[pill.next[0]] + "_right.png"], position: ["5y1", "6y1"] },
            { hand: "down", color: [pill.colors2[pill.next[1]] + "_down.png", pill.colors2[pill.next[0]] + "_up.png"], position: ["5y1", "5y0"] },

            { hand: "down", color: [pill.colors2[pill.next[0]] + "_left.png", pill.colors2[pill.next[1]] + "_right.png"], position: ["4y1", "5y1"] },
            { hand: "down", color: [pill.colors2[pill.next[0]] + "_down.png", pill.colors2[pill.next[1]] + "_up.png"], position: ["4y1", "4y0"] },
            { hand: "down", color: [pill.colors2[pill.next[1]] + "_left.png", pill.colors2[pill.next[0]] + "_right.png"], position: ["3y1", "4y1"] },
            { hand: "down", color: [pill.colors2[pill.next[1]] + "_down.png", pill.colors2[pill.next[0]] + "_up.png"], position: ["3y1", "3y0"] },

            { hand: "down", color: [pill.colors2[pill.next[0]] + "_left.png", pill.colors2[pill.next[1]] + "_right.png"], position: ["2y1", "3y1"] },
            { hand: "down", color: [pill.colors2[pill.next[0]] + "_down.png", pill.colors2[pill.next[1]] + "_up.png"], position: ["2y1", "2y0"] },
            { hand: "down", color: [pill.colors2[pill.next[1]] + "_left.png", pill.colors2[pill.next[0]] + "_right.png"], position: ["1y2", "2y2"] },
            { hand: "down", color: [pill.colors2[pill.next[1]] + "_down.png", pill.colors2[pill.next[0]] + "_up.png"], position: ["1y2", "1y1"] },

            { hand: "down", color: [pill.colors2[pill.next[0]] + "_left.png", pill.colors2[pill.next[1]] + "_right.png"], position: ["0y2", "1y2"] },
            { hand: "down", color: [pill.colors2[pill.next[0]] + "_left.png", pill.colors2[pill.next[1]] + "_right.png"], position: ["0y3", "1y3"] },
            { hand: "down", color: [pill.colors2[pill.next[0]] + "_left.png", pill.colors2[pill.next[1]] + "_right.png"], position: ["0y4", "1y4"] },
            { hand: "down", color: [pill.colors2[pill.next[0]] + "_left.png", pill.colors2[pill.next[1]] + "_right.png"], position: ["0y5", "1y5"] },
            { hand: "down", color: [pill.colors2[pill.next[0]] + "_left.png", pill.colors2[pill.next[1]] + "_right.png"], position: ["0y6", "1y6"] }
        ]
    }

}
let intervals = {
    left: 0,
    nleft: true,
    oleft: 0,
    noleft: true,
    right: 0,
    nright: true,
    oright: 0,
    noright: true,
}
function controls(e) {
    if (pill.falls && !pill.throwing) {
        if ((e.keyCode == 37 || e.keyCode == 65) && intervals.nleft) {
            pill.to_left()
            intervals.left = setInterval(pill.to_left, 200)
            intervals.nleft = false
        }
        else if ((e.keyCode == 38 || e.keyCode == 87) && intervals.noleft) {
            pill.turn_left()
            intervals.oleft = setInterval(pill.turn_left, 200)
            intervals.noleft = false
        }
        else if ((e.keyCode == 39 || e.keyCode == 68) && intervals.nright) {
            pill.to_right()
            intervals.right = setInterval(pill.to_right, 200)
            intervals.nright = false
        }
        else if (e.keyCode == 16 && intervals.noright) {
            pill.turn_right()
            intervals.oright = setInterval(pill.turn_right, 200)
            intervals.noright = false
        }
        else if (e.keyCode == 40 || e.keyCode == 83) {
            if (!pill.throwing)
                pill.falling()
        }
    } if (e.keyCode == 17) {
        if (board.end && board.win) {
            if (board.level < 20)
                board.level++

            document.getElementById("stageCompleted").style.display = "none"
            clearInterval(board.dance_interval)
            board.board_generation()
        }
    }
}
function stop(e) {
    if ((e.keyCode == 37 || e.keyCode == 65) && !intervals.nleft) {
        clearInterval(intervals.left)
        intervals.nleft = true
    }
    else if ((e.keyCode == 38 || e.keyCode == 87) && !intervals.noleft) {
        clearInterval(intervals.oleft)
        intervals.noleft = true
    }
    else if ((e.keyCode == 39 || e.keyCode == 68) && !intervals.nright) {
        clearInterval(intervals.right)
        intervals.nright = true
    }
    else if (e.keyCode == 16 && !intervals.noright) {
        clearInterval(intervals.oright)
        intervals.noright = true
    }
}
document.getElementById("changeStage").addEventListener("click", function () {
    board.level = parseInt(document.getElementById("level").value)
    document.getElementById("stageCompleted").style.display = "none"
    document.getElementById("gameOver").style.display = "none"
    document.getElementById("gameOver_dr").style.display = "none"
    clearInterval(pill.move)
    clearInterval(board.dance_interval)
    board.board_generation()
})
board.board_generation()