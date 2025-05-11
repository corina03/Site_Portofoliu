// App.js

class App {
    constructor() {
        this.ui = new UIController();
        this.initializeApp();
    }

    initializeApp() {
        // Render header
        this.ui.renderHeader(galleryData.siteInfo);
        
        // Render filter buttons
        this.ui.renderFilterButtons(galleryData.categories);
        
        // Render gallery items
        this.ui.renderGallery(galleryData.items);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});