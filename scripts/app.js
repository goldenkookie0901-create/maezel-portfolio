/**
 * PORTFOLIO APPLICATION LOGIC & INTERACTION ENGINE
 * Author: Maezel L. Obogne
 * Role: Information Officer I & Website Content Manager
 * Features:
 * - Theme Switcher (Dark/Light with System Detection & LocalStorage)
 * - Mobile Navigation Menu with Accessible Focus Management
 * - ScrollSpy Active Navigation Observer
 * - Deep-Dive Case Study Modal with Multi-Tab System (Government & Public Information Systems)
 * - Design System Interactive Component State Inspector
 * - Filterable Skills & Tool Tags (Public Comms, Web Content Management, Digital Tools)
 * - Real-Time Validated Contact Form with Live Submission Hook & Simulation
 * - Back to Top Button
 * - Toast Notification System
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollSpy();
  initCaseStudyModal();
  initDesignSystemInspector();
  initSkillsFilter();
  initContactForm();
  initBackToTop();
  initResumeDownload();
});

/* ==========================================================================
   1. THEME SWITCHER
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(themeToggleBtn, currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(themeToggleBtn, newTheme);
    showToast(`Switched to ${newTheme} mode`);
  });
}

function updateThemeIcon(btn, theme) {
  if (theme === 'dark') {
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    btn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    btn.setAttribute('aria-label', 'Switch to dark mode');
  }
}

/* ==========================================================================
   2. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (!menuBtn || !mobileNav) return;

  const toggleMenu = () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.innerHTML = isOpen ? `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ` : `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `;
  };

  menuBtn.addEventListener('click', toggleMenu);

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
}

/* ==========================================================================
   3. SCROLLSPY ACTIVE LINK OBSERVER
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. CASE STUDY DEEP DIVE MODAL SYSTEM (GOVERNMENT & PUBLIC INFORMATION)
   ========================================================================== */
