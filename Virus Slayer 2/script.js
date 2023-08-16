const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileWidth = canvas.width / 4;
const tileHeight = 80;
const virusSize = 50;

const tiles = [
    { x: 0, key: "d" },
    { x: tileWidth, key: "f" },
    { x: tileWidth * 2, key: "j" },
    { x: tileWidth * 3, key: "k" }
];

const viruses = [];

function createVirus() {
    const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    viruses.push({
        x: randomTile.x + tileWidth / 2 - virusSize / 2,
        y: -virusSize,
        key: randomTile.key
    });
}

function update() {
    for (const virus of viruses) {
        virus.y += 1;
        if (virus.y > canvas.height) {
            viruses.splice(viruses.indexOf(virus), 1);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const tile of tiles) {
        ctx.fillStyle = "white";
        ctx.fillRect(tile.x, canvas.height - tileHeight, tileWidth, tileHeight);
    }

    for (const virus of viruses) {
        ctx.fillStyle = "red";
        ctx.fillRect(virus.x, virus.y, virusSize, virusSize);
    }

    requestAnimationFrame(draw);
}

function removeVirus(key) {
    const virusIndex = viruses.findIndex(virus => virus.key === key && virus.y > canvas.height - tileHeight);

    if (virusIndex !== -1) {
        viruses.splice(virusIndex, 1);
    }
}

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    for (const tile of tiles) {
        if (tile.key === key) {
            removeVirus(key);
        }
    }
});

setInterval(createVirus, 1000);
setInterval(update, 1000 / 60);

draw();
