(document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        var gameImages_1 = document.getElementsByClassName('game-images');
        var gameBox_1 = document.getElementById('gamebox');
        var gameSlides_1 = document.getElementsByClassName('slide');
        var shuffleButton_1 = document.getElementsByClassName('shuffle');
        var solveButton_1 = document.getElementsByClassName('solve');
        var counter_1 = document.getElementsByClassName('count');
        var neighbours_1 = {
            // col + row
            '00': [gameSlides_1[1], gameSlides_1[3]],
            '01': [gameSlides_1[0], gameSlides_1[2], gameSlides_1[4]],
            '02': [gameSlides_1[1], gameSlides_1[5]],
            '10': [gameSlides_1[0], gameSlides_1[4], gameSlides_1[6]],
            '11': [gameSlides_1[1], gameSlides_1[3], gameSlides_1[5], gameSlides_1[7]],
            '12': [gameSlides_1[2], gameSlides_1[4], gameSlides_1[8]],
            '20': [gameSlides_1[3], gameSlides_1[7]],
            '21': [gameSlides_1[4], gameSlides_1[6], gameSlides_1[8]],
            '22': [gameSlides_1[5], gameSlides_1[7]]
        };
        var liveNode_1 = {
            '00': ['01', '10'],
            '01': ['00', '02', '11'],
            '02': ['01', '12'],
            '10': ['00', '11', '20'],
            '11': ['01', '10', '12', '21'],
            '12': ['02', '11', '22'],
            '20': ['10', '21'],
            '21': ['11', '20', '22'],
            '22': ['12', '21']
        };
        var model_1 = {
            available: neighbours_1['22'],
            neighbours: neighbours_1,
            emptyRow: 2,
            emptyColumn: 2,
            currentImageindex: '0',
            Moves: 0,
            MovesCost: 0,
            OriginalSequence: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            OriginalSequenceSimpleForm: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
            ProblemSequence: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            ProblemSequenceSimpleForm: []
        };
        var view_1 = {
            init: function () {
                var allImages = gameImages_1[0].children;
                var startImages = allImages[0].children;
                var startImage = startImages[0];
                var sourceHeight = Math.floor(startImage.naturalHeight / 3);
                var sourceWidth = Math.floor(startImage.naturalWidth / 3);
                var slideWidth = Math.floor(gameSlides_1[0].clientWidth);
                var slideHeight = Math.floor(gameSlides_1[0].clientHeight);
                for (var col = 0; col < 3; col += 1) {
                    for (var row = 0; row < 3; row += 1) {
                        if (row === 2 && col === 2) {
                            var canvas = gameSlides_1[col * 3 + row].children[0];
                            canvas.width = slideWidth;
                            canvas.height = slideHeight;
                            var context = canvas.getContext("2d");
                            context.fillRect(0, 0, canvas.width, canvas.height);
                        }
                        else {
                            var canvas = gameSlides_1[col * 3 + row].children[0];
                            canvas.width = gameSlides_1[0].clientWidth;
                            canvas.height = gameSlides_1[0].clientHeight;
                            var context = canvas.getContext("2d");
                            context.drawImage(startImage, col * sourceWidth, row * sourceHeight, sourceWidth, sourceHeight, 0, 0, slideWidth, slideHeight);
                        }
                    }
                }
                view_1.render();
            },
            render: function () {
                var allImages = gameImages_1[0].children;
                for (var i = 0; i < model_1.available.length; i++) {
                    counter_1[0].innerHTML = "\n              Moves:- " + model_1.Moves + "\n            ";
                    model_1.available[i].onclick = controller_1.move;
                }
                for (var index = 0; index < allImages.length; index++) {
                    allImages[index].onclick = controller_1.loadImage;
                }
                // shuffleButton[0].onclick = controller.shuffle;
                shuffleButton_1[0].onclick = function () {
                    var numberOfShuffles = 5 + Math.floor(Math.random() * 30);
                    var shuffleContoller = function () {
                        setTimeout(function () {
                            numberOfShuffles -= 1;
                            if (numberOfShuffles) {
                                controller_1.shuffle();
                                shuffleContoller();
                            }
                            if (numberOfShuffles === 0) {
                                model_1.ProblemSequenceSimpleForm = [];
                                for (var i = 0; i < 3; i++) {
                                    var temp = [];
                                    for (var j = 0; j < 3; j++) {
                                        temp.push(model_1.ProblemSequence[3 * i + j]);
                                    }
                                    model_1.ProblemSequenceSimpleForm.push(temp);
                                }
                                console.log(model_1.ProblemSequence);
                                console.log(model_1.ProblemSequenceSimpleForm);
                            }
                        }, 100);
                    };
                    shuffleContoller();
                };
                solveButton_1[0].onclick = function () {
                    // console.log(model.emptyRow, model.emptyColumn);
                    controller_1.solve(model_1.ProblemSequenceSimpleForm, model_1.emptyRow, model_1.emptyColumn, model_1.OriginalSequenceSimpleForm);
                };
            }
        };
        var controller_1 = {
            init: function () {
                view_1.init();
            },
            loadImage: function (e) {
                if (model_1.Moves > 0) {
                    alert('The current game progress will not be saved');
                }
                model_1.OriginalSequence = [];
                model_1.Moves = 0;
                model_1.available = neighbours_1['22'];
                model_1.emptyColumn = 2;
                model_1.emptyRow = 2;
                counter_1[0].innerHTML = "\n              Moves:- " + model_1.Moves + "\n            ";
                var gameImage = e.target;
                model_1.currentImageindex = gameImage.getAttribute('index');
                var sourceHeight = Math.floor(gameImage.naturalHeight / 3);
                var sourceWidth = Math.floor(gameImage.naturalWidth / 3);
                var slideWidth = Math.floor(gameSlides_1[0].clientWidth);
                var slideHeight = Math.floor(gameSlides_1[0].clientHeight);
                for (var col = 0; col < 3; col += 1) {
                    for (var row = 0; row < 3; row += 1) {
                        if (row === 2 && col === 2) {
                            var canvas = gameSlides_1[col * 3 + row].children[0];
                            model_1.OriginalSequence.push(col * 3 + row);
                            canvas.width = slideWidth;
                            canvas.height = slideHeight;
                            var context = canvas.getContext("2d");
                            context.fillRect(0, 0, canvas.width, canvas.height);
                        }
                        else {
                            var canvas = gameSlides_1[col * 3 + row].children[0];
                            var rowOfSlide = canvas.parentElement.getAttribute('row');
                            var colOfSlide = canvas.parentElement.getAttribute('col');
                            model_1.OriginalSequence.push(col * 3 + row);
                            canvas.width = gameSlides_1[0].clientWidth;
                            canvas.height = gameSlides_1[0].clientHeight;
                            var context = canvas.getContext("2d");
                            context.drawImage(gameImage, col * sourceWidth, row * sourceHeight, sourceWidth, sourceHeight, 0, 0, slideWidth, slideHeight);
                        }
                    }
                }
            },
            shuffle: function () {
                var slide = model_1.available[Math.floor(Math.random() * model_1.available.length)];
                var row = slide.getAttribute('row');
                var col = slide.getAttribute('col');
                var canvas = slide.children[0];
                canvas.click();
            },
            findEight: function () {
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        if (model_1.ProblemSequenceSimpleForm[i][j] === 8) {
                            var row = i;
                            var col = j;
                            console.log(row, col);
                            return liveNode_1[String(row) + String(col)];
                            break;
                        }
                    }
                }
            },
            solve: function (initial, row, col, final) {
                // Store live nodes
                var tempQueue = controller_1.findEight();
                var priorityQueue = [];
                for (var i = 0; i < tempQueue.length; i++) {
                    var rc = tempQueue[i];
                    console.log(rc[0], rc[1]);
                    priorityQueue.push(model_1.ProblemSequenceSimpleForm[Number(rc[0])][Number(rc[1])]);
                }
                // controller.findEight();
                console.log(priorityQueue);
                // while (priorityQueue !== null) {
                // }
            },
            move: function (e) {
                // model.available[i] class ="slide"
                model_1.ProblemSequenceSimpleForm = [];
                var canvas = e.target;
                var divSlide = e.target;
                var clickedSlide = canvas.parentElement;
                for (var i = 0; i < model_1.available.length; i++) {
                    if (clickedSlide === model_1.available[i]) {
                        // model.Moves += 1;
                        if (e.isTrusted === true) {
                            model_1.Moves += 1;
                        }
                        var row = Number(clickedSlide.getAttribute('row'));
                        var col = Number(clickedSlide.getAttribute('col'));
                        var empty = gameBox_1.children[model_1.emptyColumn].children[model_1.emptyRow];
                        var clickedIndex = 3 * row + col;
                        var emptyIndex = 3 * model_1.emptyRow + model_1.emptyColumn;
                        var tempIndex = model_1.ProblemSequence[emptyIndex];
                        model_1.ProblemSequence[emptyIndex] = model_1.ProblemSequence[clickedIndex];
                        model_1.ProblemSequence[clickedIndex] = tempIndex;
                        var slideCanvas = clickedSlide.children[0];
                        var slideContext = slideCanvas.getContext('2d');
                        var emptyCanvas = empty.children[0];
                        var emptyContext = emptyCanvas.getContext('2d');
                        var tempCanvas = document.createElement('canvas');
                        var tempContext = tempCanvas.getContext('2d');
                        tempCanvas.width = slideCanvas.width;
                        tempCanvas.height = slideCanvas.height;
                        tempContext.drawImage(slideCanvas, 0, 0);
                        slideContext.drawImage(emptyCanvas, 0, 0);
                        emptyContext.drawImage(tempCanvas, 0, 0);
                        model_1.emptyColumn = col;
                        model_1.emptyRow = row;
                        var req = '';
                        req = String(model_1.emptyColumn) + String(model_1.emptyRow);
                        model_1.available = model_1.neighbours[req];
                        for (var i_1 = 0; i_1 < 3; i_1++) {
                            var temp = [];
                            for (var j = 0; j < 3; j++) {
                                temp.push(model_1.ProblemSequence[3 * i_1 + j]);
                            }
                            model_1.ProblemSequenceSimpleForm.push(temp);
                        }
                        // console.log(model.ProblemSequence);
                        // console.log(model.ProblemSequenceSimpleForm);              
                        view_1.render();
                    }
                }
            }
        };
        controller_1.init();
    }
})();
