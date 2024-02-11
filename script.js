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
            for (let index = 0; index < squareArray.length; index++) {
                squareArray[index].remove();
            }
        }

        for (let index = 0; index < (size * size); index++) {
            const newDiv = document.createElement("div");
            squareArray.push(newDiv);

            newDiv.style.flexBasis = (1 / size * 100) + "%"; // calculate flex base percentage
            newDiv.classList.add("square"); // add rest of styling 

            newDiv.addEventListener("mouseover", (e) => {
                // activateSquare(e.target);
                e.target.style.backgroundColor = randomRgba(e.target);
            }, false);
            // newDiv.addEventListener("mouseleave", (e) => {
            //     activateSquare(e.target);
            //     e.target.style.backgroundColor = `black`;
            // }, false);

            document.querySelector("#squareContainer").appendChild(newDiv);
        }
    }
}

function changeSize(previousInput = null) { // change grid based on user input
    let newSize = prompt(previousInput === null ? `You can enter any number between 1 and 100 to create a new square grid.` : 
                                                `Your entry "${previousInput}" does not match the required range between 1 and 100. Please try again.`);
    createGrid(newSize);
}

function activateSquare(square) { // toggle between adding and removing the "hover" css class
    square.classList.toggle("hover");
}

function randomRgba(elem) {
    const regEx = /\d+(\.\d*)*/g; // matches rgba values
    let alpha = getComputedStyle(elem).getPropertyValue("background-color"); // get bgc string
    alpha = alpha.match(regEx)[3] || 1; // if current bgc has no rgba value, assume alpha = 1

    if (alpha <= 0) { // check for invisible bg
        return `rgba(0, 0, 0, 0)`;
    } else { // assign randomized color with decreasing alpha value
        const r = Math.round(Math.random() * 255);
        const g = Math.round(Math.random() * 255);
        const b = Math.round(Math.random() * 255);
        const a = alpha - 0.1;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
}

createGrid();