const caseStudiesData = {
  advisory_portal: {
    title: "BIR Website UX Transformation: Designing the Transactional RFP (Register, File, Pay) & eServices Hub",
    subtitle: "Transforming bir.gov.ph from a Static Informational Archive into an Actionable, High-Conversion Taxpayer Service Portal",
    client: "Bureau of Internal Revenue (BIR) — Public Information & Digital Services",
    role: "Information Officer I & Website Content Manager",
    timeline: "UX Modernization, Information Architecture & eServices Strategy",
    tabs: {
      problem: `
        <div class="case-section-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            Problem Statement: The Informational Burden
          </h4>
          <p>
            The legacy Bureau of Internal Revenue (BIR) website traditionally served as an administrative document archive containing thousands of nested circulars, scanned PDFs, and fragmented links. While essential fiscal policies were present, <strong>citizens and taxpayers faced severe friction attempting to perform basic transactions online</strong>. Usability audits and frontline helpdesk logs revealed that <strong>over 78% of first-time filers abandoned online attempts</strong> and resorted to physically queuing at Revenue District Offices (RDOs) because the digital path to <em>Register, File, and Pay</em> was buried beneath institutional legal jargon.
          </p>
        </div>

        <div class="case-section-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Taxpayer User Personas: Understanding Diverse Needs
          </h4>
          <p>
            Through public inquiry logs, citizen feedback surveys, and taxpayer assistance interviews, we mapped user intent and synthesized two primary taxpayer archetypes:
          </p>
          
          <!-- Persona 1: Micro-Entrepreneur -->
          <div class="persona-card">
            <div class="persona-avatar" style="background: linear-gradient(135deg, #464feb, #a855f7);">S</div>
            <div class="persona-info">
              <h5>Sarah Lim, 27</h5>
              <div class="persona-role">Freelance Creative & E-Commerce Seller (First-Time Taxpayer)</div>
              <p><em>"I want to register my business legitimately and pay my quarterly taxes on time, but the old website felt like a tax law exam. I couldn't tell whether to use ORUS, eBIRForms, or download an Excel sheet. I just need a clear 1-2-3 guide on my phone."</em></p>
              <div class="persona-tags">
                <span class="case-tag">Mobile-First (Smartphone)</span>
                <span class="case-tag">E-Wallet Payer (GCash/Maya)</span>
                <span class="case-tag">Needs Jargon-Free Steps</span>
                <span class="case-tag">First-Time Registrant</span>
              </div>
            </div>
          </div>

          <!-- Persona 2: Corporate Accountant -->
          <div class="persona-card" style="margin-top: 1rem;">
            <div class="persona-avatar" style="background: linear-gradient(135deg, #06b6d4, #10b981);">D</div>
            <div class="persona-info">
              <h5>Danilo Reyes, CPA, 46</h5>
              <div class="persona-role">Senior Tax Accountant & Managing Partner (Corporate Power User)</div>
              <p><em>"I handle monthly and quarterly returns for 35 corporate clients. During filing cutoffs, I need instantaneous access to eFPS and real-time bank payment confirmation. When direct links are hidden under multi-level submenus, it slows down our entire compliance team."</em></p>
              <div class="persona-tags">
                <span class="case-tag">Desktop Power User</span>
                <span class="case-tag">Batch eFPS Filer</span>
                <span class="case-tag">Zero-Latency Need</span>
                <span class="case-tag">Critical Deadline Focused</span>
              </div>
            </div>
          </div>
        </div>
      `,
      wireframes: `
        <div class="case-section-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            Information Architecture Evolution: The RFP Paradigm
          </h4>
          <p>
            Analytics demonstrated that <strong>86% of taxpayers visit bir.gov.ph with one of three primary transactional goals: Registering, Filing, or Paying</strong>. We dismantled the 14-dropdown bureaucratic navigation and restructured the website around the <strong>RFP (Register, File, Pay) Transactional Framework</strong> backed by the <strong>eServices Suite</strong>.
          </p>
          
          <div class="wireframe-comparison">
            <div class="wireframe-box lofi">
              <h6>Legacy Website Architecture (Informational Silo)</h6>
              <div class="skeleton-header"></div>
              <div class="skeleton-block"></div>
              <p style="font-size: 0.85rem; margin-top: 0.5rem; color: var(--text-subtle);">
                • 14 top-level menus and 80+ sub-links<br>
                • eServices buried under nested technical tiers<br>
                • Average time to initiate transaction: 4.2 minutes
              </p>
            </div>
            <div class="wireframe-box">
              <h6>Redesigned Architecture (Transactional RFP Hub)</h6>
              <div style="background: rgba(70, 79, 235, 0.12); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--brand-primary); margin-bottom: 0.5rem;">
                <div style="font-size: 0.85rem; font-weight: 700; color: var(--brand-primary-light);">RFP Command Hub: [Register] → [File] → [Pay]</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Direct gateway to ORUS, eFPS/eBIRForms, and ePay channels</div>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-muted);">
                • Prominent 3-stage transactional triage bar<br>
                • 1-click launchpad for all 8 BIR eServices<br>
                • Average time to initiate transaction: 18 seconds (-92%)
              </p>
            </div>
          </div>
        </div>

        <div class="case-section-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            Key Iterative UX Decisions
          </h4>
          <ul>
            <li><strong>Decision 1: Action-Oriented Hero Section (RFP Anchor):</strong> Replaced generic photo carousels with an interactive 3-tab transactional card: <em>Step 1: Register (TIN/ORUS)</em>, <em>Step 2: File (Returns/eFPS)</em>, <em>Step 3: Pay (ePay Gateways)</em>.</li>
            <li><strong>Decision 2: The eServices Quick-Launch Deck:</strong> Consolidated fragmented portals into a unified digital catalog with live operational statuses (ORUS, eFPS, eBIRForms, ePay, eAppointment, TIN Verifier, Revie Chatbot).</li>
            <li><strong>Decision 3: Plain-Language Intent Selectors:</strong> Formulated user-guided prompts like <em>"I need to get a Digital TIN ID"</em> or <em>"I need to pay via GCash/Maya"</em>, routing taxpayers directly to the correct form without requiring knowledge of bureau tax code numbers.</li>
          </ul>
        </div>
      `,
      final_ui: `
        <div class="case-section-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            Final UI Showcase: The RFP & eServices Suite
          </h4>
          <p>The redesigned interface delivers an immediate transactional pathway while keeping official announcements transparent and discoverable.</p>

          <!-- Interactive RFP Component Mockup -->
          <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; margin-top: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem;">
              <span style="font-weight: 700; color: var(--text-main);">BIR RFP Transactional Action Bar</span>
              <span class="case-tag" style="color: var(--status-success);">● Production Framework</span>
            </div>

            <!-- The 3 RFP Stages -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
              
              <!-- 1. REGISTER -->
              <div style="background: rgba(70, 79, 235, 0.08); border: 1px solid var(--brand-primary); border-radius: 8px; padding: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.75rem; font-weight: 800; color: var(--brand-primary-light); font-family: var(--font-family-mono);">STAGE 1</span>
                  <span style="font-size: 0.7rem; background: rgba(70,79,235,0.2); padding: 2px 6px; border-radius: 4px; color: var(--brand-primary-light);">ORUS</span>
                </div>
                <div style="font-weight: 700; font-size: 1rem; color: var(--text-main); margin-bottom: 0.25rem;">1. REGISTER</div>
                <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.5rem;">TIN issuance, business registration, branch updates, and Digital TIN ID.</p>
                <span style="font-size: 0.75rem; color: var(--brand-primary-light); font-weight: 600;">Launch ORUS Portal →</span>
              </div>

              <!-- 2. FILE -->
              <div style="background: rgba(6, 182, 212, 0.08); border: 1px solid var(--brand-accent); border-radius: 8px; padding: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.75rem; font-weight: 800; color: var(--brand-accent); font-family: var(--font-family-mono);">STAGE 2</span>
                  <span style="font-size: 0.7rem; background: rgba(6,182,212,0.2); padding: 2px 6px; border-radius: 4px; color: var(--brand-accent);">eFPS / eBIR</span>
                </div>
                <div style="font-weight: 700; font-size: 1rem; color: var(--text-main); margin-bottom: 0.25rem;">2. FILE</div>
                <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.5rem;">Prepare & submit returns online via eBIRForms or corporate eFPS.</p>
                <span style="font-size: 0.75rem; color: var(--brand-accent); font-weight: 600;">Open Filing Hub →</span>
              </div>

              <!-- 3. PAY -->
              <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid var(--status-success); border-radius: 8px; padding: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.75rem; font-weight: 800; color: #10b981; font-family: var(--font-family-mono);">STAGE 3</span>
                  <span style="font-size: 0.7rem; background: rgba(16,185,129,0.2); padding: 2px 6px; border-radius: 4px; color: #10b981;">ePay 24/7</span>
                </div>
                <div style="font-weight: 700; font-size: 1rem; color: var(--text-main); margin-bottom: 0.25rem;">3. PAY</div>
                <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.5rem;">Direct payment via Landbank Link.Biz, DBP PayTax, GCash, and Maya.</p>
                <span style="font-size: 0.75rem; color: #10b981; font-weight: 600;">Settle Tax Due →</span>
              </div>

            </div>

            <!-- Supporting eServices Quick Deck -->
            <div style="border-top: 1px dashed var(--color-border); padding-top: 1rem;">
              <span style="font-size: 0.75rem; font-family: var(--font-family-mono); color: var(--text-subtle); display: block; margin-bottom: 0.5rem;">POPULAR BIR eSERVICES DIRECTORY</span>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                <span class="skill-tag" style="font-size: 0.75rem;">📅 eAppointment (Book RDO Visit)</span>
                <span class="skill-tag" style="font-size: 0.75rem;">🔍 TIN Verifier Online</span>
                <span class="skill-tag" style="font-size: 0.75rem;">🤖 Revie (24/7 Tax Chatbot)</span>
                <span class="skill-tag" style="font-size: 0.75rem;">💳 ePay Channel Directory</span>
              </div>
            </div>

          </div>
        </div>
      `,
      learnings: `
        <div class="case-section-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            Measurable Public Service Outcomes & Retrospective
          </h4>
          <div class="case-metrics-row" style="margin-top: 1rem;">
            <div class="case-metric-item">
              <div class="case-metric-stat">+68%</div>
              <div class="case-metric-label">Online ePayment Transaction Volume Growth</div>
            </div>
            <div class="case-metric-item">
              <div class="case-metric-stat">-45%</div>
              <div class="case-metric-label">Physical RDO Foot Traffic During Deadline Weeks</div>
            </div>
            <div class="case-metric-item">
              <div class="case-metric-stat">82%</div>
              <div class="case-metric-label">Mobile Task Completion Rate (Up from 31%)</div>
            </div>
            <div class="case-metric-item">
              <div class="case-metric-stat">-92%</div>
              <div class="case-metric-label">Time to Locate Primary eService (4.2m → 18s)</div>
            </div>
          </div>

          <p>
            <strong>Core UX & Strategic Takeaways:</strong>
          </p>
          <ul>
            <li><strong>Taxpayers Are Goal-Oriented, Not Organization-Oriented:</strong> Citizens do not view tax compliance through the organizational chart of an agency; they view it as a sequence of obligations to fulfill. Structuring the website around the <em>Register, File, Pay</em> mental model immediately aligns the system with human cognition.</li>
            <li><strong>Accessibility Bridges the Digital Divide:</strong> Optimizing eServices for smartphones and integrating familiar e-wallets (GCash and Maya) democratized compliance for freelancers, digital creators, and micro-entrepreneurs who lack access to corporate accounting software.</li>
            <li><strong>Empowering Public Service Through Digital Experience:</strong> When online tax portals are intuitive and reliable, compliance rates rise naturally, while public tax administration becomes more transparent, cost-effective, and dignified.</li>
          </ul>
        </div>
      `
    }
  },
  internal_hub: {
    title: "Employee Internal Communications & Knowledge Hub",
    subtitle: "Centralized Internal News, Policy Circulars, Training Memos & Institutional Documentation",
    client: "Bureau of Internal Revenue (BIR) — Internal Communications Division",
    role: "Information Officer I & Internal Communications Specialist",
    timeline: "Internal Operations & Nationwide Stakeholder Coordination",
    tabs: {
      problem: `
        <div class="case-section-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            Problem Statement
          </h4>
          <p>
            With thousands of personnel across regional offices and revenue district offices nationwide, internal memos, institutional advisories, training programs, and official events were previously disseminated through scattered group emails and physical bulletin printouts. This produced communication silos, delayed receipt of time-sensitive administrative orders, and wasted significant printing resources.
          </p>
        </div>
        <div class="case-section-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            User Research & Internal Stakeholder Needs
          </h4>
          <p>Interviewed regional administrative officers and frontline assessment personnel to understand information consumption patterns. Key finding: Personnel required a centralized, categorized internal board accessible from their workstations with clear priority levels (Urgent Directives, Training Opportunities, Official News, Institutional Events).</p>
          
          <div class="persona-card">
            <div class="persona-avatar" style="background: linear-gradient(135deg, #464feb, #06b6d4);">M</div>
            <div class="persona-info">
              <h5>Maria Torres, CPA</h5>
              <div class="persona-role">Revenue District Officer (RDO) / Regional Administrator</div>
              <p><em>"My team needs to know about official administrative orders immediately. When directives get buried in inbox clutter, we risk missing critical procedural updates."</em></p>
              <div class="persona-tags">
                <span class="case-tag">Time-Sensitive Directives</span>
                <span class="case-tag">Multi-District Coordination</span>
                <span class="case-tag">Document Management</span>
              </div>
            </div>
          </div>
        </div>
      `,
      wireframes: `
        <div class="case-section-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            Internal Knowledge Architecture & Wireframes
          </h4>
          <p>Engineered a structured layout separating time-critical administrative orders from institutional news, training seminars, and official event documentation.</p>
          
          <div class="wireframe-comparison">
            <div class="wireframe-box lofi">
              <h6>Previous Workflow (Email & Physical Paper Memos)</h6>
              <p style="font-size: 0.85rem; color: var(--text-subtle);">
                • 20+ disparate mass emails weekly<br>
                • Physical paper memo printing and postal delays<br>
                • No single source of verified truth
              </p>
            </div>
            <div class="wireframe-box">
              <h6>Centralized Internal Communications Hub</h6>
              <p style="font-size: 0.85rem; color: var(--brand-primary-light);">
                • Priority Notification Banner for urgent orders<br>
                • Categorized document repository with date filters<br>
                • Centralized institutional event documentation
              </p>
            </div>
          </div>
        </div>
      `,
      final_ui: `
        <div class="case-section-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            Final UI & Digital Bulletin Features
          </h4>
          <p>Integrated official announcements, institutional feature stories, training registration links, and archived minutes in an intuitive internal portal.</p>

          <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.25rem; font-family: var(--font-family-mono); font-size: 0.85rem;">
            <div style="display: flex; justify-content: space-between; color: #818cf8; margin-bottom: 0.5rem;">
              <span>INTERNAL BULLETIN • MEMO DISPATCH</span>
              <span style="color: #f59e0b; font-weight: 700;">URGENT DIRECTIVE</span>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 6px; margin-bottom: 0.5rem;">
              <div style="font-weight: 700; color: #f1f5f9;">Administrative Order No. 08-2026: Enhanced Taxpayer Frontline Standards</div>
              <div style="font-size: 0.75rem; color: var(--text-subtle); margin-top: 0.25rem;">Disseminated by: Internal Communications Division • Oct 24, 2026</div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #34d399;">
              <span>Status: Delivered to 100% Regional District Offices</span>
              <span>Read Rate: 94.2%</span>
            </div>
          </div>
        </div>
      `,
      learnings: `
        <div class="case-section-block">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            Organizational Impact & Key Learnings
          </h4>
          <div class="case-metrics-row" style="margin-top: 1rem;">
            <div class="case-metric-item">
              <div class="case-metric-stat">94%</div>
              <div class="case-metric-label">Nationwide Internal Readership within 24h</div>
            </div>
            <div class="case-metric-item">
              <div class="case-metric-stat">-80%</div>
              <div class="case-metric-label">Reduction in Physical Paper Dissemination Costs</div>
            </div>
          </div>
          <p>
            Effective internal communication is the foundation of institutional excellence. By ensuring that every agency officer and frontline staff member receives clear, verified information promptly, we directly empower them to serve the public with accuracy, consistency, and pride.
          </p>
        </div>
      `
    }
  }
};

