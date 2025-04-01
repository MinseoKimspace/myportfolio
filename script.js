const letterPatterns = {
"H": [
  "1   1",
  "1   1",
  "11111",
  "1   1",
  "1   1"
],
"E": [
  "11111",
  "1   ",
  "1111 ",
  "1   ",
  "11111"
],
"L": [
  "1   ",
  "1   ",
  "1   ",
  "1   ",
  "11111"
],
"O": [
  " 111 ",
  "1   1",
  "1   1",
  "1   1",
  " 111 "
],
"I": [
  "  1  ",
  "  1  ",
  "  1  ",
  "  1  ",
  "  1  "
],
"'": [
  "  1  ",
  "     ",
  "     ",
  "     ",
  "     "
],
"M": [
  "1   1",
  "11 11",
  "1 1 1",
  "1   1",
  "1   1"
],
"N": [
  "1   1",
  "11  1",
  "1 1 1",
  "1  11",
  "1   1"
],
"S": [
  " 111 ",
  "1     ",
  " 111 ",
  "    1",
  " 111 "
],
" ": [
  "     ",
  "     ",
  "     ",
  "     ",
  "     "
]
};
// box group for each letter
function createLetterGroup(letter) {
    // make sure the letter is uppercase or space
    const pattern = letterPatterns[letter] || letterPatterns[" "];
    const group = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const boxMat = new THREE.MeshNormalMaterial();
    for (let row = 0; row < 5; row++) {
        const line = pattern[row] || "";
        for (let col = 0; col < 5; col++) {
            if (line[col] === '1') {
                const box = new THREE.Mesh(boxGeo, boxMat);
                const x = col - 2;
                const y = -(row - 2);
                box.position.set(x, y, 0);
                group.add(box);
            }
        }
    }
    return group;
}
// make a text group from a string
function createTextFromBoxes(text) {
    text = text.toUpperCase();
    const textGroup = new THREE.Group();
    let cursorX = 0; // cursor for positioning letters
    for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        const letterGroup = createLetterGroup(letter);
        letterGroup.position.x = cursorX;
        cursorX += 6;
        textGroup.add(letterGroup);
    }
    textGroup.scale.set(0.3, 0.3, 0.3);
    textGroup.position.x = - (cursorX * 0.3) / 2; 
    return textGroup;
}
// initialize the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 20;
const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const textString = "Hello I'm Minseo";
const textGroup = createTextFromBoxes(textString);
scene.add(textGroup);

// animation loop
function animate() {
    requestAnimationFrame(animate);
    textGroup.rotation.x -= 0.005;
    renderer.render(scene, camera);
}
animate();
// handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();  // prevent scrolling to the anchor link
        const targetId = link.getAttribute('data-target'); 
        // "about", "projects", "contact"
        
        // hide all section
        document.querySelectorAll('section').forEach(sec => {
          sec.classList.remove('active');
        });
    
        // activate the target section
        const targetSection = document.getElementById(targetId);
        if(targetSection) {
          targetSection.classList.add('active');
        }
    });
});

function closeSection(sectionId) {
    const sec = document.getElementById(sectionId);
    if (sec) sec.classList.remove('active');
  }