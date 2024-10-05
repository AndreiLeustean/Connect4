let turn = 0;
const redMoves = [];
const yellowMoves = [];
const MAXNEIGHBOR = 4;
const ROWSNUMBER = 6;
const COLUMNSNUMBER = 7;
const MOVESNUMBER = 42;

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
        if (count === MAXNEIGHBOR) {
            return true;
        }
    }
    for (let i = move - step; array.includes(i); i -= step) {
        ++count;
        if (count === MAXNEIGHBOR) {
            return true;
        }
    }
}

function winner(array) {// trebuie modificat
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
    // let array;
    // let matrix = [
    //     [35, 28, 21, 14, 7, 0],
    //     [36, 29, 22, 15, 8, 1],
    //     [37, 30, 23, 16, 9, 2],
    //     [38, 31, 24, 17, 10, 3],
    //     [39, 32, 25, 18, 11, 4],
    //     [40, 33, 26, 19, 12, 5],
    //     [41, 34, 27, 20, 13, 6]
    // ];
    // array = matrix[arrowNumber - 1];
    // for (let i = 0; i < ROWSNUMBER; ++i) {
    //     let idCircle = "box" + array[i];
    //     if (document.getElementById(idCircle).style.backgroundColor === "" ||
    //         document.getElementById(idCircle).style.backgroundColor === "#EFE2BA") {
    //         changeColorCircle(idCircle);
    //         addMovesByColor(turn, array[i]);
    //         ++turn;
    //         setUsersMovementText(turn);
    //         break;
    //     }
    // }
    let lastCircle = ROWSNUMBER * COLUMNSNUMBER - 1 - (COLUMNSNUMBER - arrowNumber);
    for (let i = 0; i < ROWSNUMBER; ++i) {
        if (i > 0) {
            lastCircle -= COLUMNSNUMBER;
        }
        let idCircle = "box" + lastCircle;
        if (document.getElementById(idCircle).style.backgroundColor === "" ||
            document.getElementById(idCircle).style.backgroundColor === "#EFE2BA") {
            changeColorCircle(idCircle);
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
        if (turn === MOVESNUMBER) {
            showMessageWins("message-Equal", "equal");
        }
    });
});





