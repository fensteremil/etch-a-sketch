const squareArray = [];
const changeBtn = document.querySelector("button#gridSizeBtn");

changeBtn.addEventListener("click", (e) => {
    changeSize();
});

function createGrid(size = 16) { // create a new square grid
    if (size <= 0 || size > 100) {
        changeSize(size);
    }
    else {
        if (squareArray.length > 0) { // remove old squares from DOM
            for (const square in squareArray) {
                square.remove();
            }
        }

        for (let index = 0; index < (size * size); index++) {
            const newDiv = document.createElement("div");
            squareArray.push(newDiv);

            newDiv.classList.add("square");
            newDiv.addEventListener("mouseover", (e) => {
                activateSquare(e.target, true);
            })
            newDiv.addEventListener("mouseout", (e) => {
                activateSquare(e.target, false);
            })
            document.querySelector("#squareContainer").appendChild(newDiv);
        }
    }
}

function changeSize(previousInput = null) { // change grid based on user input
    let newSize = prompt(previousInput === null ? `You can enter any number between 1 and 100 to create a new square grid.` : 
                                                `Your entry "${previousInput}" does not match the required range between 1 and 100. Please try again.`);
    createGrid(newSize);
}

function activateSquare(square, active = false) { // toggle between adding and removing the "hover" css class
    if (active) {
        square.classList.remove("hover");
    }
    else {
        square.classList.add("hover");
    }
}

createGrid();