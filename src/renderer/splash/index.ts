import p5 from "p5";
const sketch = (p: p5) => {
  const color1 = p.color("#696969");
  const color2 = p.color("#9932cc");
  let color1amount = 1;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight - 10);
    p.angleMode(p.DEGREES);
    p.noStroke();
    p.blendMode(p.LIGHTEST);
  };

  p.draw = () => {
    p.fill(p.lerpColor(color2, color1, color1amount));
    p.translate(p.width / 2, p.height / 2);
    p.rotate(p.frameCount * 10);
    p.ellipse(p.frameCount / 2, 0, p.frameCount, p.frameCount / 3);
    color1amount *= 0.995;
  };
};

new p5(sketch);
