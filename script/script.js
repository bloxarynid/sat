document.addEventListener('DOMContentLoaded', function() {
    const satElements = document.querySelectorAll([
    '.sat-fade-up', '.sat-fade-down', '.sat-fade-left', '.sat-fade-right',
    '.sat-fade-up-left', '.sat-fade-up-right', '.sat-fade-down-left', '.sat-fade-down-right',
    '.sat-zoom-in', '.sat-zoom-out', '.sat-zoom-in-up', '.sat-zoom-in-down',
    '.sat-zoom-in-left', '.sat-zoom-in-right', '.sat-zoom-out-up', '.sat-zoom-out-down',
    '.sat-zoom-out-left', '.sat-zoom-out-right',
    '.sat-slide-up', '.sat-slide-down', '.sat-slide-left', '.sat-slide-right',
    '.sat-flip-left', '.sat-flip-right', '.sat-flip-up', '.sat-flip-down',
    '.sat-blur', '.sat-blur-up', '.sat-blur-down', '.sat-blur-left', '.sat-blur-right',
    '.sat-blur-zoom-in', '.sat-blur-zoom-out', '.sat-blur-glass'
].join(','));
    
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sat-animate', 'sat-visible');
        } else {
          entry.target.classList.remove('sat-animate', 'sat-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px 0px 50px 0px'
    });
    
    satElements.forEach(el => {
      observer.observe(el);
      el.classList.add('sat-optimize');
    });
    
    window.toggleAnimations = function() {
      satElements.forEach(el => {
        el.classList.toggle('sat-animate');
      });
    };
    
    window.resetAnimations = function() {
      satElements.forEach(el => {
        el.classList.remove('sat-animate', 'sat-visible');
      });
    };
    
    window.scrollToTest = function() {
      document.querySelector('.test-section').scrollIntoView({ 
        behavior: 'smooth' 
      });
    };
    
    window.scrollToTop = function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    window.addEventListener('scroll', function() {
      const scrollBtn = document.querySelector('.scroll-top');
      scrollBtn.classList.toggle('visible', window.scrollY > 500);
    });
  });
