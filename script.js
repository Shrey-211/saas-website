/**
 * NovaAI SaaS Landing Page — Interactive Scripts
 * Handles Navbar sticky states, mobile navigation, pricing toggle,
 * tabbed showcase, FAQ accordions, and lead modal popup.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. NAVBAR SCROLL EFFECT
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check


    /* ==========================================================================
       2. MOBILE NAVIGATION MENU TOGGLE
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-open');
            });
        });
    }


    /* ==========================================================================
       3. PRICING MONTHLY / ANNUAL TOGGLE
       ========================================================================== */
    const billingToggle = document.getElementById('billingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const annualLabel = document.getElementById('annualLabel');
    const priceAmounts = document.querySelectorAll('.price-box .amount');

    let isAnnual = false;

    if (billingToggle) {
        billingToggle.addEventListener('click', () => {
            isAnnual = !isAnnual;
            billingToggle.classList.toggle('active', isAnnual);

            if (isAnnual) {
                monthlyLabel.style.opacity = '0.5';
                annualLabel.style.opacity = '1';
            } else {
                monthlyLabel.style.opacity = '1';
                annualLabel.style.opacity = '0.5';
            }

            priceAmounts.forEach(priceEl => {
                const targetPrice = isAnnual 
                    ? priceEl.getAttribute('data-annual') 
                    : priceEl.getAttribute('data-monthly');

                if (targetPrice !== null) {
                    // Smooth transition number shift
                    priceEl.style.transform = 'scale(0.8)';
                    priceEl.style.opacity = '0.5';

                    setTimeout(() => {
                        priceEl.textContent = targetPrice;
                        priceEl.style.transform = 'scale(1)';
                        priceEl.style.opacity = '1';
                    }, 150);
                }
            });
        });
    }


    /* ==========================================================================
       4. INTERACTIVE FEATURE TABBED SHOWCASE
       ========================================================================== */
    const showcaseTabs = document.querySelectorAll('.showcase-tab');
    const tabPanels = document.querySelectorAll('.tab-panel');

    showcaseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTabId = tab.getAttribute('data-tab');

            // Deactivate all tabs
            showcaseTabs.forEach(t => t.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Activate target
            tab.classList.add('active');
            const targetPanel = document.getElementById(targetTabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       5. FAQ ACCORDION TOGGLE
       ========================================================================== */
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all other open accordions
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       6. LEAD CAPTURE MODAL DIALOG
       ========================================================================== */
    const leadModal = document.getElementById('leadModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const selectedPlanText = document.getElementById('selectedPlanText');
    const leadForm = document.getElementById('leadForm');
    const modalSuccess = document.getElementById('modalSuccess');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const planName = btn.getAttribute('data-plan') || 'Pro Tier';
            if (selectedPlanText) {
                selectedPlanText.textContent = planName;
            }

            // Reset state
            if (leadForm) leadForm.style.display = 'flex';
            if (modalSuccess) modalSuccess.style.display = 'none';

            if (leadModal) {
                leadModal.classList.add('open');
            }
        });
    });

    if (modalCloseBtn && leadModal) {
        modalCloseBtn.addEventListener('click', () => {
            leadModal.classList.remove('open');
        });

        // Close on overlay click
        leadModal.addEventListener('click', (e) => {
            if (e.target === leadModal) {
                leadModal.classList.remove('open');
            }
        });
    }

    // Modal Form Submission Simulation
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Provisioning Environment...';
            submitBtn.disabled = true;

            setTimeout(() => {
                leadForm.style.display = 'none';
                if (modalSuccess) modalSuccess.style.display = 'block';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Auto close after 3 seconds
                setTimeout(() => {
                    if (leadModal) leadModal.classList.remove('open');
                }, 3500);
            }, 1200);
        });
    }


    /* ==========================================================================
       7. CTA FOOTER FORM SUBMISSION
       ========================================================================== */
    const ctaForm = document.getElementById('ctaForm');
    if (ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = ctaForm.querySelector('.cta-input');
            const submitBtn = ctaForm.querySelector('button');

            if (input && input.value) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Checking Availability...';
                
                setTimeout(() => {
                    alert(`✨ Success! Trial invitation sent to: ${input.value}`);
                    input.value = '';
                    submitBtn.textContent = originalText;
                }, 800);
            }
        });
    }

});
