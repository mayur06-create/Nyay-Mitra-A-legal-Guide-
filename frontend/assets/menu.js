/**
 * ==========================================
 * NYAYSETU MENU PANEL JS (menu.js)
 * Shared Hamburger drawer with grouped navigation,
 * Accessibility controls (font size, contrast, dark mode),
 * Language synchronization, and Web Share.
 * ==========================================
 */

const MENU_I18N = {
    en: {
        brand: "NyaySetu",
        close: "Close menu",
        coreGroup: "Core Navigation",
        home: "Home / Guide",
        explore: "Explore Issues",
        aiAnalysis: "AI Case Analysis",
        rti: "RTI Generator",
        directory: "Legal Directory",
        news: "Legal News",
        
        toolsGroup: "Interactive Tools",
        legalNotice: "Legal Notice Generator",
        checklist: "Document Checklist",
        knowRights: "Know Your Rights",
        glossary: "Legal Glossary (A-Z)",

        helpGroup: "Get Help",
        findLawyer: "Free Legal Aid (NALSA)",
        emergency: "Emergency Help",
        consumerCourt: "Consumer Court Info",

        mySpaceGroup: "My Space",
        signIn: "Sign In / Profile",
        savedCases: "Saved Articles",
        recentSearches: "Recent Searches",

        aboutGroup: "About & Legal",
        about: "About NyaySetu",
        howItWorks: "How It Works",
        faqs: "FAQs",
        feedback: "Feedback & Contact",
        privacy: "Privacy & Disclaimer",

        accessTitle: "Accessibility & Appearance",
        textSize: "Text Size",
        contrast: "High Contrast",
        darkMode: "Dark Mode",
        on: "ON",
        off: "OFF",

        shareBtn: "Share NyaySetu",
        copiedToast: "Link copied to clipboard!"
    },
    hi: {
        brand: "न्यायसेतु",
        close: "मेनू बंद करें",
        coreGroup: "मुख्य नेविगेशन",
        home: "होम / मार्गदर्शिका",
        explore: "कानूनी मुद्दे खोजें",
        aiAnalysis: "एआई मामला विश्लेषण",
        rti: "आरटीआई जनरेटर",
        directory: "कानूनी निर्देशिका",
        news: "कानूनी समाचार",

        toolsGroup: "इंटरैक्टिव टूल्स",
        legalNotice: "लीगल नोटिस जनरेटर",
        checklist: "दस्तावेज़ चेकलिस्ट",
        knowRights: "अपने अधिकार जानें",
        glossary: "कानूनी शब्दावली (A-Z)",

        helpGroup: "सहायता प्राप्त करें",
        findLawyer: "निःशुल्क कानूनी सहायता (NALSA)",
        emergency: "आपातकालीन सहायता",
        consumerCourt: "उपभोक्ता अदालत जानकारी",

        mySpaceGroup: "मेरा स्पेस",
        signIn: "साइन इन / प्रोफ़ाइल",
        savedCases: "सहेजे गए लेख",
        recentSearches: "हाल की खोजें",

        aboutGroup: "हमारे बारे में",
        about: "न्यायसेतु के बारे में",
        howItWorks: "यह कैसे काम करता है",
        faqs: "अक्सर पूछे जाने वाले प्रश्न",
        feedback: "प्रतिक्रिया व संपर्क",
        privacy: "गोपनीयता व अस्वीकरण",

        accessTitle: "पहुंच-योग्यता व रूप-रंग",
        textSize: "अक्षर का आकार",
        contrast: "हाई कंट्रास्ट",
        darkMode: "डार्क मोड",
        on: "चालू",
        off: "बंद",

        shareBtn: "न्यायसेतु शेयर करें",
        copiedToast: "लिंक क्लिपबोर्ड पर कॉपी हो गया!"
    }
};

class NyayMenuPanel {
    constructor() {
        this.currentLang = localStorage.getItem('nyaysetu_lang') || 'en';
        this.fontSize = localStorage.getItem('nyaysetu_font_size') || 'md';
        this.highContrast = localStorage.getItem('nyaysetu_high_contrast') === 'true';
        this.darkMode = localStorage.getItem('nyaysetu_dark_mode') === 'true';
        this.init();
    }

