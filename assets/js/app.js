(document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        var gameImages_1 = document.getElementsByClassName('game-images');
        var gameBox_1 = document.getElementById('gamebox');
        var gameSlides_1 = document.getElementsByClassName('slide');
        var shuffleButton_1 = document.getElementsByClassName('shuffle');
        var solveButton_1 = document.getElementsByClassName('solve');
        var counter_1 = document.getElementsByClassName('count');
        console.log(counter_1[0]);
        var neighbours = {
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
        var model_1 = {
            available: neighbours['22'],
            neighbours: neighbours,
            emptyRow: 2,
            emptyColumn: 2,
            currentImageindex: '0',
            Moves: 0
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
                for (var row = 0; row < 3; row += 1) {
                    for (var col = 0; col < 3; col += 1) {
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
                // console.log(model.available.length);
                for (var i = 0; i < model_1.available.length; i++) {
                    counter_1[0].innerHTML = "\n              Moves:- " + model_1.Moves + "\n            ";
                    model_1.available[i].onclick = controller_1.move;
                }
                for (var index = 0; index < allImages.length; index++) {
                    allImages[index].onclick = controller_1.loadImage;
                }
                shuffleButton_1[0].onclick = controller_1.shuffle;
                solveButton_1[0].onclick = controller_1.shuffle;
            }
        };
        var controller_1 = {
            init: function () {
                view_1.init();
            },
            loadImage: function (e) {
                var gameImage = e.target;
                model_1.currentImageindex = gameImage.getAttribute('index');
                var sourceHeight = Math.floor(gameImage.naturalHeight / 3);
                var sourceWidth = Math.floor(gameImage.naturalWidth / 3);
                var slideWidth = Math.floor(gameSlides_1[0].clientWidth);
                var slideHeight = Math.floor(gameSlides_1[0].clientHeight);
                for (var row = 0; row < 3; row += 1) {
                    for (var col = 0; col < 3; col += 1) {
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
                            context.drawImage(gameImage, col * sourceWidth, row * sourceHeight, sourceWidth, sourceHeight, 0, 0, slideWidth, slideHeight);
                        }
                    }
                }
            },
            shuffle: function () {
            },
            solve: function () {
            },
            move: function (e) {
                var canvas = e.target;
                var clickedSlide = canvas.parentElement;
                for (var i = 0; i < model_1.available.length; i++) {
                    // console.log(clickedSlide.parentNode, model.available[i]);
                    if (clickedSlide === model_1.available[i]) {
                        model_1.Moves += 1;
                        var row = Number(clickedSlide.getAttribute('row'));
                        var col = Number(clickedSlide.getAttribute('col'));
                        var empty = gameBox_1.children[model_1.emptyColumn].children[model_1.emptyRow];
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
                        view_1.render();
                    }
                }
            }
        };
        controller_1.init();
    }
})();
