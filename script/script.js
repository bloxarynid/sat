// SAT (Scroll Animation Tool) - Dual System Version
// Bloxaryn.Id Tools v2.0.0
// Inspired by AOS (Animate On Scroll)
(function(window, document) {
  'use strict';
  
  // Core SAT Class
  var SAT = {
    version: '2.0.0',
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
      
      console.log('SAT: Initializing with ' + this.elements.length + ' elements (Dual System)');
      
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
        
        // Check for mixing conflict
        if (this.hasMixingConflict(element)) {
          console.error('SAT: Mixing conflict detected on element', element);
          console.error('SAT: Cannot mix sat-transition-* and sat-animation-* classes');
          this.resolveMixingConflict(element);
        }
        
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
      
      console.log('SAT: Ready! (Transition & Animation Systems)');
    },
    
    // Get all elements with SAT classes (Dual System)
    getElements: function() {
      var transitionSelectors = [
        // Transition Fade Animations
        '.sat-transition-fade-up', '.sat-transition-fade-down', '.sat-transition-fade-left', '.sat-transition-fade-right',
        '.sat-transition-fade-up-left', '.sat-transition-fade-up-right', '.sat-transition-fade-down-left', '.sat-transition-fade-down-right',
        
        // Transition Zoom Animations
        '.sat-transition-zoom-in', '.sat-transition-zoom-out',
        '.sat-transition-zoom-in-up', '.sat-transition-zoom-in-down', '.sat-transition-zoom-in-left', '.sat-transition-zoom-in-right',
        '.sat-transition-zoom-out-up', '.sat-transition-zoom-out-down', '.sat-transition-zoom-out-left', '.sat-transition-zoom-out-right',
        
        // Transition Slide Animations
        '.sat-transition-slide-up', '.sat-transition-slide-down', '.sat-transition-slide-left', '.sat-transition-slide-right',
        
        // Transition Flip Animations
        '.sat-transition-flip-left', '.sat-transition-flip-right', '.sat-transition-flip-up', '.sat-transition-flip-down',
        
        // Transition Blur Animations
        '.sat-transition-blur', '.sat-transition-blur-up', '.sat-transition-blur-down', '.sat-transition-blur-left', '.sat-transition-blur-right',
        '.sat-transition-blur-zoom-in', '.sat-transition-blur-zoom-out', '.sat-transition-blur-glass'
      ];
      
      var animationSelectors = [
        // Animation Fade Animations
        '.sat-animation-fade-up', '.sat-animation-fade-down', '.sat-animation-fade-left', '.sat-animation-fade-right',
        '.sat-animation-fade-up-left', '.sat-animation-fade-up-right', '.sat-animation-fade-down-left', '.sat-animation-fade-down-right',
        
        // Animation Zoom Animations
        '.sat-animation-zoom-in', '.sat-animation-zoom-out',
        '.sat-animation-zoom-in-up', '.sat-animation-zoom-in-down', '.sat-animation-zoom-in-left', '.sat-animation-zoom-in-right',
        '.sat-animation-zoom-out-up', '.sat-animation-zoom-out-down', '.sat-animation-zoom-out-left', '.sat-animation-zoom-out-right',
        
        // Animation Slide Animations
        '.sat-animation-slide-up', '.sat-animation-slide-down', '.sat-animation-slide-left', '.sat-animation-slide-right',
        
        // Animation Flip Animations
        '.sat-animation-flip-left', '.sat-animation-flip-right', '.sat-animation-flip-up', '.sat-animation-flip-down',
        
        // Animation Blur Animations
        '.sat-animation-blur', '.sat-animation-blur-up', '.sat-animation-blur-down', '.sat-animation-blur-left', '.sat-animation-blur-right',
        '.sat-animation-blur-zoom-in', '.sat-animation-blur-zoom-out', '.sat-animation-blur-glass'
      ];
      
      var elements = [];
      
      // Get transition elements
      transitionSelectors.forEach(function(selector) {
        var found = document.querySelectorAll(selector);
        if (found.length > 0) {
          Array.prototype.push.apply(elements, Array.from(found));
        }
      });
      
      // Get animation elements
      animationSelectors.forEach(function(selector) {
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
    
    // Check if element has mixing conflict
    hasMixingConflict: function(element) {
      var className = element.className;
      var hasTransition = false;
      var hasAnimation = false;
      
      // Check for transition classes
      if (className.includes('sat-transition-')) {
        hasTransition = true;
      }
      
      // Check for animation classes
      if (className.includes('sat-animation-')) {
        hasAnimation = true;
      }
      
      // Conflict if both exist
      return hasTransition && hasAnimation;
    },
    
    // Resolve mixing conflict
    resolveMixingConflict: function(element) {
      var className = element.className;
      
      // Default: keep transition, remove animation
      var regex = /sat-animation-[a-zA-Z-]+/g;
      var animationClasses = className.match(regex);
      
      if (animationClasses) {
        animationClasses.forEach(function(cls) {
          element.classList.remove(cls);
        });
        console.warn('SAT: Removed animation classes (kept transition):', animationClasses);
      }
      
      // Add warning class
      element.classList.add('sat-mixing-warning');
      element.style.outline = '2px solid red';
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
    
    // Animate element in (Dual System compatible)
    animateIn: function(element) {
      if (!element.classList.contains('sat-animate')) {
        element.classList.add('sat-animate');
        element.classList.add('sat-visible');
        
        // Determine which system is used
        var system = this.detectAnimationSystem(element);
        
        // Dispatch custom event with system info
        this.dispatchEvent(element, 'sat:in', { system: system });
        
        console.log('SAT: Animating in ->', element, '(' + system + ' system)');
      }
    },
    
    // Animate element out (optional)
    animateOut: function(element) {
      if (element.classList.contains('sat-animate')) {
        element.classList.remove('sat-animate');
        element.classList.remove('sat-visible');
        
        // Determine which system is used
        var system = this.detectAnimationSystem(element);
        
        // Dispatch custom event with system info
        this.dispatchEvent(element, 'sat:out', { system: system });
        
        console.log('SAT: Animating out ->', element, '(' + system + ' system)');
      }
    },
    
    // Detect which animation system is used
    detectAnimationSystem: function(element) {
      var className = element.className;
      
      if (className.includes('sat-transition-')) {
        return 'transition';
      } else if (className.includes('sat-animation-')) {
        return 'animation';
      }
      
      return 'unknown';
    },
    
    // Check if should animate out on scroll up
    shouldAnimateOut: function() {
      return false;
    },
    
    // Add initial state classes (Dual System)
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
      
      // Check for delay classes
      var delayClasses = element.className.match(/sat-delay-\d+/g);
      if (!delayClasses) {
        element.classList.add('sat-delay-0');
      }
      
      // Add visibility hidden for both systems
      element.classList.add('sat-hidden');
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
          element.classList.add('sat-hidden');
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
      
      // Get system info for debugging
      window.getSATSystemInfo = function() {
        var info = {
          totalElements: SAT.elements.length,
          transitionElements: 0,
          animationElements: 0,
          mixedElements: 0
        };
        
        SAT.elements.forEach(function(element) {
          var system = SAT.detectAnimationSystem(element);
          if (system === 'transition') info.transitionElements++;
          if (system === 'animation') info.animationElements++;
          if (SAT.hasMixingConflict(element)) info.mixedElements++;
        });
        
        console.log('SAT System Info:', info);
        return info;
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
    
    // Dispatch custom event with data
    dispatchEvent: function(element, eventName, detail) {
      var event;
      detail = detail || {};
      detail.element = element;
      
      try {
        event = new CustomEvent(eventName, {
          detail: detail,
          bubbles: true
        });
      } catch (e) {
        // For older browsers
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, detail);
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
    
    // Get system info
    getSystemInfo: function() {
      return window.getSATSystemInfo();
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