    init() {
        this.applySettings();
        if (!document.getElementById('nyayMenuDrawer')) {
            this.injectHTML();
        }
        this.bindEvents();
        this.highlightCurrentPage();
        this.syncNavbarLangButtons();
        this.updateLanguage(this.currentLang);

        window.addEventListener('nyaysetu:langchange', (e) => {
            if (e.detail && e.detail.lang && e.detail.lang !== this.currentLang) {
                this.updateLanguage(e.detail.lang);
            }
        });
    }

    applySettings() {
        // Font Size
        document.body.classList.remove('font-size-sm', 'font-size-lg');
        if (this.fontSize === 'sm') document.body.classList.add('font-size-sm');
        if (this.fontSize === 'lg') document.body.classList.add('font-size-lg');

        // High Contrast
        if (this.highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }

        // Dark Mode
        if (this.darkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }

    injectHTML() {
        let overlay = document.getElementById('nyayOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nyay-overlay';
            overlay.id = 'nyayOverlay';
            document.body.appendChild(overlay);
        }

        const drawer = document.createElement('div');
        drawer.className = 'nyay-drawer nyay-menu-drawer';
        drawer.id = 'nyayMenuDrawer';
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-modal', 'true');
        drawer.setAttribute('aria-label', 'Main Menu');

        drawer.innerHTML = `
            <div class="nyay-menu-header">
                <div class="nyay-menu-brand">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem of India">
                    <span id="menuBrandTxt">NyaySetu</span>
                </div>
                <div class="nyay-menu-controls">
                    <div class="lang-toggle" id="menuLangToggle">
                        <button class="${this.currentLang === 'en' ? 'active' : 'inactive'}" data-lang="en">EN</button>
                        <button class="${this.currentLang === 'hi' ? 'active' : 'inactive'}" data-lang="hi">हिं</button>
                    </div>
                    <button class="nyay-drawer-close" id="nyayMenuClose" aria-label="Close menu">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="nyay-menu-body">
                <!-- Group 1: Core -->
                <div>
                    <div class="nyay-nav-group-label" id="menuGrpCore">Core Navigation</div>
                    <div class="nyay-nav-links-list">
                        <a href="index.html" class="nyay-nav-link" data-path="index.html">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                            <span id="menuHome">Home / Guide</span>
                        </a>
                        <a href="explore.html" class="nyay-nav-link" data-path="explore.html">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <span id="menuExplore">Explore Issues</span>
                        </a>
                        <a href="explore.html#ai" class="nyay-nav-link" data-path="ai">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path></svg>
                            <span id="menuAi">AI Case Analysis</span>
                        </a>
                        <a href="rti.html" class="nyay-nav-link" data-path="rti.html">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                            <span id="menuRti">RTI Generator</span>
                        </a>
                        <a href="directory.html" class="nyay-nav-link" data-path="directory.html">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            <span id="menuDirectory">Legal Directory</span>
                        </a>
                        <a href="news.html" class="nyay-nav-link" data-path="news.html">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path></svg>
                            <span id="menuNews">Legal News</span>
                        </a>
                    </div>
                </div>

                <!-- Group 2: Tools -->
                <div>
                    <div class="nyay-nav-group-label" id="menuGrpTools">Interactive Tools</div>
                    <div class="nyay-nav-links-list">
                        <a href="legal-notice.html" class="nyay-nav-link" data-path="legal-notice.html">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            <span id="menuLegalNotice">Legal Notice Generator</span>
                        </a>
                        <a href="consumer-rights.html" class="nyay-nav-link" data-path="consumer-rights.html">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                            <span id="menuChecklist">Document Checklist</span>
                        </a>
                        <a href="know-your-rights.html" class="nyay-nav-link" data-path="know-your-rights.html">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            <span id="menuKnowRights">Know Your Rights</span>
                        </a>
                        <a href="glossary.html" class="nyay-nav-link" data-path="glossary.html">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                            <span id="menuGlossary">Legal Glossary (A-Z)</span>
                        </a>
                    </div>
                </div>

                <!-- Group 3: Get Help -->
                <div>
                    <div class="nyay-nav-group-label" id="menuGrpHelp">Get Help</div>
                    <div class="nyay-nav-links-list">
                        <a href="https://nalsa.gov.in" target="_blank" rel="noopener noreferrer" class="nyay-nav-link">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8M8 12h8"></path></svg>
                            <span id="menuNalsa">Free Legal Aid (NALSA ↗)</span>
                        </a>
                        <button class="nyay-nav-link emergency-link" id="menuEmergencyBtn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            <span id="menuEmergency">Emergency Help</span>
                        </button>
                        <a href="consumer-rights.html" class="nyay-nav-link" data-path="consumer-rights.html">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            <span id="menuConsumer">Consumer Court Info</span>
                        </a>
                    </div>
                </div>

                <!-- Group 4: My Space -->
                <div>
                    <div class="nyay-nav-group-label" id="menuGrpMySpace">My Space</div>
                    <div class="nyay-nav-links-list">
                        <a href="signin.html" class="nyay-nav-link" data-path="signin.html">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <span id="menuSignIn">Sign In / Profile</span>
                        </a>
                        <button class="nyay-nav-link" id="menuSavedCasesBtn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                            <span id="menuSavedCases">Saved Articles</span>
                        </button>
                    </div>
                </div>

                <!-- Group 5: About -->
                <div>
                    <div class="nyay-nav-group-label" id="menuGrpAbout">About & Legal</div>
                    <div class="nyay-nav-links-list">
                        <a href="about.html" class="nyay-nav-link" data-path="about.html">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                            <span id="menuAbout">About NyaySetu</span>
                        </a>
                        <a href="faq.html" class="nyay-nav-link" data-path="faq.html">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                            <span id="menuFaqs">FAQs</span>
                        </a>
                        <a href="mailto:contact@nyaysetu.in" class="nyay-nav-link">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            <span id="menuFeedback">Feedback & Contact</span>
                        </a>
                    </div>
                </div>

                <!-- Accessibility Settings Box -->
                <div class="nyay-access-box">
                    <div class="nyay-nav-group-label" id="menuAccessTitle" style="margin:0;">Accessibility & Appearance</div>
                    
                    <div class="nyay-access-row">
                        <span id="menuTextSizeLabel">Text Size</span>
                        <div class="nyay-btn-group" id="menuFontSizeBtns">
                            <button data-size="sm" class="${this.fontSize === 'sm' ? 'active' : ''}">A-</button>
                            <button data-size="md" class="${this.fontSize === 'md' ? 'active' : ''}">A</button>
                            <button data-size="lg" class="${this.fontSize === 'lg' ? 'active' : ''}">A+</button>
                        </div>
                    </div>

                    <div class="nyay-access-row">
                        <span id="menuContrastLabel">High Contrast</span>
                        <button class="nyay-toggle-btn ${this.highContrast ? 'active' : ''}" id="menuContrastBtn">
                            ${this.highContrast ? 'ON' : 'OFF'}
                        </button>
                    </div>

                    <div class="nyay-access-row">
                        <span id="menuDarkLabel">Dark Mode</span>
                        <button class="nyay-toggle-btn ${this.darkMode ? 'active' : ''}" id="menuDarkBtn">
                            ${this.darkMode ? 'ON' : 'OFF'}
                        </button>
                    </div>
                </div>

                <!-- Share NyaySetu Button -->
                <button class="nyay-share-btn" id="menuShareBtn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                    <span id="menuShareTxt">Share NyaySetu</span>
                </button>
            </div>
        `;

        document.body.appendChild(drawer);

        // Toast element
        const toast = document.createElement('div');
        toast.className = 'nyay-toast';
        toast.id = 'nyayToast';
        document.body.appendChild(toast);
    }

    bindEvents() {
        const closeBtn = document.getElementById('nyayMenuClose');
        const overlay = document.getElementById('nyayOverlay');
        const menuEmBtn = document.getElementById('menuEmergencyBtn');
        const menuShareBtn = document.getElementById('menuShareBtn');
        const savedBtn = document.getElementById('menuSavedCasesBtn');

        if (closeBtn) closeBtn.addEventListener('click', () => this.close());
        
        // Connect hamburger buttons on any page
        document.querySelectorAll('#mobileMenuBtn, .btn-menu').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });

