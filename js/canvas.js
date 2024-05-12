const canvas = document.createElement('canvas');
const sandbox = new GlslCanvas(canvas);

const calcSize = () => {
  let w = window.innerWidth;
  let h = window.innerHeight;
  let dpi = window.devicePixelRatio;
  
  let size = Math.max(w, h);
  
  canvas.width = size * dpi;
	canvas.height = size * dpi;
  canvas.style.width = size + 'px'
  canvas.style.height = size + 'px'
}


window.addEventListener('load', () => {
  calcSize()
  document.querySelector('.canvas-holder').appendChild(canvas);
  sandbox.load(frag);
});