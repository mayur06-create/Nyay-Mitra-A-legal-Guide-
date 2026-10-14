/**
 * ==========================================
 * NYAYSETU EMERGENCY PANEL JS (emergency.js)
 * Shared Emergency drawer with Helplines, SOS, Trusted Contacts,
 * and Instant Legal Action Cards.
 * ==========================================
 */

// 1. HELPLINE NUMBERS ARRAY (Easily Editable)
const HELPLINES = [
    { number: "112", callNumber: "112", labelEn: "National Emergency", labelHi: "राष्ट्रीय आपातकालीन सहायता", icon: "emergency", color: "#d32f2f" },
    { number: "100", callNumber: "100", labelEn: "Police", labelHi: "पुलिस सहायता", icon: "police", color: "#1976d2" },
    { number: "101", callNumber: "101", labelEn: "Fire Brigade", labelHi: "दमकल सेवा", icon: "fire", color: "#e65100" },
    { number: "102 / 108", callNumber: "108", labelEn: "Ambulance", labelHi: "एम्बुलेंस सेवा", icon: "ambulance", color: "#388e3c" },
    { number: "1091 / 181", callNumber: "181", labelEn: "Women Helpline", labelHi: "महिला हेल्पलाइन", icon: "women", color: "#8e24aa" },
    { number: "1098", callNumber: "1098", labelEn: "Childline", labelHi: "चाइल्डलाइन सहायता", icon: "child", color: "#0097a7" },
    { number: "1930", callNumber: "1930", labelEn: "Cyber Crime Helpline", labelHi: "साइबर अपराध हेल्पलाइन", icon: "cyber", color: "#d81b60" },
    { number: "15100", callNumber: "15100", labelEn: "NALSA Free Legal Aid", labelHi: "नालसा मुफ्त कानूनी सहायता", icon: "legal", color: "#61212b" },
    { number: "1915", callNumber: "1915", labelEn: "National Consumer Helpline", labelHi: "राष्ट्रीय उपभोक्ता हेल्पलाइन", icon: "consumer", color: "#f57c00" },
    { number: "14567", callNumber: "14567", labelEn: "Senior Citizen Helpline", labelHi: "वरिष्ठ नागरिक हेल्पलाइन", icon: "senior", color: "#5d4037" }
];