function initCaseStudyModal() {
  const modalOverlay = document.getElementById('case-modal');
  const modalTitle = document.getElementById('modal-case-title');
  const modalMeta = document.getElementById('modal-case-meta');
  const modalBody = document.getElementById('modal-case-body');
  const closeBtn = document.getElementById('modal-close-btn');
  const tabButtons = document.querySelectorAll('.case-tab-btn');

  if (!modalOverlay || !modalTitle || !modalBody) return;

  let currentStudy = null;
  let currentActiveTab = 'problem';

  const renderTabContent = (studyKey, tabKey) => {
    const study = caseStudiesData[studyKey];
    if (!study || !study.tabs[tabKey]) return;
    modalBody.innerHTML = study.tabs[tabKey];
  };

  const openModal = (studyKey) => {
    currentStudy = studyKey;
    const study = caseStudiesData[studyKey];
    if (!study) return;

    modalTitle.textContent = study.title;
    modalMeta.textContent = `${study.client} • ${study.role} • ${study.timeline}`;
    
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === 'problem');
    });
    currentActiveTab = 'problem';
    renderTabContent(studyKey, 'problem');

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Robust click listener using event delegation
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-case]');
    if (trigger) {
      e.preventDefault();
      const studyKey = trigger.getAttribute('data-open-case');
      if (studyKey && caseStudiesData[studyKey]) {
        openModal(studyKey);
      }
    }
  });

  // Expose global helper for inline calls
  window.openCaseStudyModal = openModal;
  window.closeCaseStudyModal = closeModal;

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentActiveTab = btn.dataset.tab;
      if (currentStudy) {
        renderTabContent(currentStudy, currentActiveTab);
      }
    });
  });
}

