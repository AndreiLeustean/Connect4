let turn = 0;
let redMoves = [];
let yellowMoves = [];

function changeColorCircle(idCircle) {
    if (turn % 2 === 0) {
        document.getElementById(idCircle).style.backgroundColor = "#FF0000";
    } else {
        document.getElementById(idCircle).style.backgroundColor = "#FFD700";
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
        if (count === 4) {
            return true;
        }
    }
    for (let i = move - step; array.includes(i); i -= step) {
        ++count;
        if (count === 4) {
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
    let firstColumn = [35, 28, 21, 14, 7, 0];
    let secondColumn = [36, 29, 22, 15, 8, 1];
    let thirdColumn = [37, 30, 23, 16, 9, 2];
    let fourthColumn = [38, 31, 24, 17, 10, 3];
    let fifthColumn = [39, 32, 25, 18, 11, 4];
    let sixthColumn = [40, 33, 26, 19, 12, 5];
    let seventhColumn = [41, 34, 27, 20, 13, 6];

    let array;
    if (arrowNumber === 1) {
        array = firstColumn;
    } else if (arrowNumber === 2) {
        array = secondColumn;
    } else if (arrowNumber === 3) {
        array = thirdColumn;
    } else if (arrowNumber === 4) {
        array = fourthColumn;
    } else if (arrowNumber === 5) {
        array = fifthColumn;
    } else if (arrowNumber === 6) {
        array = sixthColumn;
    } else if (arrowNumber === 7) {
        array = seventhColumn;
    }

    for (let i = 0; i < 6; ++i) {
        let idCircle = "box" + array[i];
        if (document.getElementById(idCircle).style.backgroundColor === "" ||
            document.getElementById(idCircle).style.backgroundColor === "#EFE2BA") {
            changeColorCircle(idCircle);
            addMovesByColor(turn, array[i]);
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
        if (turn === 42) {
            showMessageWins("message-Equal", "equal");
        }
    });
});