// Translations dictionary for Emergency Panel
const EMERGENCY_I18N = {
    en: {
        title: "Emergency Help",
        titleHiSub: "आपातकालीन सहायता",
        close: "Close emergency drawer",
        quickCall: "Quick Call Helplines",
        sosTitle: "I'm in danger (SOS)",
        sosDesc: "Get your location and alert your emergency contacts immediately.",
        btnFetchSos: "Get Location & Prepare SOS",
        locating: "Fetching your coordinates...",
        locSuccess: "Location retrieved! Share message below:",
        locDenied: "Location access denied/unavailable. Standard SOS ready:",
        shareWa: "Share via WhatsApp",
        shareSms: "Share via SMS",
        trustedTitle: "Trusted Contacts (Max 3)",
        addBtn: "Add Contact",
        namePlaceholder: "Name (e.g. Rahul)",
        phonePlaceholder: "Phone Number",
        noContacts: "No trusted contacts saved yet.",
        actionsTitle: "What to do right now",
        firTitle: "If police refuse to file an FIR",
        fir1: "Request a 'Zero FIR' which can be registered at ANY police station regardless of jurisdiction.",
        fir2: "Send written complaint by registered post to Superintendent of Police (SP) u/s 154(3) CrPC/BNSS.",
        fir3: "File an application before Judicial Magistrate u/s 156(3) CrPC/BNSS.",
        fir4: "File an e-FIR on your state police web portal if supported.",
        firLink: "Get detailed FIR guidance →",
        arrestTitle: "If you are arrested",
        arrest1: "Demand to know exact grounds of arrest immediately (Art 22(1) Constitution).",
        arrest2: "Right to inform a family member or friend right away (Sec 50A CrPC).",
        arrest3: "Right to consult and be defended by a lawyer of choice.",
        arrest4: "Must be produced before a Magistrate within 24 hours of arrest.",
        arrest5: "Right to medical examination upon arrest (Sec 54 CrPC).",
        arrestLink: "Get detailed rights guidance →",
        dvTitle: "Domestic Violence Emergency",
        dv1: "Call Women Helpline 181 or 112 for immediate intervention.",
        dv2: "Contact local Protection Officer or legal aid clinic under PWDVA 2005.",
        dv3: "Right to reside in shared household & emergency shelter home.",
        dv4: "Obtain urgent Protection Orders & interim monetary relief.",
        dvLink: "Get detailed domestic violence guide →",
        cyberTitle: "Cyber Fraud / Online Harassment",
        cyber1: "Call 1930 Cyber Crime Helpline immediately within the 'Golden Hour'.",
        cyber2: "Report incident on cybercrime.gov.in portal.",
        cyber3: "Contact your bank to freeze transactions and block cards.",
        cyber4: "Save all evidence: screenshots, transaction reference numbers, URLs.",
        cyberLink: "Get detailed cyber crime guide →",
        workplaceTitle: "Workplace Harassment / Salary Not Paid",
        workplace1: "Send formal written grievance to HR and management with timestamped records.",
        workplace2: "For POSH harassment: file complaint with Internal Complaints Committee (ICC).",
        workplace3: "For unpaid salary: file complaint with Labour Commissioner or Conciliation Officer.",
        workplace4: "Issue legal notice for salary recovery with 15-day notice period.",
        workplaceLink: "Get detailed workplace rights guide →",
        disclaimer: "Disclaimer: This is general legal information, not professional legal advice. If you are in immediate danger, call 112."
    },
    hi: {
        title: "आपातकालीन सहायता",
        titleHiSub: "Emergency Help",
        close: "आपातकालीन पैनल बंद करें",
        quickCall: "त्वरित कॉल हेल्पलाइन",
        sosTitle: "मैं खतरे में हूं (SOS)",
        sosDesc: "अपनी लाइव लोकेशन प्राप्त करें और तुरंत अपने आपातकालीन संपर्कों को सतर्क करें।",
        btnFetchSos: "लोकेशन प्राप्त करें और SOS भेजें",
        locating: "आपकी लोकेशन खोजी जा रही है...",
        locSuccess: "लोकेशन मिल गई! नीचे शेयर करें:",
        locDenied: "लोकेशन अनुमति नहीं मिली। मानक SOS संदेश तैयार है:",
        shareWa: "व्हाट्सएप पर शेयर करें",
        shareSms: "एसएमएस द्वारा भेजें",
        trustedTitle: "विश्वसनीय संपर्क (अधिकतम 3)",
        addBtn: "संपर्क जोड़ें",
        namePlaceholder: "नाम (जैसे राहुल)",
        phonePlaceholder: "फोन नंबर",
        noContacts: "अभी तक कोई विश्वसनीय संपर्क नहीं जोड़ा गया।",
        actionsTitle: "अभी क्या करें (त्वरित कानूनी कदम)",
        firTitle: "यदि पुलिस FIR दर्ज करने से मना करे",
        fir1: "'जीरो एफआईआर' (Zero FIR) की मांग करें जिसे किसी भी थाना क्षेत्र में दर्ज किया जा सकता है।",
        fir2: "पुलिस अधीक्षक (SP) को पंजीकृत डाक द्वारा लिखित शिकायत भेजें।",
        fir3: "न्यायिक मजिस्ट्रेट के समक्ष धारा 156(3) के तहत आवेदन दें।",
        fir4: "राज्य पुलिस पोर्टल पर ऑनलाइन e-FIR दर्ज करें।",
        firLink: "FIR संबंधी पूरी जानकारी देखें →",
        arrestTitle: "यदि आपको गिरफ्तार किया जाता है",
        arrest1: "गिरफ्तारी का कारण जानने का अधिकार है (संविधान अनुच्छेद 22(1))।",
        arrest2: "परिवार के सदस्य या वकील को तुरंत सूचित करने का अधिकार (धारा 50A)।",
        arrest3: "अपनी पसंद के वकील से परामर्श करने और बचाव का अधिकार।",
        arrest4: "24 घंटे के भीतर मजिस्ट्रेट के समक्ष पेश किया जाना अनिवार्य है।",
        arrest5: "गिरफ्तारी के समय मेडिकल जांच कराने का अधिकार (धारा 54)।",
        arrestLink: "अधिकारों की पूरी जानकारी देखें →",
        dvTitle: "घरेलू हिंसा आपातस्थिति",
        dv1: "तुरंत महिला हेल्पलाइन 181 या 112 पर कॉल करें।",
        dv2: "संरक्षण अधिकारी (Protection Officer) या कानूनी सहायता केंद्र से संपर्क करें।",
        dv3: "साझा गृह में रहने और शेल्टर होम में सुरक्षा पाने का अधिकार।",
        dv4: "संरक्षण आदेश (Protection Order) और अंतरिम आर्थिक राहत पाएं।",
        dvLink: "घरेलू हिंसा सुरक्षा मार्गदर्शिका →",
        cyberTitle: "साइबर धोखाधड़ी / ऑनलाइन उत्पीड़न",
        cyber1: "'गोल्डन आवर' (शुरुआती समय) में तुरंत 1930 साइबर हेल्पलाइन पर कॉल करें।",
        cyber2: "cybercrime.gov.in पर ऑनलाइन शिकायत दर्ज करें।",
        cyber3: "बैंक खाते/कार्ड ब्लॉक कराएं ताकि लेनदेन रोका जा सके।",
        cyber4: "सभी सबूत (स्क्रीनशॉट, ट्रांजेक्शन नंबर, मैसेज) सुरक्षित रखें।",
        cyberLink: "साइबर सुरक्षा मार्गदर्शिका देखें →",
        workplaceTitle: "कार्यस्थल उत्पीड़न / वेतन न मिलना",
        workplace1: "HR और प्रबंधन को लिखित शिकायत दर्ज कराएं।",
        workplace2: "POSH उत्पीड़न के मामले में आंतरिक शिकायत समिति (ICC) को पत्र लिखें।",
        workplace3: "वेतन न मिलने पर श्रम आयुक्त (Labour Commissioner) से शिकायत करें।",
        workplace4: "वेतन वसूली हेतु लीगल नोटिस जारी करें।",
        workplaceLink: "कार्यस्थल अधिकारों की जानकारी →",
        disclaimer: "अस्वीकरण: यह सामान्य कानूनी जानकारी है, कानूनी सलाह नहीं। तुरंत खतरे में 112 पर कॉल करें।"
    }
};

