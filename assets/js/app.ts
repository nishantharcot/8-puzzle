(
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      const gameImages = document.getElementsByClassName('game-images') as HTMLCollectionOf<HTMLImageElement>;
      const gameBox = document.getElementById('gamebox') as HTMLDivElement;
      const gameSlides = document.getElementsByClassName('slide') as HTMLCollectionOf<HTMLDivElement>;
      const shuffleButton = document.getElementsByClassName('shuffle') as HTMLCollectionOf<HTMLButtonElement>;
      const solveButton = document.getElementsByClassName('solve') as HTMLCollectionOf<HTMLButtonElement>;
      const counter = document.getElementsByClassName('count') as HTMLCollectionOf<Element>;
      const neighbours = {
        // col + row
        '00' :  [gameSlides[1], gameSlides[3]],
        '01' :  [gameSlides[0], gameSlides[2], gameSlides[4]],
        '02' :  [gameSlides[1], gameSlides[5]],
        '10' :  [gameSlides[0], gameSlides[4], gameSlides[6]],
        '11' :  [gameSlides[1], gameSlides[3], gameSlides[5], gameSlides[7]],
        '12' :  [gameSlides[2], gameSlides[4], gameSlides[8]],
        '20' :  [gameSlides[3], gameSlides[7]],
        '21' :  [gameSlides[4], gameSlides[6], gameSlides[8]],  
        '22' :  [gameSlides[5], gameSlides[7]]
      };
      const liveNode = {
        '00' : ['01', '10'],
        '01' : ['00', '02', '11'],
        '02' : ['01', '12'],
        '10' : ['00', '11', '20'],
        '11' : ['01', '10', '12', '21'],
        '12' : ['02', '11', '22'],
        '20' : ['10', '21'],
        '21' : ['11', '20', '22'],
        '22' : ['12', '21']
      };
      const model = {
        available : neighbours['22'] as HTMLDivElement[],
        neighbours: neighbours,
        emptyRow : 2,
        emptyColumn : 2,
        currentImageindex : '0',
        Moves : 0,
        MovesCost : 0,
        OriginalSequence : [0, 1, 2, 3, 4, 5, 6, 7, 8],
        OriginalSequenceSimpleForm : [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
        ProblemSequence : [0, 1, 2, 3, 4, 5, 6, 7, 8],
        ProblemSequenceSimpleForm : [],
      };
      const view = {
        init : () => {
          const allImages = gameImages[0].children as HTMLCollectionOf<HTMLImageElement>;
          const startImages = allImages[0].children as HTMLCollectionOf<HTMLImageElement>;
          const startImage = startImages[0] as HTMLImageElement;
          const sourceHeight = Math.floor(startImage.naturalHeight / 3);
          const sourceWidth = Math.floor(startImage.naturalWidth / 3);
          const slideWidth = Math.floor(gameSlides[0].clientWidth);
          const slideHeight = Math.floor(gameSlides[0].clientHeight);

          for (let col = 0; col < 3; col += 1) {
            for (let row = 0; row < 3; row += 1) {
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
                context.drawImage(startImage, col*sourceWidth, row*sourceHeight, sourceWidth, sourceHeight, 0, 0, slideWidth, slideHeight);
              }
            }
          }
          view.render();
        },
        render : () => {
          const allImages = gameImages[0].children as HTMLCollectionOf<HTMLImageElement>;
          for (let i = 0; i < model.available.length; i++) {
            counter[0].innerHTML = `
              Moves:- ${model.Moves}
            `
            model.available[i].onclick = controller.move;
          }

          for (let index = 0; index < allImages.length; index++) {
            allImages[index].onclick = controller.loadImage;
          }

          // shuffleButton[0].onclick = controller.shuffle;
          shuffleButton[0].onclick = () => {
            let numberOfShuffles = 5 + Math.floor(Math.random() * 30);
            const shuffleContoller = () => {
              setTimeout(() => {
                numberOfShuffles -= 1;
                if (numberOfShuffles) {
                  controller.shuffle();
                  shuffleContoller();
                }
                if (numberOfShuffles === 0) {
                  model.ProblemSequenceSimpleForm = [];
                  for (let i = 0; i < 3; i++) {
                    let temp = []
                    for (let j = 0; j < 3; j++) {
                      temp.push(model.ProblemSequence[3*i + j]);
                    }
                    model.ProblemSequenceSimpleForm.push(temp);
                  }
                  console.log(model.ProblemSequence);
                  console.log(model.ProblemSequenceSimpleForm);
                }
              }, 100);
            };
            shuffleContoller();
          };

          solveButton[0].onclick = () => {
            // console.log(model.emptyRow, model.emptyColumn);
            controller.solve(model.ProblemSequenceSimpleForm, model.emptyRow, model.emptyColumn, model.OriginalSequenceSimpleForm);
          }
        }
      };
      const controller = {
        init : () => {
          view.init();
        },
        loadImage: (e: MouseEvent) => {
          if (model.Moves > 0) {
            alert('The current game progress will not be saved');
          }
          model.OriginalSequence = [];
          model.Moves = 0;
          model.available = neighbours['22'] as HTMLDivElement[];
          model.emptyColumn = 2;
          model.emptyRow = 2;
          counter[0].innerHTML = `
              Moves:- ${model.Moves}
            `
          let gameImage = e.target as HTMLImageElement;
          model.currentImageindex = gameImage.getAttribute('index');
          const sourceHeight = Math.floor(gameImage.naturalHeight / 3);
          const sourceWidth = Math.floor(gameImage.naturalWidth / 3);
          const slideWidth = Math.floor(gameSlides[0].clientWidth);
          const slideHeight = Math.floor(gameSlides[0].clientHeight);
          for (let col = 0; col < 3; col += 1) {
            for (let row = 0; row < 3; row += 1) {
              if (row === 2 && col === 2) {
                const canvas = gameSlides[col*3 + row].children[0] as HTMLCanvasElement;
                model.OriginalSequence.push(col*3+row);
                canvas.width = slideWidth;
                canvas.height = slideHeight;
                let context = canvas.getContext("2d");
                context.fillRect(0, 0, canvas.width, canvas.height);
              }
              else {
                const canvas = gameSlides[col*3 + row].children[0] as HTMLCanvasElement;
                const rowOfSlide = canvas.parentElement.getAttribute('row');
                const colOfSlide = canvas.parentElement.getAttribute('col');
                model.OriginalSequence.push(col*3+row);
                canvas.width = gameSlides[0].clientWidth;
                canvas.height = gameSlides[0].clientHeight;
                let context = canvas.getContext("2d");
                context.drawImage(gameImage, col*sourceWidth, row*sourceHeight, sourceWidth, sourceHeight, 0, 0, slideWidth, slideHeight);
              }
            }
          }
        },
        shuffle : () => {
          const slide = model.available[Math.floor(Math.random() * model.available.length)];
          const row = slide.getAttribute('row');
          const col = slide.getAttribute('col');

          const canvas = slide.children[0] as HTMLCanvasElement;
          canvas.click();
        },
        findEight : () => {
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (model.ProblemSequenceSimpleForm[i][j] === 8) {
                const row = i;
                const col = j;
                console.log(row, col);
                return liveNode[String(row) + String(col)];
                break;
              }
            }
          }
        },
        solve : (initial, row, col, final) => {
          // Store live nodes
          const tempQueue = controller.findEight();
          const priorityQueue = [];
          for (let i = 0; i < tempQueue.length; i++) {
            const rc = tempQueue[i];
            console.log(rc[0], rc[1]);
            priorityQueue.push(model.ProblemSequenceSimpleForm[Number(rc[0])][Number(rc[1])]);
          }
          // controller.findEight();
          console.log(priorityQueue);
          // while (priorityQueue !== null) {

          // }
        },
        move : (e: MouseEvent) => {
          // model.available[i] class ="slide"
          model.ProblemSequenceSimpleForm = [];
          const canvas = e.target as HTMLCanvasElement;
          const divSlide = e.target as HTMLDivElement;
          const clickedSlide = canvas.parentElement as HTMLDivElement;
          for (let i = 0; i < model.available.length; i++) {
            if (clickedSlide === model.available[i]) {
              // model.Moves += 1;
              if (e.isTrusted === true) {
                model.Moves += 1;
              }
              const row = Number(clickedSlide.getAttribute('row'));
              const col = Number(clickedSlide.getAttribute('col'));
              const empty = gameBox.children[model.emptyColumn].children[model.emptyRow] as HTMLDivElement;

              const clickedIndex = 3 * row + col;
              const emptyIndex = 3 * model.emptyRow + model.emptyColumn;
              

              const tempIndex = model.ProblemSequence[emptyIndex];
              model.ProblemSequence[emptyIndex] = model.ProblemSequence[clickedIndex];
              model.ProblemSequence[clickedIndex] = tempIndex;
              const slideCanvas = clickedSlide.children[0] as HTMLCanvasElement;
              const slideContext = slideCanvas.getContext('2d');

              const emptyCanvas = empty.children[0] as HTMLCanvasElement;
              const emptyContext = emptyCanvas.getContext('2d');

              const tempCanvas = document.createElement('canvas');
              const tempContext = tempCanvas.getContext('2d');

              tempCanvas.width = slideCanvas.width;
              tempCanvas.height = slideCanvas.height;
              tempContext.drawImage(slideCanvas, 0, 0);
              slideContext.drawImage(emptyCanvas, 0, 0);
              emptyContext.drawImage(tempCanvas, 0, 0);
              
              model.emptyColumn = col;
              model.emptyRow = row;
              let req = '';
              req = String(model.emptyColumn) + String(model.emptyRow);
              model.available = model.neighbours[req];

              for (let i = 0; i < 3; i++) {
                let temp = []
                for (let j = 0; j < 3; j++) {
                  temp.push(model.ProblemSequence[3*i + j]);
                }
                model.ProblemSequenceSimpleForm.push(temp);
              }
              // console.log(model.ProblemSequence);
              // console.log(model.ProblemSequenceSimpleForm);              

              view.render()
            }
          }
        }
      }
      controller.init();
    }
  }
)();
