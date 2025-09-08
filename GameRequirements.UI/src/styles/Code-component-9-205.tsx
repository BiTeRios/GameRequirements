/* Cyberpunk GameRequirements Styles */

:root {
  --font-size: 16px;
  --background: #0a0a0f;
  --foreground: #e4e4e7;
  --card: #1a1a23;
  --card-foreground: #e4e4e7;
  --popover: #141419;
  --popover-foreground: #e4e4e7;
  --primary: #00ff88;
  --primary-foreground: #0a0a0f;
  --secondary: #2a2a3a;
  --secondary-foreground: #e4e4e7;
  --muted: #1e1e2a;
  --muted-foreground: #a1a1aa;
  --accent: #ff006e;
  --accent-foreground: #e4e4e7;
  --destructive: #ff3b30;
  --destructive-foreground: #ffffff;
  --warning: #ff9500;
  --warning-foreground: #ffffff;
  --border: rgba(228, 228, 231, 0.1);
  --input: rgba(228, 228, 231, 0.05);
  --input-background: #1a1a23;
  --switch-background: #2a2a3a;
  --ring: #00ff88;
  --neon-cyan: #00ffff;
  --neon-pink: #ff00ff;
  --neon-purple: #8b5cf6;
  --radius: 0.75rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: var(--font-size);
}

body {
  background: linear-gradient(135deg, var(--background) 0%, #141419 50%, #1a1a23 100%);
  background-attachment: fixed;
  color: var(--foreground);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  min-height: 100vh;
}

/* Typography */
h1 {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 0.75rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

h4 {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

/* Utility Classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hidden {
  display: none !important;
}

.neon-glow {
  box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
}

.neon-text {
  text-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 30px var(--primary);
  color: var(--primary);
}

.glass-morphism {
  background: rgba(26, 26, 35, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.cyber-grid {
  background-image: 
    linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Header */
.header {
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  text-shadow: 0 0 10px var(--primary);
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--foreground);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--primary);
  background: rgba(0, 255, 136, 0.1);
}

.nav-link.active {
  color: var(--primary);
  background: rgba(0, 255, 136, 0.2);
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.btn-primary {
  background: var(--primary);
  color: var(--primary-foreground);
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.btn-primary:hover {
  background: #00e67a;
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--secondary);
  color: var(--secondary-foreground);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: var(--muted);
  border-color: var(--primary);
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1rem;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 2rem 0;
}

.page {
  min-height: 60vh;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 4rem 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 0, 110, 0.1) 0%, transparent 50%);
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--muted-foreground);
  max-width: 600px;
  margin: 0 auto;
}

/* Hardware Selector */
.hardware-selector {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
}

.selector-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.selector-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.selector-group label {
  font-weight: 500;
  color: var(--foreground);
}

.select-input {
  padding: 0.75rem;
  background: var(--input-background);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--foreground);
  font-size: 0.875rem;
}

.select-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.2);
}

.checkbox-label {
  display: flex !important;
  flex-direction: row !important;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-radius: 4px;
  background: var(--input-background);
  position: relative;
  transition: all 0.3s ease;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:checked + .checkbox-custom {
  background: var(--primary);
  border-color: var(--primary);
}

input[type="checkbox"]:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--primary-foreground);
  font-weight: bold;
  font-size: 12px;
}

/* Games Grid */
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.game-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
  border-color: var(--primary);
}

.game-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: var(--muted);
}

.game-content {
  padding: 1.5rem;
}

.game-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.game-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--muted-foreground);
}

.compatibility-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.compatibility-compatible {
  background: rgba(0, 255, 136, 0.2);
  color: var(--primary);
  border: 1px solid var(--primary);
}

.compatibility-borderline {
  background: rgba(255, 149, 0, 0.2);
  color: var(--warning);
  border: 1px solid var(--warning);
}

.compatibility-incompatible {
  background: rgba(255, 59, 48, 0.2);
  color: var(--destructive);
  border: 1px solid var(--destructive);
}

.fps-info {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
}

.fps-item {
  text-align: center;
  padding: 0.5rem;
  background: var(--muted);
  border-radius: 0.5rem;
}

.fps-setting {
  font-size: 0.75rem;
  color: var(--muted-foreground);
  display: block;
}

.fps-value {
  font-weight: 600;
  color: var(--foreground);
}

/* Results Page */
.results-header {
  margin-bottom: 2rem;
}

.selected-config {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-top: 1rem;
}

.config-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.config-label {
  color: var(--muted-foreground);
}

.config-value {
  color: var(--foreground);
  font-weight: 500;
}

/* Auth Pages */
.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
}

.auth-form {
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  background: var(--input-background);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--foreground);
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.2);
}

.auth-links {
  margin-top: 1.5rem;
  text-align: center;
}

.auth-links a {
  color: var(--primary);
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
}

.auth-links a:hover {
  text-decoration: underline;
}

/* Footer */
.footer {
  background: rgba(10, 10, 15, 0.95);
  border-top: 1px solid var(--border);
  margin-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.footer-section h3,
.footer-section h4 {
  color: var(--primary);
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: var(--muted-foreground);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: var(--primary);
}

.footer-bottom {
  border-top: 1px solid var(--border);
  padding: 1rem 0;
  text-align: center;
  color: var(--muted-foreground);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .nav {
    gap: 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .selector-grid {
    grid-template-columns: 1fr;
  }

  .games-grid {
    grid-template-columns: 1fr;
  }

  .fps-info {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .hardware-selector {
    padding: 1rem;
  }

  .game-content {
    padding: 1rem;
  }

  .auth-container {
    padding: 1rem;
  }

  .auth-card {
    padding: 1.5rem;
  }
}