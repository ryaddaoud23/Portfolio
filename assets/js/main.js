/**
 * Template: Personal - v4.7.0 (Custom Version by Ryad)
 * Original Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function() {
  "use strict";

  /*--------------------------------------------------------------
  # Helper Functions
  --------------------------------------------------------------*/
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (!selectEl) return;
    all
      ? selectEl.forEach(e => e.addEventListener(type, listener))
      : selectEl.addEventListener(type, listener);
  };

  const scrollto = (el) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /*--------------------------------------------------------------
  # Mobile Navigation
  --------------------------------------------------------------*/
  on('click', '.mobile-nav-toggle', function() {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /*--------------------------------------------------------------
  # Navigation Scroll + Section Activation
  --------------------------------------------------------------*/
  on('click', '#navbar .nav-link', function(e) {
    const section = select(this.hash);
    if (!section) return;
    e.preventDefault();

    const navbar = select('#navbar');
    const header = select('#header');
    const sections = select('section', true);
    const navlinks = select('#navbar .nav-link', true);

    navlinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');

    if (navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile');
      const navbarToggle = select('.mobile-nav-toggle');
      navbarToggle.classList.toggle('bi-list');
      navbarToggle.classList.toggle('bi-x');
    }

    if (this.hash === '#header') {
      header.classList.remove('header-top');
      sections.forEach(s => s.classList.remove('section-show'));
      return;
    }

    if (!header.classList.contains('header-top')) {
      header.classList.add('header-top');
      setTimeout(() => {
        sections.forEach(s => s.classList.remove('section-show'));
        section.classList.add('section-show');
      }, 350);
    } else {
      sections.forEach(s => s.classList.remove('section-show'));
      section.classList.add('section-show');
    }

    scrollto(this.hash);
  }, true);

  /*--------------------------------------------------------------
  # Activate Section from URL Hash on Load
  --------------------------------------------------------------*/
  window.addEventListener('load', () => {
    if (!window.location.hash) return;
    const initialNav = select(window.location.hash);
    if (!initialNav) return;

    const header = select('#header');
    const navlinks = select('#navbar .nav-link', true);

    header.classList.add('header-top');
    navlinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === window.location.hash);
    });

    setTimeout(() => initialNav.classList.add('section-show'), 350);
    scrollto(window.location.hash);
  });

  /*--------------------------------------------------------------
  # Skills Animation
  --------------------------------------------------------------*/
  const skillsContent = select('.skills-content');
  if (skillsContent) {
    new Waypoint({
      element: skillsContent,
      offset: '80%',
      handler: () => {
        const progress = select('.progress .progress-bar', true);
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  }

  /*--------------------------------------------------------------
  # Testimonials Slider
  --------------------------------------------------------------*/
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: 'auto',
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      1200: { slidesPerView: 3, spaceBetween: 20 }
    }
  });

  /*--------------------------------------------------------------
  # Portfolio Isotope and Filters
  --------------------------------------------------------------*/
  window.addEventListener('load', () => {
    const portfolioContainer = select('.portfolio-container');
    if (!portfolioContainer) return;

    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    const portfolioFilters = select('#portfolio-flters li', true);
    on('click', '#portfolio-flters li', function(e) {
      e.preventDefault();
      portfolioFilters.forEach(el => el.classList.remove('filter-active'));
      this.classList.add('filter-active');
      portfolioIsotope.arrange({ filter: this.getAttribute('data-filter') });
    }, true);
  });

  /*--------------------------------------------------------------
  # Portfolio Lightbox
  --------------------------------------------------------------*/
  GLightbox({ selector: '.portfolio-lightbox' });

  /*--------------------------------------------------------------
  # Important: Disable lightbox for details pages
  --------------------------------------------------------------*/
  // Removed the "portfolio-details-lightbox" initialization 
  // to allow normal redirection on click:
  //
  // Example before:
  // const portfolioDetailsLightbox = GLightbox({ selector: '.portfolio-details-lightbox' });
  //
  // This would intercept normal links and open them in a popup.
  // Now we let anchor tags behave normally.

  /*--------------------------------------------------------------
  # Portfolio Details Slider
  --------------------------------------------------------------*/
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
  });

})();
