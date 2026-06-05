document.addEventListener('DOMContentLoaded', () => {
    
    // --- Light/Dark Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Add temporary transition class
            document.body.classList.add('theme-transition');
            
            // Apply new theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Show toast feedback
            const themeLabel = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);
            showToast(`Switched to ${themeLabel} Mode`, 'success');
            
            // Clean up transition class
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 300);
        });
    }

    // --- Navigation Scroll Effect & Active Selection ---
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky header styling on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link tracking during scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Responsive Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Certificate Database & Verification ---
    const certDatabase = {
        'DVR-2026-001': {
            name: 'Rahul Sharma',
            program: 'Java Development Internship',
            id: 'DVR-2026-001',
            status: 'Valid'
        },
        'DVR-2026-002': {
            name: 'Priya Patel',
            program: 'Web Development Internship',
            id: 'DVR-2026-002',
            status: 'Valid'
        },
        'DVR-2026-003': {
            name: 'Aarav Mehta',
            program: 'AI / ML Internship',
            id: 'DVR-2026-003',
            status: 'Valid'
        }
    };

    const verifyForm = document.getElementById('verify-form');
    const certInput = document.getElementById('cert-id-input');
    const verifyResult = document.getElementById('verify-result');

    if (verifyForm && certInput && verifyResult) {
        verifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const rawId = certInput.value.trim();
            const certId = rawId.toUpperCase();
            
            // Clear prior result and add transition effect
            verifyResult.style.display = 'none';
            verifyResult.innerHTML = '';

            setTimeout(() => {
                if (certDatabase[certId]) {
                    const cert = certDatabase[certId];
                    verifyResult.innerHTML = `
                        <div class="cert-badge-success">
                            <i class="fa-solid fa-circle-check"></i> Certificate Verified
                        </div>
                        <div class="cert-document">
                            <div class="cert-border-inner">
                                <div class="cert-header">
                                    <div class="cert-logo">
                                        <span style="font-family: var(--font-heading); font-weight: 800; font-size: 1.25rem;">
                                            Dev<span style="background: var(--gradient-secondary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Rise</span>
                                        </span>
                                    </div>
                                    <div class="cert-title-stamp">VERIFIED</div>
                                </div>
                                <div class="cert-grid">
                                    <div class="cert-info-item">
                                        <span class="cert-label">Intern Name</span>
                                        <span class="cert-value verified-name">${cert.name}</span>
                                    </div>
                                    <div class="cert-info-item">
                                        <span class="cert-label">Internship Program</span>
                                        <span class="cert-value">${cert.program}</span>
                                    </div>
                                    <div class="cert-info-item">
                                        <span class="cert-label">Certificate ID</span>
                                        <span class="cert-value" style="font-family: monospace;">${cert.id}</span>
                                    </div>
                                    <div class="cert-info-item">
                                        <span class="cert-label">Status</span>
                                        <span class="cert-status-tag"><span></span> ${cert.status}</span>
                                    </div>
                                </div>
                                <div class="cert-footer">
                                    <div class="cert-signature">
                                        <div class="signature-line"></div>
                                        <div class="signature-title">Program Director</div>
                                    </div>
                                    <div class="cert-signature">
                                        <div class="signature-line"></div>
                                        <div class="signature-title">DevRise Academics</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    showToast('Certificate verified successfully!', 'success');
                } else {
                    verifyResult.innerHTML = `
                        <div class="cert-error">
                            <div class="cert-error-icon">
                                <i class="fa-solid fa-circle-xmark"></i>
                            </div>
                            <div class="cert-error-info">
                                <h4>Verification Failed</h4>
                                <p>No credentials found matching Certificate ID <strong>"${rawId}"</strong>. Please check the spelling or format and try again.</p>
                            </div>
                        </div>
                    `;
                    showToast('Invalid Certificate ID', 'error');
                }
                
                verifyResult.style.display = 'block';
                
                // Smooth scroll to result
                verifyResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        });
    }

    // --- FAQ Accordion Interactivity ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other accordion items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-content').style.maxHeight = '0px';
                    }
                });

                // Toggle target item
                if (isActive) {
                    item.classList.remove('active');
                    content.style.maxHeight = '0px';
                } else {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });

    // --- Modal Control Dialogs (Apply, Privacy, Terms) ---
    const modals = {
        apply: document.getElementById('apply-modal'),
        privacy: document.getElementById('privacy-modal'),
        terms: document.getElementById('terms-modal')
    };

    // Open triggers
    const applyTriggers = document.querySelectorAll('.btn-apply-trigger');
    const privacyTrigger = document.getElementById('privacy-trigger');
    const termsTrigger = document.getElementById('terms-trigger');

    applyTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(modals.apply);
        });
    });

    if (privacyTrigger) {
        privacyTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(modals.privacy);
        });
    }

    if (termsTrigger) {
        termsTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(modals.terms);
        });
    }

    // General functions to open/close
    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore background scroll
    }

    // Bind close actions (X button, footer buttons, backdrop click)
    Object.values(modals).forEach(modal => {
        if (!modal) return;
        
        const closeBtns = modal.querySelectorAll('.modal-close, .modal-close-btn');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => closeModal(modal));
        });

        // Close on backdrop overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            Object.values(modals).forEach(modal => {
                if (modal && modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });

    // --- Contact Form Submission Handler ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            if (!name || !email || !message) {
                showToast('Please fill out all required fields.', 'error');
                return;
            }

            // Simulate server request submission
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

            setTimeout(() => {
                showToast(`Thank you, ${name}! Your message has been received.`, 'success');
                contactForm.reset();
                btn.disabled = false;
                btn.innerHTML = originalContent;
            }, 1000);
        });
    }

    // --- Custom Toast Notification Engine ---
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
        
        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <div class="toast-content">${message}</div>
        `;

        container.appendChild(toast);

        // Slide-in animation trigger
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Slide-out and remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3000);
    }

});
