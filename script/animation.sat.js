// SAT (Scroll Animation Tool) - Animation System Version
// Bloxaryn.Id Tools v2.0.0 - Animation Only
// Inspired by AOS (Animate On Scroll)

(function(window, document) {
    'use strict';
    
    // Core SAT Animation Class
    var SAT = {
        version: '2.0.0-animation',
        elements: [],
        observer: null,
        initialized: false,
        
        // Initialize SAT Animation
        init: function(options) {
            if (this.initialized) {
                console.warn('SAT Animation is already initialized');
                return;
            }
            
            // Merge options with defaults
            this.settings = Object.assign({
                offset: 120,
                delay: 0,
                duration: 400,
                easing: 'ease',
                once: false,
                mirror: false,
                throttleDelay: 99,
                disable: false,
                repeat: false // NEW: Control apakah animasi berulang
            }, options);
            
            // Check for IntersectionObserver support
            if (!('IntersectionObserver' in window)) {
                console.error('SAT Animation requires IntersectionObserver. Your browser does not support it.');
                this.fallbackAnimation();
                return;
            }
            
            // Disable on specific devices if set
            if (this.shouldDisable()) {
                console.log('SAT Animation: Disabled on this device');
                return;
            }
            
            // Get all SAT animation elements
            this.elements = this.getElements();
            if (this.elements.length === 0) {
                console.warn('SAT Animation: No animation elements found');
                return;
            }
            
            console.log('SAT Animation: Initializing with ' + this.elements.length + ' elements');
            
            // Create IntersectionObserver for animation system
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                {
                    threshold: 0.1,
                    rootMargin: this.calcRootMargin()
                }
            );
            
            // Observe each element
            this.elements.forEach(function(element) {
                this.observer.observe(element);
                
                // Add optimization class if not present
                if (!element.classList.contains('sat-optimize')) {
                    element.classList.add('sat-optimize');
                }
                
                // Add initial state classes
                this.addInitialClasses(element);
                
                // Add hidden state initially
                element.classList.add('sat-hidden');
                
                // Store initial state for reset
                element._satInitialState = {
                    hasAnimated: false,
                    animationCount: 0
                };
                
            }.bind(this));
            
            this.initialized = true;
            
            // Initialize control functions
            this.initControls();
            
            console.log('SAT Animation: Ready! Using keyframe animation system');
        },
        
        // Get all elements with SAT animation classes
        getElements: function() {
            var selectors = [
                // Fade Animations
                '.sat-fade-up',
                '.sat-fade-down',
                '.sat-fade-left',
                '.sat-fade-right',
                '.sat-fade-up-left',
                '.sat-fade-up-right',
                '.sat-fade-down-left',
                '.sat-fade-down-right',
                
                // Zoom Animations
                '.sat-zoom-in',
                '.sat-zoom-out',
                '.sat-zoom-in-up',
                '.sat-zoom-in-down',
                '.sat-zoom-in-left',
                '.sat-zoom-in-right',
                '.sat-zoom-out-up',
                '.sat-zoom-out-down',
                '.sat-zoom-out-left',
                '.sat-zoom-out-right',
                
                // Slide Animations
                '.sat-slide-up',
                '.sat-slide-down',
                '.sat-slide-left',
                '.sat-slide-right',
                
                // Flip Animations
                '.sat-flip-left',
                '.sat-flip-right',
                '.sat-flip-up',
                '.sat-flip-down',
                
                // Blur Animations
                '.sat-blur',
                '.sat-blur-up',
                '.sat-blur-down',
                '.sat-blur-left',
                '.sat-blur-right',
                '.sat-blur-zoom-in',
                '.sat-blur-zoom-out',
                '.sat-blur-glass'
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
        
        // Calculate root margin based on offset
        calcRootMargin: function() {
            var offset = this.settings.offset;
            return offset + 'px 0px ' + offset + 'px 0px';
        },
        
        // Handle intersection events
        handleIntersection: function(entries) {
            entries.forEach(function(entry) {
                var element = entry.target;
                
                if (entry.isIntersecting) {
                    // Element is in viewport - animate in
                    this.animateIn(element);
                    
                    // Check if we should stop observing
                    if (this.settings.once && element._satInitialState.hasAnimated) {
                        this.observer.unobserve(element);
                    }
                } else {
                    // Element is out of viewport
                    if (this.settings.mirror) {
                        this.animateOut(element);
                    }
                    
                    // If repeat mode is enabled, reset animation when out of viewport
                    if (this.shouldRepeat(element)) {
                        this.resetElementAnimation(element);
                    }
                }
            }.bind(this));
        },
        
        // Check if element should repeat animation
        shouldRepeat: function(element) {
            // Check element-specific repeat class
            if (element.classList.contains('sat-repeat')) {
                return true;
            }
            
            // Check global repeat setting
            if (element.classList.contains('sat-no-repeat')) {
                return false;
            }
            
            return this.settings.repeat;
        },
        
        // Reset element animation state
        resetElementAnimation: function(element) {
            // Remove animation classes
            element.classList.remove('sat-animate', 'sat-visible');
            element.classList.add('sat-hidden');
            
            // Reset inline styles
            element.style.animationName = '';
            
            // Force reflow to restart animation
            void element.offsetWidth;
        },
        
        // Animate element in with keyframe animation
        animateIn: function(element) {
            // Skip if already animating (unless repeat is enabled)
            if (element.classList.contains('sat-animate') && !this.shouldRepeat(element)) {
                return;
            }
            
            // Remove hidden class
            element.classList.remove('sat-hidden');
            element.classList.add('sat-visible');
            
            // Remove animation class first to restart animation
            element.classList.remove('sat-animate');
            
            // Force reflow to restart animation
            void element.offsetWidth;
            
            // Add animation trigger class
            element.classList.add('sat-animate');
            
            // Calculate animation duration and delay
            var duration = this.getDuration(element);
            var delay = this.getDelay(element);
            
            // Apply inline styles for animation properties
            element.style.animationDuration = duration + 'ms';
            element.style.animationDelay = delay + 'ms';
            
            // Set animation iteration count based on repeat setting
            if (this.shouldRepeat(element)) {
                element.style.animationIterationCount = 'infinite';
            } else {
                element.style.animationIterationCount = '1';
            }
            
            // Update animation counter
            if (element._satInitialState) {
                element._satInitialState.hasAnimated = true;
                element._satInitialState.animationCount++;
            }
            
            // Dispatch custom event
            this.dispatchEvent(element, 'sat:in', {
                duration: duration,
                delay: delay,
                repeat: this.shouldRepeat(element),
                count: element._satInitialState ? element._satInitialState.animationCount : 0
            });
            
            console.log('SAT Animation: Animating in ->', element, 
                       'Repeat:', this.shouldRepeat(element),
                       'Count:', element._satInitialState ? element._satInitialState.animationCount : 0);
        },
        
        // Animate element out (if mirror is enabled)
        animateOut: function(element) {
            if (element.classList.contains('sat-animate')) {
                element.classList.remove('sat-animate');
                element.classList.add('sat-hidden');
                element.classList.remove('sat-visible');
                
                // Reset animation for next time
                element.style.animationName = '';
                
                // Dispatch custom event
                this.dispatchEvent(element, 'sat:out', {
                    repeat: this.shouldRepeat(element)
                });
                
                console.log('SAT Animation: Animating out ->', element);
            }
        },
        
        // Get duration from element classes or settings
        getDuration: function(element) {
            var durationClass = Array.from(element.classList).find(function(className) {
                return className.startsWith('sat-duration-');
            });
            
            if (durationClass) {
                var durationValue = parseInt(durationClass.replace('sat-duration-', ''));
                return durationValue;
            }
            return this.settings.duration;
        },
        
        // Get delay from element classes or settings
        getDelay: function(element) {
            var delayClass = Array.from(element.classList).find(function(className) {
                return className.startsWith('sat-delay-');
            });
            
            if (delayClass) {
                var delayValue = parseInt(delayClass.replace('sat-delay-', ''));
                return delayValue;
            }
            return this.settings.delay;
        },
        
        // Check if should disable on this device
        shouldDisable: function() {
            var disable = this.settings.disable;
            if (!disable) return false;
            
            if (disable === 'mobile') {
                return window.innerWidth < 768;
            }
            if (disable === 'phone') {
                return window.innerWidth < 480;
            }
            if (disable === 'tablet') {
                return window.innerWidth >= 768 && window.innerWidth <= 1024;
            }
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
            
            // Apply easing via inline style
            var easingClass = Array.from(element.classList).find(function(className) {
                return className.startsWith('sat-easing-');
            });
            
            if (easingClass) {
                var easingValue = this.getEasingValue(easingClass);
                element.style.animationTimingFunction = easingValue;
            }
        },
        
        // Get easing value from class name
        getEasingValue: function(easingClass) {
            var easingMap = {
                'sat-easing-linear': 'cubic-bezier(.25,.25,.75,.75)',
                'sat-easing-ease': 'ease',
                'sat-easing-ease-in': 'ease-in',
                'sat-easing-ease-out': 'ease-out',
                'sat-easing-ease-in-out': 'ease-in-out',
                'sat-easing-ease-in-back': 'cubic-bezier(.6,-.28,.735,.045)',
                'sat-easing-ease-out-back': 'cubic-bezier(.175,.885,.32,1.275)',
                'sat-easing-ease-in-out-back': 'cubic-bezier(.68,-.55,.265,1.55)',
                'sat-easing-ease-in-sine': 'cubic-bezier(.47,0,.745,.715)',
                'sat-easing-ease-out-sine': 'cubic-bezier(.39,.575,.565,1)',
                'sat-easing-ease-in-out-sine': 'cubic-bezier(.445,.05,.55,.95)',
                'sat-easing-ease-in-quad': 'cubic-bezier(.55,.085,.68,.53)',
                'sat-easing-ease-out-quad': 'cubic-bezier(.25,.46,.45,.94)',
                'sat-easing-ease-in-out-quad': 'cubic-bezier(.455,.03,.515,.955)',
                'sat-easing-ease-in-cubic': 'cubic-bezier(.55,.085,.68,.53)',
                'sat-easing-ease-out-cubic': 'cubic-bezier(.25,.46,.45,.94)',
                'sat-easing-ease-in-out-cubic': 'cubic-bezier(.455,.03,.515,.955)',
                'sat-easing-ease-in-quart': 'cubic-bezier(.55,.085,.68,.53)',
                'sat-easing-ease-out-quart': 'cubic-bezier(.25,.46,.45,.94)',
                'sat-easing-ease-in-out-quart': 'cubic-bezier(.455,.03,.515,.955)'
            };
            
            return easingMap[easingClass] || 'ease';
        },
        
        // Initialize control functions
        initControls: function() {
            // Toggle all animations
            window.toggleSAT = function() {
                SAT.elements.forEach(function(element) {
                    element.classList.toggle('sat-animate');
                    if (element.classList.contains('sat-animate')) {
                        element.classList.remove('sat-hidden');
                        element.classList.add('sat-visible');
                    } else {
                        element.classList.add('sat-hidden');
                        element.classList.remove('sat-visible');
                    }
                });
                console.log('SAT Animation: Toggled all animations');
            };
            
            // Reset all animations
            window.resetSAT = function() {
                SAT.elements.forEach(function(element) {
                    element.classList.remove('sat-animate', 'sat-visible');
                    element.classList.add('sat-hidden');
                    element.style.animationName = '';
                    element.style.animationIterationCount = '';
                    
                    // Reset stored state
                    if (element._satInitialState) {
                        element._satInitialState.hasAnimated = false;
                        element._satInitialState.animationCount = 0;
                    }
                    
                    // Force reflow
                    void element.offsetWidth;
                });
                console.log('SAT Animation: Reset all animations');
            };
            
            // Refresh SAT (re-initialize)
            window.refreshSAT = function() {
                if (SAT.observer) {
                    SAT.elements.forEach(function(element) {
                        SAT.observer.unobserve(element);
                        element.classList.remove('sat-optimize', 'sat-animate', 'sat-visible', 'sat-hidden', 'sat-repeat', 'sat-no-repeat');
                        element.style.animationDuration = '';
                        element.style.animationDelay = '';
                        element.style.animationTimingFunction = '';
                        element.style.animationIterationCount = '';
                        element.style.animationName = '';
                        
                        // Clear stored state
                        delete element._satInitialState;
                    });
                    SAT.observer.disconnect();
                }
                
                SAT.initialized = false;
                SAT.elements = [];
                SAT.init();
                console.log('SAT Animation: Refreshed');
            };
            
            // Add scroll to top button functionality
            var scrollTopBtn = document.querySelector('.scroll-top');
            if (scrollTopBtn) {
                window.addEventListener('scroll', function() {
                    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
                });
                
                scrollTopBtn.addEventListener('click', function() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        },
        
        // Fallback for browsers without IntersectionObserver
        fallbackAnimation: function() {
            console.warn('SAT Animation: Using fallback animation (scroll event)');
            this.elements = this.getElements();
            
            var throttledScroll = this.throttle(this.handleScrollFallback.bind(this), this.settings.throttleDelay);
            window.addEventListener('scroll', throttledScroll);
            this.handleScrollFallback(); // Initial check
        },
        
        // Throttle function for scroll events
        throttle: function(func, wait) {
            var timeout = null;
            var previous = 0;
            
            return function() {
                var now = Date.now();
                var remaining = wait - (now - previous);
                var context = this;
                var args = arguments;
                
                if (remaining <= 0 || remaining > wait) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    previous = now;
                    func.apply(context, args);
                } else if (!timeout) {
                    timeout = setTimeout(function() {
                        previous = Date.now();
                        timeout = null;
                        func.apply(context, args);
                    }, remaining);
                }
            };
        },
        
        // Scroll fallback handler
        handleScrollFallback: function() {
            var windowHeight = window.innerHeight;
            var windowTop = window.scrollY;
            var windowBottom = windowTop + windowHeight;
            
            this.elements.forEach(function(element) {
                var elementTop = this.getOffsetTop(element);
                var elementHeight = element.offsetHeight;
                var elementBottom = elementTop + elementHeight;
                
                // Check if element is in viewport (with offset)
                var offset = this.settings.offset;
                var isInViewport = windowBottom - offset > elementTop && windowTop + offset < elementBottom;
                var wasInViewport = element._satWasInViewport || false;
                
                if (isInViewport && !wasInViewport) {
                    // Just entered viewport
                    this.animateIn(element);
                } else if (!isInViewport && wasInViewport && this.shouldRepeat(element)) {
                    // Just left viewport and repeat is enabled
                    this.resetElementAnimation(element);
                }
                
                // Store current state
                element._satWasInViewport = isInViewport;
                
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
        
        // Public API - Animation System
        
        // Enable repeat mode globally
        enableRepeat: function() {
            this.settings.repeat = true;
            console.log('SAT Animation: Repeat mode enabled globally');
        },
        
        // Disable repeat mode globally
        disableRepeat: function() {
            this.settings.repeat = false;
            console.log('SAT Animation: Repeat mode disabled globally');
        },
        
        // Set repeat mode for specific elements
        setRepeatForElements: function(selector, enable) {
            var elements = document.querySelectorAll(selector);
            elements.forEach(function(element) {
                if (enable) {
                    element.classList.add('sat-repeat');
                    element.classList.remove('sat-no-repeat');
                } else {
                    element.classList.add('sat-no-repeat');
                    element.classList.remove('sat-repeat');
                }
            });
            console.log('SAT Animation: Repeat mode ' + (enable ? 'enabled' : 'disabled') + ' for ' + elements.length + ' elements');
        },
        
        // Toggle animations
        toggle: function() {
            window.toggleSAT();
        },
        
        // Reset all animations
        reset: function() {
            window.resetSAT();
        },
        
        // Refresh SAT
        refresh: function() {
            window.refreshSAT();
        },
        
        // Get version
        getVersion: function() {
            return this.version;
        },
        
        // Get stats
        getStats: function() {
            var repeatCount = 0;
            var noRepeatCount = 0;
            
            this.elements.forEach(function(element) {
                if (this.shouldRepeat(element)) {
                    repeatCount++;
                } else {
                    noRepeatCount++;
                }
            }.bind(this));
            
            return {
                totalElements: this.elements.length,
                repeatElements: repeatCount,
                noRepeatElements: noRepeatCount,
                initialized: this.initialized,
                settings: this.settings
            };
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
    
    // Auto-initialize with default settings
    initializeSAT();
    
})(window, document);
