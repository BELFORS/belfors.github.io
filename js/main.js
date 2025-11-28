// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Only proceed if elements exist (for multi-page compatibility)
    if (navToggle && navMenu) {
        // Toggle mobile menu
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);

            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Set active navigation link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(function (link) {
            link.classList.remove('active');

            // Get the href attribute and extract the filename
            const linkHref = link.getAttribute('href');
            const linkPage = linkHref ? linkHref.split('/').pop() : '';

            // Set active for exact matches or for index page when on root
            if (linkPage === currentPage ||
                (currentPage === 'index.html' && linkHref === 'index.html') ||
                (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Set initial active nav link
    setActiveNavLink();

    // Handle navigation action buttons (search and dark mode)
    const actionButtons = document.querySelectorAll('.nav-action-btn');

    actionButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const ariaLabel = this.getAttribute('aria-label');

            if (ariaLabel === 'Search') {
                // Placeholder for search functionality
                console.log('Search functionality would be implemented here');
            } else if (ariaLabel === 'Toggle dark mode') {
                // Placeholder for dark mode toggle
                console.log('Dark mode toggle would be implemented here');
                toggleDarkMode();
            }
        });
    });

    // Simple dark mode toggle (placeholder implementation)
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');

        // Store preference in localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    }

    // Load dark mode preference on page load
    function loadDarkModePreference() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
    }

    // Load preference on page load
    loadDarkModePreference();

    // Smooth scrolling for any internal anchor links (if they exist on single pages)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar height

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading state management for page transitions
    function addLoadingStateToLinks() {
        const pageLinks = document.querySelectorAll('a[href$=".html"]');

        pageLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                // Add a small loading indicator (optional)
                document.body.style.cursor = 'wait';

                // Reset cursor after a short delay (in case navigation is instant)
                setTimeout(function () {
                    document.body.style.cursor = 'default';
                }, 500);
            });
        });
    }

    // Initialize loading states
    addLoadingStateToLinks();

    // Handle profile audio icon click (placeholder)
    const profileAudioIcon = document.querySelector('.profile-audio-icon');
    if (profileAudioIcon) {
        profileAudioIcon.addEventListener('click', function () {
            console.log('Profile audio functionality would be implemented here');
            // You could implement actual audio playbook here
        });
    }

    // Abstract functionality for publications and projects pages
    function initializeAbstractFunctionality() {
        const abstractButtons = document.querySelectorAll('.abstract-btn');
        const clickableTitles = document.querySelectorAll('.clickable-title');

        // Handle abstract button clicks
        abstractButtons.forEach(function (button) {
            button.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default link behavior
                const abstractId = this.getAttribute('data-abstract');
                toggleAbstract(abstractId);
            });
        });

        // Handle clickable title clicks
        clickableTitles.forEach(function (title) {
            title.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default behavior
                const abstractId = this.getAttribute('data-abstract');
                toggleAbstract(abstractId);
            });
        });
    }

    function toggleAbstract(abstractId) {
        const abstractContainer = document.getElementById('abstract-' + abstractId);

        if (!abstractContainer) {
            console.warn('Abstract container not found for ID:', abstractId);
            return;
        }

        // Close all other open abstracts first
        const allAbstracts = document.querySelectorAll('.abstract-container');
        allAbstracts.forEach(function (container) {
            if (container.id !== 'abstract-' + abstractId) {
                container.classList.remove('active');
            }
        });

        // Toggle the clicked abstract
        abstractContainer.classList.toggle('active');

        // Scroll to the abstract if it's being opened
        if (abstractContainer.classList.contains('active')) {
            setTimeout(function () {
                const offsetTop = abstractContainer.offsetTop - 100; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 150); // Small delay to allow for animation
        }
    }

    // Initialize abstract functionality if we're on pages that use it
    if (window.location.pathname.includes('publications.html') ||
        window.location.pathname.includes('projects.html') ||
        document.querySelector('.publications-content') ||
        document.querySelector('.projects-content')) {
        initializeAbstractFunctionality();
    }
});

// Download slides functionality for teaching page
function downloadSlides(filename) {
    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = `../assets/lectures/${filename}`;
    link.download = filename;
    link.style.display = 'none';

    // Add to DOM temporarily
    document.body.appendChild(link);

    // Trigger download
    link.click();

    // Clean up
    document.body.removeChild(link);

    // Optional: Show feedback to user
    console.log(`Downloading: ${filename}`);
}

// Member modal functionality
const memberBios = {
    yves: {
        name: "Yves R. Sagaert",
        title: "Director & Head of Research",
        bio: "Yves R. Sagaert is head of the research group of Predictive AI and Digital Shift at the VIVES University of Applied Sciences in Belgium and director of BELFORS. He is a researcher at KU Leuven and an Adjunct Professor at the IÉSEG School of Management in Lille (France). He strives to integrate business forecasting with real-world decisions and constraints, bringing forecast models closer to their cost impact. Business applications range from inventory management, logistics, electricity demand, and food waste. His research focuses also on incorporating market intelligence in demand forecasting through leading indicators and the effects on supply chain management, and especially when historical business data is limited. His broader expertise includes supply chain management, leading indicators, business forecasting, inventory, variable selection, and shrinkage methods."
    },
    jente: {
        name: "Jente Van Belle",
        title: "FWO Junior Postdoctoral Fellow",
        bio: "Jente Van Belle is currently an FWO junior postdoctoral fellow. He received his PhD (2021) and MSc (2015) degrees in Applied Economics (Business Engineering) from the Vrije Universiteit Brussel (Belgium). His doctoral research was funded by Flanders Innovation and Entrepreneurship (VLAIO) and OMP through a personal research grant. His research focuses on time series forecasting and prescriptive analytics, and his work has been published in established international scientific journals, including IEEE TNNLS, IJF, and EJOR.<br><br>He is currently working on his FWO project \"MBA-FORECAST: Moving Beyond Accuracy to optimize time series FORECASTs\", which focuses on developing approaches to incorporate additional quality criteria—next to forecast accuracy—directly into the optimization of forecasting models, with the goal of improving the intrinsic quality of the resulting forecasts."
    },
    hussain: {
        name: "Dr. Hussain Kazmi",
        title: "Assistant Professor",
        bio: "Dr. Hussain Kazmi is an assistant professor in the department of electrical engineering (ELECTA-ESAT), KU Leuven, where he heads the Energy Data Science Lab. His research focuses on two inter-connected themes: sample-efficient energy forecasting and modeling, and optimal decision-making under uncertainty for smart energy systems."
    },
    lucca: {
        name: "Lucca",
        title: "PhD Researcher",
        bio: "Lucca is a PhD researcher at Vlerick Business School and KU Leuven, with hands-on experience in PV energy forecasting for a real estate owner, developing data-driven models to enhance solar output accuracy. She is currently active at Qbus in the energy management sector, with a strong interest in leveraging analytics and forecasting to advance sustainable energy solutions."
    }
};

function openMemberModal(memberId) {
    const modal = document.getElementById('memberModal');
    const modalBody = document.getElementById('modalBody');
    const member = memberBios[memberId];

    if (member) {
        modalBody.innerHTML = `
            <h3>${member.name}</h3>
            <h4>${member.title}</h4>
            <p>${member.bio}</p>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMemberModal() {
    const modal = document.getElementById('memberModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('memberModal');
    if (event.target === modal) {
        closeMemberModal();
    }
}

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMemberModal();
    }
});