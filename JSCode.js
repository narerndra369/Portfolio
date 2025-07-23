document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

    const header = document.getElementById('header');
    const observerOptions = { root: null, rootMargin: `-${header.offsetHeight}px 0px 0px 0px`, threshold: 0.4 };
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) link.classList.add('active');
                });
            }
        });
    }, observerOptions);
    document.querySelectorAll('main section').forEach(section => sectionObserver.observe(section));

    const fadeInSections = document.querySelectorAll('.section-fade-in');
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeInSections.forEach(section => fadeInObserver.observe(section));

    const hireMeForm = document.getElementById('hireMeForm');
    hireMeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const jobTitle = document.getElementById('jobTitle').value;
        const companyName = document.getElementById('companyName').value;
        const hrEmail = document.getElementById('hrEmail').value;
        const jobDescription = document.getElementById('jobDescription').value;

        const subject = encodeURIComponent(`Job Application: ${jobTitle} at ${companyName}`);
        const body = encodeURIComponent(
            `Dear Hiring Team at ${companyName},\n\n` +
            `I am writing to express my interest in the ${jobTitle} position.\n\n` +
            `Here is the job description for your reference:\n${jobDescription}\n\n` +
            `My contact email is: ${hrEmail}\n\n` +
            `Thank you for your time and consideration.\n\n` +
            `Sincerely,\nNarendra Malapula`
        );

        window.location.href = `mailto:nare6301@gmail.com?subject=${subject}&body=${body}`;
    });
});