class NyayEmergencyPanel {
    constructor() {
        this.currentLang = localStorage.getItem('nyaysetu_lang') || 'en';
        this.trustedContacts = JSON.parse(localStorage.getItem('nyaysetu_trusted_contacts') || '[]');
        this.sosLocation = null;
        this.init();
    }

    init() {
        if (!document.getElementById('nyayEmergencyDrawer')) {
            this.injectHTML();
        }
        this.bindEvents();
        this.renderHelplines();
        this.renderTrustedContacts();
        this.updateLanguage(this.currentLang);

        // Listen for global lang change
        window.addEventListener('nyaysetu:langchange', (e) => {
            if (e.detail && e.detail.lang) {
                this.updateLanguage(e.detail.lang);
            }
        });
    }

    injectHTML() {
        const overlay = document.createElement('div');
        overlay.className = 'nyay-overlay';
        overlay.id = 'nyayOverlay';
        document.body.appendChild(overlay);

        const drawer = document.createElement('div');
        drawer.className = 'nyay-drawer nyay-emergency-drawer';
        drawer.id = 'nyayEmergencyDrawer';
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-modal', 'true');
        drawer.setAttribute('aria-label', 'Emergency Help Panel');

        drawer.innerHTML = `
            <div class="nyay-emergency-header">
                <h2>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span id="emHeadTitle">Emergency Help</span>
                </h2>
                <button class="nyay-drawer-close" id="nyayEmergencyClose" aria-label="Close emergency panel">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            
            <div class="nyay-drawer-body">
                <!-- SOS Section -->
                <div class="nyay-sos-box">
                    <div class="nyay-section-title">
                        <span id="emSosTitle">I'm in danger (SOS)</span>
                    </div>
                    <button class="nyay-sos-btn" id="nyaySosBtn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <span id="emSosBtnTxt">Get Location & Prepare SOS</span>
                    </button>
                    <div class="nyay-sos-status" id="nyaySosStatus"></div>
                    <div class="nyay-sos-actions" id="nyaySosActions">
                        <button class="nyay-sos-share-btn wa" id="nyaySosWa">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                            </svg>
                            <span id="emWaTxt">WhatsApp</span>
                        </button>
                        <button class="nyay-sos-share-btn sms" id="nyaySosSms">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span id="emSmsTxt">SMS</span>
                        </button>
                    </div>
                </div>

                <!-- Trusted Contacts -->
                <div>
                    <div class="nyay-section-title">
                        <span id="emTrustedTitle">Trusted Contacts (Max 3)</span>
                    </div>
                    <div class="nyay-contacts-list" id="nyayContactsList"></div>
                    <form class="nyay-add-contact-form" id="nyayContactForm">
                        <div class="nyay-add-contact-inputs">
                            <input type="text" id="nyayContactName" placeholder="Name" required />
                            <input type="tel" id="nyayContactPhone" placeholder="Phone Number" required />
                        </div>
                        <button type="submit" class="nyay-btn-sm" id="emAddContactBtn">+ Add Contact</button>
                    </form>
                </div>

                <!-- Quick Call Grid -->
                <div>
                    <div class="nyay-section-title">
                        <span id="emQuickCallTitle">Quick Call Helplines</span>
                    </div>
                    <div class="nyay-call-grid" id="nyayCallGrid"></div>
                </div>

                <!-- Accordion Situation Cards -->
                <div>
                    <div class="nyay-section-title">
                        <span id="emActionsTitle">What to do right now</span>
                    </div>
                    <div class="nyay-accordion-list" id="nyayAccordionList">
                        <!-- FIR Card -->
                        <div class="nyay-accordion-item">
                            <button class="nyay-accordion-header">
                                <span id="emFirTitle">If police refuse to file an FIR</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="nyay-accordion-content">
                                <ul>
                                    <li id="emFir1">Request a 'Zero FIR' which can be registered at ANY police station regardless of jurisdiction.</li>
                                    <li id="emFir2">Send written complaint by registered post to Superintendent of Police (SP) u/s 154(3) CrPC/BNSS.</li>
                                    <li id="emFir3">File an application before Judicial Magistrate u/s 156(3) CrPC/BNSS.</li>
                                    <li id="emFir4">File an e-FIR on your state police web portal if supported.</li>
                                </ul>
                                <a href="explore.html?topic=fir" class="nyay-accordion-link" id="emFirLink">Get detailed FIR guidance →</a>
                            </div>
                        </div>

                        <!-- Arrest Card -->
                        <div class="nyay-accordion-item">
                            <button class="nyay-accordion-header">
                                <span id="emArrestTitle">If you are arrested</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="nyay-accordion-content">
                                <ul>
                                    <li id="emArrest1">Demand to know exact grounds of arrest immediately (Art 22(1) Constitution).</li>
                                    <li id="emArrest2">Right to inform a family member or friend right away (Sec 50A CrPC).</li>
                                    <li id="emArrest3">Right to consult and be defended by a lawyer of choice.</li>
                                    <li id="emArrest4">Must be produced before a Magistrate within 24 hours of arrest.</li>
                                    <li id="emArrest5">Right to medical examination upon arrest (Sec 54 CrPC).</li>
                                </ul>
                                <a href="explore.html?topic=arrest" class="nyay-accordion-link" id="emArrestLink">Get detailed rights guidance →</a>
                            </div>
                        </div>

                        <!-- Domestic Violence Card -->
                        <div class="nyay-accordion-item">
                            <button class="nyay-accordion-header">
                                <span id="emDvTitle">Domestic Violence Emergency</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="nyay-accordion-content">
                                <ul>
                                    <li id="emDv1">Call Women Helpline 181 or 112 for immediate intervention.</li>
                                    <li id="emDv2">Contact local Protection Officer or legal aid clinic under PWDVA 2005.</li>
                                    <li id="emDv3">Right to reside in shared household & emergency shelter home.</li>
                                    <li id="emDv4">Obtain urgent Protection Orders & interim monetary relief.</li>
                                </ul>
                                <a href="consumer-rights.html" class="nyay-accordion-link" id="emDvLink">Get detailed domestic violence guide →</a>
                            </div>
                        </div>

                        <!-- Cyber Crime Card -->
                        <div class="nyay-accordion-item">
                            <button class="nyay-accordion-header">
                                <span id="emCyberTitle">Cyber Fraud / Online Harassment</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="nyay-accordion-content">
                                <ul>
                                    <li id="emCyber1">Call 1930 Cyber Crime Helpline immediately within the 'Golden Hour'.</li>
                                    <li id="emCyber2">Report incident on cybercrime.gov.in portal.</li>
                                    <li id="emCyber3">Contact your bank to freeze transactions and block cards.</li>
                                    <li id="emCyber4">Save all evidence: screenshots, transaction reference numbers, URLs.</li>
                                </ul>
                                <a href="news.html" class="nyay-accordion-link" id="emCyberLink">Get detailed cyber crime guide →</a>
                            </div>
                        </div>

                        <!-- Workplace Card -->
                        <div class="nyay-accordion-item">
                            <button class="nyay-accordion-header">
                                <span id="emWorkplaceTitle">Workplace Harassment / Salary Not Paid</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="nyay-accordion-content">
                                <ul>
                                    <li id="emWorkplace1">Send formal written grievance to HR and management with timestamped records.</li>
                                    <li id="emWorkplace2">For POSH harassment: file complaint with Internal Complaints Committee (ICC).</li>
                                    <li id="emWorkplace3">For unpaid salary: file complaint with Labour Commissioner or Conciliation Officer.</li>
                                    <li id="emWorkplace4">Issue legal notice for salary recovery with 15-day notice period.</li>
                                </ul>
                                <a href="explore.html" class="nyay-accordion-link" id="emWorkplaceLink">Get detailed workplace rights guide →</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer Disclaimer -->
                <div class="nyay-emergency-disclaimer" id="emDisclaimer">
                    General legal information, not legal advice. In immediate danger, call 112.
                </div>
            </div>
        `;

        document.body.appendChild(drawer);
    }

