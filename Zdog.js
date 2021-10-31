/** @format */

export function getBoard3d(board) {
  let width = 6;
  let height = board.length / width;
  let isSpinning = true;

  let illo = new Zdog.Illustration({
    element: ".zdog-svg",
    rotate: { x: -Zdog.TAU / 16 },
    dragRotate: true,
    onDragStart: function () {
      isSpinning = false;
    },
    onDragStop: function () {
      isSpinning = true;
    },
  });

  // new Zdog.Rect({
  //   addTo: illo,
  //   width: 100 * (width + 1),
  //   height: 100 * (height + 1),
  //   stroke: 16,
  //   fill: true,
  //   color: "yellow",
  // });

  [false, true].forEach(function () {
    let SliceClass = Zdog.Group;

    let dotSlice = new SliceClass({
      addTo: illo,
      translate: { z: 25 },
    });

    const d = 150;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (board[i * width + j] === "🏃‍♂️") {
          var sceneSize = 48;
          var isSpinning = true;
          var TAU = Zdog.TAU;
          // colors
          var gold = "#EA0";
          var orange = "#C25";
          var eggplant = "#636";
          var midnight = "#424";

          var tillo = new Zdog.Illustration({
            translate: { x: j * d - (100 * width) / 2, y: i * d - (100 * height) / 2 },
            addTo: illo,
            element: ".zdog-svg",
            rotate: { y: -TAU / 8 },
          });

          // ----- model ----- //

          var hipX = 3;

          new Zdog.Shape({
            addTo: tillo,
            path: [{ x: -1 }, { x: 1 }],
            scale: hipX,
            color: eggplant,
            stroke: 4,
          });

          var rightLeg = new Zdog.Shape({
            addTo: tillo,
            path: [{ y: 0 }, { y: 12 }],
            translate: { x: -hipX },
            rotate: { x: TAU / 4 },
            color: eggplant,
            stroke: 4,
          });
          // foot
          new Zdog.RoundedRect({
            addTo: rightLeg,
            width: 2,
            height: 4,
            cornerRadius: 1,
            translate: { y: 14, z: 2 },
            rotate: { x: TAU / 4 },
            color: orange,
            fill: true,
            stroke: 4,
          });

          var plantAngle = (-TAU / 32) * 3;
          var leftLeg = rightLeg.copyGraph({
            translate: { x: hipX },
            rotate: { x: plantAngle },
            color: midnight,
          });

          leftLeg.children[0].rotate.set({ x: TAU / 4 - plantAngle });

          // chest
          new Zdog.Shape({
            addTo: tillo,
            path: [{ x: -1 }, { x: 1 }],
            scale: 1.5,
            translate: { y: -5.5, z: -3 },
            color: orange,
            stroke: 9,
            fill: true,
          });

          var armSize = 6;

          [true, false].forEach(function (isRight) {
            var xSide = isRight ? -1 : 1;

            var upperArm = new Zdog.Shape({
              addTo: tillo,
              path: [{ x: 0 }, { x: armSize }],
              scale: { x: xSide },
              translate: { x: 4.5 * xSide, y: -8, z: -4 },
              rotate: isRight ? { y: TAU / 8, z: -TAU / 16 } : { y: TAU / 8 },
              color: eggplant,
              stroke: 4,
            });

            var forearm = new Zdog.Shape({
              addTo: upperArm,
              path: [{ x: 0 }, { x: armSize - 2 }],
              translate: { x: armSize },
              rotate: isRight
                ? { z: (TAU / 16) * 3, y: TAU / 4 }
                : { z: -TAU / 4, x: (-TAU / 32) * 2, y: TAU / 8 },
              color: orange,
              stroke: 4,
            });
            // hand
            new Zdog.Shape({
              addTo: forearm,
              translate: { x: armSize, z: 1 },
              stroke: 6,
              color: gold,
            });
          });

          var head = new Zdog.Anchor({
            addTo: tillo,
            translate: { y: -12, z: -10 },
            rotate: { x: TAU / 8 },
          });

          // face
          new Zdog.Hemisphere({
            addTo: head,
            diameter: 12,
            color: gold,
            backface: orange,
            rotate: { x: -TAU / 4 },
            stroke: false,
          });

          var eye = new Zdog.Ellipse({
            addTo: head,
            diameter: 2,
            quarters: 2,
            translate: { x: -2, y: 1.5, z: 5 },
            rotate: { z: -TAU / 4 },
            color: eggplant,
            stroke: 0.5,
            backface: false,
          });
          eye.copy({
            translate: { x: 2, y: 1.5, z: 5 },
            rotate: { z: -TAU / 4 },
          });
          // smile
          new Zdog.Ellipse({
            addTo: head,
            diameter: 3,
            quarters: 2,
            translate: { y: 3, z: 4.5 },
            rotate: { z: TAU / 4 },
            closed: true,
            color: "#FED",
            stroke: 0.5,
            fill: true,
            backface: false,
          });

          new Zdog.Hemisphere({
            addTo: head,
            diameter: 12,
            color: orange,
            backface: gold,
            rotate: { x: TAU / 4 },
            stroke: false,
          });

          var brim = new Zdog.Anchor({
            addTo: head,
            scale: 5.5,
            translate: { y: -0.5, z: 6 },
          });

          new Zdog.Shape({
            addTo: brim,
            path: [
              { x: 0, z: 0 },
              {
                arc: [
                  { x: -1, z: 0 },
                  { x: -1, z: -1 },
                ],
              },
              { x: -1, z: 0 },
            ],
            color: eggplant,
            fill: true,
          });

          new Zdog.Shape({
            addTo: brim,
            path: [
              { x: -1, z: 0 },
              {
                arc: [
                  { x: -1, z: 1 },
                  { x: 0, z: 1 },
                ],
              },
              { x: 0, z: 0 },
            ],
            color: eggplant,
            fill: true,
          });

          brim.copyGraph({
            scale: brim.scale.copy().multiply({ x: -1 }),
          });

          // ----- animate ----- //

          var ticker = 0;
          var cycleCount = 150;
        } else if (board[i * width + j] === "😎") {
          // ----- setup ----- //

          var sceneSize = 96;
          var orange = "#E62";
          var eggplant = "#636";

          // shape defaults
          Zdog.Shape.defaults.closed = false;
          [Zdog.Shape, Zdog.Ellipse].forEach(function (ShapeClass) {
            ShapeClass.defaults.stroke = 3;
            ShapeClass.defaults.color = orange;
          });

          var isSpinning = true;
          var TAU = Zdog.TAU;
          var initialRotate = { y: -TAU / 8 };

          var tillo = new Zdog.Illustration({
            element: ".zdog-svg",
            translate: { x: j * d - (100 * width) / 2, y: i * d - (100 * height) / 2 },
            addTo: illo,
          });

          // ----- model ----- //

          // cap top
          [0, 1, 2, 3, 4].forEach(function (i) {
            new Zdog.Shape({
              path: [
                { x: -20, y: 4 },
                { x: -20, y: 0 },
                {
                  arc: [
                    { x: -20, y: -20 },
                    { x: 0, y: -20 },
                  ],
                },
              ],
              rotate: { y: (TAU / 6) * i - TAU / 12 },
              addTo: tillo,
            });
          });

          // cap back
          new Zdog.Ellipse({
            addTo: tillo,
            diameter: 40,
            quarters: 2,
            translate: { y: 4 },
            rotate: { x: TAU / 4, z: -TAU / 4 },
          });

          // cap back to brim bottom connect
          var brimConnector = new Zdog.Shape({
            path: [
              { x: -20, z: 0 },
              {
                arc: [
                  { x: -20, z: 6 },
                  { x: -16, z: 12 },
                ],
              },
            ],
            addTo: tillo,
            translate: { y: 4 },
          });

          brimConnector.copy({
            scale: { x: -1 },
          });

          // brim back arch
          new Zdog.Ellipse({
            addTo: tillo,
            diameter: 32,
            quarters: 2,
            translate: { y: 4, z: 12 },
            rotate: { z: -TAU / 4 },
          });

          var brimTip = new Zdog.Vector({ x: 0, y: -12, z: 34 });
          var brimEdge = brimTip.copy();
          brimEdge.x = -14;

          // brim top line
          new Zdog.Shape({
            addTo: tillo,
            path: [{ x: 0, y: -12, z: 12 }, brimTip],
          });

          var brimBridge = new Zdog.Shape({
            addTo: tillo,
            path: [
              { x: -16, y: 4, z: 12 },
              { x: -16, y: 4, z: 18 },
              { bezier: [{ x: -16, y: 4, z: 30 }, brimEdge, brimTip] },
            ],
          });
          brimBridge.copy({
            scale: { x: -1 },
          });

          // glasses front top
          var glassFront = new Zdog.Shape({
            addTo: tillo,
            path: [{ x: -16 }, { x: 16 }],
            translate: { y: 8, z: 12 },
            color: eggplant,
          });

          // glass lens
          var glassLens = new Zdog.Shape({
            addTo: glassFront,
            path: [
              { x: -1, y: -1 },
              { x: 1, y: -1 },
              { x: 1, y: 0 },
              {
                arc: [
                  { x: 1, y: 1 },
                  { x: 0, y: 1 },
                ],
              },
              {
                arc: [
                  { x: -1, y: 1 },
                  { x: -1, y: 0 },
                ],
              },
            ],
            closed: true,
            scale: 5,
            translate: { x: -8, y: 5 },
            color: eggplant,
            fill: true,
          });

          glassLens.copy({
            translate: { x: 8, y: 5 },
          });

          // glasses arm
          var glassesArm = new Zdog.Shape({
            addTo: tillo,
            path: [
              { x: 12, y: 0 },
              { x: -1, y: 0 },
              {
                arc: [
                  { x: -12, y: 0 },
                  { x: -12, y: 8 },
                ],
              },
            ],
            rotate: { y: TAU / 4 },
            translate: { x: -16, y: 8 },
            color: eggplant,
            // only see one arm at time
            backface: false,
          });
          glassesArm.copy({
            scale: { x: -1 },
            rotate: { y: -TAU / 4 },
            translate: { x: 16, y: 8 },
          });

          // ----- animate ----- //

          var ticker = 0;
          var cycleCount = 150;

          // new Zdog.Ellipse({
          //   addTo: tillo,
          //   diameter: 30,
          //   translate: { x: j * d - (100 * width) / 2, y: i * d - (100 * height) / 2 },

          //   stroke: 20,
          //   color: "#636",
          // });
        }
      }
    }
  });

  function animate() {
    illo.rotate.y += isSpinning ? 0.01 : 0;
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
  }

  animate();
}
