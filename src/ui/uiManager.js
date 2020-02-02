import StatusBar from "./statusBar/statusBar.js"

export default class UIManager{
  constructor() {
    this.statusBar = new StatusBar();

    this.uiPanels = {
      statusBar: '/src/ui/statusBar/statusBar.html'
    }
  
    this.timer = this.statusBar.display.timer;
  }
}
