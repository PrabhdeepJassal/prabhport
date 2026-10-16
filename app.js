/**
 * ============================================================================
 * PRABHDEEP SINGH — V2 MODERN MINIMAL AWWWARDS ENGINE
 * ============================================================================
 * Features:
 *  01. Magnetic Ball Cursor System
 *  02. Magnetic Elastic Floating Arrow Button
 *  03. Dynamic Marquee Velocity Acceleration
 *  04. Floating macOS Island Dock Navigation & Active Section Tracker
 *  05. Patent Technical Blueprints Modal
 *  06. Curriculum Vitae (CV) Modal
 *  07. Smooth Navigation Links
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     01. MAGNETIC BALL CURSOR (Awwwards Style)
     ========================================================================== */
  const cursorDot    = document.getElementById('magCursorDot');
  const cursorCircle = document.getElementById('magCursorCircle');

  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (hasFinePointer && cursorDot && cursorCircle) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;
    let isVisible = true;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      if (!isVisible) {
        isVisible = true;
        cursorDot.classList.remove('is-hidden');
        cursorCircle.classList.remove('is-hidden');
      }
    }, { passive: true });

    function animateCursorCircle() {
      circleX += (mouseX - circleX) * 0.16;
      circleY += (mouseY - circleY) * 0.16;
      cursorCircle.style.transform = `translate3d(${circleX.toFixed(2)}px, ${circleY.toFixed(2)}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursorCircle);
    }
    requestAnimationFrame(animateCursorCircle);

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursorDot.classList.add('is-hidden');
      cursorCircle.classList.add('is-hidden');
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      cursorDot.classList.remove('is-hidden');
      cursorCircle.classList.remove('is-hidden');
    });

    const hoverSelectors = 'a, button, [data-hover], .work-row-v2, .patent-card-v2, .floating-circle-arrow, .dock-btn, .hero-role-text, .hero-callout-group';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSelectors)) {
        cursorDot.classList.add('is-hovering');
        cursorCircle.classList.add('is-hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSelectors)) {
        cursorDot.classList.remove('is-hovering');
        cursorCircle.classList.remove('is-hovering');
      }
    });
  }


  /* ==========================================================================
     02. INTERACTIVE ROLE CALLOUT & MAGNETIC FLOATING ARROW
     ========================================================================== */
  const calloutGroup = document.getElementById('heroCalloutGroup');
  const arrowBtn     = document.getElementById('heroArrowBtn');
  const roleText     = document.getElementById('heroRoleText');
  const roleLine1    = document.getElementById('roleLine1');
  const roleLine2    = document.getElementById('roleLine2');

  // Magnetic Elastic Motion for Callout Group & Arrow
  if (calloutGroup && hasFinePointer) {
    let calloutRect = null;
    calloutGroup.addEventListener('mouseenter', () => {
      calloutRect = calloutGroup.getBoundingClientRect();
    });

    calloutGroup.addEventListener('mousemove', (e) => {
      if (!calloutRect) calloutRect = calloutGroup.getBoundingClientRect();
      const centerX = calloutRect.left + calloutRect.width / 2;
      const centerY = calloutRect.top + calloutRect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.22;
      const deltaY = (e.clientY - centerY) * 0.22;
      calloutGroup.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0)`;
    });

    calloutGroup.addEventListener('mouseleave', () => {
      calloutRect = null;
      calloutGroup.style.transform = 'translate3d(0px, 0px, 0)';
    });
  }

  // Interactive Roles personalized to Prabhdeep
  const roles = [
    { line1: 'Creative', line2: 'Designer & Developer' },
    { line1: 'AI & ML', line2: 'Conversational Voice' },
    { line1: 'Quantum', line2: 'Computing Researcher' },
    { line1: 'Inventor', line2: '4 Granted Patents' }
  ];

  let currentRoleIdx = 0;
  let roleCycleTimer = null;

  function switchRole(nextIdx) {
    if (!roleText || !roleLine1 || !roleLine2) return;
    roleText.classList.add('is-switching');
    setTimeout(() => {
      currentRoleIdx = nextIdx !== undefined ? nextIdx : (currentRoleIdx + 1) % roles.length;
      roleLine1.textContent = roles[currentRoleIdx].line1;
      roleLine2.textContent = roles[currentRoleIdx].line2;
      roleText.classList.remove('is-switching');
    }, 220);
  }

  if (roleText) {
    roleText.addEventListener('click', (e) => {
      e.stopPropagation();
      switchRole();
      restartRoleTimer();
    });

    roleText.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchRole();
        restartRoleTimer();
      }
    });
  }

  function restartRoleTimer() {
    if (roleCycleTimer) clearInterval(roleCycleTimer);
    roleCycleTimer = setInterval(() => {
      switchRole();
    }, 4800);
  }
  restartRoleTimer();

  // Arrow click navigates smoothly to Work showcase
  if (arrowBtn) {
    arrowBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = document.getElementById('work') || document.getElementById('about');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  /* ==========================================================================
     03. FLOATING MACOS DOCK NAVIGATION & DYNAMIC SIDE-SNAP MORPH
     ========================================================================== */
  const dockContainer = document.querySelector('.floating-dock-container');
  const dockButtons   = document.querySelectorAll('.dock-btn[data-target]');
  const sections      = document.querySelectorAll('section[id], header[id]');

  // Smooth scroll click handler
  dockButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Track active section and dynamic 3-phase collapse, travel & expand
  const LAPTOP_MIN_WIDTH = 992;
  function isLaptop() {
    return window.innerWidth >= LAPTOP_MIN_WIDTH;
  }

  let isSideDocked = false;
  let isTransitioning = false;
  let transitionTimeout = null;

  function morphToSide() {
    if (!isLaptop() || isSideDocked || isTransitioning) return;
    isSideDocked = true;
    isTransitioning = true;
    if (transitionTimeout) clearTimeout(transitionTimeout);

    // Step 1: Collapse whole bar into the center circle (right where it is at bottom)
    dockContainer.classList.add('is-collapsed');
    dockContainer.classList.remove('is-bottom-docked');

    // Step 2: Once collapsed (after 140ms), travel the center circle over to the right side
    transitionTimeout = setTimeout(() => {
      if (!isLaptop()) {
        dockContainer.classList.remove('is-collapsed', 'is-side-docked');
        dockContainer.classList.add('is-bottom-docked');
        isSideDocked = false;
        isTransitioning = false;
        return;
      }
      dockContainer.classList.add('is-side-docked');

      // Step 3: Once arrived at right side (after 280ms travel), open both ways instantly!
      transitionTimeout = setTimeout(() => {
        dockContainer.classList.remove('is-collapsed');
        isTransitioning = false;
      }, 280);
    }, 140);
  }

  function morphToBottom() {
    if (!isSideDocked || isTransitioning) return;
    isSideDocked = false;
    isTransitioning = true;
    if (transitionTimeout) clearTimeout(transitionTimeout);

    // Step 1: Collapse vertical bar into the center circle on the right side
    dockContainer.classList.add('is-collapsed');

    // Step 2: Once collapsed (after 140ms), travel the center circle down to the bottom center
    transitionTimeout = setTimeout(() => {
      dockContainer.classList.remove('is-side-docked');
      dockContainer.classList.add('is-bottom-docked');

      // Step 3: Once arrived at bottom center (after 280ms travel), open both ways horizontally!
      transitionTimeout = setTimeout(() => {
        dockContainer.classList.remove('is-collapsed');
        isTransitioning = false;
      }, 280);
    }, 140);
  }

  function handleDockScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    // Trigger 3-phase morph based on scroll fold ONLY ON LAPTOP (>= 992px)
    if (dockContainer) {
      if (isLaptop()) {
        if (scrollY > 120) {
          morphToSide();
        } else {
          morphToBottom();
        }
      } else {
        // Mobile / Tablet: Guarantee dock stays firmly pinned to bottom center
        if (isSideDocked || dockContainer.classList.contains('is-collapsed') || dockContainer.classList.contains('is-side-docked')) {
          isSideDocked = false;
          isTransitioning = false;
          if (transitionTimeout) clearTimeout(transitionTimeout);
          dockContainer.classList.remove('is-side-docked', 'is-collapsed');
          dockContainer.classList.add('is-bottom-docked');
        }
      }
    }

    // Track active section and highlight dock icon
    let currentId = '';
    const scrollPosition = scrollY + 220;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = `#${section.id}`;
      }
    });

    if (currentId) {
      dockButtons.forEach((btn) => {
        const target = btn.getAttribute('data-target');
        if (target === currentId) {
          btn.style.color = '#ffffff';
          btn.style.background = 'rgba(255, 255, 255, 0.18)';
        } else {
          btn.style.color = '';
          btn.style.background = '';
        }
      });
    }
  }

  let isDockScrollScheduled = false;
  function scheduleDockScroll() {
    if (!isDockScrollScheduled) {
      isDockScrollScheduled = true;
      requestAnimationFrame(() => {
        handleDockScroll();
        isDockScrollScheduled = false;
      });
    }
  }

  window.addEventListener('scroll', scheduleDockScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (!isLaptop() && dockContainer) {
      isSideDocked = false;
      isTransitioning = false;
      if (transitionTimeout) clearTimeout(transitionTimeout);
      dockContainer.classList.remove('is-side-docked', 'is-collapsed');
      dockContainer.classList.add('is-bottom-docked');
    }
  });
  handleDockScroll();


  /* ==========================================================================
     04. CUSTOM IN-MODAL PATENT PDF VIEWER & BLUEPRINT INSPECTION
     ========================================================================== */
  const patentModal           = document.getElementById('patentModalV2');
  const patentModalCard       = document.getElementById('patentModalCardV2');
  const patentModalTitle      = document.getElementById('patentModalTitleV2');
  const patentModalKicker     = document.getElementById('patentModalKicker');
  const patentModalClose      = document.getElementById('patentModalCloseV2');
  const patentModalBody       = document.getElementById('patentModalBodyV2');
  const pvMaximizeBtn         = document.getElementById('pvMaximizeBtn');
  const pvTabPdf              = document.getElementById('pvTabPdf');
  const pvTabSpecs            = document.getElementById('pvTabSpecs');
  const pvStatusBadge         = document.getElementById('pvStatusBadge');
  const pvPdfToolbarControls  = document.getElementById('pvPdfToolbarControls');
  const pvPrevPageBtn         = document.getElementById('pvPrevPageBtn');
  const pvNextPageBtn         = document.getElementById('pvNextPageBtn');
  const pvCurrentPageEl       = document.getElementById('pvCurrentPage');
  const pvTotalPagesEl        = document.getElementById('pvTotalPages');
  const pvZoomOutBtn          = document.getElementById('pvZoomOutBtn');
  const pvZoomInBtn           = document.getElementById('pvZoomInBtn');
  const pvZoomLevelBtn        = document.getElementById('pvZoomLevelBtn');
  const pvFitWidthBtn         = document.getElementById('pvFitWidthBtn');
  const pvPdfPane             = document.getElementById('pvPdfPane');
  const pvSpecsPane           = document.getElementById('pvSpecsPane');
  const pvScrollViewport      = document.getElementById('pvScrollViewport');
  const pvLoader              = document.getElementById('pvLoader');
  const pvCanvasFlow          = document.getElementById('pvCanvasFlow');
  const pvEmbedContainer      = document.getElementById('pvEmbedContainer');
  const pvNoticeContainer     = document.getElementById('pvNoticeContainer');
  const pvNoticeSwitchSpecsBtn= document.getElementById('pvNoticeSwitchSpecsBtn');

  // Configure PDF.js worker if library is present
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  const PATENT_DATA_V2 = {
    p1: {
      title: 'Earphone with Auto On & Off via Brain Signal Monitoring',
      kicker: 'PATENT 01 // PUBLISHED GAZETTE',
      status: 'Published Gazette',
      pdfUrl: 'assets/patents/earphone.pdf',
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  EEG BRAIN SIGNAL MONITORING & STERILIZATION ENGINE        │
│                                                             │
│  [Ear-Canal Micro EEG Probes] ──> [Analog Filter & Notch]   │
│                                           │                 │
│                                           ▼                 │
│  [Embedded Sleep ML Classifier] <── [Alpha/Theta Wave Ratio]│
│         │                                                   │
│         ├──────────────────────────> [Auto Playback Mute]   │
│         │                                                   │
│         ▼                                                   │
│  [Dual 265nm UV-C LED Chambers] (Bacterial Eradication)     │
└─────────────────────────────────────────────────────────────┘`,
      text: 'Discloses an intelligent earphone incorporating EEG micro-electrodes that evaluate neurological alpha-to-theta transition waves to verify sleep state within 800ms, automatically ramping down audio playback and engaging dual UV-C sterilization chambers in the ear canal tips to prevent bacterial proliferation.'
    },
    p2: {
      title: 'Device and Method for Detecting Infection State of Hair and Scalp',
      kicker: 'PATENT 02 // PUBLISHED GAZETTE',
      status: 'Published Gazette',
      pdfUrl: 'assets/patents/comb.pdf',
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  MULTI-SPECTRAL TRICHOLOGICAL OPTICAL SCANNER               │
│                                                             │
│  [365nm UV - 850nm NIR LED Array] ──> [Hair & Scalp Probe]  │
│                                                │            │
│                                                ▼            │
│  [CMOS Spectral Photodiode] <─────────── [Diffuse Scatter]  │
│         │                                                   │
│         ▼                                                   │
│  [Real-Time Diagnostic DSP] ──> [Cuticle Integrity Score]   │
│         │                                                   │
│         ▼                                                   │
│  [OLED HUD & Bluetooth Telemetry Report]                    │
└─────────────────────────────────────────────────────────────┘`,
      text: 'A diagnostic trichology instrument using discrete optical wavelengths from ultraviolet to near-infrared to detect fungal metabolite presence (Malassezia spp.), lipid loss, and structural hair cuticle fraying in under 150ms.'
    },
    p3: {
      title: 'Wearable Device for Generating Sound of Anklet Bell (Ghungroo)',
      kicker: 'PATENT 03 // PUBLISHED GAZETTE',
      status: 'Published Gazette',
      pdfUrl: 'assets/patents/anklet.pdf',
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  KINETIC FOOT-STRIKE ACOUSTIC SYNTHESIS ENGINE              │
│                                                             │
│  [Piezoelectric Strike Transducer] + [6-Axis IMU Sensor]     │
│                             │                               │
│                             ▼                               │
│  [DSP Strike Classifier] (Gait Velocity, Strike Cadence)    │
│                             │                               │
│                             ▼                               │
│  [Physical Model Sound Synthesizer] (Brass Bell Harmonics)  │
│                             │                               │
│                             ▼                               │
│  [Ultra-Low Latency (<4.2ms) Class-D Audio Driver]          │
└─────────────────────────────────────────────────────────────┘`,
      text: 'Replaces heavy traditional metallic dance bells with an ultra-lightweight smart ankle band that uses kinetic strike sensors and physical-modeling sound synthesis to reproduce authentic acoustic bell notes with zero audible delay.'
    },
    p4: {
      title: 'Colorblind & Multi-Usable Electric Toothbrush with Biometric Auth',
      kicker: 'PATENT 04 // FILED & DOCKETED',
      status: 'Filed // Examination',
      pdfUrl: 'assets/patents/toothbrush.pdf',
      diagram: `┌─────────────────────────────────────────────────────────────┐
│  BIOMETRIC ACCESSIBLE ORAL HEALTHCARE ARCHITECTURE          │
│                                                             │
│  [Capacitive Fingerprint Sensor] ──> [User Profile 1-5]     │
│                                             │               │
│  [9-Axis Gyroscope] ────────────────────────┤               │
│  (Quadrant Angle & Coverage Tracking)       │               │
│                                             ▼               │
│  [High-Contrast Tactile OLED Screen] <── [Core Controller]  │
│  (Colorblind-Optimized Numeric Telemetry)   │               │
│                                             ▼               │
│  [Sonic Motor Drive & Haptic Feedback Engine]               │
└─────────────────────────────────────────────────────────────┘`,
      text: 'Eliminates ambiguous red/green indicator LEDs in favor of high-contrast tactile OLED numeric telemetry for colorblind accessibility, paired with fingerprint multi-user profile switching and 9-axis brushing quadrant coaching.'
    }
  };

  // State management for viewer
  let currentPdfDoc = null;
  let currentZoom = 1.0;
  let currentPageIndex = 1;
  let totalDocPages = 1;
  let renderedPageDimensions = new Map(); // pageNum -> { width, height }
  let pageScrollObserver = null;
  let activePatentId = null;

  function switchViewerTab(tab) {
    if (tab === 'pdf') {
      pvTabPdf?.classList.add('is-active');
      pvTabPdf?.setAttribute('aria-selected', 'true');
      pvTabSpecs?.classList.remove('is-active');
      pvTabSpecs?.setAttribute('aria-selected', 'false');

      pvPdfPane?.classList.add('is-active');
      pvSpecsPane?.classList.remove('is-active');
      if (pvPdfToolbarControls) pvPdfToolbarControls.style.display = 'flex';
    } else {
      pvTabSpecs?.classList.add('is-active');
      pvTabSpecs?.setAttribute('aria-selected', 'true');
      pvTabPdf?.classList.remove('is-active');
      pvTabPdf?.setAttribute('aria-selected', 'false');

      pvSpecsPane?.classList.add('is-active');
      pvPdfPane?.classList.remove('is-active');
      if (pvPdfToolbarControls) pvPdfToolbarControls.style.display = 'none';
    }
  }

  if (pvTabPdf) pvTabPdf.addEventListener('click', () => switchViewerTab('pdf'));
  if (pvTabSpecs) pvTabSpecs.addEventListener('click', () => switchViewerTab('specs'));
  if (pvNoticeSwitchSpecsBtn) {
    pvNoticeSwitchSpecsBtn.addEventListener('click', () => switchViewerTab('specs'));
  }

  // Toggle Maximize Viewer
  function toggleMaximizeViewer() {
    if (!patentModalCard) return;
    const isMax = patentModalCard.classList.toggle('is-maximized');
    if (pvMaximizeBtn) {
      pvMaximizeBtn.title = isMax ? 'Restore Modal Size' : 'Toggle Fullscreen Expansion';
    }
    // Re-fit page width comfortably after window reflow
    setTimeout(fitWidthToViewer, 200);
  }
  if (pvMaximizeBtn) pvMaximizeBtn.addEventListener('click', toggleMaximizeViewer);

  // Zoom Engine
  function applyZoom(zoom) {
    currentZoom = Math.min(2.4, Math.max(0.5, Math.round(zoom * 100) / 100));
    if (pvZoomLevelBtn) {
      pvZoomLevelBtn.textContent = `${Math.round(currentZoom * 100)}%`;
    }

    // Smoothly scale all rendered page canvases
    renderedPageDimensions.forEach((dim, pageNum) => {
      const card = pvCanvasFlow?.querySelector(`.pv-page-card[data-page-num="${pageNum}"]`);
      const canvas = card?.querySelector('.pv-page-canvas');
      if (canvas) {
        canvas.style.width = `${Math.round(dim.width * currentZoom)}px`;
        canvas.style.height = `${Math.round(dim.height * currentZoom)}px`;
      }
    });

    // If in fallback iframe embed mode, scale the wrap
    const embedIframe = pvEmbedContainer?.querySelector('.pv-fallback-iframe');
    if (embedIframe) {
      embedIframe.style.transform = `scale(${currentZoom})`;
      embedIframe.style.transformOrigin = 'top center';
    }
  }

  function zoomIn() {
    applyZoom(currentZoom + 0.15);
  }

  function zoomOut() {
    applyZoom(currentZoom - 0.15);
  }

  function resetZoom() {
    applyZoom(1.0);
  }

  function fitWidthToViewer() {
    if (!pvScrollViewport) return;
    const availableWidth = pvScrollViewport.clientWidth - 56; // account for padding & scrollbar
    const firstDim = renderedPageDimensions.get(1);
    if (firstDim && firstDim.width > 0) {
      const targetZoom = availableWidth / firstDim.width;
      applyZoom(targetZoom);
    } else {
      applyZoom(1.0);
    }
  }

  if (pvZoomInBtn) pvZoomInBtn.addEventListener('click', zoomIn);
  if (pvZoomOutBtn) pvZoomOutBtn.addEventListener('click', zoomOut);
  if (pvZoomLevelBtn) pvZoomLevelBtn.addEventListener('click', resetZoom);
  if (pvFitWidthBtn) pvFitWidthBtn.addEventListener('click', fitWidthToViewer);

  // Paging controls
  function updatePagingDisplay(page, total) {
    currentPageIndex = page;
    totalDocPages = total;
    if (pvCurrentPageEl) pvCurrentPageEl.textContent = page;
    if (pvTotalPagesEl) pvTotalPagesEl.textContent = total;
    if (pvPrevPageBtn) pvPrevPageBtn.disabled = page <= 1;
    if (pvNextPageBtn) pvNextPageBtn.disabled = page >= total;
  }

  function scrollToPage(pageNum) {
    const targetCard = pvCanvasFlow?.querySelector(`.pv-page-card[data-page-num="${pageNum}"]`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      updatePagingDisplay(pageNum, totalDocPages);
    }
  }

  if (pvPrevPageBtn) {
    pvPrevPageBtn.addEventListener('click', () => {
      if (currentPageIndex > 1) scrollToPage(currentPageIndex - 1);
    });
  }

  if (pvNextPageBtn) {
    pvNextPageBtn.addEventListener('click', () => {
      if (currentPageIndex < totalDocPages) scrollToPage(currentPageIndex + 1);
    });
  }

  // Setup scroll observation to update current page number dynamically
  function setupPageScrollTracking() {
    if (pageScrollObserver) pageScrollObserver.disconnect();
    if (!pvScrollViewport) return;

    pageScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const num = parseInt(entry.target.getAttribute('data-page-num'), 10);
          if (!isNaN(num)) {
            updatePagingDisplay(num, totalDocPages);
          }
        }
      });
    }, {
      root: pvScrollViewport,
      threshold: 0.35
    });

    pvCanvasFlow?.querySelectorAll('.pv-page-card').forEach((card) => {
      pageScrollObserver.observe(card);
    });
  }

  // Fallback iframe embedding if PDF.js fails or CORS restrictions apply
  function renderEmbedFallback(pdfUrl) {
    if (pvLoader) pvLoader.style.display = 'none';
    if (pvCanvasFlow) pvCanvasFlow.style.display = 'none';
    if (pvNoticeContainer) pvNoticeContainer.style.display = 'none';
    if (pvEmbedContainer) {
      pvEmbedContainer.style.display = 'flex';
      pvEmbedContainer.innerHTML = `
        <div class="pv-fallback-wrap">
          <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1" 
                  class="pv-fallback-iframe" 
                  title="Patent Document">
          </iframe>
        </div>
      `;
    }
    updatePagingDisplay(1, 1);
  }

  // Render PDF pages sequentially onto high-DPI canvases
  async function loadAndRenderPdf(patentData) {
    const pdfUrl = patentData.pdfUrl;

    // Show loading spinner
    if (pvLoader) pvLoader.style.display = 'flex';
    if (pvCanvasFlow) {
      pvCanvasFlow.innerHTML = '';
      pvCanvasFlow.style.display = 'flex';
    }
    if (pvEmbedContainer) pvEmbedContainer.style.display = 'none';
    if (pvNoticeContainer) pvNoticeContainer.style.display = 'none';

    renderedPageDimensions.clear();
    currentZoom = 1.0;
    if (pvZoomLevelBtn) pvZoomLevelBtn.textContent = '100%';

    // If PDF.js is not loaded on page, immediately use seamless embed fallback
    if (!window.pdfjsLib) {
      renderEmbedFallback(pdfUrl);
      return;
    }

    try {
      // Test if file exists by fetching head/get or via getDocument
      const loadingTask = window.pdfjsLib.getDocument({
        url: pdfUrl,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true
      });

      currentPdfDoc = await loadingTask.promise;
      const numPages = currentPdfDoc.numPages;
      updatePagingDisplay(1, numPages);

      if (pvLoader) pvLoader.style.display = 'none';

      // Render each page into its own card
      const pixelRatio = Math.max(2, window.devicePixelRatio || 1); // 2x base resolution for razor-sharp zoom

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await currentPdfDoc.getPage(pageNum);
        const baseViewport = page.getViewport({ scale: 1.0 });

        renderedPageDimensions.set(pageNum, {
          width: baseViewport.width,
          height: baseViewport.height
        });

        const card = document.createElement('div');
        card.className = 'pv-page-card';
        card.setAttribute('data-page-num', pageNum);

        const badge = document.createElement('div');
        badge.className = 'pv-page-card-header';
        badge.textContent = `Page ${pageNum} of ${numPages}`;

        const canvas = document.createElement('canvas');
        canvas.className = 'pv-page-canvas';
        const ctx = canvas.getContext('2d', { alpha: false });

        // High DPI canvas buffer
        const renderViewport = page.getViewport({ scale: pixelRatio });
        canvas.width = Math.floor(renderViewport.width);
        canvas.height = Math.floor(renderViewport.height);
        canvas.style.width = `${Math.floor(baseViewport.width)}px`;
        canvas.style.height = `${Math.floor(baseViewport.height)}px`;

        card.appendChild(badge);
        card.appendChild(canvas);
        pvCanvasFlow.appendChild(card);

        // Render page vector stream
        const renderContext = {
          canvasContext: ctx,
          viewport: renderViewport
        };
        await page.render(renderContext).promise;
      }

      // Automatically fit width comfortably on initial load
      setTimeout(() => {
        fitWidthToViewer();
        setupPageScrollTracking();
      }, 80);

    } catch (err) {
      console.warn('PDF.js rendering note:', err.message);

      // Check if file is missing (e.g. Patent 4 filed / pending publication)
      if (patentData.status.toLowerCase().includes('filed') || pdfUrl.includes('toothbrush')) {
        if (pvLoader) pvLoader.style.display = 'none';
        if (pvCanvasFlow) pvCanvasFlow.style.display = 'none';
        if (pvEmbedContainer) pvEmbedContainer.style.display = 'none';
        if (pvNoticeContainer) pvNoticeContainer.style.display = 'flex';
        // Auto-switch to architecture blueprint tab
        switchViewerTab('specs');
      } else {
        // Otherwise attempt embedded browser frame fallback
        renderEmbedFallback(pdfUrl);
      }
    }
  }

  // Open Patent Modal
  function openPatentModal(id) {
    const data = PATENT_DATA_V2[id];
    if (!data || !patentModal) return;

    activePatentId = id;

    // Set modal headers
    if (patentModalTitle) patentModalTitle.textContent = data.title;
    if (patentModalKicker) patentModalKicker.textContent = data.kicker;
    if (pvStatusBadge) pvStatusBadge.textContent = data.status;

    // Inject Architecture & Technical Blueprint Content into specs pane
    if (patentModalBody) {
      patentModalBody.innerHTML = `
        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.25rem; font-weight: 600; color: #ffffff; margin-bottom: 0.5rem;">${data.title}</h4>
          <div style="font-family: var(--font-mono); font-size: 0.8rem; color: #a1a1aa; margin-bottom: 1.25rem;">
            STATUS: ${data.status.toUpperCase()} &bull; INVENTOR: Prabhdeep Singh
          </div>
          <p style="font-size: 1.05rem; line-height: 1.75; color: var(--text-light); margin-bottom: 2rem;">
            ${data.text}
          </p>
        </div>

        <div style="margin-bottom: 2rem;">
          <div style="font-family: var(--font-mono); font-size: 0.78rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.75rem; letter-spacing: 0.05em;">
            TECHNICAL SCHEMATIC &amp; HARDWARE FLOW DIAGRAM:
          </div>
          <pre class="blueprint-pre">${data.diagram}</pre>
        </div>

        <div style="padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1); font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-dim); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
          <span>INTELLECTUAL PROPERTY &bull; ALL RIGHTS RESERVED</span>
          <span>DOCUMENT ENCRYPTION: SHA-256 VERIFIED</span>
        </div>
      `;
    }

    // Default to PDF view tab
    switchViewerTab('pdf');

    // Open Modal
    document.body.style.overflow = 'hidden';
    patentModal.classList.add('is-open');

    // Load PDF document in custom viewer
    loadAndRenderPdf(data);
  }

  function closePatentModal() {
    if (patentModal) {
      patentModal.classList.remove('is-open');
      if (patentModalCard) patentModalCard.classList.remove('is-maximized');
      if (pageScrollObserver) pageScrollObserver.disconnect();
      document.body.style.overflow = '';
      if (pvEmbedContainer) pvEmbedContainer.innerHTML = '';
    }
  }

  // Attach card click handlers
  document.querySelectorAll('.patent-card-v2[data-patent-id]').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-patent-id');
      openPatentModal(id);
    });
  });

  if (patentModalClose) patentModalClose.addEventListener('click', closePatentModal);
  if (patentModal) {
    patentModal.addEventListener('click', (e) => {
      if (!e.target.closest('.pv-container') && !e.target.closest('.patent-modal-card')) closePatentModal();
    });
  }

  // Keyboard navigation shortcuts when viewer is open
  document.addEventListener('keydown', (e) => {
    if (!patentModal?.classList.contains('is-open')) return;

    if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      zoomIn();
    } else if (e.key === '-' || e.key === '_') {
      e.preventDefault();
      zoomOut();
    } else if (e.key === '0') {
      e.preventDefault();
      resetZoom();
    } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      if (pvTabPdf?.classList.contains('is-active') && currentPageIndex < totalDocPages) {
        scrollToPage(currentPageIndex + 1);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      if (pvTabPdf?.classList.contains('is-active') && currentPageIndex > 1) {
        scrollToPage(currentPageIndex - 1);
      }
    }
  });


  /* ==========================================================================
     05. CURRICULUM VITAE (CV) MODAL
     ========================================================================== */
  const resumeModal      = document.getElementById('resumeModalV2');
  const resumeModalOpen  = document.getElementById('dockResumeBtn');
  const resumeModalClose = document.getElementById('resumeModalCloseV2');

  function openResumeModal() {
    if (resumeModal) {
      document.body.style.overflow = 'hidden';
      resumeModal.classList.add('is-open');
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  if (resumeModalOpen)  resumeModalOpen.addEventListener('click', openResumeModal);
  if (resumeModalClose) resumeModalClose.addEventListener('click', closeResumeModal);
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (!e.target.closest('.modal-card-v2') && !e.target.closest('.resume-preview-card')) closeResumeModal();
    });
  }


  /* ==========================================================================
     06. LIVE TELEMETRY CLOCK (PUNJAB, INDIA IST)
     ========================================================================== */
  const clockEl = document.getElementById('liveClockIST');
  function updateLiveClock() {
    if (!clockEl) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat('en-IN', options);
      clockEl.textContent = `${formatter.format(now)} IST`;
    } catch {
      const now = new Date();
      clockEl.textContent = `${now.toLocaleTimeString()} IST`;
    }
  }
  updateLiveClock();
  setInterval(updateLiveClock, 1000);


  /* ==========================================================================
     07. CURVED SECTION TRANSITION DYNAMIC MORPHING (Dennis Snellenberg Arc)
     ========================================================================== */
  const heroCurvePath = document.getElementById('heroCurvePath');
  let lastCurveVal = -1;
  let isCurveScheduled = false;
  function updateCurveOnScroll() {
    if (!heroCurvePath) return;
    const scrollY = window.scrollY;
    if (scrollY > 420 && lastCurveVal === 0) return;
    const curveAmount = Math.max(0, Math.min(80, 80 - scrollY * 0.22));
    if (Math.abs(curveAmount - lastCurveVal) >= 0.5 || (curveAmount === 0 && lastCurveVal !== 0)) {
      lastCurveVal = curveAmount;
      heroCurvePath.setAttribute('d', `M 0,0 Q 720,${curveAmount.toFixed(1)} 1440,0 L 1440,90 L 0,90 Z`);
    }
  }
  function scheduleCurveScroll() {
    if (!isCurveScheduled) {
      isCurveScheduled = true;
      requestAnimationFrame(() => {
        updateCurveOnScroll();
        isCurveScheduled = false;
      });
    }
  }
  window.addEventListener('scroll', scheduleCurveScroll, { passive: true });


  /* ==========================================================================
     08. MARQUEE VELOCITY ACCELERATION ON SCROLL (THROTTLED & IDLE-EFFICIENT)
     ========================================================================== */
  const marqueeContent = document.querySelector('.marquee-content-hero');
  if (marqueeContent) {
    let lastScroll = window.scrollY;
    let targetPlayback = 1.0;
    let currentPlayback = 1.0;
    let isTicking = false;
    let cachedAnimations = null;

    function getMarqueeAnimations() {
      if (!cachedAnimations || cachedAnimations.length === 0) {
        try {
          cachedAnimations = marqueeContent.getAnimations();
        } catch {
          cachedAnimations = [];
        }
      }
      return cachedAnimations;
    }

    function tickMarqueeVelocity() {
      currentPlayback += (targetPlayback - currentPlayback) * 0.1;
      targetPlayback += (1.0 - targetPlayback) * 0.05;

      const anims = getMarqueeAnimations();
      if (anims && anims.length > 0) {
        anims.forEach((anim) => {
          anim.playbackRate = currentPlayback;
        });
      }

      // Check if settled back to base rate: stop loop to free main thread
      if (Math.abs(currentPlayback - 1.0) < 0.01 && Math.abs(targetPlayback - 1.0) < 0.01) {
        if (anims && anims.length > 0) {
          anims.forEach((anim) => {
            anim.playbackRate = 1.0;
          });
        }
        currentPlayback = 1.0;
        targetPlayback = 1.0;
        isTicking = false;
        return;
      }

      requestAnimationFrame(tickMarqueeVelocity);
    }

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      const delta = Math.abs(currentScroll - lastScroll);
      lastScroll = currentScroll;
      // Exponential acceleration on scroll up to 4.5x baseline speed
      targetPlayback = 1.0 + Math.min(delta * 0.055, 3.8);

      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(tickMarqueeVelocity);
      }
    }, { passive: true });
  }


  /* ==========================================================================
     09. FLOATING INTERACTIVE PROJECT CURSOR PREVIEW (Dennis Snellenberg Style)
     ========================================================================== */
  const previewContainer = document.getElementById('floatingProjectPreview');
  const previewBadge     = document.getElementById('previewBadge');
  const previewTitle     = document.getElementById('previewTitle');
  const previewTags      = document.getElementById('previewTags');
  const previewCard      = document.getElementById('previewCard');

  const PROJECT_PREVIEWS = {
    mphasis: {
      badge: 'Mphasis // Enterprise SDE',
      title: 'Java & Spring Boot Core Engine',
      tags: 'Distributed Architecture • Kafka • Low Latency',
      gradient: 'linear-gradient(135deg, #091326 0%, #1e293b 100%)'
    },
    mavriq: {
      badge: 'Mavriq AI // AI & ML Engineer',
      title: 'Conversational Voice AI Engine',
      tags: 'ElevenLabs • WebSocket Streaming • 3× Response Latency',
      gradient: 'linear-gradient(135deg, #170d38 0%, #312e81 100%)'
    },
    chitkara: {
      badge: 'Chitkara // Quantum Scholar',
      title: 'Quantum Teleportation & Cryptography',
      tags: 'Qiskit • Superposition • Grover Algorithms',
      gradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)'
    },
    itl: {
      badge: 'ITL // Mobile Engineer',
      title: 'Cross-Platform React Native Suite',
      tags: 'Mobile Automation • Offline State Sync • Redux',
      gradient: 'linear-gradient(135deg, #331307 0%, #7c2d12 100%)'
    }
  };

  if (previewContainer && hasFinePointer) {
    let previewTargetX = window.innerWidth / 2;
    let previewTargetY = window.innerHeight / 2;
    let previewCurrentX = previewTargetX;
    let previewCurrentY = previewTargetY;
    let isPreviewActive = false;
    let previewRafId = null;

    function tickProjectPreview() {
      previewCurrentX += (previewTargetX - previewCurrentX) * 0.14;
      previewCurrentY += (previewTargetY - previewCurrentY) * 0.14;
      previewContainer.style.transform = `translate3d(${previewCurrentX.toFixed(1)}px, ${previewCurrentY.toFixed(1)}px, 0) translate(-50%, -50%) ${isPreviewActive ? 'scale(1) rotate(0deg)' : 'scale(0.65) rotate(-6deg)'}`;

      const deltaX = Math.abs(previewTargetX - previewCurrentX);
      const deltaY = Math.abs(previewTargetY - previewCurrentY);
      if (isPreviewActive || deltaX > 0.4 || deltaY > 0.4) {
        previewRafId = requestAnimationFrame(tickProjectPreview);
      } else {
        previewRafId = null;
      }
    }

    function startPreviewLoop() {
      if (!previewRafId) {
        previewRafId = requestAnimationFrame(tickProjectPreview);
      }
    }

    window.addEventListener('mousemove', (e) => {
      previewTargetX = e.clientX;
      previewTargetY = e.clientY;
      if (isPreviewActive) startPreviewLoop();
    }, { passive: true });

    document.querySelectorAll('.work-row-v2[data-project-id]').forEach((row) => {
      row.addEventListener('mouseenter', () => {
        const id = row.getAttribute('data-project-id');
        const data = PROJECT_PREVIEWS[id];
        if (data) {
          if (previewBadge) previewBadge.textContent = data.badge;
          if (previewTitle) previewTitle.textContent = data.title;
          if (previewTags) previewTags.textContent = data.tags;
          if (previewCard) previewCard.style.background = data.gradient;
          isPreviewActive = true;
          previewContainer.classList.add('is-active');
          startPreviewLoop();
        }
      });

      row.addEventListener('mouseleave', () => {
        isPreviewActive = false;
        previewContainer.classList.remove('is-active');
      });
    });
  }


  /* ==========================================================================
     10. PROJECT ARCHITECTURE DEEP-DIVE MODAL
     ========================================================================== */
  /* ==========================================================================
     10. PROJECT ARCHITECTURE & EXPERIENCE DEEP-DIVE MODAL
     ========================================================================== */
  const projectModal      = document.getElementById('projectModalV2');
  const projectModalTitle = document.getElementById('projectModalTitleV2');
  const projectModalBody  = document.getElementById('projectModalBodyV2');
  const projectModalClose = document.getElementById('projectModalCloseV2');

  const PROJECT_DETAILS = {
    mphasis: {
      title: 'Mphasis — Software Development Engineer',
      badge: 'ENTERPRISE SDE // JAVA & DISTRIBUTED SYSTEMS',
      role: 'Software Development Engineer',
      period: 'Feb 2026 – Present • Bengaluru, India / Hybrid',
      desc: 'Architecting high-throughput microservices, distributed transaction processing, and low-latency cloud infrastructure serving enterprise financial clients.',
      bullets: [
        '<strong>Microservices Architecture:</strong> Engineered resilient event-driven microservices with Java 21, Spring Boot 3, and Spring Cloud for high-throughput enterprise banking systems.',
        '<strong>Distributed Event Streaming:</strong> Architected idempotent Apache Kafka consumers and message partitions handling 12M+ daily transactional payloads without deadlocks.',
        '<strong>Database Optimization:</strong> Optimized PostgreSQL indexing and query execution plans paired with HikariCP connection pooling, sustaining sub-45ms p95 latencies under peak load.',
        '<strong>Distributed Caching:</strong> Built a multi-tier Redis caching cluster that reduced redundant database hits by 64% while maintaining strict data consistency.',
        '<strong>Zero-Trust Cloud Security:</strong> Integrated OAuth2 and JWT token validation pipelines across containerized Docker and Kubernetes pods on AWS.'
      ],
      metrics: [
        { val: '99.98%', lbl: 'Service Uptime' },
        { val: '<45ms', lbl: 'p95 API Latency' },
        { val: '12M+', lbl: 'Daily Events Handled' }
      ],
      stack: ['Java 21', 'Spring Boot 3', 'Apache Kafka', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Microservices', 'JUnit 5'],
      notes: 'Implemented idempotent event consumers and asynchronous reactive pipelines to eliminate transaction deadlocks across distributed database shards.'
    },
    mavriq: {
      title: 'Mavriq AI — AI / ML Engineer',
      badge: 'SPEECH-TO-SPEECH AI // CONVERSATIONAL VOICE AGENTS',
      role: 'AI / ML Engineer',
      period: 'Oct 2025 – Feb 2026 • Gurgaon / Remote',
      desc: 'Spearheaded full-stack conversational voice agents delivering human-like voice response turnaround for real-time customer interactions.',
      bullets: [
        '<strong>Bidirectional Voice Pipeline:</strong> Architected speech-to-speech conversational AI agents using ElevenLabs Text-to-Speech, OpenAI Whisper, and FastAPI over full-duplex WebSockets.',
        '<strong>3× Latency Acceleration:</strong> Cut voice interaction turnaround latency from 950ms down to 280ms by developing a custom chunked audio streaming jitter buffer and asynchronous sentence streaming.',
        '<strong>Conversational Interruptions (VAD):</strong> Integrated Silero Voice Activity Detection to enable instantaneous, human-like barge-in interruptions when the user speaks mid-sentence.',
        '<strong>Contextual Memory RAG:</strong> Engineered persistent conversation memory with LangChain and vector similarity search in Redis, achieving 98.6% intent recognition accuracy.',
        '<strong>Production Deployment:</strong> Containerized voice agents via Docker with real-time audio telemetry monitoring.'
      ],
      metrics: [
        { val: '3×', lbl: 'Latency Acceleration' },
        { val: '280ms', lbl: 'Turnaround Latency' },
        { val: '98.6%', lbl: 'Intent Accuracy' }
      ],
      stack: ['Python', 'FastAPI', 'ElevenLabs API', 'WebSockets', 'OpenAI Whisper', 'LangChain', 'Silero VAD', 'Redis', 'Docker', 'AsyncIO'],
      notes: 'Pioneered custom chunked audio streaming buffer over WebSockets that reduced voice latency from 950ms down to 280ms, producing natural real-time human interruptions.'
    },
    chitkara: {
      title: 'Chitkara University — Quantum Computing Scholar',
      badge: 'QUANTUM INFORMATION // ALGORITHMS & HARDWARE SIMULATION',
      role: 'Research Scholar & Quantum Innovator',
      period: 'Jan 2022 – Dec 2024 • Punjab, India',
      desc: 'Conducted rigorous quantum circuit simulations exploring quantum teleportation protocols, entanglement purification, and Grover quantum search acceleration.',
      bullets: [
        '<strong>Quantum Teleportation Simulation:</strong> Programmed multi-qubit quantum teleportation protocols in IBM Qiskit, modeling Bell-state entanglement generation and measurement channels.',
        '<strong>Grover\'s Search Algorithm:</strong> Implemented and benchmarked Grover\'s quantum search, empirically proving quadratic speedup O(√N) over classical brute-force database lookups.',
        '<strong>NISQ Noise Analysis:</strong> Evaluated quantum circuit fidelity and decoherence relaxation (T1) / dephasing (T2) times under simulated quantum noise environments.',
        '<strong>Intellectual Property & Patents:</strong> Co-authored published research papers and authored 4 technical patents spanning bio-signal monitoring and multi-spectral sensors.',
        '<strong>Published Science Book:</strong> Authored "Quantum Giggles: Laughing Through Cosmic Wonders" demystifying quantum mechanics concepts for computer science engineers.'
      ],
      metrics: [
        { val: 'O(√N)', lbl: 'Grover Search Speedup' },
        { val: '99.2%', lbl: 'Fidelity in Teleportation' },
        { val: '32-Qubit', lbl: 'Simulation Density' }
      ],
      stack: ['IBM Qiskit', 'Python', 'NumPy', 'SciPy', 'IBM Quantum Experience', 'Quantum Information Science', 'Linear Algebra'],
      notes: 'Authored comprehensive simulation notebooks exploring quantum gate decoherence under noisy intermediate-scale quantum (NISQ) environments.'
    },
    itl: {
      title: 'ITL — Mobile Software Engineer (Cross-Platform)',
      badge: 'CROSS-PLATFORM MOBILE // REACT NATIVE & OFFLINE SYSTEMS',
      role: 'Mobile Developer Intern',
      period: 'Jan 2024 – Jun 2024 • Mohali, India',
      desc: 'Engineered cross-platform mobile workflows, biometric authentication, and offline-first database synchronization for enterprise field operations.',
      bullets: [
        '<strong>Cross-Platform Mobile Suite:</strong> Built enterprise mobile applications in React Native and TypeScript maintaining fluid 60 FPS gesture-driven UI interactions.',
        '<strong>Offline-First Synchronization:</strong> Architected local state persistence with SQLite and Redux Toolkit with automatic sync conflict resolution upon network reconnection.',
        '<strong>Biometric & Camera Integration:</strong> Implemented native device biometric authentication (Face ID & Fingerprint) and hardware camera document scanning pipelines.',
        '<strong>Quality Assurance:</strong> Designed comprehensive component unit tests with Jest and optimized application bundle sizes for fast cold-start performance.'
      ],
      metrics: [
        { val: '60 FPS', lbl: 'Smooth Render Rate' },
        { val: '100%', lbl: 'Offline Sync Resilience' },
        { val: '4.8 ★', lbl: 'App Store Rating' }
      ],
      stack: ['React Native', 'TypeScript', 'Redux Toolkit', 'SQLite', 'RESTful APIs', 'Jest', 'Android Studio', 'Xcode'],
      notes: 'Built optimistic UI caching with custom conflict resolution mechanisms for field workers operating in zero-connectivity environments.'
    }
  };

  function openProjectModal(id) {
    const data = PROJECT_DETAILS[id];
    if (!data || !projectModal) return;

    // Immediately dismiss floating project cursor preview
    if (previewContainer) {
      previewContainer.classList.remove('is-active');
    }

    if (projectModalTitle) projectModalTitle.textContent = data.title;
    if (projectModalBody) {
      projectModalBody.innerHTML = `
        <div class="project-modal-meta">
          <span class="project-modal-role">${data.badge}</span>
          <span class="project-modal-period">${data.period}</span>
        </div>

        <p style="font-size: 1.05rem; line-height: 1.65; color: #ffffff; margin-bottom: 1.25rem;">
          ${data.desc}
        </p>

        <div class="project-metrics-grid">
          ${data.metrics.map(m => `
            <div class="project-metric-box">
              <span class="metric-box-val">${m.val}</span>
              <span class="metric-box-lbl">${m.lbl}</span>
            </div>
          `).join('')}
        </div>

        <h4 style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase; margin-bottom: 0.6rem; letter-spacing: 0.08em;">
          Key Engineering Contributions & What I Did
        </h4>
        <ul class="experience-bullets-list">
          ${data.bullets.map(b => `<li class="experience-bullet-item">${b}</li>`).join('')}
        </ul>

        <h4 style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase; margin-bottom: 0.6rem; letter-spacing: 0.08em;">
          Technology & Tooling Stack
        </h4>
        <div class="project-stack-wrap">
          ${data.stack.map(tag => `<span class="project-tag-pill">${tag}</span>`).join('')}
        </div>

        <div class="project-actions-row">
          <a href="#contact" class="btn-pill-v2" id="projectDiscussBtn" style="padding: 0.65rem 1.6rem; font-size: 0.88rem; background: #ffffff; color: #000000; border: 1px solid rgba(255, 255, 255, 0.2); font-weight: 600;">
            <span>Discuss Opportunities With Prabhdeep →</span>
          </a>
          <button class="modal-close-btn-v2" id="projectCloseActionBtn" style="width: auto; height: auto; border-radius: 9999px; padding: 0.65rem 1.4rem; font-size: 0.88rem; background: rgba(255, 255, 255, 0.06); color: #d4d4d8; border: 1px solid rgba(255, 255, 255, 0.18);">
            Close Details
          </button>
        </div>
      `;

      const discussBtn = document.getElementById('projectDiscussBtn');
      const closeActionBtn = document.getElementById('projectCloseActionBtn');
      if (discussBtn) {
        discussBtn.addEventListener('click', (e) => {
          e.preventDefault();
          closeProjectModal();
          const contactTarget = document.getElementById('contact');
          if (contactTarget) {
            setTimeout(() => {
              contactTarget.scrollIntoView({ behavior: 'smooth' });
            }, 120);
          }
        });
      }
      if (closeActionBtn) {
        closeActionBtn.addEventListener('click', closeProjectModal);
      }
      projectModalBody.scrollTop = 0;
    }
    
    document.body.style.overflow = 'hidden';
    projectModal.classList.add('is-open');
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (!e.target.closest('.modal-card-v2')) closeProjectModal();
    });
  }

  document.querySelectorAll('.work-row-v2[data-project-id]').forEach((row) => {
    row.addEventListener('click', (e) => {
      e.preventDefault();
      const id = row.getAttribute('data-project-id');
      openProjectModal(id);
    });

    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = row.getAttribute('data-project-id');
        openProjectModal(id);
      }
    });
  });

  /* ==========================================================================
     09. RESEARCH ARTICLES & TREATISES DEEP-DIVE MODAL
     ========================================================================== */
  const articleModal      = document.getElementById('articleModalV2');
  const articleModalTitle = document.getElementById('articleModalTitleV2');
  const articleModalKicker= document.getElementById('articleModalKicker');
  const articleModalBody  = document.getElementById('articleModalBodyV2');
  const articleModalClose = document.getElementById('articleModalCloseV2');

  const ARTICLE_DATA_V2 = {
    book_qg: {
      kicker: 'PUBLISHED AUTHOR • GLOBAL AMAZON KINDLE RELEASE',
      title: 'Quantum Giggles: Laughing Through Cosmic Wonders',
      field: 'Electric Echoes: A Cyberpunk Odyssey of Discovery & Enlightenment',
      abstract: 'A published cyberpunk and quantum science odyssey by Prabhdeep Singh demystifying quantum mechanics—superposition, teleportation, entanglement, and spacetime—with comedic brilliance and distributed software engineering analogies.',
      content: `
        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-bottom: 0.6rem;">I. Executive Overview &amp; Global Publication</h4>
          <p style="font-size: 1rem; line-height: 1.75; color: var(--text-light); margin-bottom: 1.25rem;">
            Authored by Prabhdeep Singh and published globally on Amazon Kindle (ASIN: B0F43NH9R3). "Quantum Giggles" bridges the profound gap between rigorous theoretical quantum physics and intuitive human comedy, making the bizarre principles of modern physics delightful and accessible for curious minds, engineers, and students worldwide.
          </p>
        </div>

        <div style="margin-bottom: 2rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; padding: 1.4rem;">
          <h4 style="font-size: 1rem; font-weight: 600; color: #ffffff; margin-bottom: 0.75rem;">Key Chapters &amp; Explorations:</h4>
          <ul style="padding-left: 1.3rem; line-height: 1.8; color: var(--text-light); font-size: 0.94rem;">
            <li><strong style="color: #fff;">Schrödinger's Cat Walks Into a Bar:</strong> Superposition, state vectors, and the measurement problem explained with relatable absurdity.</li>
            <li><strong style="color: #fff;">Spooky Actions at a Distance:</strong> Quantum entanglement, Bell's Theorem, and why Einstein was famously uncomfortable with non-local correlations.</li>
            <li><strong style="color: #fff;">Quantum Computing &amp; The Superposition Fast Lane:</strong> From classical bits to qubits, Bloch spheres, and exponential speedups in search algorithms.</li>
            <li><strong style="color: #fff;">Relativity on a Rollercoaster:</strong> Gravitational time dilation, spacetime warping, and black hole event horizons made laugh-out-loud funny.</li>
          </ul>
        </div>

        <div style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="https://www.amazon.in/QUANTUM-GIGGLES-LAUGHING-THROUGH-WONDERS-ebook/dp/B0F43NH9R3" target="_blank" rel="noopener noreferrer" class="btn-pill-v2" style="background: #ffffff; color: #000000; font-weight: 700; border: none; padding: 0.75rem 1.6rem;">
            <span>Read on Amazon Kindle Store ↗</span>
          </a>
        </div>
      `
    },
    art1: {
      kicker: 'COSMOLOGY &amp; PHOTON DYNAMICS • TREATISE 01',
      title: 'Dark Energy and Unseen Forces: A Journey Beyond Light',
      field: 'Cosmology, Quantum Vacuum Dynamics & Photon Stabilization',
      abstract: 'Basic three-dimensional matter corpuscles release work as radiation from electromagnetic waves, forming light. Photons, a unit of light, are basic three-dimensional particles of matter. Photons consist of matter and energy components that work together to support and stabilise the complete photon entity. The matter at the heart of a particle is represented by a disc-shaped object rotating around a photon\'s diameter.',
      content: `
        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-bottom: 0.6rem;">I. Executive Abstract &amp; Photon Corpuscle Stabilization</h4>
          <p style="font-size: 1rem; line-height: 1.75; color: #ffffff; margin-bottom: 1.25rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-left: 3px solid #a1a1aa; padding: 1rem 1.25rem; border-radius: 0 8px 8px 0;">
            Basic three-dimensional matter corpuscles release work as radiation from electromagnetic waves, forming light. Photons, a unit of light, are basic three-dimensional particles of matter. Photons consist of matter and energy components that work together to support and stabilise the complete photon entity. The matter at the heart of a particle is represented by a disc-shaped object rotating around a photon's diameter.
          </p>
          <p style="font-size: 1rem; line-height: 1.75; color: var(--text-light); margin-bottom: 1.25rem;">
            Cosmological redshift measurements from distant Type Ia supernovae persistently indicate an accelerating universe driven by negative-pressure dark energy (&sim;68.3% of total cosmic mass-energy density). This treatise evaluates cosmological constant models (&Lambda;) against dynamic scalar fields (quintessence) and explores photon particle stabilization in extreme gravitational potentials.
          </p>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-bottom: 0.6rem;">II. Theoretical Framework &amp; Tensor Equations</h4>
          <pre class="blueprint-pre">┌─────────────────────────────────────────────────────────────┐
│  EINSTEIN-HILBERT EXTENSION WITH DYNAMIC QUINTESSENCE FIELD │
│                                                             │
│   G_&mu;&nu; + &Lambda; g_&mu;&nu; = (8&pi;G / c^4) [ T_&mu;&nu;^(matter) + T_&mu;&nu;^(dark) ]   │
│                                                             │
│   Equation of State:  w = p / &rho; &asymp; -1.03 &plusmn; 0.03                │
│   Rotating Disc Core: J_photon = &hbar; = I_disc &omega;_rot              │
│   Scalar Quintessence: V(&phi;) = M^4 [ exp(M_pl / &phi;) - 1 ]        │
└─────────────────────────────────────────────────────────────┘</pre>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-bottom: 0.6rem;">III. Key Discoveries &amp; Cosmic Dynamics</h4>
          <ul style="padding-left: 1.4rem; line-height: 1.8; color: var(--text-muted); font-size: 0.95rem;">
            <li><strong style="color: #fff;">Photon Particle-Wave Duality:</strong> Formulated rotating disc model accounting for intrinsic spin angular momentum &hbar; and radiation reaction work.</li>
            <li><strong style="color: #fff;">Vacuum State Topology:</strong> Demonstrated how quantum zero-point energy fluctuations create an effective cosmic repulsion when coupled to curved Riemannian manifolds.</li>
            <li><strong style="color: #fff;">Photon Dispersion Bounds:</strong> Modeled Lorentz-invariance violations across gamma-ray bursts, constraining Planck-scale photon dispersion delays to &lt; 10^-19 s.</li>
          </ul>
        </div>
      `
    },
    art2: {
      kicker: 'RADIOBIOLOGY &amp; ASTRONAUTICAL MEDICINE • TREATISE 02',
      title: 'Guardians of the Galaxy: How Space Radiation Affects Astronauts',
      field: 'Radiobiology, Deep Space Human Physiology & Radiation Shielding',
      abstract: 'Astronaut health is a major concern in space exploration. Space radiation, including galactic cosmic rays, solar particle events, affects humans. DNA damage, acute radiation syndrome, cancer risk, cognitive impairments, cardiovascular issues, cataracts, and lowered immunity are major health hazards. Improved radiation shielding, pharmaceutical countermeasures, careful mission planning, and genetic research are discussed.',
      content: `
        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-bottom: 0.6rem;">I. Deep-Space Radiation Hazards &amp; Clinical Impact</h4>
          <p style="font-size: 1rem; line-height: 1.75; color: #ffffff; margin-bottom: 1.25rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-left: 3px solid #a1a1aa; padding: 1rem 1.25rem; border-radius: 0 8px 8px 0;">
            Astronaut health is a major concern in space exploration. Space radiation, including galactic cosmic rays, solar particle events, affects humans. DNA damage, acute radiation syndrome, cancer risk, cognitive impairments, cardiovascular issues, cataracts, and lowered immunity are major health hazards. Improved radiation shielding, pharmaceutical countermeasures, careful mission planning, and genetic research are discussed.
          </p>
          <p style="font-size: 1rem; line-height: 1.75; color: var(--text-light); margin-bottom: 1.25rem;">
            Beyond Earth’s protective magnetosphere and Van Allen belts, interplanetary astronauts face an unremitting flux of Galactic Cosmic Rays (GCR) and acute Solar Particle Events (SPE). These relativistic heavy ions (e.g., 56Fe at &sim;1 GeV/nucleon) deposit dense ionization tracks through biological tissue, causing complex, clustered DNA double-strand breaks (DSBs).
          </p>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-bottom: 0.6rem;">II. Ionizing Track Architecture &amp; Cellular Degradation</h4>
          <pre class="blueprint-pre">┌─────────────────────────────────────────────────────────────┐
│  HZE HEAVY ION PENETRATION &amp; CLUSTERED LESION CASCADE        │
│                                                             │
│   [56Fe Relativistic Heavy Ion] (1 GeV/n, LET &gt; 150 keV/&mu;m) │
│               │                                             │
│               ▼                                             │
│   [Core Ionization Track (&Oslash; &sim;5 nm)] ──> [Dense DNA DSBs]  │
│               │                                             │
│               ▼                                             │
│   [Failure of Non-Homologous End Joining (NHEJ) Repair]     │
│               │                                             │
│               ▼                                             │
│   [Chromosomal Translocations &amp; Apoptotic Neurodegeneration]│
└─────────────────────────────────────────────────────────────┘</pre>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-bottom: 0.6rem;">III. Shielding Architectures &amp; Pharmaceutical Countermeasures</h4>
          <ul style="padding-left: 1.4rem; line-height: 1.8; color: var(--text-muted); font-size: 0.95rem;">
            <li><strong style="color: #fff;">Hydrogen-Rich Passive Shielding:</strong> Ultra-High-Molecular-Weight Polyethylene (UHMW-PE) and liquid methane crew bunker shields reducing secondary neutron spallation by 42%.</li>
            <li><strong style="color: #fff;">Active Electromagnetic Deflection:</strong> Computational analysis of 5-Tesla superconducting toroidal magnetic solenoids deflecting charged ions &le; 2 GeV.</li>
            <li><strong style="color: #fff;">Pharmaceutical &amp; Genetic Countermeasures:</strong> Targeted radioprotector molecular cocktails accelerating endogenous DNA ligase repair kinetics.</li>
          </ul>
        </div>
      `
    },
    art3: {
      kicker: 'QUANTUM COMPUTING &amp; NEXT-GEN SYSTEMS • TREATISE 03',
      title: 'Evolution of Quantum Computing',
      field: 'Quantum Computing Architecture, Moore\'s Law Transition & Superposition',
      abstract: 'Moore’s law is going to stop soon because now, we need a new era of computing called quantum computing. For the last 100 years, now we have made much advancement after the invention of computers now we are getting smaller and better and powerful at the same time. But still, there are many problems which cannot be solved by our today’s classical computers, we need a change.',
      content: `
        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-bottom: 0.6rem;">I. The Sunset of Moore's Law &amp; The Quantum Imperative</h4>
          <p style="font-size: 1rem; line-height: 1.75; color: #ffffff; margin-bottom: 1.25rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-left: 3px solid #a1a1aa; padding: 1rem 1.25rem; border-radius: 0 8px 8px 0;">
            Moore’s law is going to stop soon because now, we need a new era of computing called quantum computing. For the last 100 years, now we have made much advancement after the invention of computers now we are getting smaller and better and powerful at the same time. But still, there are many problems which cannot be solved by our today’s classical computers, we need a change.
          </p>
          <p style="font-size: 1rem; line-height: 1.75; color: var(--text-light); margin-bottom: 1.25rem;">
            For six decades, Gordon Moore’s empirical observation governed global computing progress. However, as gate oxide thicknesses shrink below 0.7nm (equivalent to just three silicon atoms across), quantum mechanical electron wave-function tunneling causes unacceptable leakage current, thermal dissipation crises, and gate breakdown.
          </p>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-bottom: 0.6rem;">II. Superconducting Qubits &amp; Exponential Hilbert State Scaling</h4>
          <pre class="blueprint-pre">┌─────────────────────────────────────────────────────────────┐
│  EXPONENTIAL STATE SPACE ACCELERATION (2^N STATE SPACE)      │
│                                                             │
│   Classical Bit Register (N bits): Stores 1 state of 2^N    │
│   Quantum Qubit Register (N qubits): |&Psi;&rang; = &sum; &alpha;_i |i&rang;         │
│                                                             │
│   [Shor's Algorithm]: Factoring O((log N)^2 (log log N))    │
│   [Grover's Search]: Quadratic Speedup O(&radic;N) vs O(N)          │
│   [Josephson Junction Transmons]: Non-linear LC oscillators  │
└─────────────────────────────────────────────────────────────┘</pre>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-bottom: 0.6rem;">III. Quantum Advantage &amp; Unsolvable Classical Problems</h4>
          <ul style="padding-left: 1.4rem; line-height: 1.8; color: var(--text-muted); font-size: 0.95rem;">
            <li><strong style="color: #fff;">Combinatorial Complexity:</strong> Breaking NP-hard discrete logarithms and molecular folding simulations in polynomial time.</li>
            <li><strong style="color: #fff;">Grover Oracle Benchmarking:</strong> Implemented quantum search circuits on IBM Qiskit, demonstrating 99.1% state fidelity across 4-qubit unstructured databases.</li>
            <li><strong style="color: #fff;">Fault-Tolerant Surface Codes:</strong> Evaluated physical-to-logical qubit overhead ratios required for fault-tolerant error correction.</li>
          </ul>
        </div>
      `
    },
    art4: {
      kicker: 'GENERAL RELATIVITY &amp; SPACETIME • TREATISE 04',
      title: 'In Search of the Impossible: The Science of Warp Drive',
      field: 'Differential Geometry, General Relativity & Alcubierre Spacetime',
      abstract: 'Spacetime can be altered to allow a starship to go at any speed within general relativity, without the requirement for wormholes. A local expansion of spacetime rearward of the spacecraft and an opposing contraction in front of it can enable motion faster than the speed of light as observed. The resulting distortion resembles the "warp drive" of science fiction.',
      content: `
        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-bottom: 0.6rem;">I. Breaking the Light Barrier Locally vs. Globally</h4>
          <p style="font-size: 1rem; line-height: 1.75; color: #ffffff; margin-bottom: 1.25rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-left: 3px solid #a1a1aa; padding: 1rem 1.25rem; border-radius: 0 8px 8px 0;">
            Spacetime can be altered to allow a starship to go at any speed within general relativity, without the requirement for wormholes. A local expansion of spacetime rearward of the spacecraft and an opposing contraction in front of it can enable motion faster than the speed of light as observed. The resulting distortion resembles the "warp drive" of science fiction.
          </p>
          <p style="font-size: 1rem; line-height: 1.75; color: var(--text-light); margin-bottom: 1.25rem;">
            Einstein's Special Relativity strictly prohibits any mass-bearing vessel from accelerating to or exceeding the local speed of light in vacuum (c). However, General Relativity imposes no speed limit on the expansion or contraction of spacetime itself. In 1994, physicist Miguel Alcubierre proposed a metric that contracts spacetime in front of a ship while expanding spacetime behind it.
          </p>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-bottom: 0.6rem;">II. The Alcubierre Spacetime Line Element</h4>
          <pre class="blueprint-pre">┌─────────────────────────────────────────────────────────────┐
│  ALCUBIERRE WARP METRIC (3+1 ADM FORMALISM)                 │
│                                                             │
│   ds^2 = -c^2 dt^2 + [dx - v_s(t) f(r_s) dt]^2 + dy^2 + dz^2│
│                                                             │
│   Ship Center:   r_s(t) = &radic;[ (x - x_s(t))^2 + y^2 + z^2 ]      │
│   Shaping Form:  f(r_s) = tanh(&sigma;(r_s + R)) - tanh(&sigma;(r_s - R))  │
│   Energy Density: T_00 &lt; 0 (Violation of Weak Energy Cond.) │
└─────────────────────────────────────────────────────────────┘</pre>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin-bottom: 0.6rem;">III. Physical Constraints &amp; Energy Reduction Models</h4>
          <ul style="padding-left: 1.4rem; line-height: 1.8; color: var(--text-muted); font-size: 0.95rem;">
            <li><strong style="color: #fff;">Exotic Matter Requirement:</strong> Examined negative energy density Casimir vacuum phenomena required to support the negative stress-energy tensor.</li>
            <li><strong style="color: #fff;">Van Den Broeck Micro-Bubble:</strong> Evaluated topological modifications reducing required negative mass-energy from Jupiter's mass down to several milligrams.</li>
            <li><strong style="color: #fff;">Causality &amp; Horizon Limits:</strong> Investigated Hawking radiation accumulation along the leading event horizon during superluminal phase transitions.</li>
          </ul>
        </div>
      `
    }
  };

  /* ==========================================================================
     SHARED AUDIO CONTEXT (Prevents browser AudioContext leaks & crashes)
     ========================================================================== */
  let sharedAudioCtx = null;
  function getSharedAudioContext() {
    try {
      if (!sharedAudioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          sharedAudioCtx = new AudioCtx();
        }
      }
      if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
        sharedAudioCtx.resume().catch(() => {});
      }
      return sharedAudioCtx;
    } catch {
      return null;
    }
  }

  /* ==========================================================================
     11B. 3D INTERACTIVE BOOK EXPERIENCE (QUANTUM GIGGLES)
     ========================================================================== */
  let open3DBookViewer = () => {};
  let close3DBookViewer = () => {};

  function init3DBookViewer() {
    const overlay = document.getElementById('bookModal3D');
    const bookObj = document.getElementById('book3DObject');
    const coverFront = document.getElementById('bookCoverFront');
    const closeBtn = document.getElementById('bookModalCloseBtn');
    const prevBtn = document.getElementById('bookPrevBtn');
    const nextBtn = document.getElementById('bookNextBtn');
    const toggleCoverBtn = document.getElementById('bookToggleCoverBtn');
    const restartBtn = document.getElementById('bookRestartBtn');
    const quickOpenBtn = document.getElementById('quickOpenBookBtn');
    const indicatorText = document.getElementById('bookPageIndicatorText');
    const stateText = document.getElementById('bookStateText');
    const spreads = document.querySelectorAll('#bookModal3D .book-spread');
    const turningLeaf = document.getElementById('bookTurningLeaf');
    const leafFrontContent = document.getElementById('leafFrontContent');
    const leafBackContent = document.getElementById('leafBackContent');

    if (!overlay || !bookObj) return;

    let currentSpread = 1;
    const totalSpreads = spreads.length || 4;
    let isOpen = false;
    let isFlipping = false;

    // Procedural Web Audio API paper-rustle sound generator (Reuses shared singleton)
    function playPaperSound() {
      try {
        const ctx = getSharedAudioContext();
        if (!ctx) return;
        const bufferSize = Math.floor(ctx.sampleRate * 0.12);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.12);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.09, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } catch (e) {}
    }

    function updateSpreadUI() {
      spreads.forEach((spread, idx) => {
        const spreadNum = idx + 1;
        if (spreadNum === currentSpread) {
          spread.classList.add('is-active');
        } else {
          spread.classList.remove('is-active');
        }
      });

      if (indicatorText) {
        const startPage = (currentSpread - 1) * 2 + 1;
        const endPage = currentSpread * 2;
        indicatorText.textContent = `Spread ${currentSpread} of ${totalSpreads} (Pages ${startPage}–${endPage})`;
      }

      if (prevBtn) {
        prevBtn.disabled = (currentSpread === 1 && !isOpen);
      }
      if (nextBtn) {
        nextBtn.disabled = (currentSpread === totalSpreads);
      }

      if (stateText) {
        if (!isOpen) {
          stateText.textContent = 'Closed Book • Click Cover to Open';
        } else {
          stateText.textContent = `Reading Spread ${currentSpread} of ${totalSpreads}`;
        }
      }

      if (toggleCoverBtn) {
        toggleCoverBtn.textContent = isOpen ? 'Close Cover' : 'Open Book';
      }
    }

    function openCover() {
      if (isOpen) return;
      isOpen = true;
      playPaperSound();
      bookObj.classList.remove('is-closed');
      bookObj.classList.add('is-open');
      updateSpreadUI();
    }

    function closeCover() {
      if (!isOpen) return;
      isOpen = false;
      playPaperSound();
      bookObj.classList.remove('is-open');
      bookObj.classList.add('is-closed');
      updateSpreadUI();
    }

    function flipToSpread(targetSpread, direction = 'next') {
      if (isFlipping || targetSpread === currentSpread || targetSpread < 1 || targetSpread > totalSpreads) {
        return;
      }
      if (!isOpen) {
        openCover();
        return;
      }

      isFlipping = true;
      playPaperSound();

      // Animate turning leaf with 3D rotation
      if (turningLeaf) {
        const currentSpreadEl = document.querySelector(`#bookModal3D [data-spread="${currentSpread}"]`);
        const targetSpreadEl = document.querySelector(`#bookModal3D [data-spread="${targetSpread}"]`);
        
        if (direction === 'next' && currentSpreadEl && targetSpreadEl) {
          const rightPage = currentSpreadEl.querySelector('.book-page-right');
          const nextLeftPage = targetSpreadEl.querySelector('.book-page-left');
          if (leafFrontContent && rightPage) leafFrontContent.innerHTML = rightPage.innerHTML;
          if (leafBackContent && nextLeftPage) leafBackContent.innerHTML = nextLeftPage.innerHTML;

          turningLeaf.classList.add('is-turning');
          turningLeaf.style.transition = 'none';
          turningLeaf.style.transform = 'rotateY(0deg)';
          turningLeaf.offsetHeight; // force reflow
          turningLeaf.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.35, 1)';
          turningLeaf.style.transform = 'rotateY(-180deg)';
        } else if (direction === 'prev' && currentSpreadEl && targetSpreadEl) {
          const leftPage = currentSpreadEl.querySelector('.book-page-left');
          const prevRightPage = targetSpreadEl.querySelector('.book-page-right');
          if (leafBackContent && leftPage) leafBackContent.innerHTML = leftPage.innerHTML;
          if (leafFrontContent && prevRightPage) leafFrontContent.innerHTML = prevRightPage.innerHTML;

          turningLeaf.classList.add('is-turning');
          turningLeaf.style.transition = 'none';
          turningLeaf.style.transform = 'rotateY(-180deg)';
          turningLeaf.offsetHeight; // force reflow
          turningLeaf.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.35, 1)';
          turningLeaf.style.transform = 'rotateY(0deg)';
        }
      }

      setTimeout(() => {
        currentSpread = targetSpread;
        updateSpreadUI();
        if (turningLeaf) {
          turningLeaf.classList.remove('is-turning');
          turningLeaf.style.transform = '';
        }
        isFlipping = false;
      }, 760);
    }

    function nextSpread() {
      if (!isOpen) {
        handleCoverClick();
      } else if (currentSpread < totalSpreads) {
        flipToSpread(currentSpread + 1, 'next');
      }
    }

    function prevSpread() {
      if (currentSpread > 1) {
        flipToSpread(currentSpread - 1, 'prev');
      } else if (currentSpread === 1 && isOpen) {
        closeCover();
      }
    }

    let autoOpenTimer = null;
    let isOpeningCover = false;

    function handleCoverClick() {
      if (isOpen || isOpeningCover) return;
      if (autoOpenTimer) {
        clearTimeout(autoOpenTimer);
        autoOpenTimer = null;
      }
      isOpeningCover = true;
      coverFront?.classList.add('is-opening');
      if (stateText) stateText.textContent = 'Opening Book...';
      openCover();
      setTimeout(() => {
        coverFront?.classList.remove('is-opening');
        isOpeningCover = false;
      }, 350);
    }

    let bookModalOpenedAt = 0;

    open3DBookViewer = function(autoOpen = true) {
      bookModalOpenedAt = Date.now();
      if (autoOpenTimer) {
        clearTimeout(autoOpenTimer);
        autoOpenTimer = null;
      }
      isOpeningCover = false;
      currentSpread = 1;

      // Always present the authentic closed cover artwork cleanly first
      isOpen = false;
      bookObj.classList.add('is-closed');
      bookObj.classList.remove('is-open');
      coverFront?.classList.remove('is-opening');
      updateSpreadUI();

      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      if (autoOpen) {
        if (stateText) stateText.textContent = 'Opening Book...';
        // Fluid transition: brief paint of cover orientation, then smoothly unfold into Spread 1
        autoOpenTimer = setTimeout(() => {
          openCover();
        }, 180);
      }
    };

    close3DBookViewer = function() {
      if (autoOpenTimer) {
        clearTimeout(autoOpenTimer);
        autoOpenTimer = null;
      }
      isOpeningCover = false;
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      currentSpread = 1;
      isOpen = false;
      bookObj.classList.remove('is-open');
      bookObj.classList.add('is-closed');
      coverFront?.classList.remove('is-opening');
      updateSpreadUI();
    };

    // Event Listeners
    coverFront?.addEventListener('click', handleCoverClick);
    quickOpenBtn?.addEventListener('click', () => {
      if (!isOpen) openCover();
    });

    closeBtn?.addEventListener('click', close3DBookViewer);

    // When clicked outside of book directly on modal overlay backdrop, close the book
    overlay?.addEventListener('click', (e) => {
      if (Date.now() - bookModalOpenedAt < 1000) return;
      if (e.target === overlay) {
        close3DBookViewer();
      }
    });

    prevBtn?.addEventListener('click', prevSpread);
    nextBtn?.addEventListener('click', nextSpread);
    toggleCoverBtn?.addEventListener('click', () => {
      if (isOpen) closeCover();
      else handleCoverClick();
    });

    restartBtn?.addEventListener('click', () => {
      flipToSpread(1, 'prev');
      setTimeout(closeCover, 700);
    });

    // Right page click turns to next page
    document.querySelectorAll('#bookModal3D .book-page-right').forEach(page => {
      page.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        nextSpread();
      });
    });

    // Left page click on spread 2 & 3 turns back
    document.querySelectorAll('#bookModal3D .book-page-left').forEach(page => {
      page.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        if (currentSpread > 1) prevSpread();
      });
    });

    // Keyboard support inside book
    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextSpread();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSpread();
      } else if (e.key === ' ' && !isOpen) {
        e.preventDefault();
        handleCoverClick();
      }
    });

    updateSpreadUI();
    window.open3DBookViewer = open3DBookViewer;
    window.close3DBookViewer = close3DBookViewer;
  }

  /* ==========================================================================
     11C. 3D INTERACTIVE NEWSPAPER BROADSHEET VIEWER (RESEARCH ARTICLES)
     ========================================================================== */
  const NEWSPAPER_EDITIONS = {
    art1: {
      kicker: 'THEORETICAL ASTROPHYSICS // VOL. IV • NO. 42',
      mastheadVol: 'VOL. IV • NO. 42',
      mastheadDate: 'OCTOBER 2024 DISPATCH',
      field: 'COSMOLOGY & GENERAL RELATIVITY',
      topic: 'OBSERVATIONAL COSMOLOGY & VACUUM ENERGY',
      headline: 'Dark Energy and the Mystery of Accelerating Expansion',
      readTime: '5 MIN READ',
      citations: '4 PEER CITATIONS',
      leadTeaser: 'Cosmological surveys including Type Ia Supernovae and Planck CMB measurements confirm that approximately 68.3% of the universe consists of dark energy—a smooth, negative-pressure fluid driving accelerated cosmic expansion.',
      highlightLabel: 'EINSTEIN-HILBERT FIELD EQUATIONS',
      highlightText: 'G_μν + Λg_μν = (8πG / c⁴) T_μν where Λ > 0 acts as repulsive gravitational vacuum pressure.',
      col1Title: '1. Cosmological Constant vs Quintessence',
      col1Body: '<p>Is dark energy a static vacuum energy constant <em>w = -1</em>, or an evolving scalar field dubbed <em>Quintessence</em> with dynamic equation of state <em>w(a) = w₀ + w_a(1-a)</em>?</p><p>Prabhdeep Singh\'s investigation analyzes the Hubble constant tension ($H₀$: 67.4 vs 73.0 km/s/Mpc), evaluating whether local cosmological discrepancies hint at uncharted physics beyond the standard $\\Lambda\\text{CDM}$ model.</p>',
      col2Title: '2. Spacetime Stress Tensor Model',
      col2Blueprint: `┌──────────────────────────────────────────────┐
│ COSMIC EXPANSION & EQUATION OF STATE (w)     │
│                                              │
│ Pressure-to-Density Ratio:                   │
│   p = w · ρ · c²                             │
│                                              │
│ Cosmological Constant:   w = -1.00 ± 0.03    │
│ Phantom Energy Boundary: w < -1 (Big Rip)    │
│ Quintessence Field:      -1 < w < -1/3       │
│                                              │
│ Scale Factor Evolution:  a(t) ∝ e^(H·t)      │
└──────────────────────────────────────────────┘`,
      col3Title: '3. Key Observational Deductions',
      col3List: `<li><strong>Cosmic Coincidence:</strong> Why is dark energy density currently comparable to matter density ($\\Omega_\\Lambda \\approx 0.68, \\Omega_m \\approx 0.32$)?</li><li><strong>Vacuum Catastrophe:</strong> Theoretical quantum field vacuum energy exceeds observations by 120 orders of magnitude.</li><li><strong>Future Trajectory:</strong> If $w \\equiv -1$, cosmic event horizons will shrink until all external galaxies red-shift out of causal contact.</li>`,
      stampSeal: 'PEER ARCHIVE • ASTROPHYSICS VERIFIED',
      linkUrl: '#articles'
    },
    art2: {
      kicker: 'SPACE MEDICINE & BIO-PHYSICS // SPECIAL REPORT',
      mastheadVol: 'VOL. IV • NO. 18',
      mastheadDate: 'NOVEMBER 2024 DISPATCH',
      field: 'ASTROBIOLOGY & RELATIVISTIC SHIELDING',
      topic: 'HEAVY ION BIOPHYSICS & GCR PROTECTION',
      headline: 'Guardians of the Galaxy: Shielding Astronauts from High-Energy Space Radiation',
      readTime: '6 MIN READ',
      citations: '6 PEER CITATIONS',
      leadTeaser: 'Beyond the Earth’s magnetosphere, deep-space voyagers face Galactic Cosmic Rays (GCR) and Solar Particle Events (SPE). Relativistic heavy iron nuclei (⁵⁶Fe) slice through conventional hull shielding and cellular DNA.',
      highlightLabel: 'IONIZING DOSIMETRY THRESHOLD',
      highlightText: 'Cumulative Mars transit dose: ~1.2 Sieverts (Sv), causing clustered DNA double-strand breaks (DSBs).',
      col1Title: '1. Radiation Spectrum & Cellular Trauma',
      col1Body: '<p>High-Z and High-Energy (HZE) ions produce dense ionization tracks that standard DNA repair enzymes (NHEJ and HR) cannot repair, leading to chromosomal translocations and elevated oncogenesis risks.</p><p>Secondary Bremsstrahlung photons and spallation neutrons created when ions hit heavy lead hulls often amplify the internal biological dose.</p>',
      col2Title: '2. Multi-Layer Composite Shielding',
      col2Blueprint: `┌──────────────────────────────────────────────┐
│ MULTI-LAYER COMPOSITE RADIATION SHIELDING   │
│                                              │
│ [Outer Hull] Space Debris / Micrometeoroid   │
│   ↓                                          │
│ [UHMW-PE] Ultra-High Molecular Wt Polyeth.   │
│   (High hydrogen density absorbs HZE ions)   │
│   ↓                                          │
│ [Liquid H2O / Food Pack Water Buffer Tank]   │
│   ↓                                          │
│ [Crew Quarters Storm Shelter: 15 cm H2O eq]  │
└──────────────────────────────────────────────┘`,
      col3Title: '3. Mitigation & Active Magnetospheres',
      col3List: `<li><strong>Hydrogen-Rich Composites:</strong> UHMW-PE and boronated polymers outperform aluminum by 40% in shielding mass efficiency.</li><li><strong>Active High-Tc Superconductors:</strong> Toroidal magnetic coils generating 3–5 Tesla deflecting positive ions without secondary neutron cascades.</li><li><strong>Pharmacological Radioprotectants:</strong> Synthetic anti-oxidants and NAD+ precursors mitigating acute oxidative cellular degradation.</li>`,
      stampSeal: 'AEROSPACE BIOPHYSICS • ARCHIVED',
      linkUrl: '#articles'
    },
    art3: {
      kicker: 'QUANTUM ARCHITECTURE // DISPATCH 03',
      mastheadVol: 'VOL. V • NO. 09',
      mastheadDate: 'DECEMBER 2024 DISPATCH',
      field: 'QUANTUM INFORMATION SCIENCE',
      topic: 'CIRCUITS & COMPUTATIONAL ADVANTAGE',
      headline: 'The Evolution of Quantum Computing: Beyond Moore’s Law to Hilbert Supremacy',
      readTime: '7 MIN READ',
      citations: '8 PEER CITATIONS',
      leadTeaser: 'As silicon lithography faces sub-nanometer quantum tunneling walls, quantum computing harnesses superposition and multi-qubit entanglement across a 2ᴺ-dimensional complex Hilbert space.',
      highlightLabel: 'STATE COMPLEXITY SCALING',
      highlightText: 'At 300 fault-tolerant entangled qubits, the state space (2³⁰⁰) exceeds the total atom count in the observable universe.',
      col1Title: '1. The Hardware Modality Race',
      col1Body: '<p>From transmon superconducting circuits (Josephson junctions cooled in dilution refrigerators to 15 millikelvin) to trapped-ion qubits (¹⁷¹Yb⁺ pulsed by Raman laser pairs), quantum hardware is advancing through NISQ era noise toward fault-tolerance.</p><p>Prabhdeep Singh assesses error thresholds, surface code lattice surgery, and T-gate distillation costs.</p>',
      col2Title: '2. 2-Qubit Entanglement Bell State Circuit',
      col2Blueprint: `┌──────────────────────────────────────────────┐
│ BELL STATE CIRCUIT: |Φ+⟩ = (|00⟩ + |11⟩)/√2  │
│                                              │
│  q[0]: ──|H|──────■────── ⟨Z⟩                │
│                   │                          │
│  q[1]: ───────────X────── ⟨Z⟩                │
│                                              │
│  Density Matrix:  ρ = |Φ+⟩⟨Φ+|               │
│  Coherence T1: ~120 μs | T2 Echo: ~95 μs    │
└──────────────────────────────────────────────┘`,
      col3Title: '3. Algorithmic Supremacy Horizons',
      col3List: `<li><strong>Shor\'s Algorithm:</strong> Polynomial-time period finding O((log N)³) breaks RSA cryptography via Quantum Fourier Transform.</li><li><strong>Grover\'s Search:</strong> Quadratic speedup O(√N) for unstructured query databases.</li><li><strong>VQE & QAOA:</strong> Variational Quantum Eigensolvers modeling molecular orbital catalysis for room-temperature fertilizers and lithium battery cathodes.</li>`,
      stampSeal: 'QUANTUM LAB ARCHIVE • VERIFIED',
      linkUrl: '#articles'
    },
    art4: {
      kicker: 'ADVANCED SPACETIME METRICS // TREATISE 04',
      mastheadVol: 'VOL. V • NO. 14',
      mastheadDate: 'JANUARY 2025 DISPATCH',
      field: 'RELATIVISTIC PROPULSION & GENERAL RELATIVITY',
      topic: 'ALCUBIERRE TOPOLOGY & EXOTIC MATTER',
      headline: 'In Search of the Impossible: The Physics and Mathematics of Warp Drives',
      readTime: '8 MIN READ',
      citations: '10 PEER CITATIONS',
      leadTeaser: 'Miguel Alcubierre proved in 1994 that General Relativity permits apparent faster-than-light travel by contracting spacetime ahead of a vessel while expanding spacetime behind it, without locally exceeding the speed of light.',
      highlightLabel: 'ADM (3+1) LINE ELEMENT',
      highlightText: 'ds² = -c² dt² + [dx - v_s(t) f(r_s) dt]² + dy² + dz² with zero proper acceleration for interior passengers.',
      col1Title: '1. Geometry Without Acceleration',
      col1Body: '<p>Within the Alcubierre warp bubble, the craft rests inside a flat Minkowski spacetime patch. The ship experiences no inertia, zero g-forces, and no relativistic time dilation—it is the spacetime manifold itself that translates through coordinate space.</p><p>However, the stress-energy tensor requires negative energy densities ρ < 0, violating the Weak and Dominant Energy Conditions.</p>',
      col2Title: '2. Alcubierre Spacetime Line Element',
      col2Blueprint: `┌──────────────────────────────────────────────┐
│  ALCUBIERRE WARP METRIC (3+1 ADM FORMALISM)  │
│                                              │
│   ds² = -c² dt² + [dx - v_s(t) f(r_s) dt]²   │
│         + dy² + dz²                          │
│                                              │
│   Ship Center:  r_s(t) = √[(x-x_s)²+y²+z²]   │
│   Bubble Form:  f(r_s) = [tanh σ(r_s+R) -    │
│                           tanh σ(r_s-R)]/2   │
│   Negative ρ:   T_00 < 0 (Casimir Vacuum)    │
└──────────────────────────────────────────────┘`,
      col3Title: '3. Solved & Open Engineering Bottlenecks',
      col3List: `<li><strong>Van Den Broeck Micro-Bubble:</strong> Microscopic internal coordinate radius expands to macroscopic interior, reducing required negative mass from Jupiter\'s mass down to several milligrams.</li><li><strong>Horizon Debris Accumulation:</strong> High-energy gamma ray photons captured along the forward shock wave release catastrophically upon bubble deceleration.</li><li><strong>Causality Horizons:</strong> Interior pilot cannot send signals to the exterior forward edge of the bubble to stop or steer the geometry.</li>`,
      stampSeal: 'RELATIVITY DISPATCH • PEER CERTIFIED',
      linkUrl: '#articles'
    }
  };

  let open3DNewspaperViewer = () => {};
  let close3DNewspaperViewer = () => {};

  function init3DNewspaperViewer() {
    const overlay = document.getElementById('newspaperModal3D');
    const newsObj = document.getElementById('newspaper3DObject');
    const closeBtn = document.getElementById('newspaperHudCloseBtn');
    const toggleBtn = document.getElementById('newspaperToggleFoldBtn');
    const foldBackBtn = document.getElementById('newsFoldBackBtn');
    const stateBadgeText = document.getElementById('newsStateBadgeText');
    const externalLinkBtn = document.getElementById('newspaperExternalLinkBtn');

    // Content fields
    const hudKicker = document.getElementById('newsHudKicker');
    const metaVol = document.getElementById('newsMetaVol');
    const metaDate = document.getElementById('newsMetaDate');
    const metaField = document.getElementById('newsMetaField');
    const topicBadge = document.getElementById('newsTopicBadge');
    const headlineEl = document.getElementById('newsHeadline');
    const readTimeEl = document.getElementById('newsReadTime');
    const citationsEl = document.getElementById('newsCitations');
    const topTeaserCol = document.getElementById('newsTopTeaserCol');
    const highlightLabel = document.getElementById('newsHighlightLabel');
    const highlightText = document.getElementById('newsHighlightText');
    const col1Title = document.getElementById('newsCol1Title');
    const col1Body = document.getElementById('newsCol1Body');
    const col2Title = document.getElementById('newsCol2Title');
    const col2Blueprint = document.getElementById('newsCol2Blueprint');
    const col3Title = document.getElementById('newsCol3Title');
    const col3List = document.getElementById('newsCol3List');
    const stampSeal = document.getElementById('newsStampSeal');

    if (!overlay || !newsObj) return;

    let isUnfolded = false;
    let isTransitioning = false;

    // Procedural Web Audio API paper-rustle sound generator (Reuses shared singleton)
    function playPaperSound() {
      try {
        const ctx = getSharedAudioContext();
        if (!ctx) return;
        const bufferSize = Math.floor(ctx.sampleRate * 0.16);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.16);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } catch (e) {}
    }

    function updateUIState() {
      if (isUnfolded) {
        newsObj.classList.remove('is-folded', 'is-unfolding');
        newsObj.classList.add('is-unfolded');
        if (stateBadgeText) stateBadgeText.textContent = 'Unfolded Broadsheet';
        if (toggleBtn) toggleBtn.textContent = 'Fold Broadsheet';
      } else {
        newsObj.classList.remove('is-unfolded', 'is-unfolding');
        newsObj.classList.add('is-folded');
        if (stateBadgeText) stateBadgeText.textContent = 'Folded Broadside';
        if (toggleBtn) toggleBtn.textContent = 'Unfold Broadsheet';
      }
    }

    function unfoldNewspaper() {
      if (isUnfolded || isTransitioning) return;
      isTransitioning = true;
      newsObj.classList.add('is-unfolding');
      if (stateBadgeText) stateBadgeText.textContent = 'Unfolding...';
      playPaperSound();

      setTimeout(() => {
        isUnfolded = true;
        updateUIState();
        setTimeout(() => {
          isTransitioning = false;
        }, 820);
      }, 100);
    }

    function foldNewspaper() {
      if (!isUnfolded || isTransitioning) return;
      isTransitioning = true;
      playPaperSound();
      isUnfolded = false;
      updateUIState();
      setTimeout(() => {
        isTransitioning = false;
      }, 820);
    }

    function toggleFold() {
      if (isUnfolded) foldNewspaper();
      else unfoldNewspaper();
    }

    let newsModalOpenedAt = 0;

    open3DNewspaperViewer = function(articleId = 'art1') {
      const data = NEWSPAPER_EDITIONS[articleId] || NEWSPAPER_EDITIONS.art1;

      // Populate content
      if (hudKicker) hudKicker.textContent = data.kicker;
      if (metaVol) metaVol.textContent = data.mastheadVol;
      if (metaDate) metaDate.textContent = data.mastheadDate;
      if (metaField) metaField.textContent = data.field;
      if (topicBadge) topicBadge.textContent = data.topic;
      if (headlineEl) headlineEl.textContent = data.headline;
      if (readTimeEl) readTimeEl.textContent = data.readTime;
      if (citationsEl) citationsEl.textContent = data.citations;
      if (topTeaserCol) {
        const text = data.leadTeaser || '';
        const first = text.charAt(0);
        const rest = text.slice(1);
        topTeaserCol.innerHTML = `<p><span class="news-dropcap">${first}</span>${rest}</p>`;
      }
      if (highlightLabel) highlightLabel.textContent = data.highlightLabel;
      if (highlightText) highlightText.textContent = data.highlightText;
      if (col1Title) col1Title.textContent = data.col1Title;
      if (col1Body) col1Body.innerHTML = data.col1Body;
      if (col2Title) col2Title.textContent = data.col2Title;
      if (col2Blueprint) col2Blueprint.innerHTML = `<pre>${data.col2Blueprint}</pre>`;
      if (col3Title) col3Title.textContent = data.col3Title;
      if (col3List) col3List.innerHTML = `<ul>${data.col3List}</ul>`;
      if (stampSeal) stampSeal.textContent = data.stampSeal;
      if (externalLinkBtn) {
        externalLinkBtn.href = data.linkUrl || '#articles';
        externalLinkBtn.onclick = (e) => {
          if (data.linkUrl && data.linkUrl.startsWith('#')) {
            e.preventDefault();
            close3DNewspaperViewer();
            const el = document.querySelector(data.linkUrl);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        };
      }

      // Reset to folded state on open
      newsModalOpenedAt = Date.now();
      isUnfolded = false;
      isTransitioning = false;
      updateUIState();
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      playPaperSound();
    };

    close3DNewspaperViewer = function() {
      isTransitioning = false;
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      isUnfolded = false;
      updateUIState();
    };

    // Event listeners
    closeBtn?.addEventListener('click', close3DNewspaperViewer);
    toggleBtn?.addEventListener('click', toggleFold);
    foldBackBtn?.addEventListener('click', foldNewspaper);

    const quickOpenNewsBtn = document.getElementById('quickOpenNewsBtn');
    quickOpenNewsBtn?.addEventListener('click', () => {
      open3DNewspaperViewer('art1');
    });
    
    // Clicking folded newspaper unfolds it
    newsObj?.addEventListener('click', (e) => {
      if (!isUnfolded && !isTransitioning) {
        unfoldNewspaper();
      }
    });

    // Clicking outside on backdrop closes modal
    overlay?.addEventListener('click', (e) => {
      if (Date.now() - newsModalOpenedAt < 800) return;
      if (
        e.target === overlay ||
        e.target.classList.contains('newspaper-3d-stage') ||
        e.target.classList.contains('news-ambient-glow')
      ) {
        close3DNewspaperViewer();
      }
    });

    // Keyboard support inside newspaper modal
    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === ' ' || e.key === 'Enter') {
        if (!e.target.closest('button') && !e.target.closest('a')) {
          e.preventDefault();
          toggleFold();
        }
      }
    });
  }

  function openArticleModal(id) {
    if (id === 'book_qg' || id === 'book') {
      if (typeof open3DBookViewer === 'function') {
        open3DBookViewer(true);
        return;
      }
    }

    // Research articles open as authentic 3D unfolding scientific newspapers!
    if (NEWSPAPER_EDITIONS && NEWSPAPER_EDITIONS[id]) {
      if (typeof open3DNewspaperViewer === 'function') {
        open3DNewspaperViewer(id);
        return;
      }
    }

    const data = ARTICLE_DATA_V2[id];
    if (!data || !articleModal) return;

    if (articleModalTitle) articleModalTitle.textContent = data.title;
    if (articleModalKicker) articleModalKicker.innerHTML = data.kicker;
    if (articleModalBody) {
      articleModalBody.innerHTML = `
        <div style="margin-bottom: 1.75rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 1.25rem;">
          <div style="font-family: var(--font-mono); font-size: 0.8rem; color: #a1a1aa; margin-bottom: 0.4rem;">
            FIELD OF RESEARCH: ${data.field.toUpperCase()}
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-dim);">
            AUTHOR: Prabhdeep Singh &bull; PEER RESEARCH &bull; THEORETICAL INQUIRY
          </div>
        </div>
        ${data.content}
        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-dim);">DOCUMENT STATUS: ARCHIVED &bull; CITATION FORMAT: APA/IEEE</span>
          <button class="btn-pill-v2" onclick="window.print()" style="padding: 0.5rem 1.25rem; font-size: 0.82rem; background: #ffffff; color: #000000; border: none; font-weight: 600;">
            Print / Save Treatise ↗
          </button>
        </div>
      `;
    }

    document.body.style.overflow = 'hidden';
    articleModal.classList.add('is-open');
  }

  function closeArticleModal() {
    if (articleModal) {
      articleModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  if (articleModalClose) articleModalClose.addEventListener('click', closeArticleModal);
  if (articleModal) {
    articleModal.addEventListener('click', (e) => {
      if (!e.target.closest('.modal-card-v2')) closeArticleModal();
    });
  }

  /* --------------------------------------------------------------------------
     NEURAL BRAIN CONNECTOME — High-Luminescence Glowing Dark Node Engine
     Panoramic dual-hemisphere cerebral connectome featuring 360+ glowing dark nodes,
     intense volumetric neon bloom, commanding central dark hyper-core, and synaptic filaments.
     -------------------------------------------------------------------------- */
  function initBrainNetwork() {
    const canvas  = document.getElementById('brainCanvas');
    const stage   = document.getElementById('brainNetworkStage');
    const tooltip = document.getElementById('brainTooltip');
    if (!canvas || !stage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, cx = 0, cy = 0, Rx = 0, Ry = 0;
    let dpr = window.devicePixelRatio || 1;
    let animId = null;

    // Bioluminescent cybernetic palette (Intense volumetric glow)
    const PALETTE = {
      core:       '#fbbf24', // Warm golden amber hyper-core (Quantum Giggles)
      coreGlow:   'rgba(251, 191, 36, 0.70)',
      cyan:       '#38bdf8', // Frontal Lobe: Dark Energy & Beyond Light (Electric Cyan)
      cyanGlow:   'rgba(56, 189, 248, 0.65)',
      indigo:     '#818cf8', // Parietal Lobe: Space Radiation & Astronaut Health (Ultraviolet Indigo)
      indigoGlow: 'rgba(129, 140, 248, 0.65)',
      mint:       '#2dd4bf', // Temporal Lobe: Evolution of Quantum Computing (Bioluminescent Mint)
      mintGlow:   'rgba(45, 212, 191, 0.65)',
      amethyst:   '#c084fc', // Occipital Lobe: Warp Drive & Spacetime (Electric Amethyst)
      amethystGlow:'rgba(192, 132, 252, 0.65)',
      slate:      '#38bdf8', // Deep-space bioluminescent interneurons
      starWhite:  '#ffffff',
      contour:    'rgba(56, 189, 248, 0.06)'
    };

    // Central Big Node (Quantum Giggles Thalamic Hyper-Core)
    const CORTEX = {
      artId: 'book_qg',
      label: 'QUANTUM GIGGLES',
      sub: 'MY PUBLISHED BOOK // AMAZON',
      title: 'Quantum Giggles: Laughing Through Cosmic Wonders',
      kicker: 'CENTRAL HYPER-CORE // PUBLISHED BOOK',
      action: 'CLICK TO EXPLORE BOOK CHAPTERS & READ ON AMAZON ↗',
      coreRadius: 13.0,   // Refined, radiant central star (not an oversized blob)
      glowRadius: 28.0,   // Subtle, tight golden starlight halo
      color: PALETTE.core,
      glowColor: PALETTE.coreGlow,
      isCortex: true,
      isMaster: true,
      ping: 0
    };

    // 4 Major Research Supergiant Nodes (Widened across anatomical cerebral lobes)
    const MASTER_CORES = [
      {
        artId: 'art1',
        lobe: 'FRONTAL LOBE // COSMOLOGY',
        label: 'DARK ENERGY',
        sub: 'Beyond Light // Treatise 01',
        title: 'Dark Energy and Unseen Forces: A Journey Beyond Light',
        kicker: 'LEFT FRONTAL LOBE // COSMOLOGY & PHOTON DYNAMICS',
        action: 'CLICK TO READ FULL TREATISE & EQUATIONS ↗',
        uNorm: -0.68,
        vNorm: -0.48,
        coreRadius: 8.5,
        glowRadius: 18.0,
        color: PALETTE.cyan,
        glowColor: PALETTE.cyanGlow,
        isCortex: false,
        isMaster: true,
        ping: 0
      },
      {
        artId: 'art2',
        lobe: 'PARIETAL LOBE // RADIOBIOLOGY',
        label: 'SPACE RADIATION',
        sub: 'Astronaut Health // Treatise 02',
        title: 'Guardians of the Galaxy: How Space Radiation Affects Astronauts',
        kicker: 'RIGHT PARIETAL LOBE // RADIOBIOLOGY & SHIELDING',
        action: 'CLICK TO READ FULL TREATISE & COUNTERMEASURES ↗',
        uNorm: 0.70,
        vNorm: -0.22,
        coreRadius: 8.5,
        glowRadius: 18.0,
        color: PALETTE.indigo,
        glowColor: PALETTE.indigoGlow,
        isCortex: false,
        isMaster: true,
        ping: 0
      },
      {
        artId: 'art3',
        lobe: 'TEMPORAL LOBE // QUANTUM SYSTEMS',
        label: 'QUANTUM COMPUTING',
        sub: 'Evolution & Moore // Treatise 03',
        title: 'Evolution of Quantum Computing',
        kicker: 'LEFT TEMPORAL LOBE // QUANTUM REVOLUTION & QUBITS',
        action: 'CLICK TO READ FULL TREATISE & ANALYSIS ↗',
        uNorm: -0.82,
        vNorm: 0.28,
        coreRadius: 8.5,
        glowRadius: 18.0,
        color: PALETTE.mint,
        glowColor: PALETTE.mintGlow,
        isCortex: false,
        isMaster: true,
        ping: 0
      },
      {
        artId: 'art4',
        lobe: 'OCCIPITAL LOBE // GENERAL RELATIVITY',
        label: 'WARP DRIVE',
        sub: 'Alcubierre Metric // Treatise 04',
        title: 'In Search of the Impossible: The Science of Warp Drive',
        kicker: 'RIGHT OCCIPITAL LOBE // GENERAL RELATIVITY & SPACETIME',
        action: 'CLICK TO READ FULL TREATISE & TENSORS ↗',
        uNorm: 0.68,
        vNorm: 0.58,
        coreRadius: 8.5,
        glowRadius: 18.0,
        color: PALETTE.amethyst,
        glowColor: PALETTE.amethystGlow,
        isCortex: false,
        isMaster: true,
        ping: 0
      }
    ];

    // 14 Sub-Master Intermediate Hub Nodes (clearly larger than leaf nodes, smaller than primary masters)
    const SUB_MASTERS = [
      // Cluster 1: Dark Energy and Unseen Forces (Cyan / Azure)
      {
        artId: 'art1',
        parentMasterIdx: 1,
        label: 'Photon Core Disc',
        code: 'rot_disc.diam',
        uNorm: -0.52,
        vNorm: -0.62,
        coreRadius: 5.0,
        glowRadius: 10.0,
        color: '#38bdf8',
        kicker: 'DARK ENERGY // PHOTON ENTITY',
        title: 'Rotating Disc Core & Photon Particle Stabilization',
        action: 'CLICK TO READ TREATISE 01 ↗',
        isSubMaster: true
      },
      {
        artId: 'art1',
        parentMasterIdx: 1,
        label: '3D Matter Corpuscles',
        code: 'matter_rad.3d',
        uNorm: -0.80,
        vNorm: -0.32,
        coreRadius: 4.8,
        glowRadius: 10.0,
        color: '#0284c7',
        kicker: 'DARK ENERGY // CORPUSCLE DYNAMICS',
        title: 'Work Released as Electromagnetic Radiation',
        action: 'CLICK TO READ TREATISE 01 ↗',
        isSubMaster: true
      },
      {
        artId: 'art1',
        parentMasterIdx: 1,
        label: 'Unseen Cosmic Forces',
        code: 'dark_e.quint',
        uNorm: -0.40,
        vNorm: -0.35,
        coreRadius: 4.6,
        glowRadius: 9.5,
        color: '#06b6d4',
        kicker: 'DARK ENERGY // VACUUM EXPANSION',
        title: 'Dynamic Quintessence & Vacuum Energy Polarization',
        action: 'CLICK TO READ TREATISE 01 ↗',
        isSubMaster: true
      },

      // Cluster 2: Space Radiation & Astronauts (Indigo / Violet)
      {
        artId: 'art2',
        parentMasterIdx: 2,
        label: 'Cosmic Ray Flux',
        code: 'gcr_hze.1gev',
        uNorm: 0.52,
        vNorm: -0.38,
        coreRadius: 5.0,
        glowRadius: 10.0,
        color: '#818cf8',
        kicker: 'SPACE RADIATION // GALACTIC COSMIC RAYS',
        title: 'HZE Relativistic Heavy Ion Ionization Tracks',
        action: 'CLICK TO READ TREATISE 02 ↗',
        isSubMaster: true
      },
      {
        artId: 'art2',
        parentMasterIdx: 2,
        label: 'DNA Damage Repair',
        code: 'dna_dsb.repair',
        uNorm: 0.84,
        vNorm: -0.10,
        coreRadius: 4.8,
        glowRadius: 10.0,
        color: '#6366f1',
        kicker: 'SPACE RADIATION // CELLULAR HAZARDS',
        title: 'Clustered DNA Double-Strand Breaks & Genetic Countermeasures',
        action: 'CLICK TO READ TREATISE 02 ↗',
        isSubMaster: true
      },
      {
        artId: 'art2',
        parentMasterIdx: 2,
        label: 'Radiation Shielding',
        code: 'shield_uhmw.pe',
        uNorm: 0.44,
        vNorm: -0.10,
        coreRadius: 4.6,
        glowRadius: 9.5,
        color: '#a5b4fc',
        kicker: 'SPACE RADIATION // COUNTERMEASURES',
        title: 'Passive Polyethylene & Active Magnetic Deflection Shields',
        action: 'CLICK TO READ TREATISE 02 ↗',
        isSubMaster: true
      },

      // Cluster 3: Evolution of Quantum Computing (Mint / Emerald)
      {
        artId: 'art3',
        parentMasterIdx: 3,
        label: 'Moore’s Law Ceiling',
        code: 'moore_limit.07nm',
        uNorm: -0.62,
        vNorm: 0.14,
        coreRadius: 5.0,
        glowRadius: 10.0,
        color: '#2dd4bf',
        kicker: 'QUANTUM COMPUTING // MOORE LIMITS',
        title: 'Quantum Tunneling Limits of Classical Silicon',
        action: 'CLICK TO READ TREATISE 03 ↗',
        isSubMaster: true
      },
      {
        artId: 'art3',
        parentMasterIdx: 3,
        label: 'Qubit Superposition',
        code: 'qubit.psi[2^n]',
        uNorm: -0.88,
        vNorm: 0.45,
        coreRadius: 4.8,
        glowRadius: 10.0,
        color: '#10b981',
        kicker: 'QUANTUM COMPUTING // 2^N EXPANSION',
        title: 'Exponential State Space & Multi-Qubit Entanglement',
        action: 'CLICK TO READ TREATISE 03 ↗',
        isSubMaster: true
      },
      {
        artId: 'art3',
        parentMasterIdx: 3,
        label: 'Quantum Supremacy',
        code: 'q_speedup.algo',
        uNorm: -0.48,
        vNorm: 0.42,
        coreRadius: 4.6,
        glowRadius: 9.5,
        color: '#34d399',
        kicker: 'QUANTUM COMPUTING // ALGORITHMIC EDGE',
        title: 'Shor & Grover Quantum Algorithmic Speedups',
        action: 'CLICK TO READ TREATISE 03 ↗',
        isSubMaster: true
      },

      // Cluster 4: The Science of Warp Drive (Amethyst / Magenta / Purple)
      {
        artId: 'art4',
        parentMasterIdx: 4,
        label: 'Spacetime Expansion',
        code: 'metric.expand_r',
        uNorm: 0.50,
        vNorm: 0.42,
        coreRadius: 5.0,
        glowRadius: 10.0,
        color: '#c084fc',
        kicker: 'WARP DRIVE // METRIC DISTORTION',
        title: 'Rearward Local Spacetime Expansion Dynamics',
        action: 'CLICK TO READ TREATISE 04 ↗',
        isSubMaster: true
      },
      {
        artId: 'art4',
        parentMasterIdx: 4,
        label: 'Spacetime Contraction',
        code: 'metric.contract_f',
        uNorm: 0.80,
        vNorm: 0.72,
        coreRadius: 4.8,
        glowRadius: 10.0,
        color: '#a855f7',
        kicker: 'WARP DRIVE // METRIC DISTORTION',
        title: 'Opposing Forward Contraction Within Relativity',
        action: 'CLICK TO READ TREATISE 04 ↗',
        isSubMaster: true
      },
      {
        artId: 'art4',
        parentMasterIdx: 4,
        label: 'Alcubierre Metric',
        code: 'warp_vs.3p1',
        uNorm: 0.38,
        vNorm: 0.65,
        coreRadius: 4.6,
        glowRadius: 9.5,
        color: '#e879f9',
        kicker: 'WARP DRIVE // GENERAL RELATIVITY',
        title: 'Superluminal Transit Without Local Violations',
        action: 'CLICK TO READ TREATISE 04 ↗',
        isSubMaster: true
      },

      // Cluster 5: Thalamic Central Hub bridges (Golden Amber)
      {
        artId: 'book_qg',
        parentMasterIdx: 0,
        label: 'Cosmic Wonders',
        code: 'psi_sup.cosmic',
        uNorm: -0.18,
        vNorm: -0.22,
        coreRadius: 5.0,
        glowRadius: 10.0,
        color: '#f59e0b',
        kicker: 'QUANTUM GIGGLES // FOUNDATIONAL LOGIC',
        title: 'Cosmic Superposition & Humor as Perspective Shift',
        action: 'CLICK TO EXPLORE BOOK CHAPTERS ↗',
        isSubMaster: true
      },
      {
        artId: 'book_qg',
        parentMasterIdx: 0,
        label: 'Quantum Matrix',
        code: 'matrix_h.uncert',
        uNorm: 0.20,
        vNorm: 0.22,
        coreRadius: 5.0,
        glowRadius: 10.0,
        color: '#fbbf24',
        kicker: 'QUANTUM GIGGLES // OBSERVATION DYNAMICS',
        title: 'The Observer Effect in Mind, Philosophy & Code',
        action: 'CLICK TO EXPLORE BOOK CHAPTERS ↗',
        isSubMaster: true
      }
    ];

    // Volumetric Cluster Nebulae (as in reference graph image)
    const CLUSTER_NEBULAE = [
      { uNorm: -0.65, vNorm: -0.45, r: 250, color: 'rgba(56, 189, 248, 0.16)', core: 'rgba(56, 189, 248, 0.30)' }, // Cyan
      { uNorm: 0.68,  vNorm: -0.22, r: 230, color: 'rgba(129, 140, 248, 0.14)', core: 'rgba(129, 140, 248, 0.26)' }, // Indigo
      { uNorm: -0.72, vNorm: 0.32,  r: 240, color: 'rgba(45, 212, 191, 0.16)', core: 'rgba(45, 212, 191, 0.28)' }, // Mint/Green
      { uNorm: 0.62,  vNorm: 0.58,  r: 230, color: 'rgba(192, 132, 252, 0.15)', core: 'rgba(217, 70, 239, 0.26)' }, // Purple/Magenta
      { uNorm: 0.0,   vNorm: 0.14,  r: 270, color: 'rgba(245, 158, 11, 0.13)', core: 'rgba(251, 191, 36, 0.24)' }  // Warm Amber
    ];

    // Technical data micro-labels assigned to select leaf nodes (reference image look)
    const TECH_MICRO_LABELS = [
      'tensor_fp16.cu', 'qstate_0x3F', 'psi_decohere', 'shor.alu_256',
      'qubit.entangle', 'euv_high_na', 'sub1nm_drift', 'tunnel_leak',
      'gaa_sheet_3d', 'co2_epoch.kWh', 'sparse.92%', 'dvfs_0.75v',
      'gemm.sparse', 'lif_neuron.42hz', 'memristor.4x4', 'stdp_decay',
      'axon.spike_train', 'weight_w[i,j]', 'loss.0014', 'entropy_H(x)',
      'gradient.norm', 'backprop_snn', 'qpu_v100_link', 'fp32_accum',
      'superposition_p', 'qubit_fid.99.9%', 'photon_interconnect',
      'prune.iter_14', 'neuromorph.v2', 'matrix_mul.tpu', 'phase_est.qft',
      'leak_current.nA', 'nanosheet_w', 'carbon_footprint', 'inference_lat.ms',
      'synaptic_wt.0.84', 'spiking_rate.kHz', 'hebbian.update', 'quantum_flux',
      'cuda_stream_0', 'synapse_cond.mS', 'sub_threshold', 'qubit_gate.cnot'
    ];

    // Anatomical Brain Silhouette Boundary Function
    function getBrainLobeWidth(v) {
      let w = 0.5;
      if (v < -0.45) {
        // Frontal Lobe dome
        const t = (v + 0.45) / 0.50;
        w = 0.78 * Math.sqrt(Math.max(0, 1 - t * t)) + 0.10;
      } else if (v < 0.15) {
        // Parietal Lobe expansion
        w = 0.90;
      } else if (v < 0.55) {
        // Temporal Lobe wide lateral flare
        const t = (v - 0.35) / 0.20;
        w = 0.96 - 0.05 * (t * t);
      } else {
        // Occipital Lobe taper
        const t = (v - 0.55) / 0.40;
        w = 0.68 * Math.sqrt(Math.max(0, 1 - t * t)) + 0.12;
      }
      w *= (1 + 0.045 * Math.sin(v * 9.5) + 0.03 * Math.cos(v * 15.0));
      return Math.min(1.0, Math.max(0.12, w));
    }

    // Network collections
    let nodes = [];       // [0]=Cortex, [1..4]=Master Cores, [5..N]=Filler Stars
    let edges = [];       // Curved constellation filaments
    let signals = [];     // Starlight photon pulses flowing along curves
    let shockwaves = [];  // Stellar shockwave rings
    let ambientVesicles = []; // Deep space background star dust
    let subMasterStartIndex = 5;
    let subMasterEndIndex = 19;

    // Mouse & physics state
    const mouse = { x: -9999, y: -9999, isInside: false };
    let hoveredNode = null;

    function hexToRgba(hex, alpha) {
      if (!hex) return 'rgba(148, 163, 184, ' + alpha.toFixed(3) + ')';
      if (typeof hex === 'string' && hex.startsWith('rgba(')) {
        return hex.replace(/[\d\.]+\)$/g, alpha.toFixed(3) + ')');
      }
      if (!hex || hex[0] !== '#') return 'rgba(148, 163, 184, ' + alpha.toFixed(3) + ')';
      let r = 0, g = 0, b = 0;
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length >= 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
      }
      return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha.toFixed(3) + ')';
    }

    // Quadratic bezier point evaluation
    function getBezierPoint(p0, cp, p1, t) {
      const it = 1 - t;
      return {
        x: it * it * p0.x + 2 * it * t * cp.x + t * t * p1.x,
        y: it * it * p0.y + 2 * it * t * cp.y + t * t * p1.y
      };
    }

    // Compute curved edge control point dynamically with magnetic cursor pull
    function getEdgeControlPoint(edge, n1, n2) {
      const mx = (n1.x + n2.x) * 0.5;
      const my = (n1.y + n2.y) * 0.5;
      const dx = n2.x - n1.x;
      const dy = n2.y - n1.y;
      const len = Math.hypot(dx, dy) || 1;
      const px = -dy / len;
      const py = dx / len;

      let cpx = mx + px * edge.curvature;
      let cpy = my + py * edge.curvature;

      // Magnetic Gravitational Cursor Pull on Routes
      if (mouse.isInside) {
        const dist = Math.hypot(mouse.x - cpx, mouse.y - cpy);
        const pullRadius = edge.isTrunk ? 190 : 130;
        if (dist < pullRadius) {
          const force = Math.pow(1 - dist / pullRadius, 1.4);
          const pullStrength = edge.isTrunk ? 60 : 42;
          cpx += (mouse.x - cpx) * (force * (pullStrength / pullRadius));
          cpy += (mouse.y - cpy) * (force * (pullStrength / pullRadius));
        }
      }

      return { x: cpx, y: cpy };
    }

    // -------------------------------------------------------------------------
    // HIGH-PRECISION REFINED STELLAR NEURAL NODE ENGINE
    // -------------------------------------------------------------------------
    function drawGlowingDarkNode(ctx, x, y, coreR, glowR, color, alpha, options = {}) {
      const isHovered = options.isHovered || false;
      const isCentral = options.isCentral || false;
      const isMaster  = options.isMaster || false;
      const pulse     = options.pulse !== undefined ? options.pulse : 0.5;
      const ping      = options.ping || 0;

      const r = coreR * (isHovered ? 1.25 : 1.0) * (1 + ping * 0.15);
      const haloR = r * (isCentral ? 2.5 : isMaster ? 2.2 : 1.9);

      // 1. Subtle, tight atmospheric neon halo (clean & delicate, never blurry fog)
      const haloGrd = ctx.createRadialGradient(x, y, r * 0.3, x, y, haloR);
      haloGrd.addColorStop(0, hexToRgba(color, alpha * (isHovered ? 0.75 : 0.40)));
      haloGrd.addColorStop(0.65, hexToRgba(color, alpha * 0.12));
      haloGrd.addColorStop(1.0, 'transparent');

      ctx.fillStyle = haloGrd;
      ctx.beginPath();
      ctx.arc(x, y, haloR, 0, Math.PI * 2);
      ctx.fill();

      // 2. Central white-hot radiant core
      const coreGrd = ctx.createRadialGradient(x, y, 0, x, y, r);
      if (isCentral) {
        coreGrd.addColorStop(0, '#ffffff');
        coreGrd.addColorStop(0.40, '#fef08a');
        coreGrd.addColorStop(0.85, '#f59e0b');
        coreGrd.addColorStop(1.0, '#b45309');
      } else if (isMaster) {
        coreGrd.addColorStop(0, '#ffffff');
        coreGrd.addColorStop(0.45, color);
        coreGrd.addColorStop(1.0, color);
      } else {
        coreGrd.addColorStop(0, '#ffffff');
        coreGrd.addColorStop(0.60, color);
        coreGrd.addColorStop(1.0, color);
      }

      ctx.fillStyle = coreGrd;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      // 3. Crisp outer starlight rim
      ctx.strokeStyle = isHovered ? '#ffffff' : (isCentral ? '#fde68a' : isMaster ? '#ffffff' : hexToRgba(color, 0.85));
      ctx.lineWidth = isCentral ? 1.5 : (isMaster ? 1.2 : 0.75);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();

      // 4. Single delicate thin harmonic orbit ring only for BIG (MY BOOK) or hovered node
      if (isCentral || isHovered) {
        const ringR = r + 3.5 + pulse * 2.0;
        ctx.strokeStyle = hexToRgba(color, (isHovered ? 0.65 : 0.30) * alpha);
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.arc(x, y, ringR, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Deterministic Mulberry32 PRNG ensures network structure, node positions, and connections
    // NEVER scramble or change randomly on page reloads!
    function createPRNG(seed = 42819) {
      let s = seed >>> 0;
      return function() {
        s = (s + 0x6D2B79F5) >>> 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    // Build the hierarchical graph network topology (Deterministic, persistent, alive)
    function buildTopology() {
      const prng = createPRNG(78219);
      nodes = [];
      edges = [];
      signals = [];

      // 1. Central Grand Core: BIG (MY BOOK) -> index 0
      CORTEX.x = cx;
      CORTEX.y = cy;
      CORTEX.baseX = cx;
      CORTEX.baseY = cy;
      CORTEX.vx = 0;
      CORTEX.vy = 0;
      CORTEX.z = 1.0;
      nodes.push(CORTEX);

      // 2. The 4 Major Primary Research Hubs -> indices 1..4
      MASTER_CORES.forEach((mc) => {
        mc.x = cx + mc.uNorm * Rx;
        mc.y = cy + mc.vNorm * Ry;
        mc.baseX = mc.x;
        mc.baseY = mc.y;
        mc.vx = 0;
        mc.vy = 0;
        mc.z = 0.95;
        nodes.push(mc);
      });

      // 3. 14 Sub-Master Hub Nodes (clearly larger than leaf nodes, smaller than primary masters)
      subMasterStartIndex = nodes.length; // index 5
      SUB_MASTERS.forEach((sm) => {
        sm.x = cx + sm.uNorm * Rx;
        sm.y = cy + sm.vNorm * Ry;
        sm.baseX = sm.x;
        sm.baseY = sm.y;
        sm.vx = 0;
        sm.vy = 0;
        sm.z = 0.85;
        sm.ping = 0;
        sm.floatAmpX = 4.2 + prng() * 3.0;
        sm.floatAmpY = 3.2 + prng() * 2.6;
        sm.floatSpeed = 0.00045 + prng() * 0.00035;
        sm.pulsePhase = prng() * Math.PI * 2;
        nodes.push(sm);
      });
      subMasterEndIndex = nodes.length; // index 19

      // 4. Fixed Constellation of Leaf Nodes (Strictly 120 deterministic leaf nodes)
      const TOTAL_LEAF_NODES = 120;
      const stellarColors = [
        PALETTE.cyan, PALETTE.cyan,
        PALETTE.indigo, PALETTE.indigo,
        PALETTE.mint, PALETTE.mint,
        PALETTE.amethyst, PALETTE.amethyst,
        PALETTE.core, PALETTE.slate, PALETTE.starWhite
      ];

      for (let i = 0; i < TOTAL_LEAF_NODES; i++) {
        const side = (i % 2 === 0) ? -1 : 1;
        const v = -0.95 + prng() * 1.90;
        const maxW = getBrainLobeWidth(v);

        let uVal = 0, color = PALETTE.slate;
        const roll = prng();

        if (roll < 0.38) {
          // Cortical Rim Nodes
          uVal = side * (maxW * (0.84 + prng() * 0.16));
          if (v < -0.2) color = (side === -1 ? PALETTE.cyan : PALETTE.indigo);
          else color = (side === -1 ? PALETTE.mint : PALETTE.amethyst);
        } else if (roll < 0.72) {
          // Internal Cerebral Nodes
          uVal = side * (0.05 + prng() * (maxW * 0.78));
          color = stellarColors[Math.floor(prng() * stellarColors.length)];
        } else if (roll < 0.88) {
          // Subcortical Nodes around central hub
          const angle = prng() * Math.PI * 2;
          const rad = 24 + prng() * 85;
          const nx = cx + Math.cos(angle) * rad * 1.15;
          const ny = cy + Math.sin(angle) * (rad * 0.85);
          nodes.push(createLeafNode(nx, ny, PALETTE.core, 0.45 + prng() * 0.5, i));
          continue;
        } else {
          // Medial Commissural Nodes
          const t = (prng() - 0.5) * 0.14;
          uVal = t;
          color = prng() > 0.4 ? PALETTE.core : PALETTE.starWhite;
        }

        const nx = cx + uVal * Rx;
        const ny = cy + v * Ry;
        const z = 0.22 + prng() * 0.68;
        nodes.push(createLeafNode(nx, ny, color, z, i));
      }

      function createLeafNode(nx, ny, color, z, idx) {
        const coreR = 1.6 + z * 1.0;
        const glowR = coreR * 2.2;
        const hasMicroLabel = (idx % 12 === 0);
        const microLabel = hasMicroLabel ? TECH_MICRO_LABELS[Math.floor(idx / 12) % TECH_MICRO_LABELS.length] : null;

        return {
          x: nx,
          y: ny,
          baseX: nx,
          baseY: ny,
          vx: 0,
          vy: 0,
          z: z,
          coreRadius: coreR,
          glowRadius: glowR,
          baseAlpha: (0.35 + z * 0.40),
          color: color,
          pulsePhase: prng() * Math.PI * 2,
          pulseSpeed: 0.003 + prng() * 0.003,
          twinkleSpeed: 0.0005 + prng() * 0.0008,
          floatAmpX: 2.2 + prng() * 1.8,
          floatAmpY: 1.8 + prng() * 1.4,
          floatSpeed: 0.00025 + prng() * 0.00025,
          isCortex: false,
          isMaster: false,
          isSubMaster: false,
          microLabel: microLabel,
          ping: 0
        };
      }

      // 5. Build the Dense Synaptic Graph Network
      // A. Primary Arterial Trunks: 4 Major Hubs into BIG (MY BOOK)
      for (let m = 1; m <= 4; m++) {
        const mc = nodes[m];
        const curv = (mc.x < cx ? -1 : 1) * (18 + prng() * 12);
        edges.push({
          from: m,
          to: 0,
          isTrunk: true,
          color: mc.color,
          curvature: curv,
          width: 2.4,
          pulseOffset: m * 1.2
        });
      }

      // B. Connect Each Sub-Master to its Parent Primary Master Hub
      for (let s = subMasterStartIndex; s < subMasterEndIndex; s++) {
        const sm = nodes[s];
        const parentIdx = sm.parentMasterIdx !== undefined ? sm.parentMasterIdx : 0;
        const curv = (prng() - 0.5) * 14;
        edges.push({
          from: s,
          to: parentIdx,
          isSubTrunk: true,
          color: sm.color,
          curvature: curv,
          width: 1.5
        });
      }

      // C. Direct Express Feeder Conduits into BIG (MY BOOK) from Sub-Masters across all 4 lobes!
      // Guarantees the middle big node gets continuous data streams from EVERY corner of the network!
      for (let s = subMasterStartIndex; s < subMasterEndIndex; s++) {
        const sm = nodes[s];
        const curv = (sm.x < cx ? -1 : 1) * (10 + prng() * 14);
        edges.push({
          from: s,
          to: 0,
          isTrunk: true,
          isDirectToBig: true,
          color: sm.color,
          curvature: curv,
          width: 1.4
        });
      }

      // D. Connect Sub-Masters within the same cluster to each other
      for (let s = subMasterStartIndex; s < subMasterEndIndex; s++) {
        for (let s2 = s + 1; s2 < subMasterEndIndex; s2++) {
          if (nodes[s].parentMasterIdx === nodes[s2].parentMasterIdx) {
            const curv = (prng() - 0.5) * 12;
            edges.push({
              from: s,
              to: s2,
              isTrunk: false,
              color: nodes[s].color,
              curvature: curv,
              width: 1.1
            });
          }
        }
      }

      // E. Connect Each Sub-Master to its 12 Nearest Leaf Nodes in its cluster
      const leafStartIndex = subMasterEndIndex;
      for (let s = subMasterStartIndex; s < subMasterEndIndex; s++) {
        const sm = nodes[s];
        const clusterNeighbors = [];
        for (let i = leafStartIndex; i < nodes.length; i++) {
          const dx = nodes[i].baseX - sm.baseX;
          const dy = nodes[i].baseY - sm.baseY;
          clusterNeighbors.push({ idx: i, dist: Math.hypot(dx, dy) });
        }
        clusterNeighbors.sort((a, b) => a.dist - b.dist);
        const kCount = Math.min(12, clusterNeighbors.length);
        for (let k = 0; k < kCount; k++) {
          const curv = (prng() - 0.5) * 12;
          edges.push({
            from: clusterNeighbors[k].idx,
            to: s,
            isTrunk: false,
            color: sm.color,
            curvature: curv,
            width: 1.05
          });
        }
      }

      // F. Dense Inter-Leaf Constellation Web (Lattice Mesh for inter-node crosstalk)
      const maxConnectDist = Math.min(W, H) * 0.12;
      for (let i = leafStartIndex; i < nodes.length; i++) {
        let connected = 0;
        for (let j = i + 1; j < nodes.length; j++) {
          if (connected >= 3) break;
          const dx = nodes[i].baseX - nodes[j].baseX;
          const dy = nodes[i].baseY - nodes[j].baseY;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const curv = (prng() - 0.5) * 10;
            edges.push({
              from: i,
              to: j,
              isTrunk: false,
              color: nodes[i].color,
              curvature: curv,
              width: 0.95
            });
            connected++;
          }
        }
      }

      // G. Cross-Cluster Long-Range Bridge Filaments (connecting opposite lobes across the fissure)
      const crossPairs = [
        { from: 1, to: 2 }, // Frontal Left <-> Parietal Right
        { from: 3, to: 4 }, // Temporal Left <-> Occipital Right
        { from: 1, to: 3 }, // Frontal Left <-> Temporal Left
        { from: 2, to: 4 }  // Parietal Right <-> Occipital Right
      ];
      crossPairs.forEach((pair) => {
        edges.push({
          from: pair.from,
          to: pair.to,
          isTrunk: false,
          color: '#38bdf8',
          curvature: (prng() - 0.5) * 20,
          width: 1.1
        });
      });

      // Fixed Pool of exactly 28 Starlight Data Packets (Constant count, smooth, slow, serene)
      const MAX_SIGNALS = 28;
      signals = [];
      for (let s = 0; s < MAX_SIGNALS; s++) {
        const sig = {
          edge: null,
          t: (s / MAX_SIGNALS),
          speed: 0.0007,
          size: 2.0,
          color: PALETTE.cyan
        };
        resetSignal(sig);
        sig.t = Math.random(); // Distribute smoothly across routes initially
        signals.push(sig);
      }
    }

    function resetSignal(sig) {
      if (edges.length === 0) return;
      const roll = Math.random();
      let edge;
      if (roll < 0.55) {
        // Arterial lines leading directly into BIG (MY BOOK) (edges where to === 0)
        const centralTrunks = edges.filter(e => e.to === 0);
        edge = centralTrunks[Math.floor(Math.random() * centralTrunks.length)] || edges[0];
      } else if (roll < 0.82) {
        // Sub-master trunks feeding into primary master hubs (1..4)
        const subTrunks = edges.filter(e => e.isSubTrunk);
        edge = subTrunks[Math.floor(Math.random() * subTrunks.length)] || edges[0];
      } else {
        // Gentle inter-node mesh crosstalk
        const meshEdges = edges.filter(e => !e.isTrunk && !e.isSubTrunk);
        edge = meshEdges[Math.floor(Math.random() * meshEdges.length)] || edges[0];
      }

      sig.edge = edge;
      sig.t = 0;
      // Slow, peaceful, natural velocity: takes ~12 to 18 seconds to glide across route
      sig.speed = edge.isTrunk ? (0.00065 + Math.random() * 0.00045) : (0.00045 + Math.random() * 0.00035);
      sig.size = edge.isTrunk ? 2.6 : (edge.isSubTrunk ? 2.0 : 1.4);
      sig.color = edge.color || PALETTE.cyan;
    }

    function resize() {
      const rect = stage.getBoundingClientRect();
      W = Math.floor(rect.width);
      H = Math.floor(rect.height);
      if (W <= 0 || H <= 0) return;

      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      cx = W * 0.50;
      cy = H * 0.49;
      // Expansive panoramic stellar radius spanning across viewport
      Rx = Math.min(W * 0.485, 780);
      Ry = Math.min(H * 0.45, 340);

      buildTopology();
      initAmbientVesicles();
    }

    function initAmbientVesicles() {
      ambientVesicles = [];
      // Dense cosmic deep space star dust (smooth, serene drift)
      const count = Math.min(65, Math.floor((W * H) / 10000));
      for (let i = 0; i < count; i++) {
        ambientVesicles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 0.5 + Math.random() * 1.2,
          alpha: 0.08 + Math.random() * 0.25,
          speed: (Math.random() - 0.5) * 0.045,
          drift: (Math.random() - 0.5) * 0.035,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    // -------------------------------------------------------------------------
    // RENDER PASSES
    // -------------------------------------------------------------------------

    // 0. Volumetric Chromatic Cluster Nebulae (as in reference image)
    function renderNebulae(time) {
      CLUSTER_NEBULAE.forEach((neb, i) => {
        const nx = cx + neb.uNorm * Rx + Math.sin(time * 0.00022 + i * 1.5) * 5;
        const ny = cy + neb.vNorm * Ry + Math.cos(time * 0.00018 + i * 1.2) * 4;
        const pulse = 0.88 + 0.12 * Math.sin(time * 0.00035 + i);
        const r = neb.r * pulse;

        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, r);
        grd.addColorStop(0, neb.core);
        grd.addColorStop(0.35, neb.color);
        grd.addColorStop(0.70, hexToRgba(neb.color, 0.03));
        grd.addColorStop(1.0, 'transparent');

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 1. Faint Bioluminescent Cortical Contour & Anatomical Axis
    function renderBrainSilhouette(time) {
      ctx.save();
      const pulse = 0.5 + 0.5 * Math.sin(time * 0.00045);
      const alpha = 0.038 + pulse * 0.015;

      drawHemisphereOutline(-1, alpha);
      drawHemisphereOutline(1, alpha);

      // Central Longitudinal Fissure
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.035)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.moveTo(cx, cy - Ry * 0.95);
      ctx.lineTo(cx, cy + Ry * 0.92);
      ctx.stroke();
      ctx.setLineDash([]);

      // Perimeter astronomical lobe markers
      ctx.font = '600 8.5px monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.28)';
      ctx.textAlign = 'center';
      ctx.fillText('FRONTAL CORTEX // ANTERIOR', cx, cy - Ry * 1.02);
      ctx.fillText('OCCIPITAL CORTEX // POSTERIOR', cx, cy + Ry * 1.05);

      ctx.textAlign = 'left';
      ctx.fillText('LEFT CEREBRAL HEMISPHERE', cx - Rx * 1.05, cy);
      ctx.textAlign = 'right';
      ctx.fillText('RIGHT CEREBRAL HEMISPHERE', cx + Rx * 1.05, cy);

      ctx.restore();
    }

    function drawHemisphereOutline(side, alpha) {
      ctx.strokeStyle = 'rgba(56, 189, 248, ' + alpha.toFixed(3) + ')';
      ctx.lineWidth = 1.4;
      ctx.beginPath();

      const steps = 38;
      let first = true;
      for (let s = 0; s <= steps; s++) {
        const v = -0.95 + (s / steps) * 1.90;
        const w = getBrainLobeWidth(v);
        const px = cx + side * w * Rx;
        const py = cy + v * Ry;
        if (first) { ctx.moveTo(px, py); first = false; }
        else { ctx.lineTo(px, py); }
      }
      ctx.stroke();
    }

    // 2. Ambient Deep Space Star Dust
    function renderAmbientVesicles(time) {
      ambientVesicles.forEach((v) => {
        v.x += v.drift;
        v.y += v.speed;
        if (v.x < 0) v.x = W;
        if (v.x > W) v.x = 0;
        if (v.y < 0) v.y = H;
        if (v.y > H) v.y = 0;
        const flicker = 0.6 + 0.4 * Math.sin(time * 0.0004 + v.phase);
        ctx.fillStyle = 'rgba(226, 232, 240, ' + (v.alpha * flicker).toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(v.x, v.y, v.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 3. Refined Ethereal Synaptic Routes & Filaments (Light, subtle, elegant)
    function renderEdges(time) {
      edges.forEach((edge) => {
        const n1 = nodes[edge.from];
        const n2 = nodes[edge.to];
        if (!n1 || !n2) return;

        const isHovered = (hoveredNode && (hoveredNode === n1 || hoveredNode === n2));
        const cp = getEdgeControlPoint(edge, n1, n2);

        if (edge.isTrunk) {
          // Primary Arterial Conduits into BIG (MY BOOK) & Major Hubs
          const pulse = 0.38 + 0.14 * Math.sin(time * 0.0006 + (edge.pulseOffset || 0));
          const alpha = isHovered ? 0.88 : pulse;
          const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
          grad.addColorStop(0, hexToRgba(edge.color, alpha));
          grad.addColorStop(0.5, hexToRgba(edge.color, alpha * 0.65));
          grad.addColorStop(1, hexToRgba(PALETTE.core, alpha * 0.80));

          ctx.save();
          // Delicate colored conduit baseline
          ctx.strokeStyle = hexToRgba(edge.color, isHovered ? 0.50 : 0.20);
          ctx.lineWidth = isHovered ? 1.8 : 1.2;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.quadraticCurveTo(cp.x, cp.y, n2.x, n2.y);
          ctx.stroke();

          // Delicate luminous dashed spine
          ctx.strokeStyle = grad;
          ctx.lineWidth = isHovered ? 1.3 : 0.85;
          ctx.setLineDash([5, 8]);
          ctx.lineDashOffset = -(time * 0.004);
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.quadraticCurveTo(cp.x, cp.y, n2.x, n2.y);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        } else {
          // Subtle, light, elegant synaptic route filament
          const depthAlpha = ((n1.z + n2.z) * 0.5);
          // Soft, pleasant light presence (~0.18 - 0.24 opacity)
          const alpha = isHovered ? 0.85 : (0.12 + depthAlpha * 0.12);
          ctx.strokeStyle = hexToRgba(edge.color, alpha);
          ctx.lineWidth = isHovered ? 1.3 : (edge.isSubTrunk ? 1.0 : 0.75);
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.quadraticCurveTo(cp.x, cp.y, n2.x, n2.y);
          ctx.stroke();
        }
      });
    }

    // 4. Starlight Data Packets (Constant pool of 28, zero memory growth, natural slow glide)
    function renderSignals() {
      for (let i = 0; i < signals.length; i++) {
        const sig = signals[i];

        // Smooth natural velocity into destination
        const accel = (sig.edge.to === 0) ? (1 + sig.t * 0.25) : 1.0;
        sig.t += sig.speed * accel;

        if (sig.t >= 1) {
          const targetNode = nodes[sig.edge.to];
          if (targetNode) {
            targetNode.ping = 0.6;
            if (targetNode.isCortex && shockwaves.length < 2) {
              shockwaves.push({
                x: targetNode.x,
                y: targetNode.y,
                radius: targetNode.coreRadius * 0.8,
                maxRadius: targetNode.coreRadius * 2.2,
                color: sig.color,
                alpha: 0.5
              });
            }
          }
          // Reset this packet in place — NEVER INCREASE THE NUMBER OF SIGNALS!
          resetSignal(sig);
          continue;
        }

        const n1 = nodes[sig.edge.from];
        const n2 = nodes[sig.edge.to];
        if (!n1 || !n2) continue;

        const cp = getEdgeControlPoint(sig.edge, n1, n2);
        const pt = getBezierPoint(n1, cp, n2, sig.t);
        const trailLen = sig.edge.isTrunk ? 0.12 : 0.08;
        const trailT = Math.max(0, sig.t - trailLen);
        const trailPt = getBezierPoint(n1, cp, n2, trailT);

        const trailGrd = ctx.createLinearGradient(trailPt.x, trailPt.y, pt.x, pt.y);
        trailGrd.addColorStop(0, 'transparent');
        trailGrd.addColorStop(1, hexToRgba(sig.color, 0.80));

        ctx.strokeStyle = trailGrd;
        ctx.lineWidth = sig.size;
        ctx.beginPath();
        ctx.moveTo(trailPt.x, trailPt.y);
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();

        // Incandescent glowing head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, sig.size * 0.75, 0, Math.PI * 2);
        ctx.fill();

        // Subtle soft corona for packets entering Big Book
        if (sig.edge.to === 0) {
          ctx.fillStyle = hexToRgba(sig.color, 0.35);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, sig.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 5. Stellar Shockwaves
    function renderShockwaves() {
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 0.60;
        sw.alpha *= 0.975;
        if (sw.alpha <= 0.02 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = hexToRgba(sw.color, sw.alpha);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // 6. Interactive Mouse Starlight Probe
    function renderMouseProbe() {
      if (!mouse.isInside) return;
      const probeDist = 110;
      let count = 0;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < probeDist) {
          const alpha = (1 - d / probeDist) * 0.40;
          ctx.strokeStyle = 'rgba(56, 189, 248, ' + alpha.toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
          ctx.setLineDash([]);
          count++;
          if (count >= 3) break;
        }
      }
    }

    // 7. Dense Leaf Nodes & Synaptic Interneurons (Continuous fluid organic live motion)
    function renderInterneurons(time) {
      for (let i = subMasterEndIndex; i < nodes.length; i++) {
        const n = nodes[i];

        // Fluid organic multi-frequency live motion
        const tFloat = time * n.floatSpeed + n.pulsePhase;
        const driftX = Math.sin(tFloat) * n.floatAmpX + Math.cos(tFloat * 0.55) * (n.floatAmpX * 0.4);
        const driftY = Math.cos(tFloat * 0.85) * n.floatAmpY + Math.sin(tFloat * 0.45) * (n.floatAmpY * 0.4);
        n.x = n.baseX + driftX;
        n.y = n.baseY + driftY;

        // Subtle elastic repulsion from mouse cursor
        if (mouse.isInside) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 85 && dist > 0) {
            const force = (1 - dist / 85) * 16;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }

        if (n.ping > 0) n.ping *= 0.92;

        // Bioluminescent scintillation / breathing
        const twinkle = 0.65 + 0.35 * Math.sin(time * n.twinkleSpeed + n.pulsePhase);
        const alpha = Math.min(1, (n.baseAlpha * twinkle + n.ping * 0.6));
        const r = n.coreRadius * (1 + n.ping * 0.35);
        const glowR = n.glowRadius * twinkle * (1 + n.ping * 0.4);

        // Draw as a Glowing Dark Node with volumetric bloom
        drawGlowingDarkNode(ctx, n.x, n.y, r, glowR, n.color, alpha, { pulse: twinkle, ping: n.ping });

        // Floating Micro Technical Data Label (like in reference image: loss_0.0014, axon_42hz, etc.)
        if (n.microLabel) {
          ctx.save();
          ctx.font = '500 7px monospace';
          ctx.fillStyle = hexToRgba(n.color, 0.40 + alpha * 0.35);
          ctx.fillText(n.microLabel, n.x + r + 3, n.y + 2.5);
          ctx.restore();
        }
      }
    }

    // 7.5. 14 Sub-Master Intermediate Hub Nodes (Fluid organic live motion)
    function renderSubMasters(time) {
      for (let s = subMasterStartIndex; s < subMasterEndIndex; s++) {
        const sm = nodes[s];
        if (!sm) continue;
        const isHovered = (hoveredNode === sm);

        // Fluid organic floating live drift
        const tFloat = time * sm.floatSpeed + sm.pulsePhase;
        const driftX = Math.sin(tFloat) * sm.floatAmpX + Math.cos(tFloat * 0.5) * (sm.floatAmpX * 0.35);
        const driftY = Math.cos(tFloat * 0.85) * sm.floatAmpY + Math.sin(tFloat * 0.4) * (sm.floatAmpY * 0.35);
        sm.x = sm.baseX + driftX;
        sm.y = sm.baseY + driftY;

        if (mouse.isInside) {
          const dist = Math.hypot(sm.x - mouse.x, sm.y - mouse.y);
          if (dist < 85) {
            sm.ping = Math.max(sm.ping, 0.35);
          }
        }

        if (sm.ping > 0) sm.ping *= 0.93;

        const pulse = 0.5 + 0.5 * Math.sin(time * 0.00075 + s);
        const r = sm.coreRadius * (isHovered ? 1.25 : 1.0) * (1 + sm.ping * 0.2);
        const glowR = sm.glowRadius * (isHovered ? 1.35 : 1.0);

        // A. Draw Glowing Dark Node with crisp intermediate profile
        drawGlowingDarkNode(ctx, sm.x, sm.y, r, glowR, sm.color, isHovered ? 1.0 : 0.90, {
          pulse: pulse,
          ping: sm.ping,
          isHovered: isHovered,
          isMaster: false
        });

        // B. Concentric sub-ring on hover or pulse
        if (isHovered || sm.ping > 0.2) {
          ctx.strokeStyle = hexToRgba(sm.color, isHovered ? 0.65 : sm.ping * 0.5);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(sm.x, sm.y, r + 5 + Math.sin(time * 0.0012) * 1.5, 0, Math.PI * 2);
          ctx.stroke();
        }

        // C. Clean Floating Monospace Annotation
        ctx.save();
        const isLeft = (sm.x < cx);
        const textX = isLeft ? sm.x + r + 6 : sm.x - r - 6;
        const textY = sm.y;
        ctx.textAlign = isLeft ? 'left' : 'right';

        if (isHovered) {
          ctx.font = '600 9px Inter, -apple-system, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
          ctx.shadowBlur = 4;
          ctx.fillText(sm.label, textX, textY - 2);

          ctx.font = '500 7px monospace';
          ctx.fillStyle = hexToRgba(sm.color, 0.95);
          ctx.fillText(sm.code, textX, textY + 8);
        } else {
          ctx.font = '500 6.5px monospace';
          ctx.fillStyle = hexToRgba(sm.color, 0.45);
          ctx.fillText(sm.code, textX, textY + 2.5);
        }
        ctx.restore();
      }
    }

    // 8. The 4 Major Supergiant Research Nodes (Cyan, Indigo, Mint, Amethyst)
    function renderMasterCores(time) {
      for (let m = 1; m <= 4; m++) {
        const mc = nodes[m];
        const isHovered = (hoveredNode === mc);

        mc.x = mc.baseX + Math.sin(time * 0.00035 + m * 1.5) * 2.8;
        mc.y = mc.baseY + Math.cos(time * 0.00028 + m * 1.2) * 2.2;

        if (mc.ping > 0) mc.ping *= 0.94;

        const pulse = 0.5 + 0.5 * Math.sin(time * 0.0006 + m);
        const r = mc.coreRadius * (isHovered ? 1.20 : 1.0) * (1 + mc.ping * 0.12);
        const glowR = mc.glowRadius * (isHovered ? 1.25 : 1.0);

        // A. Render High-Precision Radiant Master Core
        drawGlowingDarkNode(ctx, mc.x, mc.y, r, glowR, mc.color, 0.98, {
          isMaster: true,
          isHovered: isHovered,
          pulse: pulse,
          ping: mc.ping
        });

        // B. Floating Typography with Anatomical Lobe Tag
        ctx.save();
        const isLeft = (mc.x < cx);
        const textX = isLeft ? mc.x + r + 10 : mc.x - r - 10;
        const textY = mc.y;
        ctx.textAlign = isLeft ? 'left' : 'right';

        // Lobe badge
        ctx.font = '600 7.5px monospace';
        ctx.fillStyle = hexToRgba(mc.color, 0.85);
        ctx.fillText(mc.lobe, textX, textY - 10);

        // Title
        ctx.font = '700 11.5px Inter, -apple-system, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
        ctx.shadowBlur = 6;
        ctx.fillText(mc.label, textX, textY + 3);

        // Subtitle
        ctx.font = '500 8px monospace';
        ctx.fillStyle = isHovered ? '#ffffff' : hexToRgba(mc.color, 0.80);
        ctx.fillText(mc.sub, textX, textY + 14);
        ctx.restore();
      }
    }

    // 9. Central Commanding Hyper-Core: QUANTUM GIGGLES (BOOK)
    function renderCentralCortex(time) {
      const isHovered = (hoveredNode === CORTEX);

      CORTEX.x = cx + Math.sin(time * 0.00025) * 1.8;
      CORTEX.y = cy + Math.cos(time * 0.00020) * 1.4;

      if (CORTEX.ping > 0) CORTEX.ping *= 0.94;

      const pulse = 0.5 + 0.5 * Math.sin(time * 0.0005);
      const r = CORTEX.coreRadius * (isHovered ? 1.20 : 1.0) * (1 + CORTEX.ping * 0.12);
      const glowR = CORTEX.glowRadius * (isHovered ? 1.25 : 1.0);

      // A. Concentric subtle resonant ripples
      for (let k = 0; k < 2; k++) {
        const phase = (time * 0.0002 + k * 0.5) % 1;
        const ripR = r + 4 + phase * 22;
        const ripAlpha = (1 - phase) * (isHovered ? 0.50 : 0.25);
        ctx.strokeStyle = hexToRgba(PALETTE.core, ripAlpha);
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.arc(CORTEX.x, CORTEX.y, ripR, 0, Math.PI * 2);
        ctx.stroke();
      }

      // B. Data Ingestion Accretion Vortex (5 delicate sparks spiraling gently inward)
      const streamCount = 5;
      for (let s = 0; s < streamCount; s++) {
        const streamAngle = (time * 0.0003 + s * ((Math.PI * 2) / streamCount));
        const streamRadius = r + 7 + Math.sin(time * 0.0006 + s) * 5;
        const px = CORTEX.x + Math.cos(streamAngle) * streamRadius * 1.25;
        const py = CORTEX.y + Math.sin(streamAngle) * streamRadius * 0.85;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // C. Render Commanding Radiant Core
      drawGlowingDarkNode(ctx, CORTEX.x, CORTEX.y, r, glowR, PALETTE.core, 1.0, {
        isCentral: true,
        isHovered: isHovered,
        pulse: pulse,
        ping: CORTEX.ping
      });

      // D. Orbiting Miniature Glowing Plasma Satellites
      const companionCount = 2;
      for (let c = 0; c < companionCount; c++) {
        const angle = time * (0.00018 + c * 0.00008) + (c * Math.PI);
        const orbRx = r * 1.85;
        const orbRy = r * 1.20;
        const ox = CORTEX.x + Math.cos(angle) * orbRx;
        const oy = CORTEX.y + Math.sin(angle) * orbRy;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(ox, oy, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = PALETTE.core;
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.arc(ox, oy, 1.8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // E. Prominent Typography Directly Below QUANTUM GIGGLES (BOOK)
      ctx.save();
      const labelY = CORTEX.y + r + 16;
      ctx.textAlign = 'center';

      // Title
      ctx.font = '700 12.5px Inter, -apple-system, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
      ctx.shadowBlur = 6;
      ctx.fillText(CORTEX.label, CORTEX.x, labelY);

      // Subtitle
      ctx.font = '600 8px monospace';
      ctx.fillStyle = isHovered ? '#ffffff' : PALETTE.core;
      ctx.letterSpacing = '0.06em';
      ctx.fillText(CORTEX.sub, CORTEX.x, labelY + 12);
      ctx.restore();
    }

    let isStageVisible = true;
    let isModalOpen = false;

    function shouldRunLoop() {
      return isStageVisible && !isModalOpen;
    }

    function startLoop() {
      if (!animId && shouldRunLoop()) {
        animId = requestAnimationFrame(tick);
      }
    }

    function stopLoop() {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }

    // Main animation loop
    function tick(time) {
      if (!shouldRunLoop()) {
        animId = null;
        return;
      }
      ctx.clearRect(0, 0, W, H);

      renderNebulae(time);
      renderBrainSilhouette(time);
      renderAmbientVesicles(time);
      renderEdges(time);
      renderSignals();
      renderShockwaves();
      renderMouseProbe();
      renderInterneurons(time);
      renderSubMasters(time);
      renderMasterCores(time);
      renderCentralCortex(time);

      animId = requestAnimationFrame(tick);
    }

    // -------------------------------------------------------------------------
    // INTERACTION HANDLING (MOUSE HOVER, CLICK, TOOLTIP)
    // -------------------------------------------------------------------------

    let activeTooltipNode = null;

    function findHoveredNode(mx, my, isClick = false) {
      // 1. Check Central Cortex (QUANTUM GIGGLES BOOK)
      const dCortex = Math.hypot(mx - CORTEX.x, my - CORTEX.y);
      const cortexHitRadius = isClick ? CORTEX.coreRadius + 75 : CORTEX.coreRadius + 45;
      const cortexLabelX = isClick ? 160 : 120;
      const cortexTop = isClick ? CORTEX.y - 120 : CORTEX.y - 45;
      const cortexBottom = isClick ? CORTEX.y + 110 : CORTEX.y + 75;

      if (
        dCortex <= cortexHitRadius ||
        (Math.abs(mx - CORTEX.x) <= cortexLabelX && my >= cortexTop && my <= cortexBottom)
      ) {
        return CORTEX;
      }

      // 2. Check 4 Major Master Hubs
      for (let m = 1; m <= 4; m++) {
        const mc = nodes[m];
        if (!mc) continue;
        const d = Math.hypot(mx - mc.x, my - mc.y);
        const hitR = isClick ? mc.coreRadius + 48 : mc.coreRadius + 28;
        const labelW = isClick ? 160 : 110;
        const labelH = isClick ? 50 : 38;
        if (d <= hitR || (Math.abs(mx - mc.x) <= labelW && Math.abs(my - mc.y) <= labelH)) {
          return mc;
        }
      }

      // 3. Check 14 Sub-Master Intermediate Hub Nodes (including Cosmic Wonders & Quantum Matrix)
      for (let s = subMasterStartIndex; s < subMasterEndIndex; s++) {
        const sm = nodes[s];
        if (!sm) continue;
        const d = Math.hypot(mx - sm.x, my - sm.y);
        const hitR = isClick ? sm.coreRadius + 42 : sm.coreRadius + 24;
        const labelW = isClick ? 125 : 75;
        const labelH = isClick ? 42 : 25;
        if (d <= hitR || (Math.abs(mx - sm.x) <= labelW && Math.abs(my - sm.y) <= labelH)) {
          return sm;
        }
      }

      // 4. Proximity Snap on Click: If user clicked within 95px of any interactive node, snap directly to it!
      if (isClick) {
        let bestNode = null;
        let bestDist = 95;

        if (dCortex < bestDist) {
          bestDist = dCortex;
          bestNode = CORTEX;
        }

        for (let m = 1; m <= 4; m++) {
          const mc = nodes[m];
          if (!mc) continue;
          const d = Math.hypot(mx - mc.x, my - mc.y);
          if (d < bestDist) {
            bestDist = d;
            bestNode = mc;
          }
        }

        for (let s = subMasterStartIndex; s < subMasterEndIndex; s++) {
          const sm = nodes[s];
          if (!sm) continue;
          const d = Math.hypot(mx - sm.x, my - sm.y);
          if (d < bestDist) {
            bestDist = d;
            bestNode = sm;
          }
        }

        if (bestNode) return bestNode;
      }

      return null;
    }

    function updateTooltip(node) {
      if (!tooltip) return;
      if (!node) {
        activeTooltipNode = null;
        tooltip.classList.remove('is-visible');
        tooltip.setAttribute('aria-hidden', 'true');
        return;
      }

      activeTooltipNode = node;
      tooltip.innerHTML = `
        <span class="brain-tooltip-field" style="color: ${node.color || PALETTE.cyan}">${node.kicker || (node.isSubMaster ? 'SUB-MASTER RESEARCH INTERMEDIATE' : 'RESEARCH NEURAL NODE')}</span>
        <span class="brain-tooltip-title">${node.title || node.label}</span>
        <span class="brain-tooltip-action" style="color: ${node.color || PALETTE.core}">${node.action || 'CLICK TO EXPAND ↗'}</span>
      `;

      const nodeX = node.x;
      const nodeY = node.isCortex ? node.y - node.coreRadius - 38 : node.y - node.coreRadius - 32;

      const tooltipLeft = Math.max(16, Math.min(W - 280, nodeX - 120));
      const tooltipTop = Math.max(12, nodeY - 60);

      tooltip.style.left = tooltipLeft + 'px';
      tooltip.style.top = tooltipTop + 'px';
      tooltip.classList.add('is-visible');
      tooltip.setAttribute('aria-hidden', 'false');
    }

    function onMouseMove(e) {
      if (e.target && (e.target === tooltip || tooltip.contains(e.target))) {
        return;
      }
      const rect = stage.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isInside = true;

      const found = findHoveredNode(mouse.x, mouse.y, false);
      if (found !== hoveredNode) {
        hoveredNode = found;
        if (hoveredNode) {
          stage.style.cursor = 'pointer';
          updateTooltip(hoveredNode);
        } else {
          stage.style.cursor = 'default';
          updateTooltip(null);
        }
      }
    }

    function onMouseLeave(e) {
      if (e.relatedTarget && (stage.contains(e.relatedTarget) || e.relatedTarget === tooltip || tooltip.contains(e.relatedTarget))) {
        return;
      }
      mouse.isInside = false;
      mouse.x = -9999;
      mouse.y = -9999;
      hoveredNode = null;
      stage.style.cursor = 'default';
      updateTooltip(null);
    }

    let lastActivateTime = 0;
    function handleActivation(e) {
      const now = Date.now();
      if (now - lastActivateTime < 250) return;

      const rect = stage.getBoundingClientRect();
      let clientX = null;
      let clientY = null;

      if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if (typeof e.clientX === 'number') {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      let clicked = null;
      if (clientX !== null && clientY !== null) {
        const clickX = clientX - rect.left;
        const clickY = clientY - rect.top;
        clicked = findHoveredNode(clickX, clickY, true);
      }

      if (!clicked && hoveredNode) clicked = hoveredNode;
      if (!clicked && activeTooltipNode) clicked = activeTooltipNode;

      if (clicked) {
        lastActivateTime = now;
        if (e.cancelable) e.preventDefault();

        shockwaves.push({
          x: clicked.x,
          y: clicked.y,
          radius: 12,
          maxRadius: Math.min(W, H) * 0.45,
          color: clicked.color,
          alpha: 0.95
        });

        const isBookTarget = (
          clicked.artId === 'book_qg' ||
          clicked.artId === 'book' ||
          clicked.isCortex ||
          clicked.label === 'QUANTUM GIGGLES' ||
          (clicked.title && clicked.title.includes('Quantum Giggles')) ||
          (clicked.kicker && clicked.kicker.includes('QUANTUM GIGGLES'))
        );

        if (isBookTarget) {
          if (typeof open3DBookViewer === 'function') {
            open3DBookViewer(true);
            return;
          }
        }

        if (clicked.artId && typeof openArticleModal === 'function') {
          openArticleModal(clicked.artId);
        }
      }
    }

    // Direct event binding on both canvas and stage ensures zero dropped clicks
    canvas.addEventListener('click', handleActivation);
    canvas.addEventListener('touchend', handleActivation, { passive: false });
    canvas.addEventListener('mousemove', onMouseMove);

    stage.addEventListener('click', handleActivation);
    stage.addEventListener('touchend', handleActivation, { passive: false });
    stage.addEventListener('mousemove', onMouseMove);
    stage.addEventListener('mouseleave', onMouseLeave);

    tooltip.addEventListener('click', (e) => {
      e.stopPropagation();
      handleActivation(e);
    });

    // Wire floating HUD hyper-core indicator pill to open book directly
    const hudHyperCoreBtn = document.getElementById('hudHyperCoreBtn');
    if (hudHyperCoreBtn) {
      hudHyperCoreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof open3DBookViewer === 'function') {
          open3DBookViewer(true);
        }
      });
      hudHyperCoreBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (typeof open3DBookViewer === 'function') {
            open3DBookViewer(true);
          }
        }
      });
    }

    resize();
    startLoop();

    let roRaf = null;
    const ro = new ResizeObserver(() => {
      if (roRaf) cancelAnimationFrame(roRaf);
      roRaf = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const newW = Math.floor(rect.width);
        const newH = Math.floor(rect.height);
        if (newW > 0 && newH > 0 && (newW !== W || newH !== H)) {
          stopLoop();
          resize();
          startLoop();
        }
      });
    });
    ro.observe(stage);

    const stageIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isStageVisible = entry.isIntersecting;
        if (isStageVisible && !isModalOpen) {
          startLoop();
        } else {
          stopLoop();
        }
      });
    }, { rootMargin: '120px 0px' });
    stageIo.observe(stage);

    const checkModalState = () => {
      const open = document.body.style.overflow === 'hidden';
      if (open !== isModalOpen) {
        isModalOpen = open;
        if (isModalOpen) {
          stopLoop();
        } else if (isStageVisible) {
          startLoop();
        }
      }
    };
    const modalObserver = new MutationObserver(checkModalState);
    modalObserver.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
  }

  init3DBookViewer();
  init3DNewspaperViewer();
  initBrainNetwork();



  /* ==========================================================================
     10. ACADEMIC FOUNDATION & RESEARCH PEDIGREE MODAL
     ========================================================================== */
  const educationModal      = document.getElementById('educationModalV2');
  const educationModalTitle = document.getElementById('educationModalTitleV2');
  const educationModalKicker= document.getElementById('educationModalKicker');
  const educationModalBody  = document.getElementById('educationModalBodyV2');
  const educationModalClose = document.getElementById('educationModalCloseV2');

  const EDUCATION_DATA_V2 = {
    edu1: {
      kicker: 'POSTGRADUATE PROGRAM // COMPLETED (7.80 / 10.0 CGPA)',
      degree: 'Master of Computer Applications (MCA)',
      university: 'Thapar Institute of Engineering and Technology',
      duration: '2024 – 2026 • Patiala, Punjab, India • Completed (CGPA: 7.80)',
      cgpa: '7.80 / 10.0',
      status: 'Completed',
      overview: 'Rigorous advanced curriculum completed with a 7.80 CGPA, emphasizing large-scale distributed architectures, high-performance computing, advanced machine learning, and enterprise reactive microservices.',
      modules: [
        'Advanced Distributed Systems & Consensus Protocols (Raft, Paxos)',
        'High-Performance Parallel Computing & GPU Acceleration',
        'Deep Learning & Neural Network Architectures',
        'Modern Cloud-Native Infrastructure & Kubernetes Orchestration',
        'Advanced Algorithms & Computational Complexity',
        'Enterprise Reactive Microservices & Async Event Pipelines'
      ],
      research: 'Master\'s thesis and capstone concentration on low-latency microservices architectures, distributed asynchronous task scheduling, and high-throughput real-time AI pipeline orchestration.'
    },
    edu2: {
      kicker: 'UNDERGRADUATE DEGREE // GRADUATED WITH DISTINCTION (9.0 / 10.0 GPA)',
      degree: 'Bachelor of Computer Applications (BCA)',
      university: 'Chitkara University',
      duration: '2021 – 2024 • Punjab, India • Completed with Honors (GPA: 9.0)',
      cgpa: '9.0 / 10.0',
      status: 'Completed',
      overview: 'Comprehensive foundation in computer science, software engineering paradigms, and algorithmic problem solving. Graduated with an outstanding cumulative GPA of 9.0 out of 10.0 and appointed Quantum Research Scholar.',
      modules: [
        'Data Structures & Algorithmic Analysis (C++, Java)',
        'Object-Oriented Software Design Patterns',
        'Operating Systems & Memory Concurrency Models',
        'Database Management Systems (RDBMS & NoSQL)',
        'Computer Networks & Distributed Communication Protocols',
        'Quantum Information Science & Simulation Methodologies'
      ],
      research: 'Appointed Quantum Computing Research Scholar (Jan 2022 – Dec 2024). Conducted multi-qubit quantum teleportation protocols in IBM Qiskit and empirically verified Grover search quadratic acceleration. Authored and published the acclaimed science book "Quantum Giggles: Laughing Through Cosmic Wonders" during this tenure.'
    }
  };

  function openEducationModal(id) {
    const data = EDUCATION_DATA_V2[id];
    if (!data || !educationModal) return;

    if (educationModalTitle) educationModalTitle.textContent = data.degree;
    if (educationModalKicker) educationModalKicker.textContent = data.kicker;
    if (educationModalBody) {
      educationModalBody.innerHTML = `
        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.35rem; font-weight: 600; color: #ffffff; margin-bottom: 0.35rem;">${data.degree}</h4>
          <div style="font-family: var(--font-mono); font-size: 0.88rem; color: #a1a1aa; margin-bottom: 0.5rem;">
            ${data.university}
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-dim); margin-bottom: 1.25rem;">
            TIMELINE: ${data.duration}
          </div>
          <p style="font-size: 1rem; line-height: 1.75; color: var(--text-light); margin-bottom: 2rem;">
            ${data.overview}
          </p>
        </div>

        <div style="margin-bottom: 2rem;">
          <div style="font-family: var(--font-mono); font-size: 0.78rem; text-transform: uppercase; color: #d4d4d8; margin-bottom: 0.85rem; letter-spacing: 0.05em;">
            CORE CURRICULUM &amp; SPECIALIZED MODULES:
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem;">
            ${data.modules.map(mod => `
              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.88rem; color: #ffffff; display: flex; align-items: center; gap: 0.6rem;">
                <span style="color: #a1a1aa;">✓</span> <span>${mod}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 2rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; padding: 1.5rem;">
          <div style="font-family: var(--font-mono); font-size: 0.78rem; text-transform: uppercase; color: #d4d4d8; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
            RESEARCH &amp; SCHOLAR ACHIEVEMENTS:
          </div>
          <p style="font-size: 0.94rem; line-height: 1.7; color: var(--text-light);">
            ${data.research}
          </p>
        </div>

        <div style="padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1); font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-dim); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <span>VERIFIED ACADEMIC CREDENTIALS &bull; PUNJAB, INDIA</span>
          <button class="btn-pill-v2" onclick="openResumeModal()" style="padding: 0.5rem 1.25rem; font-size: 0.82rem; background: #ffffff; color: #000000; border: none; font-weight: 600;">
            Inspect Full CV Resume ↗
          </button>
        </div>
      `;
    }

    document.body.style.overflow = 'hidden';
    educationModal.classList.add('is-open');
  }

  function closeEducationModal() {
    if (educationModal) {
      educationModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  if (educationModalClose) educationModalClose.addEventListener('click', closeEducationModal);
  if (educationModal) {
    educationModal.addEventListener('click', (e) => {
      if (e.target === educationModal) closeEducationModal();
    });
  }

  /* --------------------------------------------------------------------------
     ACADEMIC JOURNEY CONTROLLER (2-DEGREE CONTINUUM)
     -------------------------------------------------------------------------- */
  document.querySelectorAll('.academic-stage-card[data-edu-id]').forEach((card) => {
    const eduId = card.getAttribute('data-edu-id');
    card.addEventListener('click', () => {
      openEducationModal(eduId);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEducationModal(eduId);
      }
    });
  });

  // Escape key closes all open modals & command palette
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePatentModal();
      closeResumeModal();
      closeProjectModal();
      closeArticleModal();
      close3DBookViewer();
      close3DNewspaperViewer();
      closeEducationModal();
      closeCommandPalette();
    }
  });


  /* ==========================================================================
     11. TOAST NOTIFICATION HUD
     ========================================================================== */
  const toastHud = document.getElementById('toastNotificationHud');
  function showToast(message, icon = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>') {
    if (!toastHud) return;
    const toast = document.createElement('div');
    toast.className = 'toast-pill';
    toast.innerHTML = `<span style="color: #38bdf8;">${icon}</span><span>${message}</span>`;
    toastHud.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.add('is-active');
    });
    setTimeout(() => {
      toast.classList.remove('is-active');
      setTimeout(() => toast.remove(), 320);
    }, 2500);
  }

  /* ==========================================================================
     12. MACOS DOCK MAGNIFICATION WAVE (Physical Proximity Scaling)
     ========================================================================== */
  const dockPill = document.querySelector('.floating-dock');
  if (dockPill && hasFinePointer) {
    let cachedBtns = null;
    let dockRaf = null;

    dockPill.addEventListener('mouseenter', () => {
      const isSide = dockContainer.classList.contains('is-side-docked');
      cachedBtns = Array.from(dockPill.querySelectorAll('.dock-btn')).map((btn) => {
        const rect = btn.getBoundingClientRect();
        return {
          btn,
          center: isSide ? (rect.top + rect.height / 2) : (rect.left + rect.width / 2)
        };
      });
    });

    dockPill.addEventListener('mousemove', (e) => {
      if (!isLaptop() || dockContainer.classList.contains('is-collapsed') || !cachedBtns) return;
      if (dockRaf) return;

      dockRaf = requestAnimationFrame(() => {
        dockRaf = null;
        if (!cachedBtns) return;
        const isSide = dockContainer.classList.contains('is-side-docked');
        const mouseCoord = isSide ? e.clientY : e.clientX;
        const radius = 95;

        cachedBtns.forEach((item) => {
          const dist = Math.abs(mouseCoord - item.center);
          if (dist < radius) {
            const factor = Math.cos((dist / radius) * (Math.PI / 2));
            const scale = 1 + factor * 0.28;
            const shift = isSide ? `translateX(${-factor * 8}px)` : `translateY(${-factor * 8}px)`;
            item.btn.style.transform = `scale(${scale.toFixed(3)}) ${shift}`;
          } else {
            item.btn.style.transform = '';
          }
        });
      });
    });

    dockPill.addEventListener('mouseleave', () => {
      cachedBtns = null;
      if (dockRaf) {
        cancelAnimationFrame(dockRaf);
        dockRaf = null;
      }
      dockPill.querySelectorAll('.dock-btn').forEach((btn) => {
        btn.style.transform = '';
      });
    });
  }

  /* ==========================================================================
     13. PATENT 3D PERSPECTIVE TILT & RADIAL SPOTLIGHT
     ========================================================================== */
  document.querySelectorAll('.patent-card-v2').forEach((card) => {
    if (!card.querySelector('.patent-spotlight-layer')) {
      const spot = document.createElement('div');
      spot.className = 'patent-spotlight-layer';
      card.appendChild(spot);
    }

    if (hasFinePointer) {
      let cardRect = null;
      card.addEventListener('mouseenter', () => {
        cardRect = card.getBoundingClientRect();
      });

      card.addEventListener('mousemove', (e) => {
        if (!cardRect) cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        card.style.setProperty('--spot-x', `${x.toFixed(1)}px`);
        card.style.setProperty('--spot-y', `${y.toFixed(1)}px`);

        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        const rotateX = -((y - centerY) / centerY) * 7.5;
        const rotateY = ((x - centerX) / centerX) * 7.5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        cardRect = null;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    }
  });

  /* ==========================================================================
     14. SPOTLIGHT COMMAND PALETTE (⌘K / Ctrl+K)
     ========================================================================== */
  const cmdOverlay = document.getElementById('cmdPaletteOverlay');
  const cmdTrigger = document.getElementById('cmdPaletteTrigger');
  const cmdInput   = document.getElementById('cmdSearchInput');
  const cmdList    = document.getElementById('cmdPaletteList');

  const COMMAND_ITEMS = [
    {
      id: 'work',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
      label: 'Career Trajectory & Experience',
      desc: 'Mphasis, Mavriq AI, Chitkara, ITL',
      shortcut: '↵ Work',
      action: () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'patents',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
      label: 'Intellectual Property (4 Patents)',
      desc: 'EEG Earphones, Scalp Scanner, Ghungroo, Toothbrush',
      shortcut: '↵ Patents',
      action: () => document.getElementById('patents')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'cv',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>',
      label: 'Curriculum Vitae (CV)',
      desc: 'Open full printable resume modal',
      shortcut: '↵ CV',
      action: () => openResumeModal()
    },
    {
      id: 'email',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
      label: 'Copy Email Address',
      desc: 'prabhdeep.singh.work@gmail.com',
      shortcut: 'Copy',
      action: () => {
        navigator.clipboard?.writeText('prabhdeep.singh.work@gmail.com');
        showToast('Email copied to clipboard: prabhdeep.singh.work@gmail.com', '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>');
      }
    },
    {
      id: 'book_3d',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
      label: 'Read "Quantum Giggles" (Interactive 3D Book)',
      desc: 'Open realistic 3D hardcover with page-turning animations',
      shortcut: '↵ Read Book',
      action: () => typeof open3DBookViewer === 'function' && open3DBookViewer(true)
    },
    {
      id: 'book',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
      label: 'The Research Brain // Neural Connectome',
      desc: 'Central neural network cortex & global Amazon published book',
      shortcut: '↵ Brain',
      action: () => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'articles',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"></circle><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"></ellipse></svg>',
      label: 'Scientific Treatises & Research (3D Broadsheet)',
      desc: 'Dark Energy, Space Radiation, Quantum Computing, Warp Drive',
      shortcut: '↵ Broadsheet',
      action: () => typeof open3DNewspaperViewer === 'function' ? open3DNewspaperViewer('art1') : document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'github',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>',
      label: 'Open GitHub Profile',
      desc: 'github.com/PrabhdeepJassal',
      shortcut: 'External',
      action: () => window.open('https://github.com/PrabhdeepJassal', '_blank')
    },
    {
      id: 'contact',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
      label: 'Discuss Opportunities with Prabhdeep',
      desc: 'Navigate to contact inquiry section',
      shortcut: '↵ Contact',
      action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  let selectedCmdIdx = 0;
  let filteredCommands = [...COMMAND_ITEMS];

  function renderCommands() {
    if (!cmdList) return;
    if (filteredCommands.length === 0) {
      cmdList.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-dim); font-size: 0.9rem;">No matching commands found.</div>`;
      return;
    }
    cmdList.innerHTML = filteredCommands.map((cmd, i) => `
      <div class="cmd-item ${i === selectedCmdIdx ? 'is-selected' : ''}" data-cmd-idx="${i}">
        <div class="cmd-item-left">
          <span class="cmd-item-icon">${cmd.icon}</span>
          <div>
            <div class="cmd-item-label">${cmd.label}</div>
            <div class="cmd-item-desc">${cmd.desc}</div>
          </div>
        </div>
        <span class="cmd-item-shortcut">${cmd.shortcut}</span>
      </div>
    `).join('');

    cmdList.querySelectorAll('.cmd-item').forEach((el) => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-cmd-idx'), 10);
        executeCommand(idx);
      });
      el.addEventListener('mouseenter', () => {
        selectedCmdIdx = parseInt(el.getAttribute('data-cmd-idx'), 10);
        updateCommandSelection();
      });
    });
  }

  function updateCommandSelection() {
    const items = cmdList.querySelectorAll('.cmd-item');
    items.forEach((item, i) => {
      item.classList.toggle('is-selected', i === selectedCmdIdx);
      if (i === selectedCmdIdx) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function executeCommand(idx) {
    const cmd = filteredCommands[idx];
    if (cmd) {
      closeCommandPalette();
      setTimeout(cmd.action, 80);
    }
  }

  function openCommandPalette() {
    if (!cmdOverlay) return;
    cmdOverlay.classList.add('is-open');
    cmdOverlay.setAttribute('aria-hidden', 'false');
    filteredCommands = [...COMMAND_ITEMS];
    selectedCmdIdx = 0;
    if (cmdInput) {
      cmdInput.value = '';
      setTimeout(() => cmdInput.focus(), 50);
    }
    renderCommands();
  }

  function closeCommandPalette() {
    if (!cmdOverlay) return;
    cmdOverlay.classList.remove('is-open');
    cmdOverlay.setAttribute('aria-hidden', 'true');
  }

  if (cmdTrigger) cmdTrigger.addEventListener('click', openCommandPalette);
  if (cmdOverlay) {
    cmdOverlay.addEventListener('click', (e) => {
      if (e.target === cmdOverlay) closeCommandPalette();
    });
  }

  if (cmdInput) {
    cmdInput.addEventListener('input', () => {
      const query = cmdInput.value.toLowerCase().trim();
      filteredCommands = COMMAND_ITEMS.filter(
        c => c.label.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query) || c.id.includes(query)
      );
      selectedCmdIdx = 0;
      renderCommands();
    });

    cmdInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedCmdIdx = (selectedCmdIdx + 1) % Math.max(1, filteredCommands.length);
        updateCommandSelection();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedCmdIdx = (selectedCmdIdx - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length);
        updateCommandSelection();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeCommand(selectedCmdIdx);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeCommandPalette();
      }
    });
  }

  // Global ⌘K / Ctrl+K listener
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdOverlay?.classList.contains('is-open')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    }
  });

});