    bindEvents() {
        const closeBtn = document.getElementById('nyayEmergencyClose');
        const overlay = document.getElementById('nyayOverlay');
        const sosBtn = document.getElementById('nyaySosBtn');
        const contactForm = document.getElementById('nyayContactForm');
        const waBtn = document.getElementById('nyaySosWa');
        const smsBtn = document.getElementById('nyaySosSms');

        if (closeBtn) closeBtn.addEventListener('click', () => this.close());
        if (overlay) overlay.addEventListener('click', () => {
            this.close();
            if (window.nyayMenuInstance) window.nyayMenuInstance.close();
        });

        // Trigger buttons on existing pages
        document.querySelectorAll('.btn-emergency, .floating-emergency').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });

        if (sosBtn) {
            sosBtn.addEventListener('click', () => this.handleSos());
        }

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addContact();
            });
        }

        if (waBtn) waBtn.addEventListener('click', () => this.shareSos('wa'));
        if (smsBtn) smsBtn.addEventListener('click', () => this.shareSos('sms'));

        // Accordion toggle
        document.querySelectorAll('#nyayAccordionList .nyay-accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const isActive = item.classList.contains('active');
                
                document.querySelectorAll('#nyayAccordionList .nyay-accordion-item').forEach(el => {
                    el.classList.remove('active');
                });

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // Keyboard navigation (ESC key)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    open() {
        const drawer = document.getElementById('nyayEmergencyDrawer');
        const overlay = document.getElementById('nyayOverlay');

        if (drawer && overlay) {
            overlay.classList.add('active');
            drawer.classList.add('open');
            document.body.classList.add('nyay-panel-open');
        }
    }

    close() {
        const drawer = document.getElementById('nyayEmergencyDrawer');
        const overlay = document.getElementById('nyayOverlay');

        if (drawer && overlay) {
            drawer.classList.remove('open');
            // check if menu is open before closing overlay
            if (!document.getElementById('nyayMenuDrawer')?.classList.contains('open')) {
                overlay.classList.remove('active');
                document.body.classList.remove('nyay-panel-open');
            }
        }
    }

    renderHelplines() {
        const grid = document.getElementById('nyayCallGrid');
        if (!grid) return;

        grid.innerHTML = HELPLINES.map(h => `
            <a href="tel:${h.callNumber || h.number.replace(/\s+/g, '')}" class="nyay-call-card" style="--card-accent: ${h.color};">
                <div class="nyay-call-num">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    ${h.number}
                </div>
                <div class="nyay-call-label">
                    ${this.currentLang === 'hi' ? h.labelHi : h.labelEn}
                </div>
                <div class="nyay-call-btn-ic">
                    <span>${this.currentLang === 'hi' ? 'कॉल करें' : 'Tap to Call'}</span> →
                </div>
            </a>
        `).join('');
    }

    handleSos() {
        const status = document.getElementById('nyaySosStatus');
        const txt = EMERGENCY_I18N[this.currentLang];

        if (status) status.innerText = txt.locating;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude;
                    const lng = pos.coords.longitude;
                    this.sosLocation = `https://maps.google.com/?q=${lat},${lng}`;
                    if (status) status.innerText = txt.locSuccess;
                },
                (err) => {
                    this.sosLocation = null;
                    if (status) status.innerText = txt.locDenied;
                },
                { timeout: 8000, enableHighAccuracy: true }
            );
        } else {
            this.sosLocation = null;
            if (status) status.innerText = txt.locDenied;
        }
    }

    shareSos(type) {
        const isHi = this.currentLang === 'hi';
        let msg = isHi 
            ? "आपातकालीन SOS (NyaySetu)! मुझे तुरंत सहायता की आवश्यकता है।" 
            : "EMERGENCY SOS (NyaySetu)! I need immediate help.";

        if (this.sosLocation) {
            msg += ` ${isHi ? 'मेरी लाइव लोकेशन:' : 'My location:'} ${this.sosLocation}`;
        }

        const phoneNumbers = this.trustedContacts.map(c => c.phone).join(',');

        if (type === 'wa') {
            const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
        } else if (type === 'sms') {
            const recipient = phoneNumbers ? phoneNumbers : '';
            const url = `sms:${recipient}?body=${encodeURIComponent(msg)}`;
            window.open(url, '_self');
        }
    }

    renderTrustedContacts() {
        const list = document.getElementById('nyayContactsList');
        const form = document.getElementById('nyayContactForm');
        const txt = EMERGENCY_I18N[this.currentLang];

        if (!list) return;

        if (this.trustedContacts.length === 0) {
            list.innerHTML = `<div style="font-size:0.8rem; color:var(--text-secondary); text-align:center; padding:6px;">${txt.noContacts}</div>`;
        } else {
            list.innerHTML = this.trustedContacts.map((c, i) => `
                <div class="nyay-contact-card">
                    <div class="nyay-contact-info">
                        <span class="nyay-contact-name">${c.name}</span>
                        <span class="nyay-contact-phone">${c.phone}</span>
                    </div>
                    <button class="nyay-contact-del" onclick="window.nyayEmergencyInstance.deleteContact(${i})" aria-label="Delete contact">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            `).join('');
        }

        if (form) {
            form.style.display = this.trustedContacts.length >= 3 ? 'none' : 'flex';
        }
    }

    addContact() {
        const nameInput = document.getElementById('nyayContactName');
        const phoneInput = document.getElementById('nyayContactPhone');

        if (!nameInput || !phoneInput) return;

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (name && phone && this.trustedContacts.length < 3) {
            this.trustedContacts.push({ name, phone });
            localStorage.setItem('nyaysetu_trusted_contacts', JSON.stringify(this.trustedContacts));
            nameInput.value = '';
            phoneInput.value = '';
            this.renderTrustedContacts();
        }
    }

    deleteContact(index) {
        this.trustedContacts.splice(index, 1);
        localStorage.setItem('nyaysetu_trusted_contacts', JSON.stringify(this.trustedContacts));
        this.renderTrustedContacts();
    }

    updateLanguage(lang) {
        this.currentLang = lang;
        const txt = EMERGENCY_I18N[lang] || EMERGENCY_I18N.en;

        const updateText = (id, str) => {
            const el = document.getElementById(id);
            if (el) el.innerText = str;
        };

        updateText('emHeadTitle', txt.title);
        updateText('emSosTitle', txt.sosTitle);
        updateText('emSosBtnTxt', txt.btnFetchSos);
        updateText('emWaTxt', txt.shareWa);
        updateText('emSmsTxt', txt.shareSms);
        updateText('emTrustedTitle', txt.trustedTitle);
        updateText('emAddContactBtn', txt.addBtn);
        updateText('emQuickCallTitle', txt.quickCall);
        updateText('emActionsTitle', txt.actionsTitle);

        updateText('emFirTitle', txt.firTitle);
        updateText('emFir1', txt.fir1);
        updateText('emFir2', txt.fir2);
        updateText('emFir3', txt.fir3);
        updateText('emFir4', txt.fir4);
        updateText('emFirLink', txt.firLink);

        updateText('emArrestTitle', txt.arrestTitle);
        updateText('emArrest1', txt.arrest1);
        updateText('emArrest2', txt.arrest2);
        updateText('emArrest3', txt.arrest3);
        updateText('emArrest4', txt.arrest4);
        updateText('emArrest5', txt.arrest5);
        updateText('emArrestLink', txt.arrestLink);

        updateText('emDvTitle', txt.dvTitle);
        updateText('emDv1', txt.dv1);
        updateText('emDv2', txt.dv2);
        updateText('emDv3', txt.dv3);
        updateText('emDv4', txt.dv4);
        updateText('emDvLink', txt.dvLink);

        updateText('emCyberTitle', txt.cyberTitle);
        updateText('emCyber1', txt.cyber1);
        updateText('emCyber2', txt.cyber2);
        updateText('emCyber3', txt.cyber3);
        updateText('emCyber4', txt.cyber4);
        updateText('emCyberLink', txt.cyberLink);

        updateText('emWorkplaceTitle', txt.workplaceTitle);
        updateText('emWorkplace1', txt.workplace1);
        updateText('emWorkplace2', txt.workplace2);
        updateText('emWorkplace3', txt.workplace3);
        updateText('emWorkplace4', txt.workplace4);
        updateText('emWorkplaceLink', txt.workplaceLink);

        updateText('emDisclaimer', txt.disclaimer);

        const nameIn = document.getElementById('nyayContactName');
        const phoneIn = document.getElementById('nyayContactPhone');
        if (nameIn) nameIn.placeholder = txt.namePlaceholder;
        if (phoneIn) phoneIn.placeholder = txt.phonePlaceholder;

        this.renderHelplines();
        this.renderTrustedContacts();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.nyayEmergencyInstance = new NyayEmergencyPanel();
});
