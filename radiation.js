// Corrected Sandboxels Mod Code
elements.radioactive_waste = {
    color: "#4bf542",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1200,
    viscosity: 50,
    reactions: {
        "water": { elem1: "radioactive_waste", elem2: "toxic_gas", chance: 0.1 },
        "plant": { elem1: "fire", elem2: "ash", chance: 0.5 },
        "meat": { elem1: "slime", elem2: "slime", chance: 0.4 },
        "fish": { elem1: "slime", elem2: "slime", chance: 0.4 }
    },
    tick: function(pixel) {
        var neighbors = [[-1,0], [1,0], [0,-1], [0,1]];
        for (var i = 0; i < neighbors.length; i++) {
            var nx = pixel.x + neighbors[i][0];
            var ny = pixel.y + neighbors[i][1];
            if (isEmpty(nx, ny, true)) continue;
            if (pixelMap[nx] && pixelMap[nx][ny]) {
                var target = pixelMap[nx][ny];
                if (target.element === "soil" || target.element === "dirt") {
                    changePixel(target, "slime");
                }
            }
        }
    }
};

elements.toxic_gas = {
    color: "#a6ff96",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 1,
    reactions: {
        "human": { elem1: null, elem2: "zombie", chance: 0.2 }
    }
};

elements.hazmat_fabric = {
    color: "#fce303",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 1500,
    conduct: 0,
    hardness: 0.8,
    burn: 0,
    elements: ["radiation", "radioactive_waste", "toxic_gas"],
    reactions: {
        "radioactive_waste": { elem1: "hazmat_fabric", elem2: null },
        "toxic_gas": { elem1: "hazmat_fabric", elem2: null }
    }
};

elements.hazmat_engineer = {
    color: "#fca103",
    behavior: [
        "XX|M1|XX",
        "M2|FX|M2",
        "XX|M2|XX"
    ],
    category: "life",
    state: "solid",
    density: 1000,
    burn: 0,
    tick: function(pixel) {
        var neighbors = [[-1,0], [1,0], [0,-1], [0,1], [-1,-1], [1,-1], [-1,1], [1,1]];
        for (var i = 0; i < neighbors.length; i++) {
            var nx = pixel.x + neighbors[i][0];
            var ny = pixel.y + neighbors[i][1];
            if (pixelMap[nx] && pixelMap[nx][ny]) {
                var target = pixelMap[nx][ny];
                if (target.element === "radioactive_waste" || target.element === "toxic_gas" || target.element === "uranium") {
                    deletePixel(target.x, target.y);
                }
            }
        }
    }
};

// Re-initialize the side menus so the new items register on your UI immediately
if (typeof(initEnabled) !== "undefined") { initEnabled(); }
console.log("Radiation Expansion loaded successfully!");
