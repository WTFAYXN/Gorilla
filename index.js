let state = {};
 
const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.width = window.innerHeight;
const ctx = canvas.getContext("2d");

newGame()

function newGame(){
    state ={
        phase: "aiming",
        currentPlayer: 1,
        bomb: {
            x: undefined,
            y: undefined,
            rotation:0,
            velocity: {x:0, y:0},
        },

        backgroundBuildings:[],
        buildings:[],
        blastHoles:[],

    };
    
    for (let i = 0; i < 11; i++){
        generateBackgroundBuildings(i);
    }

    for (let i = 0; i < 8; i++){
        generateBuildings(i);
    }

    initializeBombPosition();

    draw();

    function generateBuildings(index){
        const previousBuilding = state.backgroundBuildings[index - 1];

        const x = previousBuilding
          ? previousBuilding.x + previousBuilding.width + 4
          : -30;
          
        const minWidth = 60;
        const maxWidth = 110;
        const width = minWidth + Math.random() * (maxWidth - minWidth);

        const minHeight = 80;
        const maxHeight = 350;
        const height = minHeight + Math.random() * (maxHeight - minHeight);

        state.backgroundBuildings.push({x, width, height});
    }

    function generateBuildings(index){
        const previousBuilding = state.buildings[index-1];
        const x = previousBuilding
        ? previousBuilding.x + previousBuilding.width + 4
        : 0;

        const minWidth = 80;
        const maxWidth = 130;
        const width = minWidth + Math.random() * (maxWidth - minWidth);

        const platformWithGorilla = index === 1 || index === 6;

        const minHeight = 40;
        const maxHeight = 300;
        const minHeightGorilla = 30;
        const maxHeightGorilla = 150;

        const height = platformWithGorilla
          ? minHeightGorilla + Math.random() * (maxHeightGorilla - minHeightGorilla)
          : minHeight + Math.random() * (maxHeight - minHeight);

          const lightsOn = [];
          for (let i = 0; i < 50; i++){
            const light = Math.random() <= 0.33 ? true : false;
            lightsOn.push(light);
          }
          state.buildings.push({x, width, height, lightsOn});
    }

    function initializeBombPosition(){

    }

    function draw(){
        ctx.save();

        // flipping co-ords upside down
        ctx.translate(0, window.innerHeight);
        ctx.scale(1, -1);

        drawBackground();
        drawBackgroundBuildings();
        drawbuildings();
        drawGorilla(1);
        drawGorilla(2);
        drawBomb();

        ctx.restore();
    }
    
    function drawBackground(){
        const gradient = ctx.createLinearGradient(0,0,0, windiw.innerHeight);
        gradient.addColorStop(1, "#F8BA85");
        gradient.addColorStop(2, "#FFC28E")

        ctx.fillStyle = gradient;
        ctx.fillRect(0,0, window.innerWidth, window.innerHeight);

        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(300, 350, 60, 2 * Math.PI);
        ctx.fill();
    }

    function drawBackgroundBuildings() {
        state.backgroundBuildings.forEach((building) => {
          ctx.fillStyle = "#947285";
          ctx.fillRect(building.x, 0, building.width, building.height);
        });
      }
      
      function drawBuildings() {
        state.buildings.forEach((building) =>{

            ctx.fillStyle = "#4A3C68"
            ctx.fillRect(building.x, building.width, building.height);

            const windowWidth = 10;
            const windowHeight = 12;
            const gap = 15;

            const numberOfFloors = Math.ceil(
                (building.height - gap) / (windowHeight + gap)
            );
            
            const numberOfRoomsPerFloor = Math.floor(
                (building.width - gap) / (windowWidth + gap)
            );

            for (let floor = 0; floor < numberOfFloors; floor++){
                for (let room = 0; room < numberOfRoomsPerFloorPerFloor; room++){
                    if(building.lightsOn[floor * numberOfRoomsPerFloor + room]){
                        ctx.save();

                        ctx.translate(building.x + gap, building.height - gap);
                        ctx.scale(1, -1);

                        const x = room * (windowWidth + gap);
                        const y = floor * (windowHeight + gap);

                        ctx.fillStyle = "#EBB6A2";
                        ctx.fillRect(x,y, windowWidth, windowHeight);

                        ctx.restore();
                    }
                }
            }
        })
      }
      
      function drawGorilla(player) {
        // ...
      }
      
      function drawBomb() {
        //...
      }
      
    function throwBomb(){}

    function animate(timestamp){}

    
}