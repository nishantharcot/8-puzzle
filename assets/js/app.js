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
                var sourceHeight = Math.floor(gameImage.naturalHeight / 3);
                var sourceWidth = Math.floor(gameImage.naturalWidth / 3);
                var canvas = e.target;
                console.log(gameImage.clientHeight, gameImage.clientWidth);
                var height = canvas.clientHeight;
                var width = canvas.clientWidth;
                for (var row = 0; row < 3; row += 1) {
                    for (var col = 0; col < 3; col += 1) {
                        if (row === 2 && col === 2) {
                            break;
                        }
                        var imageCanvas = gameSlides_1[row * 3 + col].children[0];
                        imageCanvas.width = width;
                        imageCanvas.height = height;
                        var context = imageCanvas.getContext('2d');
                        context.drawImage(canvas, col * sourceWidth, row * sourceHeight, sourceWidth, sourceHeight, 0, 0, width, height);
                        // console.log(imageCanvas);
                    }
                }
            }
        };
        controller_1.init();
    }
})();
