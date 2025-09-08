// GameRequirements Main JavaScript

class GameRequirements {
  constructor() {
    this.currentPage = 'home';
    this.selectedConfig = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.populateSelectors();
    this.showPage('home');
  }

  setupEventListeners() {
    // Navigation links
    document.querySelectorAll('[data-page]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        this.showPage(page);
      });
    });

    // Compatibility check button
    const checkButton = document.getElementById('check-compatibility');
    if (checkButton) {
      checkButton.addEventListener('click', () => {
        this.checkCompatibility();
      });
    }

    // Form submissions
    document.querySelectorAll('.auth-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmission(e.target);
      });
    });
  }

  populateSelectors() {
    // Populate CPU selector
    const cpuSelect = document.getElementById('cpu-select');
    if (cpuSelect) {
      cpuData.forEach(cpu => {
        const option = document.createElement('option');
        option.value = cpu.id;
        option.textContent = cpu.name;
        cpuSelect.appendChild(option);
      });
    }

    // Populate GPU selector
    const gpuSelect = document.getElementById('gpu-select');
    if (gpuSelect) {
      gpuData.forEach(gpu => {
        const option = document.createElement('option');
        option.value = gpu.id;
        option.textContent = gpu.name;
        gpuSelect.appendChild(option);
      });
    }
  }

  showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
      p.classList.add('hidden');
    });

    // Show selected page
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
      targetPage.classList.remove('hidden');
      this.currentPage = page;

      // Update navigation
      this.updateNavigation();

      // Load page-specific content
      this.loadPageContent(page);
    }
  }

  updateNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === this.currentPage) {
        link.classList.add('active');
      }
    });
  }

  loadPageContent(page) {
    switch (page) {
      case 'games':
        this.loadAllGames();
        break;
      case 'results':
        this.loadResults();
        break;
    }
  }

  checkCompatibility() {
    const cpu = document.getElementById('cpu-select').value;
    const gpu = document.getElementById('gpu-select').value;
    const ram = document.getElementById('ram-select').value;
    const integratedGraphics = document.getElementById('integrated-graphics').checked;

    if (!cpu || (!gpu && !integratedGraphics) || !ram) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    this.selectedConfig = { cpu, gpu, ram, integratedGraphics };
    this.showPage('results');
  }

  loadResults() {
    if (!this.selectedConfig) {
      this.showPage('home');
      return;
    }

    // Display selected configuration
    this.displaySelectedConfig();

    // Calculate and display results
    const results = calculateCompatibility(
      this.selectedConfig.cpu,
      this.selectedConfig.gpu,
      this.selectedConfig.ram,
      this.selectedConfig.integratedGraphics
    );

    this.displayGameResults(results);
  }

  displaySelectedConfig() {
    const configContainer = document.getElementById('selected-config');
    if (!configContainer) return;

    const cpu = cpuData.find(c => c.id === this.selectedConfig.cpu);
    const gpu = gpuData.find(g => g.id === this.selectedConfig.gpu);

    configContainer.innerHTML = `
      <h3>Выбранная конфигурация</h3>
      <div class="config-item">
        <span class="config-label">Процессор:</span>
        <span class="config-value">${cpu ? cpu.name : 'Не выбран'}</span>
      </div>
      <div class="config-item">
        <span class="config-label">Видеокарта:</span>
        <span class="config-value">${this.selectedConfig.integratedGraphics ? 'Интегрированная графика' : (gpu ? gpu.name : 'Не выбрана')}</span>
      </div>
      <div class="config-item">
        <span class="config-label">Оперативная память:</span>
        <span class="config-value">${this.selectedConfig.ram} GB</span>
      </div>
    `;
  }

  loadAllGames() {
    const gamesContainer = document.getElementById('all-games');
    if (!gamesContainer) return;

    gamesContainer.innerHTML = '';
    gamesData.forEach(game => {
      const gameCard = this.createGameCard(game);
      gamesContainer.appendChild(gameCard);
    });
  }

  displayGameResults(games) {
    const resultsContainer = document.getElementById('games-results');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = '';
    games.forEach(game => {
      const gameCard = this.createGameCard(game, true);
      resultsContainer.appendChild(gameCard);
    });
  }

  createGameCard(game, showCalculatedFps = false) {
    const card = document.createElement('div');
    card.className = 'game-card';

    const compatibilityClass = `compatibility-${game.compatibility}`;
    const compatibilityText = this.getCompatibilityText(game.compatibility);

    const fps = showCalculatedFps && game.calculatedFps ? game.calculatedFps : game.fps;

    card.innerHTML = `
      <img src="${game.imageUrl}" alt="${game.title}" class="game-image" onerror="this.style.background='var(--muted)'; this.style.display='block';">
      <div class="game-content">
        <h3 class="game-title">${game.title}</h3>
        <div class="game-meta">
          <span>${game.genre}</span>
          <span>${game.year}</span>
        </div>
        <div class="compatibility-badge ${compatibilityClass}">
          ${compatibilityText}
        </div>
        <div class="fps-info">
          <div class="fps-item">
            <span class="fps-setting">Low</span>
            <span class="fps-value">${fps.low}</span>
          </div>
          <div class="fps-item">
            <span class="fps-setting">Medium</span>
            <span class="fps-value">${fps.medium}</span>
          </div>
          <div class="fps-item">
            <span class="fps-setting">High</span>
            <span class="fps-value">${fps.high}</span>
          </div>
          <div class="fps-item">
            <span class="fps-setting">Ultra</span>
            <span class="fps-value">${fps.ultra}</span>
          </div>
        </div>
        ${game.hasRayTracing ? '<div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--neon-cyan);">✦ Ray Tracing</div>' : ''}
        ${game.isMultiplayer ? '<div style="margin-top: 0.25rem; font-size: 0.75rem; color: var(--primary);">🌐 Multiplayer</div>' : ''}
      </div>
    `;

    return card;
  }

  getCompatibilityText(compatibility) {
    switch (compatibility) {
      case 'compatible':
        return 'Совместимо';
      case 'borderline':
        return 'Ограниченно';
      case 'incompatible':
        return 'Несовместимо';
      default:
        return 'Неизвестно';
    }
  }

  handleFormSubmission(form) {
    const formData = new FormData(form);
    const formType = form.closest('.page').id;

    // Simulate form processing
    alert(`Форма отправлена! (${formType})`);
    
    // For demo purposes, redirect to appropriate page
    if (formType === 'login-page' || formType === 'register-page') {
      this.showPage('profile');
    } else if (formType === 'forgot-password-page') {
      this.showPage('login');
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.gameRequirements = new GameRequirements();
});