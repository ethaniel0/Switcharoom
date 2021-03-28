const imageNames = ["Jared still.png", "Jared run 2.png", "Jared run 3.png", "Jared run 4.png", "Jared duck 1.png", "Jared duck 2.png", "Jared duck 3.png", "Jared duck 4.png", "Jared jump.png", 'ground1.png', "Button 1.png", "Button 2.png", "Button 3.png", "Button 4.png"]

const images = []

async function loadImages() {
  for (let i = 0; i < imageNames.length; i++) {
    const im = new Image()
    im.src = '/images/' + imageNames[i]
    await im.onload
    images.push(im)
  }
}