        if (menuEmBtn) {
            menuEmBtn.addEventListener('click', () => {
                this.close();
                if (window.nyayEmergencyInstance) {
                    window.nyayEmergencyInstance.open();
                }
            });
        }

        if (savedBtn) {
            savedBtn.addEventListener('click', () => {
                this.showSavedArticlesToast();
            });
        }

        if (menuShareBtn) {
            menuShareBtn.addEventListener('click', () => this.shareApp());
        }

        // Language toggle in menu drawer
        const langToggleBtns = document.querySelectorAll('#menuLangToggle button');
        langToggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetLang = e.target.getAttribute('data-lang');
                if (targetLang) {
                    this.setLanguage(targetLang);
                }
            });
        });

        // Accessibility controls
        const fontBtns = document.querySelectorAll('#menuFontSizeBtns button');
        fontBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                fontBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.fontSize = e.target.getAttribute('data-size');
                localStorage.setItem('nyaysetu_font_size', this.fontSize);
                this.applySettings();
            });
        });

        const contrastBtn = document.getElementById('menuContrastBtn');
        if (contrastBtn) {
            contrastBtn.addEventListener('click', () => {
                this.highContrast = !this.highContrast;
                localStorage.setItem('nyaysetu_high_contrast', this.highContrast);
                contrastBtn.classList.toggle('active', this.highContrast);
                contrastBtn.innerText = this.highContrast ? (this.currentLang === 'hi' ? 'चालू' : 'ON') : (this.currentLang === 'hi' ? 'बंद' : 'OFF');
                this.applySettings();
            });
        }

        const darkBtn = document.getElementById('menuDarkBtn');
        if (darkBtn) {
            darkBtn.addEventListener('click', () => {
                this.darkMode = !this.darkMode;
                localStorage.setItem('nyaysetu_dark_mode', this.darkMode);
                darkBtn.classList.toggle('active', this.darkMode);
                darkBtn.innerText = this.darkMode ? (this.currentLang === 'hi' ? 'चालू' : 'ON') : (this.currentLang === 'hi' ? 'बंद' : 'OFF');
                this.applySettings();
            });
        }

        // ESC Key listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    open() {
        const drawer = document.getElementById('nyayMenuDrawer');
        const overlay = document.getElementById('nyayOverlay');
        if (drawer && overlay) {
            overlay.classList.add('active');
            drawer.classList.add('open');
            document.body.classList.add('nyay-panel-open');
        }
    }

    close() {
        const drawer = document.getElementById('nyayMenuDrawer');
        const overlay = document.getElementById('nyayOverlay');
        if (drawer && overlay) {
            drawer.classList.remove('open');
            if (!document.getElementById('nyayEmergencyDrawer')?.classList.contains('open')) {
                overlay.classList.remove('active');
                document.body.classList.remove('nyay-panel-open');
            }
        }
    }

    highlightCurrentPage() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('#nyayMenuDrawer .nyay-nav-link');
        
        links.forEach(link => {
            const dataPath = link.getAttribute('data-path');
            if (dataPath && path.includes(dataPath)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    syncNavbarLangButtons() {
        const navbarLangBtns = document.querySelectorAll('.navbar .lang-toggle button');
        navbarLangBtns.forEach(btn => {
            const text = btn.innerText.trim().toUpperCase();
            if ((text === 'EN' && this.currentLang === 'en') || (text === 'हिं' && this.currentLang === 'hi')) {
                btn.classList.add('active');
                btn.classList.remove('inactive');
            } else {
                btn.classList.remove('active');
                btn.classList.add('inactive');
            }

            btn.onclick = (e) => {
                const isHi = e.target.innerText.trim().includes('हिं');
                this.setLanguage(isHi ? 'hi' : 'en');
            };
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('nyaysetu_lang', lang);
        
        // Sync Navbar lang buttons
        this.syncNavbarLangButtons();

        // Sync Menu drawer buttons
        const menuLangBtns = document.querySelectorAll('#menuLangToggle button');
        menuLangBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
                btn.classList.remove('inactive');
            } else {
                btn.classList.remove('active');
                btn.classList.add('inactive');
            }
        });

        // Update Menu drawer strings
        this.updateLanguage(lang);

        // Dispatch global event for Emergency drawer and pages
        window.dispatchEvent(new CustomEvent('nyaysetu:langchange', { detail: { lang } }));
    }

    updateLanguage(lang) {
        this.currentLang = lang;
        const txt = MENU_I18N[lang] || MENU_I18N.en;

        const setTxt = (id, s) => {
            const el = document.getElementById(id);
            if (el) el.innerText = s;
        };

        setTxt('menuBrandTxt', txt.brand);
        setTxt('menuGrpCore', txt.coreGroup);
        setTxt('menuHome', txt.home);
        setTxt('menuExplore', txt.explore);
        setTxt('menuAi', txt.aiAnalysis);
        setTxt('menuRti', txt.rti);
        setTxt('menuDirectory', txt.directory);
        setTxt('menuNews', txt.news);

        setTxt('menuGrpTools', txt.toolsGroup);
        setTxt('menuLegalNotice', txt.legalNotice);
        setTxt('menuChecklist', txt.checklist);
        setTxt('menuKnowRights', txt.knowRights);
        setTxt('menuGlossary', txt.glossary);

        setTxt('menuGrpHelp', txt.helpGroup);
        setTxt('menuNalsa', txt.findLawyer);
        setTxt('menuEmergency', txt.emergency);
        setTxt('menuConsumer', txt.consumerCourt);

        setTxt('menuGrpMySpace', txt.mySpaceGroup);
        setTxt('menuSignIn', txt.signIn);
        setTxt('menuSavedCases', txt.savedCases);

        setTxt('menuGrpAbout', txt.aboutGroup);
        setTxt('menuAbout', txt.about);
        setTxt('menuFaqs', txt.faqs);
        setTxt('menuFeedback', txt.feedback);

        setTxt('menuAccessTitle', txt.accessTitle);
        setTxt('menuTextSizeLabel', txt.textSize);
        setTxt('menuContrastLabel', txt.contrast);
        setTxt('menuDarkLabel', txt.darkMode);

        const contrastBtn = document.getElementById('menuContrastBtn');
        if (contrastBtn) contrastBtn.innerText = this.highContrast ? txt.on : txt.off;

        const darkBtn = document.getElementById('menuDarkBtn');
        if (darkBtn) darkBtn.innerText = this.darkMode ? txt.on : txt.off;

        setTxt('menuShareTxt', txt.shareBtn);
    }

    shareApp() {
        const shareData = {
            title: 'NyaySetu | Legal Guide India',
            text: 'India\'s first AI-powered Legal First-Response System. Legal aid simplified.',
            url: window.location.origin + window.location.pathname
        };

        if (navigator.share) {
            navigator.share(shareData).catch(() => {});
        } else {
            navigator.clipboard.writeText(shareData.url).then(() => {
                this.showToast(MENU_I18N[this.currentLang].copiedToast);
            });
        }
    }

    showSavedArticlesToast() {
        const saved = JSON.parse(localStorage.getItem('nyaysetu_saved_cases') || '[]');
        const count = saved.length;
        const msg = this.currentLang === 'hi' 
            ? `आपके पास ${count} सहेजे गए लेख हैं।` 
            : `You have ${count} saved articles in your bookmarks.`;
        this.showToast(msg);
    }

    showToast(message) {
        const toast = document.getElementById('nyayToast');
        if (toast) {
            toast.innerText = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.nyayMenuInstance = new NyayMenuPanel();
});
