let turn = 0;
const redMoves = [];
const yellowMoves = [];
const MAX_NEIGHBOR = 4;
const ROWS_NUMBER = 6;
const COLUMNS_NUMBER = 7;
const MOVES_NUMBER = 42;

function createCircleElement(circlesNumber) {
    for (let i = 0; i < circlesNumber; ++i) {
        var circle = document.createElement("div");
        circle.classList.add("circle");
        circle.setAttribute("id", "box" + i);
        var boxes = document.getElementById("boxes");
        boxes.appendChild(circle);
    }
}

function createArrowsElement(arrowsNumber) {
    for (let i = 1; i <= arrowsNumber; ++i) {
        var arrow = document.createElement("div");
        arrow.classList.add("triangle-down");
        arrow.setAttribute("id", "arrow" + i);
        var arrows = document.getElementById("arrows");
        arrows.appendChild(arrow);
    }
}

function changeColorCircle(idCircle) {
    if (turn % 2 === 0) {
        document.getElementById(idCircle).style.backgroundColor = "red";
    } else {
        document.getElementById(idCircle).style.backgroundColor = "yellow";
    }
}

function addMovesByColor(turn, move) {
    if (turn % 2 !== 0) {
        yellowMoves.push(move);
    } else {
        redMoves.push(move);
    }
}

function checkDirection(array, move, step) {
    let count = 1;
    for (let i = move + step; array.includes[i]; i += step) {
        ++count;
        if (count === MAX_NEIGHBOR) {
            return true;
        }
    }
    for (let i = move - step; array.includes(i); i -= step) {
        ++count;
        if (count === MAX_NEIGHBOR) {
            return true;
        }
    }
}

function winner(array) {
    let len = array.length;
    for (let i = 0; i < len; ++i) {
        let move = array[i];

        if (checkDirection(array, move, 7)) { return true; }
        if (checkDirection(array, move, 1)) { return true; }
        if (checkDirection(array, move, 6)) { return true; }
        if (checkDirection(array, move, 8)) { return true; }
    }
    return false;
}

function findFreeCircle(arrowNumber) {
    let lastCircle = ROWS_NUMBER * COLUMNS_NUMBER - 1 - (COLUMNS_NUMBER - arrowNumber);
    for (let i = 0; i < ROWS_NUMBER; ++i) {
        if (i > 0) {
            lastCircle -= COLUMNS_NUMBER;
        }
        let idCircle = "box" + lastCircle;
        if (document.getElementById(idCircle).style.backgroundColor === "" ||
            document.getElementById(idCircle).style.backgroundColor === "#EFE2BA") {
            changeColorCircle(idCircle);
            addMovesByColor(turn, lastCircle);
            console.log(lastCircle);
            ++turn;
            setUsersMovementText(turn);
            break;
        }
    }
}

function setUsersMovementText(numberOfTurn) {
    let textElement = document.querySelector("#text2 h3");
    if (numberOfTurn % 2 === 0) {
        textElement.textContent = "It's player Red's turn";
    } else {
        textElement.textContent = "It's player Yellow's turn";
    }

}

function showMessageWins(messageID, buttonID) {
    let messageBox = document.getElementById(messageID);
    let closeBtn = document.getElementById(buttonID);
    messageBox.classList.remove('hidden');
    xOr0 = 0;
    closeBtn.addEventListener('click', function () {
        document.querySelectorAll(".message-box").forEach(box => {
            box.classList.add("hidden");
            location.reload();
        });
    });
}

createCircleElement(MOVES_NUMBER);
createArrowsElement(COLUMNS_NUMBER);

document.querySelectorAll('.triangle-down').forEach(function (arrow) {
    arrow.addEventListener('click', function (event) {
        let idArrow = event.target.id;
        let arrowNumber = parseInt(idArrow.match(/(\d+)/)[0], 10);
        findFreeCircle(arrowNumber);
        if (winner(yellowMoves)) {
            showMessageWins("message-WinYellow", "yellowWin");
        }
        if (winner(redMoves)) {
            showMessageWins("message-WinRed", "redWin");
        }
        if (turn === MOVES_NUMBER) {
            showMessageWins("message-Equal", "equal");
        }
    });
});


