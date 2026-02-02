// SAT (Scroll Animation Tool) - Complete Version
// Bloxaryn.Id Tools v1.1.0
// Inspired by AOS (Animate On Scroll)
(function(window, document) {
  'use strict';
  
  // Core SAT Class
  var SAT = {
    version: '1.0.5',
    elements: [],
    observer: null,
    initialized: false,
    
    // Initialize SAT
    init: function() {
      if (this.initialized) {
        console.warn('SAT is already initialized');
        return;
      }
      
      // Check for IntersectionObserver support
      if (!('IntersectionObserver' in window)) {
        console.error('SAT requires IntersectionObserver. Your browser does not support it.');
        this.fallbackAnimation();
        return;
      }
      
      // Get all SAT elements
      this.elements = this.getElements();
      
      if (this.elements.length === 0) {
        console.warn('SAT: No animation elements found');
        return;
      }
      
      console.log('SAT: Initializing with ' + this.elements.length + ' elements');
      
      // Create IntersectionObserver
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          threshold: 0.1,
          rootMargin: '50px 0px 50px 0px'
        }
      );
      
      // Observe each element
      this.elements.forEach(function(element) {
        this.observer.observe(element);
        
        // Add optimization class
        if (!element.classList.contains('sat-optimize')) {
          element.classList.add('sat-optimize');
        }
        
        // Add initial state classes
        this.addInitialClasses(element);
      }.bind(this));
      
      this.initialized = true;
      
      // Initialize control functions
      this.initControls();
      
      console.log('SAT: Ready!');
    },
    
    // Get all elements with SAT classes
    getElements: function() {
      var selectors = [
        // Fade Animations
        '.sat-fade-up', '.sat-fade-down', '.sat-fade-left', '.sat-fade-right',
        '.sat-fade-up-left', '.sat-fade-up-right', '.sat-fade-down-left', '.sat-fade-down-right',
        
        // Zoom Animations
        '.sat-zoom-in', '.sat-zoom-out',
        '.sat-zoom-in-up', '.sat-zoom-in-down', '.sat-zoom-in-left', '.sat-zoom-in-right',
        '.sat-zoom-out-up', '.sat-zoom-out-down', '.sat-zoom-out-left', '.sat-zoom-out-right',
        
        // Slide Animations
        '.sat-slide-up', '.sat-slide-down', '.sat-slide-left', '.sat-slide-right',
        
        // Flip Animations
        '.sat-flip-left', '.sat-flip-right', '.sat-flip-up', '.sat-flip-down',
        
        // Blur Animations
        '.sat-blur', '.sat-blur-up', '.sat-blur-down', '.sat-blur-left', '.sat-blur-right',
        '.sat-blur-zoom-in', '.sat-blur-zoom-out', '.sat-blur-glass'
      ];
      
      var elements = [];
      selectors.forEach(function(selector) {
        var found = document.querySelectorAll(selector);
        if (found.length > 0) {
          Array.prototype.push.apply(elements, Array.from(found));
        }
      });
      
      // Remove duplicates
      elements = elements.filter(function(element, index, self) {
        return self.indexOf(element) === index;
      });
      
      return elements;
    },
    
    // Handle intersection events
    handleIntersection: function(entries) {
      entries.forEach(function(entry) {
        var element = entry.target;
        
        if (entry.isIntersecting) {
          // Element is in viewport
          this.animateIn(element);
        } else {
          // Element is out of viewport
          if (this.shouldAnimateOut()) {
            this.animateOut(element);
          }
        }
      }.bind(this));
    },
    
    // Animate element in
    animateIn: function(element) {
      if (!element.classList.contains('sat-animate')) {
        element.classList.add('sat-animate');
        element.classList.add('sat-visible');
        
        // Dispatch custom event
        this.dispatchEvent(element, 'sat:in');
        
        console.log('SAT: Animating in ->', element);
      }
    },
    
    // Animate element out (optional)
    animateOut: function(element) {
      if (element.classList.contains('sat-animate')) {
        element.classList.remove('sat-animate');
        element.classList.remove('sat-visible');
        
        // Dispatch custom event
        this.dispatchEvent(element, 'sat:out');
        
        console.log('SAT: Animating out ->', element);
      }
    },
    
    // Check if should animate out on scroll up
    shouldAnimateOut: function() {
      // Default: don't animate out when scrolling up
      // Change to true if you want reverse animations
      return false;
    },
    
    // Add initial state classes
    addInitialClasses: function(element) {
      // Check for duration classes
      var durationClasses = element.className.match(/sat-duration-\d+/g);
      if (!durationClasses) {
        element.classList.add('sat-duration-500');
      }
      
      // Check for easing classes
      var easingClasses = element.className.match(/sat-easing-\w+/g);
      if (!easingClasses) {
        element.classList.add('sat-easing-ease');
      }
    },
    
    // Initialize control functions
    initControls: function() {
      // Toggle all animations
      window.toggleSAT = function() {
        SAT.elements.forEach(function(element) {
          element.classList.toggle('sat-animate');
        });
        console.log('SAT: Toggled all animations');
      };
      
      // Reset all animations
      window.resetSAT = function() {
        SAT.elements.forEach(function(element) {
          element.classList.remove('sat-animate', 'sat-visible');
        });
        console.log('SAT: Reset all animations');
      };
      
      // Refresh SAT (re-initialize)
      window.refreshSAT = function() {
        if (SAT.observer) {
          SAT.elements.forEach(function(element) {
            SAT.observer.unobserve(element);
          });
          SAT.observer.disconnect();
        }
        
        SAT.initialized = false;
        SAT.elements = [];
        SAT.init();
        
        console.log('SAT: Refreshed');
      };
      
      // Add scroll to top button functionality
      var scrollTopBtn = document.querySelector('.scroll-top');
      if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
          scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
        });
        
        scrollTopBtn.addEventListener('click', function() {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    },
    
    // Fallback for browsers without IntersectionObserver
    fallbackAnimation: function() {
      console.warn('SAT: Using fallback animation (scroll event)');
      
      this.elements = this.getElements();
      
      window.addEventListener('scroll', this.handleScrollFallback.bind(this));
      this.handleScrollFallback(); // Initial check
    },
    
    // Scroll fallback handler
    handleScrollFallback: function() {
      var windowHeight = window.innerHeight;
      var windowTop = window.scrollY;
      
      this.elements.forEach(function(element) {
        var elementTop = this.getOffsetTop(element);
        var elementHeight = element.offsetHeight;
        
        // Check if element is in viewport
        if (windowTop + windowHeight > elementTop && 
            windowTop < elementTop + elementHeight) {
          this.animateIn(element);
        }
      }.bind(this));
    },
    
    // Get element offset top
    getOffsetTop: function(element) {
      var offsetTop = 0;
      while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
      }
      return offsetTop;
    },
    
    // Dispatch custom event
    dispatchEvent: function(element, eventName) {
      var event;
      try {
        event = new CustomEvent(eventName, {
          detail: { element: element },
          bubbles: true
        });
      } catch (e) {
        // For older browsers
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, { element: element });
      }
      
      element.dispatchEvent(event);
    },
    
    // Public API
    toggle: function() {
      window.toggleSAT();
    },
    
    reset: function() {
      window.resetSAT();
    },
    
    refresh: function() {
      window.refreshSAT();
    },
    
    // Get version
    getVersion: function() {
      return this.version;
    }
  };
  
  // Initialize when DOM is ready
  function initializeSAT() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        SAT.init();
      });
    } else {
      SAT.init();
    }
  }
  
  // Expose SAT to global scope
  window.SAT = SAT;
  
  // Auto-initialize
  initializeSAT();
  
})(window, document);
