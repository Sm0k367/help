document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight; // Get header height
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all other open FAQ items
            faqItems.forEach(otherItem => {
                const otherQuestion = otherItem.querySelector('.faq-question');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                if (otherQuestion !== question && otherQuestion.getAttribute('aria-expanded') === 'true') {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.classList.remove('active');
                    otherAnswer.style.maxHeight = '0';
                }
            });

            // Toggle current FAQ item
            if (isExpanded) {
                question.setAttribute('aria-expanded', 'false');
                answer.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                question.setAttribute('aria-expanded', 'true');
                answer.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px'; // Set max-height to scrollHeight
            }
        });
    });

    // Simple Fade-in animation for elements (similar to previous landing page)
    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.style.animationDelay) || 0;
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, delay * 1000); // Convert seconds to milliseconds
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    animatedElements.forEach(el => {
        el.style.opacity = 0; // Ensure hidden by default
        el.style.transform = el.classList.contains('animate-fade-in-left') ? 'translateX(-20px)' :
                             el.classList.contains('animate-fade-in-right') ? 'translateX(20px)' :
                             'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'; // Apply transition
        observer.observe(el);
    });

    // Search functionality (basic filter, not a full backend search)
    const searchInput = document.getElementById('knowledge-search');
    const categoriesSection = document.getElementById('categories');
    const faqSection = document.getElementById('faq');
    const documentationSection = document.getElementById('documentation');

    searchInput.addEventListener('keyup', (event) => {
        const searchTerm = event.target.value.toLowerCase();

        // Hide/show categories
        categoriesSection.querySelectorAll('.category-card').forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                card.style.display = 'flex'; // Show
            } else {
                card.style.display = 'none'; // Hide
            }
        });

        // Hide/show FAQ items
        faqSection.querySelectorAll('.faq-item').forEach(item => {
            const questionText = item.querySelector('.faq-question span:first-child').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.style.display = 'block'; // Show
            } else {
                item.style.display = 'none'; // Hide
            }
        });

        // Hide/show Documentation cards
        documentationSection.querySelectorAll('.doc-card').forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                card.style.display = 'flex'; // Show
            } else {
                card.style.display = 'none'; // Hide
            }
        });
    });
});
