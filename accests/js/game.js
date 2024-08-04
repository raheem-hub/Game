var gridContainer = document.getElementById('grid-container');
var gameValues = []; // To store the values of the boxes
var score = 0;
var gameOver = false;
var gridSize = 0;

document.getElementById('gameLevels').addEventListener('change', function() {
    const selectedLevel = parseInt(this.value);
    if (selectedLevel != 0) {
        
            createGrid(selectedLevel);
        
    }
});
// document.addEventListener('contextmenu', function(event) {
//     event.preventDefault();
// });

document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I') || (event.ctrlKey && event.key === 'U')) {
        event.preventDefault();
    }
});

function createGrid(count) {
    gridSize = count;
    gridContainer.innerHTML = ''; // Clear previous grid
    gameValues = Array(count * count).fill(true); // Default all boxes to true
    randomizeValues(count); // Randomize false values

    for (let i = 1; i <= count; i++) {
        const row = document.createElement('div');
        row.className = 'row no-gutters';

        for (let j = 1; j <= count; j++) {
            const col = document.createElement('div');
            col.className = 'col-1 box shadow-sm';
            col.dataset.value = gameValues[(i - 1) * count + (j - 1)];

            // Create and append image elements
            const smileImg = document.createElement('img');
            smileImg.src = 'accests/images/smile.png'; // Update this path to your smile PNG
            smileImg.className = 'smile';
            col.appendChild(smileImg);

            const bombImg = document.createElement('img');
            bombImg.src = 'accests/images/bomb.png'; // Update this path to your bomb PNG
            bombImg.className = 'bomb';
            col.appendChild(bombImg);

            // Add click event listener
            col.addEventListener('click', function() {
                if (gameOver) return;

                if (this.dataset.value === 'true') {
                    this.classList.add('active');
                    score += 10; // Add 10 coins for each green box
                } else {
                    this.classList.add('failed');
                    endGame(); // End the game if a red box is clicked
                }
            });

            row.appendChild(col);
        }

        gridContainer.appendChild(row);
    }
}

function randomizeValues(count) {
    const numFalse = parseInt(document.getElementById('gameLevels').value);
    let falseIndices = [];

    while (falseIndices.length < numFalse) {
        let index = Math.floor(Math.random() * gameValues.length);
        if (!falseIndices.includes(index)) {
            falseIndices.push(index);
        }
    }

    falseIndices.forEach(index => {
        gameValues[index] = false;
    });
}

function endGame() {
    gameOver = true;
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('score').textContent = `Your Score: ${score}`;
    disableClicks(); // Disable further clicks on boxes
}

function disableClicks() {
    document.querySelectorAll('.box').forEach(box => {
        box.style.pointerEvents = 'none'; // Disable click events
    });
}

function reloadPage() {
    location.reload(); // Reload the page
}

function retryGame() {
    gameOver = false;
    document.getElementById('game-over').style.display = 'none';
    if (confirm("Are you sure you want to start a new game?")) {
        createGrid(gridSize);
    }
    // Recreate the grid with the same size
}