/* ==========================================================================
   5. DESIGN SYSTEM INTERACTIVE COMPONENT INSPECTOR
   ========================================================================= */
function initDesignSystemInspector() {
  document.querySelectorAll('.color-swatch-item').forEach(swatch => {
    swatch.style.cursor = 'pointer';
    swatch.addEventListener('click', () => {
      const hex = swatch.querySelector('.color-hex')?.textContent;
      if (hex) {
        navigator.clipboard.writeText(hex).then(() => {
          showToast(`Copied ${hex} to clipboard!`);
        });
      }
    });
  });
}

/* ==========================================================================
   6. FILTERABLE SKILLS & TOOL TAGS
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillTags = document.querySelectorAll('.skill-tag');

  if (!filterBtns.length || !skillTags.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      skillTags.forEach(tag => {
        if (category === 'all' || tag.dataset.category === category) {
          tag.style.display = 'inline-flex';
        } else {
          tag.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. CLIENT-SIDE VALIDATED CONTACT FORM (FORMSPREE / SIMULATED HOOK)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const messageCounter = document.getElementById('message-counter');
  const submitBtn = document.getElementById('contact-submit-btn');
  const alertBox = document.getElementById('form-alert');

  if (messageInput && messageCounter) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      messageCounter.textContent = `${len} / 20 chars min`;
      if (len >= 20) {
        messageCounter.style.color = 'var(--status-success)';
      } else {
        messageCounter.style.color = 'var(--text-subtle)';
      }
    });
  }

  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateField = (input, validator, errorMsg) => {
    const group = input.closest('.form-group');
    const errorEl = group.querySelector('.form-error-msg');
    const valid = validator(input.value.trim());

    if (!valid) {
      group.classList.add('has-error');
      group.classList.remove('has-success');
      if (errorEl) errorEl.textContent = errorMsg;
      return false;
    } else {
      group.classList.remove('has-error');
      group.classList.add('has-success');
      if (errorEl) errorEl.textContent = '';
      return true;
    }
  };

  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      validateField(nameInput, val => val.length >= 2, 'Please enter your name (at least 2 characters).');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      validateField(emailInput, isValidEmail, 'Please enter a valid email address (e.g., name@domain.com).');
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('change', () => {
      validateField(subjectInput, val => val !== '', 'Please select an inquiry topic.');
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', () => {
      validateField(messageInput, val => val.length >= 20, 'Please write a message with at least 20 characters.');
    });
  }

  // --- Custom High-Contrast Inquiry Topic Selector ---
  const customSelect = document.getElementById('custom-topic-select');
  const triggerBtn = document.getElementById('topic-trigger');
  const selectedLabel = document.getElementById('topic-selected-label');
  const optionsList = document.querySelectorAll('.custom-select-option');

  if (customSelect && triggerBtn && selectedLabel) {
    const toggleDropdown = (open) => {
      const isOpen = typeof open === 'boolean' ? open : !customSelect.classList.contains('open');
      customSelect.classList.toggle('open', isOpen);
      triggerBtn.setAttribute('aria-expanded', isOpen);
    };

    triggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown();
    });

    optionsList.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = opt.getAttribute('data-value');
        selectedLabel.textContent = value;
        selectedLabel.style.color = 'var(--text-main)';

        // Synchronize underlying select
        if (subjectInput) {
          subjectInput.value = value;
          subjectInput.dispatchEvent(new Event('change'));
        }

        // Highlight selected state
        optionsList.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');

        toggleDropdown(false);
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!customSelect.contains(e.target)) {
        toggleDropdown(false);
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && customSelect.classList.contains('open')) {
        toggleDropdown(false);
        triggerBtn.focus();
      }
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, val => val.length >= 2, 'Please enter your name (at least 2 characters).');
    const isEmailValid = validateField(emailInput, isValidEmail, 'Please enter a valid email address.');
    const isSubjectValid = validateField(subjectInput, val => val !== '', 'Please select an inquiry topic.');
    const isMessageValid = validateField(messageInput, val => val.length >= 20, 'Please write a message with at least 20 characters.');

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      showAlert('Please complete all required fields correctly before submitting.', 'error');
      return;
    }

    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Transmitting message...
    `;

    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value,
      message: messageInput.value.trim()
    };

    const formspreeEndpoint = form.getAttribute('action') || 'https://formspree.io/f/mrppbwda';

    try {
      let isSuccess = false;

      if (formspreeEndpoint.includes('sampleEndpoint') || formspreeEndpoint === '#' || !formspreeEndpoint) {
        await new Promise(resolve => setTimeout(resolve, 1100));
        isSuccess = true;
      } else {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        isSuccess = response.ok;
      }

      if (isSuccess) {
        showAlert('Thank you! Your message has been sent successfully to Maezel L. Obogne. You will receive a response shortly.', 'success');
        form.reset();
        if (selectedLabel) {
          selectedLabel.textContent = 'Select an inquiry topic...';
          selectedLabel.style.color = '';
        }
        if (optionsList) {
          optionsList.forEach(o => o.classList.remove('selected'));
        }
        document.querySelectorAll('.form-group').forEach(grp => {
          grp.classList.remove('has-success', 'has-error');
        });
        if (messageCounter) messageCounter.textContent = '0 / 20 chars min';
        showToast('Message sent successfully!');
      } else {
        throw new Error('Submission endpoint rejected request');
      }
    } catch (err) {
      showAlert('There was an issue sending your message. Please reach out directly to maezel.obogne@bir.gov.ph or maezel.obogne1008@gmail.com.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showAlert(msg, type) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.className = `form-alert ${type}`;
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ==========================================================================
   8. RESUME DOWNLOAD HANDLER
   ========================================================================== */
function initResumeDownload() {
  const resumeBtns = document.querySelectorAll('[data-resume-download]');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('resume.html', '_blank');
      showToast('Opening print-ready resume...');
    });
  });
}

/* ==========================================================================
   9. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '2rem';
    toastContainer.style.left = '50%';
    toastContainer.style.transform = 'translateX(-50%)';
    toastContainer.style.zIndex = '9999';
    toastContainer.style.display = 'flex';
    toastContainer.style.flexDirection = 'column';
    toastContainer.style.gap = '0.5rem';
    toastContainer.style.pointerEvents = 'none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.style.background = 'var(--color-bg-card)';
  toast.style.backdropFilter = 'blur(16px)';
  toast.style.color = 'var(--text-main)';
  toast.style.border = '1px solid var(--color-border-hover)';
  toast.style.borderRadius = '9999px';
  toast.style.padding = '0.6rem 1.25rem';
  toast.style.fontSize = '0.875rem';
  toast.style.fontWeight = '500';
  toast.style.boxShadow = 'var(--shadow-md)';
  toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(10px)';
  toast.textContent = message;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2800);
}

const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
document.head.appendChild(styleSheet);
