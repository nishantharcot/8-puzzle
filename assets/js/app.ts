(
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      const gameImages = document.getElementsByClassName('game-images') as HTMLCollectionOf<HTMLImageElement>;
      // console.log(gameImages[0].children);
      const gameBox = document.getElementById('gamebox') as HTMLDivElement;
      // console.log(gameBox.children[0].children);
      const gameSlides = document.getElementsByClassName('slide') as HTMLCollectionOf<HTMLDivElement>;
      const model = {

      };
      const view = {
        init : () => {
          // console.log(gameImages[0].children[0]);
          const Image1 = gameImages[0].children[0] as HTMLAnchorElement;
          // console.log(Image1);
          const allImages = gameImages[0].children as HTMLCollectionOf<HTMLAnchorElement>;
          for (let index = 0; index < allImages.length; index++) {
            allImages[index].onclick = controller.loadImage;
          }
        },
        render : () => {

        }
      };
      const controller = {
        init : () => {
          view.init();
        },
        loadImage: (e: MouseEvent) => {
          let gameImage = e.target as HTMLImageElement;
          // console.log(gameImage.clientHeight);
          const sourceHeight = Math.floor(gameImage.naturalHeight / 3);
          const sourceWidth = Math.floor(gameImage.naturalWidth / 3);
          const slideWidth = Math.floor(gameSlides[0].clientWidth);
          const slideHeight = Math.floor(gameSlides[0].clientHeight);
          // console.log(gameSlides);
          for (let row = 0; row < 3; row += 1) {
            for (let col = 0; col < 3; col += 1) {
              if (row === 2 && col === 2) {
                const canvas = gameSlides[col*3 + row].children[0] as HTMLCanvasElement;
                canvas.width = slideWidth;
                canvas.height = slideHeight;
                let context = canvas.getContext("2d");
                context.fillRect(0, 0, canvas.width, canvas.height);
              }
              else {
                const canvas = gameSlides[col*3 + row].children[0] as HTMLCanvasElement;
                canvas.width = gameSlides[0].clientWidth;
                canvas.height = gameSlides[0].clientHeight;
                let context = canvas.getContext("2d");
                context.drawImage(gameImage, col*sourceWidth, row*sourceHeight, sourceWidth, sourceHeight, 0, 0, slideWidth, slideHeight);
              }
            }
          }
        },
      }
      controller.init();
    }
  }
)();