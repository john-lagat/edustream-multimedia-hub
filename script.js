    // ============================================
        // PART D1: COMPONENT-BASED MEDIA GALLERY
        
        // Media Library Data Array (8+ objects as required)
        const mediaLibrary = [
            {
                id: 1,
                title: "Introduction to HTML5 Multimedia",
                type: "video",
                thumbnailUrl: "assets/images/pexels-vantik93-18734744.jpg",
                duration: "12:34",
                description: "Learn the fundamentals of HTML5 multimedia elements including audio, video, and canvas."
            },
            {
                id: 2,
                title: "Web Audio API Deep Dive",
                type: "photo",
                thumbnailUrl: "assets/images/pexels-shkrabaanthony-6609460.jpg",
                duration: "null",
                description: "Explore Web Audio API, oscillator nodes, gain nodes, and audio signal processing."
            },
            {
                id: 3,
                title: "SVG Animation Masterclass",
                type: "video",
                thumbnailUrl: "assets/video/8196796-hd_1920_1080_25fps.mp4",
                duration: "15:47",
                description: "Master SVG animations with CSS keyframes and JavaScript manipulation."
            },
            {
                id: 4,
                title: "Responsive Design Patterns",
                type: "image",
                thumbnailUrl:"assets/images/pexels-mickael-ange-konan-2156070331-34526427.jpg",
                duration: null,
                description: "Infographic showing modern responsive design patterns for web applications."
            },
            {
                id: 5,
                title: "JavaScript Event Delegation",
                type: "video",
                thumbnailUrl: "assets/video/7092232-hd_1080_1920_30fps.mp4",
                duration: "10:15",
                description: "Learn event delegation pattern for efficient DOM event handling."
            },
            {
                id: 6,
                title: "Camera API & Canvas Filters",
                type: "video",
                thumbnailUrl: "assets/video/9198246-hd_1920_1080_25fps.mp4",
                duration: "09:30",
                description: "Capture camera feed and apply real-time filters using Canvas API."
            },
            {
                id: 7,
                title: "CSS Grid Layout Guide",
                type: "photo",
                thumbnailUrl: "assets/images/pexels-mizunokozuki-12899152.jpg",
                duration: null,
                description: "Visual guide to CSS Grid properties and responsive layouts."
            },
            {
                id: 8,
                title: "Accessibility in Multimedia",
                type: "photo",
                thumbnailUrl: "assets/images/pexels-unique-digitals-154779423-10614240.jpg",
                duration: "11:20",
                description: "Podcast on making multimedia content accessible to all users."
            },
            {
                id: 9,
                title: "Web Performance Optimization",
                type: "photo",
                thumbnailUrl: "assets/images/pexels-mikhail-nilov-7988079.jpg",
                duration: "null",
                description: "Techniques for optimizing media loading and reducing CLS."
            },
            {
                id: 10,
                title: "East African Tech Ecosystem",
                type: "photo",
                thumbnailUrl: "assets/images/pexels-mikhail-nilov-7988748.jpg",
                duration: null,
                description: "Infographic showing technology adoption across East Africa."
            }
        ];
        
        const defaultThumbnails = {
            video: "https://placehold.co/400x225/1e293b/white?text=🎬+Video+Tutorial",
            audio: "https://placehold.co/400x225/1e293b/white?text=🎵+Audio+Lecture",
            image: "https://placehold.co/400x225/1e293b/white?text=🖼️+Infographic"
        };
        
        // Helper function to get thumbnail URL
        function getThumbnailUrl(item) {
            if (item.thumbnailUrl && item.thumbnailUrl !== "assets/images/thumb-*.jpg") {
                return item.thumbnailUrl;
            }
            return defaultThumbnails[item.type] || defaultThumbnails.image;
        }
        
       
        function renderMediaCard(item) {
            const typeClass = item.type;
            const typeIcon = {
                video: '🎬',
                audio: '🎵',
                image: '🖼️'
            }[item.type] || '📄';
            
            const actionText = {
                video: 'Watch Now',
                audio: 'Listen Now',
                image: 'View Image'
            }[item.type] || 'Open';
            
            const durationHtml = item.duration 
                ? `<span class="duration-badge">⏱️ ${item.duration}</span>` 
                : '';
            
            return `
                <div class="media-card" data-id="${item.id}" data-title="${item.title.replace(/"/g, '&quot;')}" data-type="${item.type}">
                    <div class="card-thumbnail">
                        <img src="${getThumbnailUrl(item)}" 
                             alt="${item.title} - ${item.type} thumbnail"
                             loading="lazy">
                        <span class="media-type-badge ${typeClass}">${typeIcon} ${item.type}</span>
                        ${durationHtml}
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-description">${item.description}</p>
                        <div class="card-footer">
                            <button class="card-action-btn" data-action="play">${actionText} →</button>
                            <span class="card-id">ID: ${item.id}</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // ========== RENDER FUNCTION ==========
        // Filters data using Array.filter() then maps to HTML using Array.map()
        let currentSearchTerm = '';
        
        function renderGallery(searchTerm = '') {
            const gridContainer = document.getElementById('mediaGrid');
            if (!gridContainer) return;
            
            // Filter data based on search term (matches title field)
            let filteredData = mediaLibrary;
            if (searchTerm.trim() !== '') {
                const term = searchTerm.toLowerCase().trim();
                filteredData = mediaLibrary.filter(item => 
                    item.title.toLowerCase().includes(term)
                );
            }
            
            // Update result count
            const resultCountSpan = document.getElementById('resultCount');
            if (resultCountSpan) {
                resultCountSpan.textContent = `${filteredData.length} item${filteredData.length !== 1 ? 's' : ''}`;
            }
            
            // Render cards using Array.map() and join()
            if (filteredData.length === 0) {
                gridContainer.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1;">
                        <div class="empty-state-icon">🔍</div>
                        <h3>No matching media found</h3>
                        <p>Try a different search term or clear the search</p>
                    </div>
                `;
            } else {
                const cardsHtml = filteredData.map(item => renderMediaCard(item)).join('');
                gridContainer.innerHTML = cardsHtml;
            }
        }
        
        // ========== LIVE SEARCH ==========
        const searchInput = document.getElementById('searchInput');
        const clearSearchBtn = document.getElementById('clearSearchBtn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearchTerm = e.target.value;
                renderGallery(currentSearchTerm);
                addToClickLog('system', `Search filtered: "${currentSearchTerm}"`, '#f59e0b');
            });
        }
        
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                searchInput.value = '';
                currentSearchTerm = '';
                renderGallery('');
                addToClickLog('system', 'Search cleared - showing all items', '#10b981');
            });
        }
        
        // ========== EVENT DELEGATION ==========
        // Single click listener on parent gallery container
        // Uses e.target.closest('.media-card') to find the card
        
        const clickLog = document.getElementById('clickLog');
        
        function addToClickLog(action, details, color = '#4f46e5') {
            const timestamp = new Date().toLocaleTimeString();
            const logEntry = document.createElement('p');
            logEntry.innerHTML = `🖱️ [${timestamp}] <strong>${action}</strong> - ${details}`;
            logEntry.style.borderLeftColor = color;
            clickLog.appendChild(logEntry);
            clickLog.scrollTop = clickLog.scrollHeight;
            
            // Keep last 20 entries
            while (clickLog.children.length > 20) {
                clickLog.removeChild(clickLog.firstChild);
            }
        }
        
        // Event delegation on the parent container
        const mediaGrid = document.getElementById('mediaGrid');
        
        if (mediaGrid) {
            mediaGrid.addEventListener('click', (e) => {
                // Find the closest media card (works even if clicking on child elements)
                const card = e.target.closest('.media-card');
                
                if (card) {
                    // Get data from dataset attributes
                    const id = card.dataset.id;
                    const title = card.dataset.title;
                    const type = card.dataset.type;
                    
                    // Log the clicked card's info
                    addToClickLog(
                        `Card Clicked`, 
                        `ID: ${id} | Title: "${title}" | Type: ${type}`,
                        '#10b981'
                    );
                    
                    // Also log to console for developer view
                    console.log(`[Event Delegation] Clicked card:`, { id, title, type });
                    
                    // Optional: Show alert for demo purposes (commented out)
                    // alert(`You clicked: ${title}\nType: ${type}\nID: ${id}`);
                    
                    // Find if action button was clicked
                    const actionBtn = e.target.closest('.card-action-btn');
                    if (actionBtn) {
                        addToClickLog(
                            `Action Button`, 
                            `"${actionBtn.textContent.trim()}" clicked for "${title}"`,
                            '#3b82f6'
                        );
                    }
                }
            });
        }
        
        // Clear click log button
        const clearClickLogBtn = document.getElementById('clearClickLog');
        if (clearClickLogBtn) {
            clearClickLogBtn.addEventListener('click', () => {
                clickLog.innerHTML = '<p>📡 Log cleared. Click on any media card to see event delegation.</p>';
                addToClickLog('system', 'Event log cleared by user', '#64748b');
            });
        }
        
        // Initial render
        renderGallery('');
        
        // Log initialization
        console.log('Media Gallery initialized');
        console.log(`Data array size: ${mediaLibrary.length} items`);
        console.log('renderMediaCard pure function ready');
        console.log('Event delegation active on #mediaGrid');
        
        // Add to click log
        addToClickLog('system', `Gallery initialized with ${mediaLibrary.length} media items`, '#10b981');
        addToClickLog('system', 'Event delegation: Single click listener on parent container', '#8b5cf6');
        addToClickLog('system', 'Live search: Type in search box to filter cards', '#f59e0b');
        
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            });
        }
        
        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
            });
        });

        // PART B2: CUSTOM VIDEO PLAYER
        
        // DOM Elements
        const video = document.getElementById('videoPlayer');
        const playPauseBtn = document.getElementById('videoPlayPause');
        const seekBar = document.getElementById('videoSeekBar');
        const currentTimeSpan = document.getElementById('videoCurrentTime');
        const durationSpan = document.getElementById('videoDuration');
        const speedSelect = document.getElementById('playbackSpeed');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const currentVideoStateSpan = document.getElementById('currentVideoState');
        
        // State badge elements
        const stateBadges = {
            loadstart: document.getElementById('stateLoadstart'),
            loadeddata: document.getElementById('stateLoadeddata'),
            play: document.getElementById('statePlay'),
            playing: document.getElementById('statePlaying'),
            pause: document.getElementById('statePause'),
            waiting: document.getElementById('stateWaiting'),
            ended: document.getElementById('stateEnded'),
            error: document.getElementById('stateError')
        };
        
        // Format time as M:SS
        function formatTime(seconds) {
            if (isNaN(seconds) || seconds === Infinity || seconds === undefined) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
        
        // Update UI state display
        function updateStateUI(state, isActive = true) {
            currentVideoStateSpan.textContent = state.toUpperCase();
            
            // Update status display with color coding
            const statusDiv = document.getElementById('videoStatusDisplay');
            const stateColors = {
                'loadstart': '#f59e0b',
                'loadeddata': '#10b981',
                'play': '#3b82f6',
                'playing': '#10b981',
                'pause': '#94a3b8',
                'waiting': '#f59e0b',
                'ended': '#8b5cf6',
                'error': '#ef4444'
            };
            statusDiv.style.borderLeft = `3px solid ${stateColors[state] || '#3b82f6'}`;
            
            // Update badge highlighting
            Object.keys(stateBadges).forEach(key => {
                if (stateBadges[key]) {
                    stateBadges[key].classList.remove('active', 'waiting', 'error');
                    if (key === state) {
                        if (state === 'waiting') stateBadges[key].classList.add('waiting');
                        else if (state === 'error') stateBadges[key].classList.add('error');
                        else stateBadges[key].classList.add('active');
                    }
                }
            });
        }
        
        // ========== VIDEO EVENT HANDLERS (All required events) ==========
        
        // 1. loadstart - Browser has started loading
        video.addEventListener('loadstart', () => {
            updateStateUI('loadstart');
            console.log('loadstart: Loading process began');
        });
        
        // 2. loadeddata - First frame loaded
        video.addEventListener('loadeddata', () => {
            updateStateUI('loadeddata');
            durationSpan.textContent = formatTime(video.duration);
            seekBar.max = video.duration;
            console.log(`loadeddata: Duration = ${formatTime(video.duration)}`);
        });
        
        // 3. play - Play() method called (request)
        video.addEventListener('play', () => {
            updateStateUI('play');
            playPauseBtn.innerHTML = '<span>⏸</span> Pause';
            console.log('play: play() method called - requesting playback');
        });
        
        // 4. playing - Playback actually started (distinct from 'play')
        video.addEventListener('playing', () => {
            updateStateUI('playing');
            console.log('playing: Playback actually in progress (buffer ready)');
        });
        
        // 5. pause - Playback paused
        video.addEventListener('pause', () => {
            updateStateUI('pause');
            playPauseBtn.innerHTML = '<span>▶</span> Play';
            console.log('pause: Playback paused');
        });
        
        // 6. waiting - Buffering/stalled
        video.addEventListener('waiting', () => {
            updateStateUI('waiting');
            console.log('waiting: ⚠️ Buffering - playback stalled');
        });
        
        // 7. ended - Playback complete
        video.addEventListener('ended', () => {
            updateStateUI('ended');
            playPauseBtn.innerHTML = '<span>▶</span> Play';
            seekBar.value = 0;
            currentTimeSpan.textContent = formatTime(0);
            console.log('ended: Video playback completed');
        });
        
        // 8. error - Error occurred
        video.addEventListener('error', () => {
            updateStateUI('error');
            let errorMsg = 'Unknown error';
            if (video.error) {
                switch(video.error.code) {
                    case 1: errorMsg = 'MEDIA_ERR_ABORTED - User aborted'; break;
                    case 2: errorMsg = 'MEDIA_ERR_NETWORK - Network error'; break;
                    case 3: errorMsg = 'MEDIA_ERR_DECODE - Decoding error'; break;
                    case 4: errorMsg = 'MEDIA_ERR_SRC_NOT_SUPPORTED - Format not supported'; break;
                }
            }
            document.getElementById('videoStatusDisplay').innerHTML = `❌ Current state: <strong>ERROR</strong> - ${errorMsg}`;
            console.log(`error: ${errorMsg}`);
        });
        
        // Time update for seek bar and current time
        video.addEventListener('timeupdate', () => {
            if (!isNaN(video.currentTime)) {
                seekBar.value = video.currentTime;
                currentTimeSpan.textContent = formatTime(video.currentTime);
            }
        });
        
        // ========== PLAYER CONTROLS ==========
        
        // Play/Pause toggle
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play().catch(e => {
                    console.error('Play failed:', e);
                    updateStateUI('error');
                });
            } else {
                video.pause();
            }
        });
        
        // Seek bar - allows seeking by writing to video.currentTime
        seekBar.addEventListener('input', (e) => {
            const newTime = parseFloat(e.target.value);
            video.currentTime = newTime;
            console.log(`Seeked to ${formatTime(newTime)}`);
        });
        
        // Playback speed selector - 0.75x, 1x, 1.25x, 1.5x, 2x
        speedSelect.addEventListener('change', (e) => {
            const speed = parseFloat(e.target.value);
            video.playbackRate = speed;
            console.log(`Playback speed changed to ${speed}x`);
            
            // Show temporary feedback
            const statusDiv = document.getElementById('videoStatusDisplay');
            const originalHTML = statusDiv.innerHTML;
            statusDiv.innerHTML = `⚡ Speed changed to ${speed}x`;
            setTimeout(() => {
                statusDiv.innerHTML = originalHTML;
            }, 1500);
        });
        
        // Fullscreen button using requestFullscreen API
        fullscreenBtn.addEventListener('click', () => {
            const videoWrapper = document.querySelector('.video-wrapper');
            if (!document.fullscreenElement) {
                videoWrapper.requestFullscreen().catch(err => {
                    console.error(`Fullscreen error: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
        
        // Click on video to play/pause
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
        
        // ========== KEYBOARD SHORTCUTS ==========
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    if (video.paused) video.play();
                    else video.pause();
                    console.log('Keyboard: Space - Play/Pause');
                    break;
                    
                case 'ArrowLeft':
                    e.preventDefault();
                    video.currentTime = Math.max(0, video.currentTime - 10);
                    console.log(`Keyboard: Left Arrow - Seek -10s to ${formatTime(video.currentTime)}`);
                    break;
                    
                case 'ArrowRight':
                    e.preventDefault();
                    video.currentTime = Math.min(video.duration, video.currentTime + 10);
                    console.log(`Keyboard: Right Arrow - Seek +10s to ${formatTime(video.currentTime)}`);
                    break;
                    
                case 'KeyM':
                    e.preventDefault();
                    video.muted = !video.muted;
                    console.log(`Keyboard: M - ${video.muted ? 'Muted' : 'Unmuted'}`);
                    break;
                    
                case 'KeyF':
                    e.preventDefault();
                    const wrapper = document.querySelector('.video-wrapper');
                    if (!document.fullscreenElement) {
                        wrapper.requestFullscreen();
                    } else {
                        document.exitFullscreen();
                    }
                    console.log('Keyboard: F - Fullscreen toggle');
                    break;
                    
                default:
                    break;
            }
        });
        
        // Initial state
        updateStateUI('loadstart');
        console.log('Video player initialized - ready for interaction');
        
        // Check if video source exists
        setTimeout(() => {
            if (video.readyState === 0) {
                console.warn('Video file may not exist. Please add assets/video/tutorial.mp4');
                document.getElementById('videoStatusDisplay').innerHTML = '⚠️ Video file not found. Please add a video to assets/video/tutorial.mp4';
            }
        }, 1000);

    