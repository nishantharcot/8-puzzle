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
          const sourceHeight = Math.floor(gameImage.naturalHeight / 3);
          const sourceWidth = Math.floor(gameImage.naturalWidth / 3);
          const canvas = e.target as HTMLCanvasElement;
          console.log(gameImage.clientHeight, gameImage.clientWidth);
          const height = canvas.clientHeight;
          const width = canvas.clientWidth;
          for (let row = 0; row < 3; row += 1) {
            for (let col = 0; col < 3; col += 1) {
              if (row === 2 && col === 2) {
                break;
              }
              let imageCanvas = gameSlides[row*3 + col].children[0] as HTMLCanvasElement;
              imageCanvas.width = width;
              imageCanvas.height = height;
              let context = imageCanvas.getContext('2d');
              context.drawImage(
                canvas, 
                col*sourceWidth,
                row*sourceHeight,
                sourceWidth,
                sourceHeight,
                0,
                0,
                width, 
                height
              );
              // console.log(imageCanvas);
            }
          }
        }
      };
    controller.init();
    }
  }
)();