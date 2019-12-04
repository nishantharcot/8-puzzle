(document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        var gameImages_1 = document.getElementsByClassName('game-images');
        // console.log(gameImages[0].children);
        var gameBox = document.getElementById('gamebox');
        // console.log(gameBox.children[0].children);
        var gameSlides_1 = document.getElementsByClassName('slide');
        var model = {};
        var view_1 = {
            init: function () {
                // console.log(gameImages[0].children[0]);
                var Image1 = gameImages_1[0].children[0];
                // console.log(Image1);
                var allImages = gameImages_1[0].children;
                var startImages = allImages[0].children;
                var startImage = startImages[0];
                console.log(startImage);
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
                for (var index = 0; index < allImages.length; index++) {
                    allImages[index].onclick = controller_1.loadImage;
                }
            },
            render: function () {
            }
        };
        var controller_1 = {
            init: function () {
                view_1.init();
            },
            loadImage: function (e) {
                var gameImage = e.target;
                // console.log(gameImage.clientHeight);
                var sourceHeight = Math.floor(gameImage.naturalHeight / 3);
                var sourceWidth = Math.floor(gameImage.naturalWidth / 3);
                var slideWidth = Math.floor(gameSlides_1[0].clientWidth);
                var slideHeight = Math.floor(gameSlides_1[0].clientHeight);
                // console.log(gameSlides);
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
            }
        };
        controller_1.init();
    }
})();
