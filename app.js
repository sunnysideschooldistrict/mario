"use strict";
const ustawienia = {
    rozKom: 16,
    szer: 8,
    wys: 16
}
let plansza = {
    wirusy: [],
    ileWirusow: 4,
    level: 0,
    pozycjaWirusow: [],
    kolizja: false,
    koniec: false,
    punkty: 0,
    rzutRaczka: 0,
    taniecInterval: 0,
    wygrana: false,
    zbitoWirusa: "",
    kolory_planszy: ["#901829", "#008267", "#ffb68c", "#837e85", "#123eb2"],
    lupa: {
        obrazki: [{ img: document.getElementById("br_lupa"), kolor: "br", zbito: false }, { img: document.getElementById("bl_lupa"), kolor: "bl", zbito: false }, { img: document.getElementById("yl_lupa"), kolor: "yl", zbito: false }],
        pozycje: [
            [{ left: 2 * ustawienia.rozKom, top: 16 * ustawienia.rozKom }, { left: 6 * ustawienia.rozKom, top: 19 * ustawienia.rozKom }, { left: 7 * ustawienia.rozKom, top: 14 * ustawienia.rozKom }],
            [{ left: 2 * ustawienia.rozKom, top: 17 * ustawienia.rozKom }, { left: 7 * ustawienia.rozKom, top: 19 * ustawienia.rozKom }, { left: 6 * ustawienia.rozKom, top: 14 * ustawienia.rozKom }],
            [{ left: 3 * ustawienia.rozKom, top: 18 * ustawienia.rozKom }, { left: 8 * ustawienia.rozKom, top: 18 * ustawienia.rozKom }, { left: 5 * ustawienia.rozKom, top: 14 * ustawienia.rozKom }],
            [{ left: 3 * ustawienia.rozKom, top: 19 * ustawienia.rozKom }, { left: 8 * ustawienia.rozKom, top: 17 * ustawienia.rozKom }, { left: 4 * ustawienia.rozKom, top: 14 * ustawienia.rozKom }],
            [{ left: 4 * ustawienia.rozKom, top: 19 * ustawienia.rozKom }, { left: 8 * ustawienia.rozKom, top: 16 * ustawienia.rozKom }, { left: 3 * ustawienia.rozKom, top: 15 * ustawienia.rozKom }],
            [{ left: 5 * ustawienia.rozKom, top: 19 * ustawienia.rozKom }, { left: 8 * ustawienia.rozKom, top: 15 * ustawienia.rozKom }, { left: 2 * ustawienia.rozKom, top: 16 * ustawienia.rozKom }],
        ]
    },
    i: 0,
    pozycja_i: 0,
    go_i: 0,
    taniec: function () {
        if (plansza.i == 1) {
            for (let j = 0; j < plansza.lupa.obrazki.length; j++) {
                if (!plansza.lupa.obrazki[j].zbito)
                    plansza.lupa.obrazki[j].img.src = "./img/lupa/" + plansza.lupa.obrazki[j].kolor + "/1.png"
            }
        } else if (plansza.i == 2) {
            for (let j = 0; j < plansza.lupa.obrazki.length; j++) {
                if (!plansza.lupa.obrazki[j].zbito)
                    plansza.lupa.obrazki[j].img.src = "./img/lupa/" + plansza.lupa.obrazki[j].kolor + "/2.png"
            }

        } else if (plansza.i == 3) {
            for (let j = 0; j < plansza.lupa.obrazki.length; j++) {
                if (!plansza.lupa.obrazki[j].zbito)
                    plansza.lupa.obrazki[j].img.src = "./img/lupa/" + plansza.lupa.obrazki[j].kolor + "/3.png"
            }

        } else if (plansza.i == 4) {
            for (let j = 0; j < plansza.lupa.obrazki.length; j++) {
                if (!plansza.lupa.obrazki[j].zbito)
                    plansza.lupa.obrazki[j].img.src = "./img/lupa/" + plansza.lupa.obrazki[j].kolor + "/2.png"
            }

        } else {
            plansza.i = 0
            if (plansza.zbitoWirusa == "") {
                for (let j = 0; j < plansza.lupa.obrazki.length; j++) {
                    plansza.lupa.obrazki[j].img.style.left = plansza.lupa.pozycje[plansza.pozycja_i][j].left + "px"
                    plansza.lupa.obrazki[j].img.style.top = plansza.lupa.pozycje[plansza.pozycja_i][j].top + "px"
                }
                plansza.pozycja_i++
                if (plansza.pozycja_i == plansza.lupa.pozycje.length) {
                    plansza.pozycja_i = 0
                    plansza.lupa.obrazki.unshift(plansza.lupa.obrazki[2])
                    plansza.lupa.obrazki.pop()
                }
            }
        }
        plansza.i++
    },
    przegrana: function () {
        if (plansza.go_i == 1) {
            for (let j = 0; j < plansza.lupa.obrazki.length; j++) {
                plansza.lupa.obrazki[j].img.src = "./img/lupa/" + plansza.lupa.obrazki[j].kolor + "/2.png"
            }
        } else if (plansza.go_i == 2) {
            for (let j = 0; j < plansza.lupa.obrazki.length; j++) {
                plansza.lupa.obrazki[j].img.src = "./img/lupa/" + plansza.lupa.obrazki[j].kolor + "/4.png"
            }
        } else {
            plansza.go_i = 0
        }
        plansza.go_i++
    },
    generowaniePlanszy: function () {
        plansza.wirusy = []
        plansza.pozycjaWirusow = []
        plansza.kolizja = false
        plansza.koniec = false
        plansza.rzutRaczka = 0
        plansza.wygrana = false
        plansza.ileWirusow = (plansza.level + 1) * 4

        tabletka.nieMa = true
        tabletka.spadaSobie = true
        tabletka.opadlo = false
        tabletka.tabletkiTab = []

        for (let i = 0; i < plansza.lupa.obrazki.length; i++) {
            plansza.lupa.obrazki[i].img.style.display = "inline"
        }

        let koloreki = document.getElementsByClassName("tlo")
        let nrPoziomu = plansza.level
        while (nrPoziomu > 4) nrPoziomu -= 5
        for (let i = 0; i < koloreki.length; i++) {
            koloreki[i].style.backgroundColor = plansza.kolory_planszy[nrPoziomu]
        }

        plansza.taniecInterval = setInterval(plansza.taniec, 200)
        plansza.generowanieReki()
        //dodanie liczby wirusów
        let virus = document.getElementById("virus")
        virus.innerHTML = ""
        let wirusy = "" + plansza.ileWirusow
        for (let i = 0; i < wirusy.length; i++) {
            let img = document.createElement("img")
            img.src = "./img/cyfry/" + wirusy[i] + ".png"
            img.style.width = ustawienia.rozKom + "px"
            img.style.height = ustawienia.rozKom + "px"
            virus.appendChild(img)
        }

        if (localStorage.getItem("topScore") == null)
            localStorage.setItem("topScore", 0)

        //dodanie topScore
        let topScore = document.getElementById("topScore")
        topScore.innerHTML = ""
        let punkty = localStorage.getItem("topScore")
        for (let i = 0; i < punkty.length; i++) {
            let img = document.createElement("img")
            img.src = "./img/cyfry/" + punkty[i] + ".png"
            img.style.width = ustawienia.rozKom + "px"
            img.style.height = ustawienia.rozKom + "px"
            topScore.appendChild(img)
        }
        //dodanie levelu
        let levelDiv = document.getElementById("levelDiv")
        levelDiv.innerHTML = ""
        let level = "" + plansza.level
        for (let i = 0; i < level.length; i++) {
            let img = document.createElement("img")
            img.src = "./img/cyfry/" + level[i] + ".png"
            img.style.width = ustawienia.rozKom + "px"
            img.style.height = ustawienia.rozKom + "px"
            levelDiv.appendChild(img)
        }

        document.getElementById("gameDiv").innerHTML = ""
        for (let y = -1; y <= ustawienia.wys; y++) {
            for (let x = 0; x <= ustawienia.szer; x++) {
                let div = document.createElement("div")
                if (y == ustawienia.wys || x == ustawienia.szer || (y == -1 && (x == 0 || x == 1 || x == 2 || x == 5 || x == 6 || x == 7))) {
                    div.classList.add("postawiony")
                }
                div.id = x + "x" + y
                div.style.width = ustawienia.rozKom + "px"
                div.style.height = ustawienia.rozKom + "px"
                let gameDiv = document.getElementById("gameDiv")
                gameDiv.style.width = ustawienia.rozKom * (ustawienia.szer + 1) + "px"
                gameDiv.style.height = ustawienia.rozKom * ustawienia.wys + "px"
                gameDiv.appendChild(div)
            }
        }
        // losowanie kolorów wirusów
        for (let i = 0; i < plansza.ileWirusow; i++) {
            if (i % 3 == 0)
                plansza.wirusy.push("brown")
            if (i % 3 == 1)
                plansza.wirusy.push("blue")
            if (i % 3 == 2)
                plansza.wirusy.push("yellow")
        }
        for (let i = 0; i < plansza.wirusy.length; i++) {
            if (plansza.level < 18) {
                var pola = 6
            } else if (plansza.level < 20) {
                var pola = 5
            } else if (plansza.level == 20) {
                var pola = 4
            }
            let x = Math.floor(Math.random() * ustawienia.szer)
            let y = Math.floor(Math.random() * (ustawienia.wys - pola)) + pola
            plansza.pozycjaWirusow.push([x, y])
            if (plansza.pozycjaWirusow.length > 1) {
                do {
                    plansza.kolizja = false
                    for (let j = 0; j < plansza.pozycjaWirusow.length; j++) {
                        if (plansza.pozycjaWirusow[plansza.pozycjaWirusow.length - 1].toString() == plansza.pozycjaWirusow[j].toString() && j != plansza.pozycjaWirusow.length - 1) {
                            plansza.kolizja = true
                            let xx = Math.floor(Math.random() * ustawienia.szer)
                            let yy = Math.floor(Math.random() * (ustawienia.wys - pola)) + pola
                            plansza.pozycjaWirusow[plansza.pozycjaWirusow.length - 1] = [xx, yy]
                        }
                    }
                } while (plansza.kolizja)
            }
            let div = document.getElementById(plansza.pozycjaWirusow[i][0] + "x" + plansza.pozycjaWirusow[i][1])
            div.classList.add("postawiony")
            div.classList.add("wirus")
            div.style.backgroundColor = plansza.wirusy[i]
            div.style.backgroundImage = "url(./img/covid_" + plansza.wirusy[i] + ".png)"
            div.style.backgroundSize = ustawienia.rozKom + "px"
        }
        tabletka.rzutTabletki()
        tabletka.ruch = setInterval(tabletka.rzutTabletki, 1000)
    },
    zmianaPunktow: function () {
        //virus
        let virus = document.getElementById("virus")
        virus.innerHTML = ""
        let wirusy = "" + plansza.ileWirusow
        for (let i = 0; i < wirusy.length; i++) {
            let img = document.createElement("img")
            img.src = "./img/cyfry/" + wirusy[i] + ".png"
            img.style.width = ustawienia.rozKom + "px"
            img.style.height = ustawienia.rozKom + "px"
            virus.appendChild(img)
        }

        //score
        let score = document.getElementById("score")
        score.innerHTML = ""
        let punkty = "" + plansza.punkty
        for (let i = 0; i < punkty.length; i++) {
            let img = document.createElement("img")
            img.src = "./img/cyfry/" + punkty[i] + ".png"
            img.style.width = ustawienia.rozKom + "px"
            img.style.height = ustawienia.rozKom + "px"
            score.appendChild(img)
        }
    },
    generowanieReki: function () {
        document.getElementById("rzutReka").innerHTML = ""
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 12; x++) {
                let div = document.createElement("div")
                div.id = x + "y" + y
                div.style.width = ustawienia.rozKom + "px"
                div.style.height = ustawienia.rozKom + "px"
                let rzutReka = document.getElementById("rzutReka")
                rzutReka.style.width = ustawienia.rozKom * 12 + "px"
                rzutReka.style.height = ustawienia.rozKom * 8 + "px"
                rzutReka.appendChild(div)
            }
        }
    },
    mazanieLupy: function (kolor) {
        let kolorSqrut = ""
        if (kolor == "brown") kolorSqrut = "br"
        if (kolor == "blue") kolorSqrut = "bl"
        if (kolor == "yellow") kolorSqrut = "yl"
        plansza.zbitoWirusa = kolorSqrut
        for (let i = 0; i < plansza.lupa.obrazki.length; i++) {
            if (plansza.lupa.obrazki[i].kolor == kolorSqrut) {
                plansza.lupa.obrazki[i].zbito = true
            }
        }

        let wirusy = document.getElementsByClassName("wirus")
        let br = 0
        let bl = 0
        let yl = 0
        for (let i = 0; i < wirusy.length; i++) {
            if (wirusy[i].style.backgroundColor == "brown") br++
            if (wirusy[i].style.backgroundColor == "blue") bl++
            if (wirusy[i].style.backgroundColor == "yellow") yl++
        }
        let br_lupa = document.getElementById("br_lupa")
        let bl_lupa = document.getElementById("bl_lupa")
        let yl_lupa = document.getElementById("yl_lupa")

        let i = 0
        let luppa = document.getElementById(kolorSqrut + "_lupa")
        let aua = setInterval(function () {
            if (i == 0) {
                i = 1
                luppa.src = "./img/lupa/" + kolorSqrut + "/d1.png"
            } else {
                i = 0
                luppa.src = "./img/lupa/" + kolorSqrut + "/d2.png"
            }
        }, 200)

        setTimeout(function () {
            plansza.zbitoWirusa = ""
            for (let i = 0; i < plansza.lupa.obrazki.length; i++) {
                if (plansza.lupa.obrazki[i].kolor == kolorSqrut) {
                    plansza.lupa.obrazki[i].zbito = false
                }
            }
            clearInterval(aua)
            if (br == 0) br_lupa.style.display = "none"
            if (bl == 0) bl_lupa.style.display = "none"
            if (yl == 0) yl_lupa.style.display = "none"
        }, 2000);
    }
}
let tabletka = {
    tabletkiTab: [],
    nieMa: true,
    rzuca: true,
    spadaSobie: true,
    opadlo: false,
    kolorki: ["", "brown", "blue", "yellow"],
    kolorki2: ["", "br", "bl", "yl"],
    ruch: 0,
    nastepna: [Math.floor(Math.random() * 3) + 1, Math.floor(Math.random() * 3) + 1],

    wDol: function () {
        let id = tabletka.tabletkiTab.length - 1
        let pom0 = tabletka.tabletkiTab[id].pozycja[0].split("x")
        let pom1 = tabletka.tabletkiTab[id].pozycja[1].split("x")
        let div0 = document.getElementById(pom0.join("x"))
        let div1 = document.getElementById(pom1.join("x"))
        pom0[1]++
        pom1[1]++
        let spr0 = document.getElementById(pom0.join("x"))
        let spr1 = document.getElementById(pom1.join("x"))
        if (spr0.classList.contains('postawiony') || spr1.classList.contains('postawiony')) {
            tabletka.nieMa = true
            div0.classList.add("postawiony")
            div1.classList.add("postawiony")
            tabletka.czujSieBity()
            tabletka.redukcjaTabletek()
            tabletka.opadanie()

            if (plansza.ileWirusow == 0) {
                clearInterval(tabletka.ruch)
                plansza.koniec = true
                plansza.wygrana = true
                if (plansza.punkty > parseInt(localStorage.getItem("topScore")))
                    localStorage.setItem("topScore", plansza.punkty)
                let sc = document.getElementById("sc")
                sc.style.display = "inline"
            }
            let d1 = document.getElementById("3x0")
            let d2 = document.getElementById("4x0")
            if (d1.classList.contains('postawiony') || d2.classList.contains('postawiony')) {
                clearInterval(tabletka.ruch)
                plansza.koniec = true
                if (plansza.punkty > parseInt(localStorage.getItem("topScore")))
                    localStorage.setItem("topScore", plansza.punkty)
                let go = document.getElementById("go")
                let go_dr = document.getElementById("go_dr")
                clearInterval(plansza.taniecInterval)
                plansza.taniecInterval = setInterval(plansza.przegrana, 200)
                go.style.display = "inline"
                go_dr.style.display = "inline"
            }

            if (plansza.koniec) return

            //ruszanie na nowo
            clearInterval(tabletka.ruch)
            if (!tabletka.opadlo) {
                tabletka.rzutTabletki()
                tabletka.ruch = setInterval(tabletka.rzutTabletki, 1000)
                tabletka.spadaSobie = true
            }
        }
        else {
            tabletka.odstawiajKloca()
            let id = tabletka.tabletkiTab.length - 1
            tabletka.tabletkiTab[id].pozycja.forEach((element, index) => {
                let pom = element.split("x")
                pom[1]++
                tabletka.tabletkiTab[id].pozycja[index] = pom.join("x")
            })
            tabletka.stawiajKloca()
        }
    },

    rzutTabletki: function () {
        if (tabletka.nieMa) {
            tabletka.rzuca = true
            tabletka.rasia()
            let i = 0
            let xD = setInterval(function () {
                if (plansza.rzutRaczka[i].reka == "up") {
                    document.getElementById("11y7").style.backgroundImage = ""
                    for (let y = 1; y < 4; y++) {
                        let div = document.getElementById("11y" + (y + 3))
                        div.style.backgroundImage = "url(img/hands/up_" + y + ".png)"
                        div.style.backgroundSize = ustawienia.rozKom + "px"
                    }
                } else if (plansza.rzutRaczka[i].reka == "middle") {
                    document.getElementById("11y4").style.backgroundImage = ""
                    for (let y = 1; y < 3; y++) {
                        for (let x = 1; x < 3; x++) {
                            let div = document.getElementById((x + 9) + "y" + (y + 4))
                            div.style.backgroundImage = "url(img/hands/middle" + y + x + ".png)"
                            div.style.backgroundSize = ustawienia.rozKom + "px"
                        }
                    }
                } else if (plansza.rzutRaczka[i].reka == "down") {
                    let div = document.getElementById("11y5").style.backgroundImage = ""
                    div = document.getElementById("10y5").style.backgroundImage = ""
                    div = document.getElementById("10y6").style.backgroundImage = ""
                    for (let y = 1; y < 3; y++) {
                        let div = document.getElementById("11y" + (y + 5))
                        div.style.backgroundImage = "url(img/hands/down_" + y + ".png)"
                        div.style.backgroundSize = ustawienia.rozKom + "px"
                    }
                }
                for (let j = 0; j < 2; j++) {
                    if (i > 0) {
                        let del = document.getElementById(plansza.rzutRaczka[i - 1].pozycja[j])
                        del.style.backgroundImage = ""
                    }
                    let div = document.getElementById(plansza.rzutRaczka[i].pozycja[j])
                    div.style.backgroundImage = "url(img/" + plansza.rzutRaczka[i].kolor[j] + ")"
                    div.style.backgroundSize = ustawienia.rozKom + "px"
                }

                i++
                if (i == plansza.rzutRaczka.length) {
                    clearInterval(xD)
                    let del = document.getElementById("0y6")
                    del.style.backgroundImage = ""
                    del = document.getElementById("1y6")
                    del.style.backgroundImage = ""
                }
            }, 20)
            setTimeout(function () {
                tabletka.tabletkiTab.push({
                    kolory: tabletka.nastepna,
                    zmianaKol: true,
                    pozycja: ["3x0", "4x0"],
                    poza: "poziom"
                })
                tabletka.nastepna = [Math.floor(Math.random() * 3) + 1, Math.floor(Math.random() * 3) + 1]

                document.getElementById("11y7").style.backgroundImage = ""
                for (let y = 1; y < 4; y++) {
                    let div = document.getElementById("11y" + (y + 3))
                    div.style.backgroundImage = "url(img/hands/up_" + y + ".png)"
                    div.style.backgroundSize = ustawienia.rozKom + "px"
                }
                let div1 = document.getElementById("10y3")
                div1.style.backgroundImage = "url(img/" + tabletka.kolorki2[tabletka.nastepna[0]] + "_left.png)"
                let div2 = document.getElementById("11y3")
                div2.style.backgroundImage = "url(img/" + tabletka.kolorki2[tabletka.nastepna[1]] + "_right.png)"


                tabletka.nieMa = false
                tabletka.stawiajKloca()
                tabletka.rzuca = false
            }, 500)
        }
        else {
            tabletka.wDol()
        }
    },

    stawiajKloca: function () {
        let id = tabletka.tabletkiTab.length - 1
        let poz = "left"
        tabletka.tabletkiTab[id].pozycja.forEach((element, index) => {
            let div = document.getElementById(element)
            div.style.backgroundColor = tabletka.kolorki[tabletka.tabletkiTab[id].kolory[index]]
            div.style.backgroundSize = ustawienia.rozKom + "px"
            if (tabletka.tabletkiTab[id].poza == "poziom") {
                if (index == 0) poz = "left"
                if (index == 1) poz = "right"
            } else if (tabletka.tabletkiTab[id].poza == "pion") {
                if (index == 0) poz = "down"
                if (index == 1) poz = "up"
            } else if (tabletka.tabletkiTab[id].poza == "kropka") {
                poz = "dot"
            }
            div.style.backgroundImage = "url(img/" + tabletka.kolorki2[tabletka.tabletkiTab[id].kolory[index]] + "_" + poz + ".png)"
        })
    },

    odstawiajKloca: function () {
        let id = tabletka.tabletkiTab.length - 1
        tabletka.tabletkiTab[id].pozycja.forEach((element) => {
            let div = document.getElementById(element)
            div.style.backgroundColor = ""
            div.style.backgroundImage = ""
        })
    },

    czujSieBity: function () {
        let zbijanie = []
        //poziom
        for (let y = 0; y < ustawienia.wys; y++) {
            for (let x = 0; x < ustawienia.szer - 1; x++) {
                let i = 0
                let tak = false
                while (document.getElementById(x + i + "x" + y).style.backgroundColor == document.getElementById(x + i + 1 + "x" + y).style.backgroundColor && document.getElementById(x + i + "x" + y).style.backgroundColor != "") {
                    i++

                    if (!document.getElementById(x + i + "x" + y).classList.contains("wirus") || !document.getElementById(x + "x" + y).classList.contains("wirus")) {
                        tak = true
                    }

                    if (i >= 3 && document.getElementById(x + i + "x" + y).style.backgroundColor != document.getElementById(x + i + 1 + "x" + y).style.backgroundColor && tak) {
                        zbijanie.push({
                            x: x,
                            y: y,
                            i: i,
                            poza: "poziom"
                        })
                    }
                }
            }
        }
        //pion
        for (let x = 0; x < ustawienia.szer; x++) {
            for (let y = 0; y < ustawienia.wys - 1; y++) {
                let i = 0
                let tak = false
                while (document.getElementById(x + "x" + (y + i)).style.backgroundColor == document.getElementById(x + "x" + (y + i + 1)).style.backgroundColor && document.getElementById(x + "x" + (y + i)).style.backgroundColor != "") {
                    i++

                    if (!document.getElementById(x + "x" + (y + i)).classList.contains("wirus") || !document.getElementById(x + "x" + y).classList.contains("wirus")) {
                        tak = true
                    }

                    if (i >= 3 && document.getElementById(x + "x" + (y + i)).style.backgroundColor != document.getElementById(x + "x" + (y + i + 1)).style.backgroundColor && tak) {
                        zbijanie.push({
                            x: x,
                            y: y,
                            i: i,
                            poza: "pion"
                        })
                    }
                }
            }
        }
        //zbijanie
        while (zbijanie.length > 0) {
            for (let j = 0; j <= zbijanie[0].i; j++) {
                if (zbijanie[0].poza == "poziom") {
                    let div = document.getElementById(zbijanie[0].x + j + "x" + zbijanie[0].y)
                    if (div.classList.contains("wirus")) {
                        div.classList.remove("wirus")
                        plansza.punkty += 100
                        plansza.ileWirusow--
                        plansza.zmianaPunktow()
                        plansza.mazanieLupy(div.style.backgroundColor)

                        let kolor = tabletka.kolorki.indexOf(div.style.backgroundColor)
                        if (!kolor == "") {
                            div.style.backgroundImage = "url(img/" + tabletka.kolorki2[kolor] + "_x.png)"
                            setTimeout(function () {
                                if (div.style.backgroundImage == 'url("img/br_x.png")' || div.style.backgroundImage == 'url("img/bl_x.png")' || div.style.backgroundImage == 'url("img/yl_x.png")' || div.style.backgroundImage == 'url("img/br_o.png")' || div.style.backgroundImage == 'url("img/bl_o.png")' || div.style.backgroundImage == 'url("img/yl_o.png")') {
                                    div.style.backgroundImage = ""
                                }
                            }, 300)
                        }
                    } else {
                        let kolor = tabletka.kolorki.indexOf(div.style.backgroundColor)
                        if (!kolor == "") {
                            div.style.backgroundImage = "url(img/" + tabletka.kolorki2[kolor] + "_o.png)"
                            setTimeout(function () {
                                if (div.style.backgroundImage == 'url("img/br_x.png")' || div.style.backgroundImage == 'url("img/bl_x.png")' || div.style.backgroundImage == 'url("img/yl_x.png")' || div.style.backgroundImage == 'url("img/br_o.png")' || div.style.backgroundImage == 'url("img/bl_o.png")' || div.style.backgroundImage == 'url("img/yl_o.png")') {
                                    div.style.backgroundImage = ""
                                }
                            }, 300)
                        }
                    }
                    div.style.backgroundColor = ""
                    div.classList.remove("postawiony")
                    tabletka.podzialTabletek(zbijanie[0].x, zbijanie[0].y, j, zbijanie[0].poza)
                }
                else {
                    let div = document.getElementById(zbijanie[0].x + "x" + (zbijanie[0].y + j))
                    if (div.classList.contains("wirus")) {
                        div.classList.remove("wirus")
                        plansza.punkty += 100
                        plansza.ileWirusow--
                        plansza.zmianaPunktow()
                        plansza.mazanieLupy(div.style.backgroundColor)

                        let kolor = tabletka.kolorki.indexOf(div.style.backgroundColor)
                        if (!kolor == "") {
                            div.style.backgroundImage = "url(img/" + tabletka.kolorki2[kolor] + "_x.png)"
                            setTimeout(function () {
                                if (div.style.backgroundImage == 'url("img/br_x.png")' || div.style.backgroundImage == 'url("img/bl_x.png")' || div.style.backgroundImage == 'url("img/yl_x.png")' || div.style.backgroundImage == 'url("img/br_o.png")' || div.style.backgroundImage == 'url("img/bl_o.png")' || div.style.backgroundImage == 'url("img/yl_o.png")') {
                                    div.style.backgroundImage = ""
                                }
                            }, 300)
                        }
                    } else {
                        let kolor = tabletka.kolorki.indexOf(div.style.backgroundColor)
                        if (!kolor == "") {
                            div.style.backgroundImage = "url(img/" + tabletka.kolorki2[kolor] + "_o.png)"
                            setTimeout(function () {
                                if (div.style.backgroundImage == 'url("img/br_x.png")' || div.style.backgroundImage == 'url("img/bl_x.png")' || div.style.backgroundImage == 'url("img/yl_x.png")' || div.style.backgroundImage == 'url("img/br_o.png")' || div.style.backgroundImage == 'url("img/bl_o.png")' || div.style.backgroundImage == 'url("img/yl_o.png")') {
                                    div.style.backgroundImage = ""
                                }
                            }, 300)
                        }
                    }
                    div.style.backgroundColor = ""
                    div.classList.remove("postawiony")
                    tabletka.podzialTabletek(zbijanie[0].x, zbijanie[0].y, j, zbijanie[0].poza)
                }
            }
            zbijanie.shift()
            tabletka.opadlo = true
        }
    },


    podzialTabletek: function (x, y, j, poza) {
        if (poza == "poziom") {
            for (let i = 0; i < tabletka.tabletkiTab.length; i++) {
                tabletka.tabletkiTab[i].pozycja.forEach((element, index) => {
                    if (element == (x + j) + "x" + y) {
                        tabletka.tabletkiTab[i].pozycja.splice(index, 1)
                        tabletka.tabletkiTab[i].kolory.splice(index, 1)
                        tabletka.tabletkiTab[i].poza = "kropka"
                    }
                })

            }
        }
        else {
            for (let i = 0; i < tabletka.tabletkiTab.length; i++) {
                tabletka.tabletkiTab[i].pozycja.forEach((element, index) => {
                    if (element == x + "x" + (y + j)) {
                        tabletka.tabletkiTab[i].pozycja.splice(index, 1)
                        tabletka.tabletkiTab[i].kolory.splice(index, 1)
                        tabletka.tabletkiTab[i].poza = "kropka"
                    }
                })
            }
        }
    },

    redukcjaTabletek: function () {
        for (let i = tabletka.tabletkiTab.length - 1; i >= 0; i--) {
            if (tabletka.tabletkiTab[i].pozycja.length == 0) {
                tabletka.tabletkiTab.splice(i, 1)
            }
        }

        for (let i = 0; i < tabletka.tabletkiTab.length; i++) {
            if (tabletka.tabletkiTab[i].poza == "kropka") {
                let div = document.getElementById(tabletka.tabletkiTab[i].pozycja[0])
                div.style.backgroundImage = "url(img/" + tabletka.kolorki2[tabletka.tabletkiTab[i].kolory[0]] + "_dot.png)"
            }
        }
    },

    wLewo: function () {
        tabletka.odstawiajKloca()
        let id = tabletka.tabletkiTab.length - 1
        let pom0 = tabletka.tabletkiTab[id].pozycja[0].split("x")
        let pom1 = tabletka.tabletkiTab[id].pozycja[1].split("x")
        if (pom0[0] > 0 && pom1[0] > 0) {
            pom0[0]--
            pom1[0]--
            let spr0 = document.getElementById(pom0.join("x"))
            let spr1 = document.getElementById(pom1.join("x"))
            if (!spr0.classList.contains('postawiony') && !spr1.classList.contains('postawiony')) {
                tabletka.tabletkiTab[id].pozycja[0] = pom0.join("x")
                tabletka.tabletkiTab[id].pozycja[1] = pom1.join("x")
            }
        }
        tabletka.stawiajKloca()
    },

    wPrawo: function () {
        tabletka.odstawiajKloca()
        let id = tabletka.tabletkiTab.length - 1
        let pom0 = tabletka.tabletkiTab[id].pozycja[0].split("x")
        let pom1 = tabletka.tabletkiTab[id].pozycja[1].split("x")
        if (pom0[0] < ustawienia.szer - 1 && pom1[0] < ustawienia.szer - 1) {
            pom0[0]++
            pom1[0]++
            let spr0 = document.getElementById(pom0.join("x"))
            let spr1 = document.getElementById(pom1.join("x"))
            if (!spr0.classList.contains('postawiony') && !spr1.classList.contains('postawiony')) {
                tabletka.tabletkiTab[id].pozycja[0] = pom0.join("x")
                tabletka.tabletkiTab[id].pozycja[1] = pom1.join("x")
            }
        }
        tabletka.stawiajKloca()
    },

    obrLewo: function () {
        let id = tabletka.tabletkiTab.length - 1
        if (tabletka.tabletkiTab[id].poza == "poziom") {
            let pom = tabletka.tabletkiTab[id].pozycja[0].split("x")
            pom[1]--
            let spr = document.getElementById(pom.join("x"))
            if (!spr.classList.contains('postawiony')) {
                tabletka.odstawiajKloca()
                tabletka.tabletkiTab[id].pozycja[1] = pom.join("x")
                tabletka.tabletkiTab[id].poza = "pion"
                tabletka.stawiajKloca()
            }
        }
        else {
            let pom = tabletka.tabletkiTab[id].pozycja[0].split("x")
            if (pom[0] == ustawienia.szer - 1) {
                pom[0]--
                let spr = document.getElementById(pom.join("x"))
                if (!spr.classList.contains('postawiony')) {
                    tabletka.odstawiajKloca()
                    tabletka.tabletkiTab[id].pozycja[1] = tabletka.tabletkiTab[id].pozycja[0]
                    tabletka.tabletkiTab[id].pozycja[0] = pom.join("x")
                    tabletka.tabletkiTab[id].kolory.unshift(tabletka.tabletkiTab[id].kolory[1])
                    tabletka.tabletkiTab[id].kolory.pop()
                    tabletka.tabletkiTab[id].poza = "poziom"
                    tabletka.stawiajKloca()
                }
            }
            else {
                pom[0]++
                let spr = document.getElementById(pom.join("x"))
                if (!spr.classList.contains('postawiony')) {
                    tabletka.odstawiajKloca()
                    tabletka.tabletkiTab[id].pozycja[1] = pom.join("x")
                    tabletka.tabletkiTab[id].kolory.unshift(tabletka.tabletkiTab[id].kolory[1])
                    tabletka.tabletkiTab[id].kolory.pop()
                    tabletka.tabletkiTab[id].poza = "poziom"
                    tabletka.stawiajKloca()
                }
            }
        }
    },

    obrPrawo: function () {
        let id = tabletka.tabletkiTab.length - 1
        if (tabletka.tabletkiTab[id].poza == "poziom") {
            let pom = tabletka.tabletkiTab[id].pozycja[0].split("x")
            pom[1]--
            let spr = document.getElementById(pom.join("x"))
            if (!spr.classList.contains('postawiony')) {
                tabletka.odstawiajKloca()
                tabletka.tabletkiTab[id].pozycja[1] = pom.join("x")
                tabletka.tabletkiTab[id].kolory.unshift(tabletka.tabletkiTab[id].kolory[1])
                tabletka.tabletkiTab[id].kolory.pop()
                tabletka.tabletkiTab[id].poza = "pion"
                tabletka.stawiajKloca()
            }
        }
        else {
            let pom = tabletka.tabletkiTab[id].pozycja[0].split("x")
            if (pom[0] == ustawienia.szer - 1) {
                pom[0]--
                let spr = document.getElementById(pom.join("x"))
                if (!spr.classList.contains('postawiony')) {
                    tabletka.odstawiajKloca()
                    tabletka.tabletkiTab[id].pozycja[1] = tabletka.tabletkiTab[id].pozycja[0]
                    tabletka.tabletkiTab[id].pozycja[0] = pom.join("x")
                    tabletka.tabletkiTab[id].poza = "poziom"
                    tabletka.stawiajKloca()
                }
            }
            else {
                pom[0]++
                let spr = document.getElementById(pom.join("x"))
                if (!spr.classList.contains('postawiony')) {
                    tabletka.odstawiajKloca()
                    tabletka.tabletkiTab[id].pozycja[1] = pom.join("x")
                    tabletka.tabletkiTab[id].poza = "poziom"
                    tabletka.stawiajKloca()
                }
            }
        }
    },

    spadanie: function () {
        clearInterval(tabletka.ruch)
        tabletka.ruch = setInterval(tabletka.rzutTabletki, 50)
        tabletka.spadaSobie = false
    },

    opadanie: function () {
        if (tabletka.opadlo) {
            let opad = setInterval(function () {
                tabletka.opadlo = false
                for (let i = ustawienia.wys; i >= 0; i--) {
                    tabletka.tabletkiTab.forEach((element, id) => {
                        if (element.pozycja[0].split("x")[1] == i) {
                            if (element.poza == "pion" || element.poza == "kropka") {

                                let pom = element.pozycja[0].split("x")
                                pom[1]++
                                let spr = document.getElementById(pom.join("x"))
                                if (!spr.classList.contains('postawiony')) {
                                    //odstawiajKloca()
                                    element.pozycja.forEach((el) => {
                                        let div = document.getElementById(el)
                                        div.style.backgroundColor = ""
                                        div.style.backgroundImage = ""
                                        div.classList.remove("postawiony")
                                    })

                                    element.pozycja.forEach((el, index) => {
                                        let pom = el.split("x")
                                        pom[1]++
                                        element.pozycja[index] = pom.join("x")
                                    })

                                    //stawiajKloca()
                                    let poz = "left"
                                    element.pozycja.forEach((el, index) => {
                                        let div = document.getElementById(el)
                                        div.style.backgroundColor = tabletka.kolorki[tabletka.tabletkiTab[id].kolory[index]]
                                        div.style.backgroundSize = ustawienia.rozKom + "px"
                                        if (tabletka.tabletkiTab[id].poza == "poziom") {
                                            if (index == 0) poz = "left"
                                            if (index == 1) poz = "right"
                                        } else if (tabletka.tabletkiTab[id].poza == "pion") {
                                            if (index == 0) poz = "down"
                                            if (index == 1) poz = "up"
                                        } else if (tabletka.tabletkiTab[id].poza == "kropka") {
                                            poz = "dot"
                                        }
                                        div.style.backgroundImage = "url(./img/" + tabletka.kolorki2[tabletka.tabletkiTab[id].kolory[index]] + "_" + poz + ".png)"
                                        div.classList.add("postawiony")
                                    })
                                    tabletka.opadlo = true
                                }
                            }
                            else if (element.poza == "poziom") {
                                let pom0 = element.pozycja[0].split("x")
                                let pom1 = element.pozycja[1].split("x")
                                pom0[1]++
                                pom1[1]++
                                let spr0 = document.getElementById(pom0.join("x"))
                                let spr1 = document.getElementById(pom1.join("x"))
                                if (!spr0.classList.contains('postawiony') && !spr1.classList.contains('postawiony')) {
                                    //odstawiajKloca()
                                    element.pozycja.forEach((el) => {
                                        let div = document.getElementById(el)
                                        div.style.backgroundColor = ""
                                        div.style.backgroundImage = ""
                                        div.classList.remove("postawiony")
                                    })

                                    element.pozycja.forEach((el, index) => {
                                        let pom = el.split("x")
                                        pom[1]++
                                        element.pozycja[index] = pom.join("x")
                                    })

                                    //stawiajKloca()
                                    let poz = "left"
                                    element.pozycja.forEach((el, index) => {
                                        let div = document.getElementById(el)
                                        div.style.backgroundColor = tabletka.kolorki[tabletka.tabletkiTab[id].kolory[index]]
                                        div.style.backgroundSize = ustawienia.rozKom + "px"
                                        if (tabletka.tabletkiTab[id].poza == "poziom") {
                                            if (index == 0) poz = "left"
                                            if (index == 1) poz = "right"
                                        } else if (tabletka.tabletkiTab[id].poza == "pion") {
                                            if (index == 0) poz = "down"
                                            if (index == 1) poz = "up"
                                        } else if (tabletka.tabletkiTab[id].poza == "kropka") {
                                            poz = "dot"
                                        }
                                        div.style.backgroundImage = "url(./img/" + tabletka.kolorki2[tabletka.tabletkiTab[id].kolory[index]] + "_" + poz + ".png)"
                                        div.classList.add("postawiony")
                                    })
                                    tabletka.opadlo = true
                                }
                            }
                        }
                    })
                }
                if (!tabletka.opadlo) {
                    clearInterval(opad)
                    tabletka.czujSieBity()
                    tabletka.redukcjaTabletek()
                    tabletka.opadanie()
                    if (!tabletka.opadlo && !plansza.koniec)
                        tabletka.poopad()
                }
            }, 50)
        }

    },
    poopad: function () {
        tabletka.rzutTabletki()
        tabletka.ruch = setInterval(tabletka.rzutTabletki, 1000)
        tabletka.spadaSobie = true
    },
    rasia: function () {
        plansza.rzutRaczka = [
            { reka: "up", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_right.png"], pozycja: ["10y3", "11y3"] },
            { reka: "up", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_down.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_up.png"], pozycja: ["10y3", "10y2"] },
            { reka: "up", kolor: [tabletka.kolorki2[tabletka.nastepna[1]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[0]] + "_right.png"], pozycja: ["9y2", "10y2"] },
            { reka: "up", kolor: [tabletka.kolorki2[tabletka.nastepna[1]] + "_down.png", tabletka.kolorki2[tabletka.nastepna[0]] + "_up.png"], pozycja: ["9y2", "9y1"] },

            { reka: "middle", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_right.png"], pozycja: ["8y1", "9y1"] },
            { reka: "middle", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_down.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_up.png"], pozycja: ["8y1", "8y0"] },
            { reka: "middle", kolor: [tabletka.kolorki2[tabletka.nastepna[1]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[0]] + "_right.png"], pozycja: ["7y1", "8y1"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[1]] + "_down.png", tabletka.kolorki2[tabletka.nastepna[0]] + "_up.png"], pozycja: ["7y1", "7y0"] },

            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_right.png"], pozycja: ["6y1", "7y1"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_down.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_up.png"], pozycja: ["6y1", "6y0"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[1]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[0]] + "_right.png"], pozycja: ["5y1", "6y1"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[1]] + "_down.png", tabletka.kolorki2[tabletka.nastepna[0]] + "_up.png"], pozycja: ["5y1", "5y0"] },

            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_right.png"], pozycja: ["4y1", "5y1"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_down.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_up.png"], pozycja: ["4y1", "4y0"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[1]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[0]] + "_right.png"], pozycja: ["3y1", "4y1"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[1]] + "_down.png", tabletka.kolorki2[tabletka.nastepna[0]] + "_up.png"], pozycja: ["3y1", "3y0"] },

            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_right.png"], pozycja: ["2y1", "3y1"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_down.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_up.png"], pozycja: ["2y1", "2y0"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[1]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[0]] + "_right.png"], pozycja: ["1y2", "2y2"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[1]] + "_down.png", tabletka.kolorki2[tabletka.nastepna[0]] + "_up.png"], pozycja: ["1y2", "1y1"] },

            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_right.png"], pozycja: ["0y2", "1y2"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_right.png"], pozycja: ["0y3", "1y3"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_right.png"], pozycja: ["0y4", "1y4"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_right.png"], pozycja: ["0y5", "1y5"] },
            { reka: "down", kolor: [tabletka.kolorki2[tabletka.nastepna[0]] + "_left.png", tabletka.kolorki2[tabletka.nastepna[1]] + "_right.png"], pozycja: ["0y6", "1y6"] }
        ]
    }

}
let intervale = {
    left: 0,
    nleft: true,
    oleft: 0,
    noleft: true,
    right: 0,
    nright: true,
    oleft: 0,
    noleft: true,
}
function sterowanie(e) {
    if (tabletka.spadaSobie && !tabletka.rzuca) {
        if ((e.keyCode == 37 || e.keyCode == 65) && intervale.nleft) {
            tabletka.wLewo()
            intervale.left = setInterval(tabletka.wLewo, 200)
            intervale.nleft = false
        }
        else if ((e.keyCode == 38 || e.keyCode == 87) && intervale.noleft) {
            tabletka.obrLewo()
            intervale.oleft = setInterval(tabletka.obrLewo, 200)
            intervale.noleft = false
        }
        else if ((e.keyCode == 39 || e.keyCode == 68) && intervale.nright) {
            tabletka.wPrawo()
            intervale.right = setInterval(tabletka.wPrawo, 200)
            intervale.nright = false
        }
        else if (e.keyCode == 16 && intervale.noright) {
            tabletka.obrPrawo()
            intervale.oright = setInterval(tabletka.obrPrawo, 200)
            intervale.noright = false
        }
        else if (e.keyCode == 40 || e.keyCode == 83) {
            if (!tabletka.rzuca)
                tabletka.spadanie()
        }
    } if (e.keyCode == 17) {
        if (plansza.koniec && plansza.wygrana) {
            if (plansza.level < 20)
                plansza.level++

            document.getElementById("sc").style.display = "none"
            clearInterval(plansza.taniecInterval)
            plansza.generowaniePlanszy()
        }
    }
}
function stop(e) {
    if ((e.keyCode == 37 || e.keyCode == 65) && !intervale.nleft) {
        clearInterval(intervale.left)
        intervale.nleft = true
    }
    else if ((e.keyCode == 38 || e.keyCode == 87) && !intervale.noleft) {
        clearInterval(intervale.oleft)
        intervale.noleft = true
    }
    else if ((e.keyCode == 39 || e.keyCode == 68) && !intervale.nright) {
        clearInterval(intervale.right)
        intervale.nright = true
    }
    else if (e.keyCode == 16 && !intervale.noright) {
        clearInterval(intervale.oright)
        intervale.noright = true
    }
}
document.getElementById("stol_wywalony").addEventListener("click", function () {
    plansza.level = parseInt(document.getElementById("level").value)
    document.getElementById("sc").style.display = "none"
    document.getElementById("go").style.display = "none"
    document.getElementById("go_dr").style.display = "none"
    clearInterval(tabletka.ruch)
    clearInterval(plansza.taniecInterval)
    plansza.generowaniePlanszy()
})
plansza.generowaniePlanszy()