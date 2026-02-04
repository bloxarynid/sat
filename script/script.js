
// ====================================================
//  with CONTINUOUS REPEAT Animation
// Animasi berulang SETIAP KALI masuk viewport
// ====================================================

(function(window, document) {
    'use strict';
    
    var  = {
        version: '2.1.0',
        elements: [],
        observer: null,
        initialized: false,
        settings: {
            threshold: 0.1,
            rootMargin: '50px 0px 50px 0px',
            continuousRepeat: false,      // Animasi SETIAP KALI masuk viewport
            repeatOnExit: false,          // Animasi out saat keluar
            repeatDelay: 0,               // Delay antar animasi
            debug: true
        },
        
        init: function() {
            if (this.initialized) return;
            
            this.log('🚀  Continuous Repeat Initializing...');
            
            // Get elements
            this.elements = this.getElements();
            this.log('🎯 Found ' + this.elements.length + ' elements');
            
            // Create observer
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                {
                    threshold: this.settings.threshold,
                    rootMargin: this.settings.rootMargin
                }
            );
            
            // Observe elements
            this.elements.forEach((element, index) => {
                this.observer.observe(element);
                
                // Reset animation state
                this.resetElement(element);
                
                if (this.settings.debug) {
                    this.log(`👀 #${index}: ${element.className}`);
                }
            });
            
            this.initialized = true;
            this.initControls();
            this.log('✅  Continuous Repeat Ready!');
        },
        
        getElements: function() {
            const selectors = [
                '.-fade-up', '.-fade-down', '.-fade-left', '.-fade-right',
                '.-zoom-in', '.-zoom-out'
            ];
            
            let elements = [];
            selectors.forEach(selector => {
                const found = document.querySelectorAll(selector);
                elements = [...elements, ...Array.from(found)];
            });
            
            return [...new Set(elements)]; // Remove duplicates
        },
        
        // ✅ INI YANG PENTING: Reset element state setiap kali
        resetElement: function(element) {
            // Hapus semua kelas animasi
            element.classList.remove('-animate', '-visible');
            
            // Reset transition untuk memastikan animasi fresh
            const style = window.getComputedStyle(element);
            const hasTransition = style.transition !== 'all 0s ease 0s';
            
            if (hasTransition) {
                // Force reflow untuk reset CSS
                element.style.transition = 'none';
                void element.offsetWidth; // Trigger reflow
                element.style.transition = '';
            }
        },
        
        handleIntersection: function(entries) {
            entries.forEach(entry => {
                const element = entry.target;
                const isContinuous = element.classList.contains('-continuous') || 
                                     this.settings.continuousRepeat;
                
                if (entry.isIntersecting) {
                    // ✅ SETIAP KALI MASUK viewport
                    if (this.settings.debug) {
                        this.log(`⬇️ ENTERING: ${element.className} (${entry.intersectionRatio.toFixed(2)})`);
                    }
                    
                    // Reset dulu sebelum animasi
                    this.resetElement(element);
                    
                    // Delay sedikit untuk memastikan reset selesai
                    setTimeout(() => {
                        this.animateIn(element);
                    }, this.settings.repeatDelay);
                    
                } else if (this.settings.repeatOnExit || isContinuous) {
                    // ✅ KELUAR viewport (optional)
                    if (this.settings.debug) {
                        this.log(`⬆️ EXITING: ${element.className}`);
                    }
                    
                    setTimeout(() => {
                        this.animateOut(element);
                    }, this.settings.repeatDelay);
                }
            });
        },
        
        animateIn: function(element) {
            // Pastikan tidak sedang animasi
            if (element.classList.contains('-animate')) {
                this.resetElement(element);
            }
            
            // Tambah kelas animasi
            element.classList.add('-animate', '-visible');
            
            // Dispatch event
            this.dispatchEvent(element, ':in');
            
            if (this.settings.debug) {
                this.log(`✨ ANIMATE IN: ${element.className}`);
            }
            
            // ✅ AUTO RESET setelah animasi selesai (untuk continuous)
            const isContinuous = element.classList.contains('-continuous') || 
                               this.settings.continuousRepeat;
            
            if (isContinuous) {
                // Cari duration dari kelas atau gunakan default
                const durationMatch = element.className.match(/-duration-(\d+)/);
                const duration = durationMatch ? parseInt(durationMatch[1]) : 500;
                
                // Reset setelah animasi selesai
                setTimeout(() => {
                    if (!element.classList.contains('-keep-visible')) {
                        this.resetElement(element);
                    }
                }, duration + 100);
            }
        },
        
        animateOut: function(element) {
            element.classList.remove('-animate', '-visible');
            this.dispatchEvent(element, ':out');
            
            if (this.settings.debug) {
                this.log(`↩️ ANIMATE OUT: ${element.className}`);
            }
        },
        
        // ============================================
        // CONTROL FUNCTIONS
        // ============================================
        
        initControls: function() {
            // Toggle continuous repeat
            window.toggleContinuous = function() {
                .settings.continuousRepeat = !.settings.continuousRepeat;
                .log(`🔄 Continuous Repeat: ${.settings.continuousRepeat ? 'ON' : 'OFF'}`);
                
                // Reset all elements
                .elements.forEach(el => .resetElement(el));
            };
            
            // Enable continuous
            window.enableContinuous = function() {
                .settings.continuousRepeat = true;
                .log('🔄 Continuous Repeat ENABLED');
                .elements.forEach(el => .resetElement(el));
            };
            
            // Disable continuous
            window.disableContinuous = function() {
                .settings.continuousRepeat = false;
                .log('🔄 Continuous Repeat DISABLED');
            };
            
            // Manual trigger animation
            window.triggerAnimation = function(selector) {
                const elements = selector ? 
                    document.querySelectorAll(selector) : 
                    .elements;
                
                elements.forEach(el => {
                    .resetElement(el);
                    setTimeout(() => .animateIn(el), 50);
                });
            };
        },
        
        // ============================================
        // PUBLIC API
        // ============================================
        
        // Enable continuous repeat for all elements
        enableContinuous: function() {
            this.settings.continuousRepeat = true;
            this.elements.forEach(el => this.resetElement(el));
            this.log('✅ Continuous Repeat ENABLED for all elements');
            return this;
        },
        
        // Enable continuous for specific elements
        enableContinuousFor: function(selector) {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('-continuous');
                this.resetElement(el);
            });
            this.log(`✅ Continuous Repeat ENABLED for ${selector}`);
            return this;
        },
        
        // Manually trigger animation
        trigger: function(selector) {
            const elements = selector ? 
                document.querySelectorAll(selector) : 
                this.elements;
            
            elements.forEach(el => {
                this.resetElement(el);
                setTimeout(() => this.animateIn(el), 50);
            });
            
            return this;
        },
        
        // Reset all elements
        resetAll: function() {
            this.elements.forEach(el => this.resetElement(el));
            return this;
        },
        
        // Dispatch event
        dispatchEvent: function(element, eventName) {
            const event = new CustomEvent(eventName, {
                detail: { element: element, timestamp: Date.now() },
                bubbles: true
            });
            element.dispatchEvent(event);
        },
        
        log: function(message) {
            if (this.settings.debug) {
                console.log(`📦 : ${message}`);
            }
        }
    };
    
    // Initialize
    document.addEventListener('DOMContentLoaded', () => .init());
    
    // Expose to global
    window. = ;
    
})(window, document);
  
