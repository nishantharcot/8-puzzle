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
                // console.log(gameImage.clientHeight);
                var sourceHeight = Math.floor(gameImage.naturalHeight / 3);
                var sourceWidth = Math.floor(gameImage.naturalWidth / 3);
                var slideWidth = Math.floor(gameSlides_1[0].clientWidth) + 1;
                var slideHeight = Math.floor(gameSlides_1[0].clientHeight) + 1;
                // console.log(gameSlides);
                for (var row = 0; row < 3; row += 1) {
                    for (var col = 0; col < 3; col += 1) {
                        var canvas = gameSlides_1[col * 3 + row].children[0];
                        canvas.width = gameSlides_1[0].clientWidth;
                        canvas.height = gameSlides_1[0].clientHeight;
                        console.log('Width:-', canvas.width);
                        console.log('Height:- ', canvas.height);
                        var context = canvas.getContext("2d");
                        context.drawImage(gameImage, col * sourceWidth, row * sourceHeight, sourceWidth, sourceHeight, 0, 0, slideWidth, slideHeight);
                        // context.drawImage(gameImage, col*sourceWidth, row*sourceHeight, canvas.clientWidth, canvas.clientHeight);
                    }
                }
            }
        };
        controller_1.init();
    }
})();
