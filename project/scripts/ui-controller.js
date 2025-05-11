class UIController {
  constructor() {
    this.headerContent = document.getElementById('header-content');
    this.galleryContainer = document.getElementById('gallery-container');
    this.filterOptions = document.getElementById('filter-options');
    this.modalContainer = document.getElementById('modal-container');
    this.modalBody = this.modalContainer.querySelector('.modal-body');
    this.themeToggle = document.getElementById('theme-toggle');
    this.currentFilter = 'all';
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.startPage();
    }

    startPage() {
      this.setupTheme();
      this.setupClickHandlers();
    }

    setupTheme() {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      this.updateThemeButton();
    }

    setupClickHandlers() {
      this.themeToggle.addEventListener('click', () => {
      this.switchTheme();
      });

      this.modalContainer.querySelector('.modal-close').addEventListener('click', () => {
      this.closeModal();
      });

      this.modalContainer.addEventListener('click', (e) => {
        if (e.target === this.modalContainer) {
        this.closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    renderHeader(siteInfo) {
      let headerHTML = `
        <h1>${siteInfo.title}</h1>
        <p>${siteInfo.description}</p>
        `;
      this.headerContent.innerHTML = headerHTML;
    }

    renderFilterButtons(categories) {
      let buttonsHTML = '<button class="filter-btn active" data-category="all">All</button>';
        for (let category of categories) {
          buttonsHTML += `<button class="filter-btn" data-category="${category}">${category}</button>`;
        }

      this.filterOptions.innerHTML = buttonsHTML;
        let buttons = this.filterOptions.querySelectorAll('.filter-btn');
        for (let button of buttons) {
          button.addEventListener('click', (e) => {
            let category = e.target.dataset.category;
            this.filterGallery(category);
            for (let btn of buttons) {
              btn.classList.remove('active');
              }
              e.target.classList.add('active');
            });
        }
    }

    renderGallery(items) {
        let galleryHTML = '';
        for (let item of items) {
          galleryHTML += `
            <div class="gallery-item" data-category="${item.category}" data-id="${item.id}">
              <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
                <div class="gallery-item-content">
                   <h3>${item.title}</h3>
                      <p>${item.category}</p>
                </div>
            </div>
          `;
        }

        this.galleryContainer.innerHTML = galleryHTML;
        let galleryItems = this.galleryContainer.querySelectorAll('.gallery-item');
        for (let item of galleryItems) {
          item.addEventListener('click', () => {
            let itemId = parseInt(item.dataset.id);
            let selectedItem = items.find(i => i.id === itemId);
              if (selectedItem) {
                this.openModal(selectedItem);
              }
          });
        }
    }

    filterGallery(category) {
      let items = this.galleryContainer.querySelectorAll('.gallery-item');
        for (let item of items) {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        }
    }

    openModal(item) {
      this.modalBody.innerHTML = `
        <h2>${item.title}</h2>
        <div>${item.detailImages.map(img => `<img src="${img}" style="width:100%;max-width:800px;max-height:70vh;object-fit:contain;display:block;margin:16px auto;">`).join('')}</div>
        <p>${item.description}</p>
        <div>${item.tags.map(tag => `<span style="background:#4a90e2;color:#fff;padding:2px 8px;border-radius:4px;margin:2px;">${tag}</span>`).join('')}</div>
        <p>${item.year}</p>
        `;
      this.modalContainer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    closeModal() {
      this.modalContainer.classList.remove('active');
      document.body.style.overflow = '';
    }

    switchTheme() {
      if (this.currentTheme === 'light') {
        this.currentTheme = 'dark';
          } else {
          this.currentTheme = 'light';
          }

        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeButton();
    }

    updateThemeButton() {
      let icon = this.themeToggle.querySelector('.theme-icon');
      if (this.currentTheme === 'light') {
        icon.textContent = '🌙';
          } else {
            icon.textContent = '☀️';
          }
    }
}