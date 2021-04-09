const game = {
    board: [],
    symbols: ["X", "O"],
    turn: 0,
    container: document.getElementById("game"),

    initBoard: () => {
        for (let i = 1; i <= 9; i++) {
            const element = document.createElement("div");
            element.id = `element${i}`;
            element.className = `element`;
            element.onclick = game.onClick;
            const text = document.createElement("p");
            text.id = `mark${i}`;
            text.class = "mark";
            element.append(text);
            game.board.push({
                mark: " ",
                element
            });
        }
        let j = 0;
        for (let i = 1; i <= 3; i++) {
            const row = document.createElement("div");
            row.className = "row";
            row.id = `row${i}`;

            while (j < 3 * i) {
                row.append(game.board[j].element);
                j++;
            }

            game.container.append(row);
        }
        game.draw();
    },

    draw: () => {
        if (game.board.length <= 0) return;
        game.board.forEach(x => {
            x.element.children[0].innerHTML = x.mark.toString();
        });
    },

    announceWinner: () => {
        alert(`Winner winner chicken dinner! ${game.symbols[game.turn]}`);
    },

    checkWinner: () => {
        const mark = game.symbols[game.turn];
        const { board } = game;

        if (board.filter((x, i) => x.mark == mark && [0, 1, 2].includes(i)).length == 3
            ||
            board.filter((x, i) => x.mark == mark && [3, 4, 5].includes(i)).length == 3
            ||
            board.filter((x, i) => x.mark == mark && [6, 7, 8].includes(i)).length == 3
            ||
            board.filter((x, i) => x.mark == mark && [0, 3, 6].includes(i)).length == 3
            ||
            board.filter((x, i) => x.mark == mark && [1, 4, 7].includes(i)).length == 3
            ||
            board.filter((x, i) => x.mark == mark && [2, 5, 8].includes(i)).length == 3
            ||
            board.filter((x, i) => x.mark == mark && [0, 4, 8].includes(i)).length == 3
            ||
            board.filter((x, i) => x.mark == mark && [2, 4, 6].includes(i)).length == 3) {
                game.draw();
                game.board.forEach(x => {
                    x.element.onclick = undefined
                    x.element.classList.add("filled");
                });
                game.announceWinner();
                return true;
        } 
        game.turn = game.turn == 0 ? 1 : 0;
        return false;
    },

    checkTie: () => {
        if (!game.board.find(x => !game.symbols.includes(x.mark)))
            alert("The game has tied, reload the page to play again!");
    },

    onClick: e => {
        const clickedElement = game.board.find(x => x.element == e.srcElement);
        clickedElement.mark = game.symbols[game.turn];
        if (game.checkWinner()) return;
        clickedElement.element.classList.add("filled");
        clickedElement.element.onclick = undefined;
        game.draw();
        game.checkTie();
    }
}

game.initBoard();
