const imgs = [
    "/imgs/compass.png",
    "/imgs/crab.png",
    "/imgs/dolphin.png",
    "/imgs/fish.png",
    "/imgs/island.png",
    "/imgs/jellyfish.png",
    "/imgs/lifebuoy.png",
    "/imgs/map.png",
    "/imgs/octopus.png",
    "/imgs/porthole.png",
    "/imgs/rudder.png",
    "/imgs/seagull.png",
    "/imgs/seaweed.png",
    "/imgs/starfish.png",
    "/imgs/turtle.png",
    "/imgs/anglerfish.png"],
    content = document.querySelector("main"),
    header = document.querySelector("h1")

let chosed = [], chosed_id = [], cards = [], points = 0, random_imgs = []

function randomize(amount = Number, array) {
    let new_array = array.sort(() => 0.5 - Math.random()).slice(0, amount/2),
        output = [...new_array, ...new_array].sort(() => 0.5 - Math.random())
    return output
}

function create_board(amount = Number, array_normal = Array, array_random = Array, array_elements = Array, container = Document) {

    let selected = []

    array_random = randomize(amount, array_normal)
    increase_points(header)
    container.innerHTML = ""

    for (let index = 0; index < array_random.length; ++index) {

        const card = document.createElement("img")
        card.setAttribute("src", "/imgs/game_images/wave.png")
        card.setAttribute("alt", "wave.png")
        card.setAttribute("data-id", index)
        card.addEventListener("click", flip)
        array_elements.push(card)
        selected.push(array_random[index])

        container.append(card)
    }

    random_imgs = array_random
}

function flip() {
    let img_id = this.getAttribute("data-id"),
        img_src = random_imgs[img_id],
        img_name = img_id.split("/")[3]

    if (chosed_id.length > 0 && img_id === chosed_id[0]) return;

    chosed.push(img_src)
    chosed_id.push(img_id)

    this.setAttribute("src", img_src)
    this.setAttribute("alt", img_name)

    if (chosed.length > 1) {
        if (chosed[0] === chosed[1]) {

            increase_points(header)

            cards[chosed_id[0]].setAttribute("class", "guessed")
            cards[chosed_id[0]].removeEventListener("click", flip)
            cards[chosed_id[0]].setAttribute("src", img_src)
            cards[chosed_id[0]].setAttribute("alt", img_name)

            cards[chosed_id[1]].setAttribute("class", "guessed")
            cards[chosed_id[1]].removeEventListener("click", flip)
            cards[chosed_id[1]].setAttribute("src", img_src)
            cards[chosed_id[1]].setAttribute("alt", img_name)

            delete cards[chosed_id[0]]
            delete cards[chosed_id[1]]

            chosed.splice(0, 2)
            chosed_id.splice(0, 2)

            if (cards.every(card => {card === undefined})) {
                content.innerHTML = "You Win"
                content.setAttribute("class", "win")
            }
        }

        else {
            chosed.splice(0, 2); chosed_id.splice(0, 2)
            setTimeout(backflip, 800, cards)
        }
    }
}

function increase_points(element = Document) {
    element.innerHTML = `Points: ${points}`
    points += 5
}

function backflip(array = Array) {
    array.forEach(element => {

        if (element === undefined) return;

        element.setAttribute("src", "/imgs/game_images/wave.png")
        element.setAttribute("alt", "wave.png")
    });
}