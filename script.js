let currentTrackIndex = 0;
let isPlaying = false;
let emojiIndex = 0;
let visibleExperiences = 3;
let visibleProjects = 6;
let currentPlayer = null;
let playerReady = false;
let userInteracted = false;
let playbackTimer = null;
let youtubeAPIReady = false;

const hardcodedGithubData = {
    totalContributions: 500,
    contributionsByDate: generateContributionData()
};

function generateContributionData() {
    const contributions = new Map();
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay();
        const dateKey = d.toISOString().split('T')[0];
        
        const baseActivity = dayOfWeek === 0 || dayOfWeek === 6 ? 0.15 : 0.35;
        const random = Math.random();
        
        if (random < baseActivity) {
            const contributionCount = Math.floor(Math.random() * 8) + 1;
            contributions.set(dateKey, contributionCount);
        } else {
            contributions.set(dateKey, 0);
        }
    }
    
    return contributions;
}

function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function extractYouTubeVideoId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
}

// Load YouTube IFrame API
function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
        youtubeAPIReady = true;
        return;
    }
    
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// This function is called by YouTube API when ready
window.onYouTubeIframeAPIReady = function() {
    youtubeAPIReady = true;
    console.log('YouTube API ready');
};

function createYouTubePlayer(videoId) {
    // Clean up existing player
    if (currentPlayer) {
        try {
            currentPlayer.destroy();
        } catch (e) {
            console.log('Error destroying player:', e);
        }
        currentPlayer = null;
        playerReady = false;
    }

    // Clear existing timer
    if (playbackTimer) {
        clearTimeout(playbackTimer);
        playbackTimer = null;
    }

    // Wait for API if not ready
    if (!youtubeAPIReady) {
        console.log('YouTube API not ready, waiting...');
        setTimeout(() => createYouTubePlayer(videoId), 500);
        return;
    }

    try {
        // Create hidden div for player
        let playerDiv = document.getElementById('youtube-player-div');
        if (!playerDiv) {
            playerDiv = document.createElement('div');
            playerDiv.id = 'youtube-player-div';
            playerDiv.style.cssText = `
                position: absolute;
                top: -9999px;
                left: -9999px;
                width: 1px;
                height: 1px;
                opacity: 0;
                pointer-events: none;
                z-index: -1000;
                visibility: hidden;
            `;
            document.body.appendChild(playerDiv);
        }

        currentPlayer = new YT.Player(playerDiv, {
            height: '1',
            width: '1',
            videoId: videoId,
            playerVars: {
                autoplay: userInteracted ? 1 : 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                playsinline: 1,
                rel: 0,
                showinfo: 0,
                loop: 1,
                playlist: videoId,
                mute: 0,
                start: 0
            },
            events: {
                onReady: function(event) {
                    playerReady = true;
                    console.log('Player ready');
                    
                    if (userInteracted && isPlaying) {
                        event.target.playVideo();
                    }
                    
                    // Set auto-advance timer
                    const currentTrack = portfolioData.music?.[currentTrackIndex];
                    const duration = currentTrack?.duration || 240000; // Default 4 minutes
                    
                    playbackTimer = setTimeout(() => {
                        if (isPlaying && currentPlayer === event.target) {
                            nextTrack();
                        }
                    }, duration);
                },
                onStateChange: function(event) {
                    console.log('Player state changed:', event.data);
                    
                    if (event.data === YT.PlayerState.PLAYING) {
                        isPlaying = true;
                        updatePlayButton();
                    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                        if (event.data === YT.PlayerState.ENDED) {
                            nextTrack();
                        } else {
                            isPlaying = false;
                            updatePlayButton();
                        }
                    }
                },
                onError: function(event) {
                    console.log('Player error:', event.data);
                    playerReady = false;
                    setTimeout(() => {
                        if (isPlaying) {
                            nextTrack();
                        }
                    }, 2000);
                }
            }
        });
    } catch (error) {
        console.error('Error creating YouTube player:', error);
        playerReady = false;
        setTimeout(() => {
            if (isPlaying) {
                nextTrack();
            }
        }, 2000);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff4444' : type === 'warning' ? '#ffaa00' : '#4444ff'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;
    
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                0% { transform: translateX(400px); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

function initializePortfolio() {
    if (typeof portfolioData === 'undefined') {
        setTimeout(initializePortfolio, 100);
        return;
    }

    const title = `${portfolioData.personalInfo.name} | ${portfolioData.personalInfo.role}`;
    const pageTitleElement = document.getElementById('page-title');
    if (pageTitleElement) {
        pageTitleElement.textContent = title;
    }
    
    const nameElement = document.getElementById('name');
    if (nameElement) {
        nameElement.textContent = portfolioData.personalInfo.name;
    }
    
    const roleElement = document.getElementById('role');
    if (roleElement) {
        roleElement.textContent = portfolioData.personalInfo.role;
    }
    
    const contactElement = document.getElementById('contact-info');
    if (contactElement) {
        contactElement.innerHTML = portfolioData.personalInfo.contact;
        
        const contactLinks = contactElement.querySelectorAll('.contact-link');
        contactLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Contact link tracking can be added here if needed
            });
        });
    }
    
    const aboutElement = document.getElementById('about-content');
    if (aboutElement) {
        aboutElement.innerHTML = portfolioData.about;
    }
    
    const educationElement = document.getElementById('education-content');
    if (educationElement) {
        educationElement.innerHTML = portfolioData.education;
    }
    
    updateSectionTitles();
    populateLocation();
    populateSkills();
    populateExperience();
    populateProjects();
    populateAchievements();
    renderGitHubContributions();
    updateCurrentTrack();
    
    // Load YouTube API for music functionality
    loadYouTubeAPI();
    
    if (portfolioData.config && portfolioData.config.emojiChangeInterval) {
        setInterval(changeEmoji, portfolioData.config.emojiChangeInterval);
    }

    setupUserInteractionDetection();
}

function setupUserInteractionDetection() {
    const enableInteraction = () => {
        if (!userInteracted) {
            userInteracted = true;
            console.log('User interaction detected');
        }
    };
    
    const events = ['click', 'touchstart', 'touchend', 'keydown', 'mousedown', 'pointerdown'];
    
    events.forEach(type => {
        document.addEventListener(type, enableInteraction, { 
            once: true, 
            passive: true,
            capture: true 
        });
    });
    
    window.addEventListener('focus', enableInteraction, { once: true });
}

function updateSectionTitles() {
    if (portfolioData.sectionTitles) {
        const titleMappings = {
            'about': 'about-title',
            'music': 'music-title',
            'education': 'education-title',
            'location': 'location-title',
            'skills': 'skills-title',
            'experience': 'experience-title',
            'github': 'github-title',
            'projects': 'projects-title',
            'achievements': 'achievements-title'
        };

        Object.entries(titleMappings).forEach(([key, elementId]) => {
            if (portfolioData.sectionTitles[key]) {
                const element = document.getElementById(elementId);
                if (element) {
                    element.textContent = portfolioData.sectionTitles[key];
                }
            }
        });
    }
    
    if (portfolioData.musicInfo) {
        const musicInfoElement = document.getElementById('music-info');
        if (musicInfoElement) {
            musicInfoElement.textContent = portfolioData.musicInfo;
        }
    }
    
    if (portfolioData.resumeButtonText) {
        const resumeBtnElement = document.getElementById('resume-btn');
        if (resumeBtnElement) {
            resumeBtnElement.textContent = portfolioData.resumeButtonText;
        }
    }
}

function populateLocation() {
    const container = document.getElementById('location-info');
    if (!container || !portfolioData.location) return;
    
    container.innerHTML = '';
    
    portfolioData.location.forEach(item => {
        const locationItem = document.createElement('div');
        locationItem.className = 'location-item';
        locationItem.innerHTML = `
            <span>${item.icon}</span>
            <span>${item.text}</span>
        `;
        container.appendChild(locationItem);
    });
}

function populateSkills() {
    const container = document.getElementById('skills-list');
    if (!container || !portfolioData.skills) return;
    
    container.innerHTML = '';
    
    const isMobile = isMobileDevice();
    const skillsToShow = isMobile ? portfolioData.skills.slice(0, 8) : portfolioData.skills;
    
    if (isMobile) {
        container.style.maxHeight = '200px';
        container.style.overflowY = 'auto';
        container.style.overflowX = 'hidden';
        container.style.paddingRight = '10px';
        
        if (!document.getElementById('mobile-skills-scroll-styles')) {
            const style = document.createElement('style');
            style.id = 'mobile-skills-scroll-styles';
            style.textContent = `
                @media (max-width: 768px) {
                    #skills-list::-webkit-scrollbar {
                        width: 4px;
                    }
                    #skills-list::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 2px;
                    }
                    #skills-list::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 2px;
                    }
                    #skills-list::-webkit-scrollbar-thumb:hover {
                        background: rgba(255, 255, 255, 0.5);
                    }
                    #skills-list {
                        scrollbar-width: thin;
                        scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    skillsToShow.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `${skill.icon} ${skill.name}`;
        
        skillItem.addEventListener('mouseenter', (e) => showTooltip(e, skill));
        skillItem.addEventListener('mouseleave', hideTooltip);
        skillItem.addEventListener('mousemove', (e) => updateTooltipPosition(e));
        
        container.appendChild(skillItem);
    });
}

function populateExperience() {
    const container = document.getElementById('experience-container');
    if (!container || !portfolioData.experience) return;
    
    container.innerHTML = '';
    
    const experiencesToShow = portfolioData.experience.slice(0, visibleExperiences);
    
    experiencesToShow.forEach(exp => {
        const expItem = document.createElement('div');
        expItem.className = 'timeline-item';
        
        const descriptions = exp.description.map(desc => `<li>${desc}</li>`).join('');
        
        expItem.innerHTML = `
            <div class="item-header">
                <div class="item-title">${exp.title}</div>
                <div class="item-date">${exp.date}</div>
            </div>
            <div class="item-description">
                <ul>${descriptions}</ul>
            </div>
        `;
        
        expItem.addEventListener('mouseenter', (e) => showTooltip(e, exp, 'experience'));
        expItem.addEventListener('mouseleave', hideTooltip);
        expItem.addEventListener('mousemove', (e) => updateTooltipPosition(e));
        
        container.appendChild(expItem);
    });

    const loadMoreBtn = document.getElementById('load-more-experience');
    if (loadMoreBtn) {
        if (portfolioData.experience.length > visibleExperiences) {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.textContent = portfolioData.loadMoreText || 'Load More Experience';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

function populateProjects() {
    const container = document.getElementById('projects-container');
    if (!container || !portfolioData.projects) return;
    
    container.innerHTML = '';
    
    const projectsToShow = portfolioData.projects.slice(0, visibleProjects);
    
    projectsToShow.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-card';
        
        if (project.url) {
            projectItem.style.cursor = 'pointer';
            projectItem.addEventListener('click', () => {
                window.open(project.url, '_blank');
            });
        }
        
        projectItem.innerHTML = `
            <span class="project-emoji">${project.emoji}</span>
            <div class="project-title">${project.name}</div>
            <div class="project-desc">${project.desc}</div>
        `;
        
        projectItem.addEventListener('mouseenter', (e) => showTooltip(e, project, 'project'));
        projectItem.addEventListener('mouseleave', hideTooltip);
        projectItem.addEventListener('mousemove', (e) => updateTooltipPosition(e));
        
        container.appendChild(projectItem);
    });

    const loadMoreBtn = document.getElementById('load-more-projects');
    if (loadMoreBtn) {
        if (portfolioData.projects.length > visibleProjects) {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.textContent = portfolioData.loadMoreProjectsText || 'Load More Projects';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

function populateAchievements() {
    const container = document.getElementById('achievements-container');
    if (!container || !portfolioData.achievements) return;
    
    container.innerHTML = '';
    
    const achievementsToShowCount = (portfolioData.config && portfolioData.config.achievementsToShow) || 6;
    const achievementsToShow = portfolioData.achievements.slice(0, achievementsToShowCount);
    
    achievementsToShow.forEach(achievement => {
        const achievementItem = document.createElement('div');
        achievementItem.className = 'achievement-card';
        
        achievementItem.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-text">${achievement.text}</div>
        `;
        
        container.appendChild(achievementItem);
    });
}

function loadMoreExperience() {
    const incrementBy = (portfolioData.config && portfolioData.config.experienceLoadIncrement) || 3;
    visibleExperiences += incrementBy;
    populateExperience();
}

function loadMoreProjects() {
    const incrementBy = (portfolioData.config && portfolioData.config.projectsLoadIncrement) || 6;
    visibleProjects += incrementBy;
    populateProjects();
}

function showTooltip(event, item, type) {
    const tooltip = document.getElementById('tooltip');
    if (!tooltip) return;
    
    let content = '';
    
    if (type === 'project') {
        const links = (item.hover && item.hover.links) ? 
            item.hover.links.map(link => `<a href="${link.url}" target="_blank" class="project-link">${link.name}</a>`).join('') : '';
        const skills = (item.hover && item.hover.skills) ? 
            `<div class="project-skills"><strong>Skills:</strong> ${item.hover.skills.join(', ')}</div>` : '';
        const clickHint = item.url ? '<div class="click-hint" style="margin-top: 8px; font-size: 0.8em; opacity: 0.8;">Click to open project</div>' : '';
        
        content = `
            <strong>${item.name}</strong><br>
            ${(item.hover && item.hover.description) || item.desc}
            ${links ? `<div class="project-links">${links}</div>` : ''}
            ${skills}
            ${clickHint}
        `;
    } else if (type === 'experience') {
        const skills = (item.hover && item.hover.skills) ? 
            `<div class="experience-skills"><strong>Technologies:</strong> ${item.hover.skills.join(', ')}</div>` : '';
        const achievements = (item.hover && item.hover.achievements) ? 
            `<div style="margin-top: 8px;"><strong>Key Achievements:</strong><br>${item.hover.achievements.map(ach => `• ${ach}`).join('<br>')}</div>` : '';
        
        content = `
            <strong>${item.title}</strong><br>
            ${(item.hover && item.hover.details) || 'Additional experience details'}
            ${skills}
            ${achievements}
        `;
    } else {
        const usage = (item.hover && item.hover.usage) || 'Used in various projects and applications';
        content = `
            <strong>${item.name}</strong>
            <div class="skill-usage">${usage}</div>
        `;
    }
    
    tooltip.innerHTML = content;
    tooltip.classList.add('show');
    
    updateTooltipPosition(event);
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
    }
}

function updateTooltipPosition(event) {
    const tooltip = document.getElementById('tooltip');
    if (!tooltip || !tooltip.classList.contains('show')) return;
    
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let left = event.clientX - tooltipRect.width / 2;
    let top = event.clientY - tooltipRect.height - 10;
    
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top < 10) {
        top = event.clientY + 10;
    }
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
}

function renderGitHubContributions() {
    const container = document.getElementById('github-contributions');
    const totalContributionsElement = document.getElementById('total-contributions');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    const { totalContributions, contributionsByDate } = hardcodedGithubData;
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    const contributionValues = Array.from(contributionsByDate.values()).filter(val => val > 0);
    const maxContributions = Math.max(...contributionValues, 1);
    
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
        const dateKey = d.toISOString().split('T')[0];
        const contributions = contributionsByDate.get(dateKey) || 0;
        
        const dayElement = document.createElement('div');
        dayElement.className = 'contribution-day';
        
        let level = 0;
        if (contributions > 0) {
            const percentage = contributions / maxContributions;
            if (percentage <= 0.25) level = 1;
            else if (percentage <= 0.5) level = 2;
            else if (percentage <= 0.75) level = 3;
            else level = 4;
        }
        
        dayElement.classList.add(`contribution-${level}`);
        dayElement.title = `${contributions} contributions`;
        
        dayElement.addEventListener('click', (event) => {
            if (contributions > 0) {
                showDayDetails(event, new Date(d), contributions);
            }
        });
        
        container.appendChild(dayElement);
    }
    
    if (totalContributionsElement) {
        totalContributionsElement.textContent = `${totalContributions} contributions in the last year`;
    }
}

function showDayDetails(event, date, contributions) {
    if (!portfolioData.config || portfolioData.config.showContributionDetails !== false) {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.innerHTML = `<strong>${contributions} contributions</strong>`;
            tooltip.classList.add('show');
            
            tooltip.style.left = event.clientX + 'px';
            tooltip.style.top = (event.clientY - 50) + 'px';
            
            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 2000);
        }
    }
}

function changeEmoji() {
    const emojiElement = document.getElementById('changingEmoji');
    if (emojiElement && portfolioData.emojis && portfolioData.emojis.length > 0) {
        emojiIndex = (emojiIndex + 1) % portfolioData.emojis.length;
        emojiElement.textContent = portfolioData.emojis[emojiIndex];
    }
}

function updateCurrentTrack() {
    const trackInfo = document.getElementById('current-track');
    const artworkElement = document.getElementById('music-artwork');
    
    if (!trackInfo) return;
    
    if (!portfolioData.music || portfolioData.music.length === 0) {
        trackInfo.textContent = portfolioData.noMusicMessage || 'No music available';
        if (artworkElement) {
            artworkElement.innerHTML = portfolioData.defaultMusicIcon || '🎵';
        }
        return;
    }
    
    const currentTrack = portfolioData.music[currentTrackIndex];
    trackInfo.textContent = currentTrack.title;
    
    if (artworkElement) {
        if (currentTrack.artwork) {
            const img = document.createElement('img');
            img.src = currentTrack.artwork;
            img.alt = currentTrack.title;
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 8px;
                transition: transform 0.3s ease;
            `;
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            img.onerror = () => {
                artworkElement.innerHTML = portfolioData.defaultMusicIcon || '🎵';
            };
            
            img.onmouseenter = () => {
                img.style.transform = 'scale(1.05)';
            };
            
            img.onmouseleave = () => {
                img.style.transform = 'scale(1)';
            };
            
            img.style.opacity = '0.8';
            artworkElement.innerHTML = '';
            artworkElement.appendChild(img);
        } else {
            artworkElement.innerHTML = portfolioData.defaultMusicIcon || '🎵';
        }
    }
}

function playMusic() {
    if (!portfolioData.music || portfolioData.music.length === 0) {
        showNotification('No music tracks available', 'warning');
        return;
    }

    if (!userInteracted) {
        showNotification('Please interact with the page first to enable music', 'info');
        return;
    }
    
    if (!youtubeAPIReady) {
        showNotification('YouTube player is loading, please wait...', 'info');
        return;
    }
    
    const currentTrack = portfolioData.music[currentTrackIndex];
    const videoId = extractYouTubeVideoId(currentTrack.url);
    
    if (!videoId) {
        showNotification('Invalid video URL, skipping track', 'error');
        nextTrack();
        return;
    }
    
    try {
        isPlaying = true;
        updatePlayButton();
        
        // Add a small delay to prevent rapid player creation
        setTimeout(() => {
            createYouTubePlayer(videoId);
        }, 100);
        
    } catch (error) {
        console.error('Error playing track:', error);
        isPlaying = false;
        updatePlayButton();
        showNotification('Error playing track, trying next', 'error');
        setTimeout(() => {
            nextTrack();
        }, 1000);
    }
}

function pauseMusic() {
    if (currentPlayer && playerReady) {
        try {
            currentPlayer.pauseVideo();
        } catch (e) {
            console.log('Error pausing player:', e);
        }
    }
    
    if (playbackTimer) {
        clearTimeout(playbackTimer);
        playbackTimer = null;
    }
    
    isPlaying = false;
    updatePlayButton();
}

function nextTrack() {
    if (!portfolioData.music || portfolioData.music.length === 0) return;
    
    const wasPlaying = isPlaying;
    
    // Stop current playback
    if (currentPlayer && playerReady) {
        try {
            currentPlayer.stopVideo();
        } catch (e) {
            console.log('Error stopping player:', e);
        }
    }
    
    // Clear timer
    if (playbackTimer) {
        clearTimeout(playbackTimer);
        playbackTimer = null;
    }
    
    // Move to next track
    currentTrackIndex = (currentTrackIndex + 1) % portfolioData.music.length;
    
    updateCurrentTrack();
    
    // Continue playing if was playing before
    if (wasPlaying && userInteracted && youtubeAPIReady) {
        setTimeout(() => {
            playMusic();
        }, 500);
    }
}

function updatePlayButton() {
    const controlBtns = document.querySelectorAll('.control-btn, .play-btn, .music-control');
    controlBtns.forEach(btn => {
        if (isPlaying) {
            btn.classList.add('playing', 'active');
            btn.classList.remove('paused');
            if (btn.textContent.includes('▶')) {
                btn.textContent = btn.textContent.replace('▶', '⏸');
            }
        } else {
            btn.classList.remove('playing', 'active');
            btn.classList.add('paused');
            if (btn.textContent.includes('⏸')) {
                btn.textContent = btn.textContent.replace('⏸', '▶');
            }
        }
    });
}


function downloadResume(event) {
    // Step 1: Show downloading popup
    const popup = document.createElement("div");
    popup.innerHTML = `
        <div style="text-align: center; font-family: Arial, sans-serif;">
            <h2 style="margin-bottom: 15px; color: #333;">Downloading Resume...</h2>
            <div class="loader"></div>
        </div>
    `;
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ffffff;
        padding: 30px;
        width: 320px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        border: 1px solid #ddd;
        animation: popIn 0.3s ease-out;
    `;
    document.body.appendChild(popup);

    // Loader CSS
    if (!document.getElementById("resume-popup-styles")) {
        const style = document.createElement("style");
        style.id = "resume-popup-styles";
        style.textContent = `
            .loader {
                border: 4px solid #f3f3f3;
                border-top: 4px solid #333;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                margin: auto;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes popIn {
                0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
            .resume-content {
                font-family: Arial, sans-serif;
                line-height: 1.4;
                color: #333;
            }
            .resume-content h1 {
                font-size: 24px;
                font-weight: bold;
                margin: 0 0 5px 0;
                text-align: center;
                color: #000;
            }
            .resume-content .subtitle {
                font-size: 14px;
                text-align: center;
                margin: 0 0 3px 0;
                color: #555;
            }
            .resume-content .contact-info {
                font-size: 12px;
                text-align: center;
                margin: 0 0 15px 0;
                color: #666;
            }
            .resume-content .contact-info a {
                color: #666;
                text-decoration: none;
            }
            .resume-content .section-divider {
                border: none;
                border-top: 1px solid #000;
                margin: 15px 0 10px 0;
            }
            .resume-content h2 {
                font-size: 14px;
                font-weight: bold;
                margin: 15px 0 8px 0;
                color: #000;
                text-transform: uppercase;
            }
            .resume-content p {
                font-size: 12px;
                margin: 5px 0;
                text-align: justify;
            }
            .resume-content ul {
                font-size: 12px;
                margin: 5px 0 10px 20px;
                padding: 0;
            }
            .resume-content li {
                margin: 3px 0;
            }
            .resume-content .job-header {
                font-weight: bold;
                font-size: 12px;
                margin: 8px 0 3px 0;
            }
            .resume-content .company-name {
                font-weight: bold;
            }
            .resume-content .job-period {
                float: right;
                font-weight: normal;
            }
        `;
        document.head.appendChild(style);
    }

    // Step 2: After delay, replace with resume content
    setTimeout(() => {
        const r = portfolioData.resumeData;

        popup.innerHTML = `
            <button id="closeResumePopup" style="
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #666;
                padding: 5px;
            ">✖</button>

            <div class="resume-content" style="overflow-y: auto; max-height: 90%; padding: 20px; width: 100%; box-sizing: border-box;">
                <h1>${r.name}</h1>
                <div class="subtitle">${r.title}</div>
                <div class="contact-info">
                    ${r.contact.phone} | ${r.contact.email} | 
                    <a href="${r.contact.linkedin}" target="_blank">LinkedIn</a> | 
                    <a href="${r.contact.github}" target="_blank">GitHub</a> | 
                    ${r.contact.location}
                </div>
                
                <hr class="section-divider">
                
                <h2>Summary</h2>
                <p>${r.summary}</p>

                <h2>Education</h2>
                <p><span class="company-name">${r.education.college}</span> (${r.education.years})<br>
                ${r.education.degree}<br>
                Minor: ${r.education.minor}<br>
                CGPA: ${r.education.cgpa}</p>

                <h2>Skills</h2>
                <ul>
                    <li><strong>Languages:</strong> ${r.skills.languages.join(", ")}</li>
                    <li><strong>Frameworks & Libraries:</strong> ${r.skills.frameworks.join(", ")}</li>
                    <li><strong>Databases & Cloud:</strong> ${r.skills.databases.join(", ")}</li>
                    <li><strong>Core Competencies:</strong> ${r.skills.competencies.join(", ")}</li>
                </ul>

                <h2>Work Experience</h2>
                ${r.experience.map(exp => `
                    <div class="job-header">
                        <span class="company-name">${exp.company}</span> | ${exp.role}
                        <span class="job-period">${exp.period}</span>
                    </div>
                    <ul>${exp.tasks.map(t => `<li>${t}</li>`).join("")}</ul>
                `).join("")}

                <h2>Projects</h2>
                ${r.projects.map(proj => `
                    <div class="job-header">
                        <span class="company-name">${proj.title}</span>
                        <span class="job-period">${proj.period}</span>
                    </div>
                    <ul>${proj.tasks.map(t => `<li>${t}</li>`).join("")}</ul>
                `).join("")}
            </div>
        `;

        // Close button action
        document.getElementById("closeResumePopup").addEventListener('click', function() {
            popup.remove();
        });

        // Resize popup for resume - clean rectangular design
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #f9f9f9;
            width: 85%;
            height: 90%;
            max-width: 900px;
            max-height: 800px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
            z-index: 10001;
            border: 3px solid #333;
            animation: popIn 0.3s ease-out;
        `;
    }, 2000); // show resume after 2s
}
function createResumeModal() {
    // Create modal for resume display
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10001;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        border-radius: 12px;
        font-family: Arial, sans-serif;
        position: relative;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    `;
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    
    return { modal, modalContent };
}

function setupKeyboardNavigation() {
    if (portfolioData.config && portfolioData.config.keyboardNavigation === false) return;
    
    document.addEventListener('keydown', function(event) {
        if (event.target.tagName === 'INPUT' || 
            event.target.tagName === 'TEXTAREA' || 
            event.target.contentEditable === 'true') {
            return;
        }
        
        switch(event.key) {
            case 'ArrowRight':
            case 'n':
            case 'N':
                event.preventDefault();
                nextTrack();
                break;
            case ' ':
                event.preventDefault();
                if (isPlaying) {
                    pauseMusic();
                } else {
                    playMusic();
                }
                break;
            case 'r':
            case 'R':
                event.preventDefault();
                downloadResume(event);
                break;
            case 'Escape':
                hideTooltip();
                break;
        }
    });
}

function setupScrollAnimations() {
    if (portfolioData.config && portfolioData.config.useScrollAnimations === false) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    const setupAnimations = () => {
        const cards = document.querySelectorAll('.card, .project-card, .achievement-card, .timeline-item');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(setupAnimations, 500);
        });
    } else {
        setTimeout(setupAnimations, 500);
    }
}

function setupEventListeners() {
    setupKeyboardNavigation();
    
    // Handle music control clicks
    document.addEventListener('click', (e) => {
        // Play/Pause button
        if (e.target.classList.contains('control-btn') || e.target.closest('.control-btn')) {
            e.preventDefault();
            if (!userInteracted) {
                userInteracted = true;
            }
            if (isPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        }
        
        // Next track button
        if (e.target.classList.contains('next-btn') || e.target.closest('.next-btn')) {
            e.preventDefault();
            if (!userInteracted) {
                userInteracted = true;
            }
            nextTrack();
        }
    });
    
    window.addEventListener('resize', () => {
        hideTooltip();
        setTimeout(populateSkills, 100);
    });
    
    // Handle visibility change to pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying && (!portfolioData.config || portfolioData.config.pauseOnTabChange !== false)) {
            pauseMusic();
        }
    });
    
    // Handle resume button
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            downloadResume(event);
        });
    }
}

// Clean up function
function cleanup() {
    if (currentPlayer && playerReady) {
        try {
            currentPlayer.destroy();
        } catch (e) {
            console.log('Error destroying player during cleanup:', e);
        }
        currentPlayer = null;
    }
    
    if (playbackTimer) {
        clearTimeout(playbackTimer);
        playbackTimer = null;
    }
    
    // Remove player div
    const playerDiv = document.getElementById('youtube-player-div');
    if (playerDiv) {
        playerDiv.remove();
    }
    
    playerReady = false;
    isPlaying = false;
}

// Clean up on page unload
window.addEventListener('beforeunload', cleanup);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
    setupEventListeners();
    setupScrollAnimations();
});

// Global functions for external access
window.portfolioFunctions = {
    loadMoreExperience,
    loadMoreProjects,
    playMusic,
    pauseMusic,
    nextTrack,
    downloadResume,
    refreshGitHubData: () => {
        hardcodedGithubData.contributionsByDate = generateContributionData();
        hardcodedGithubData.totalContributions = Array.from(hardcodedGithubData.contributionsByDate.values())
            .reduce((total, count) => total + count, 0);
        renderGitHubContributions();
    },
    getCurrentTrack: () => {
        if (portfolioData.music && portfolioData.music.length > 0) {
            return portfolioData.music[currentTrackIndex];
        }
        return null;
    },
    getPlayerState: () => {
        return {
            isPlaying,
            currentTrackIndex,
            playerReady,
            userInteracted,
            youtubeAPIReady,
            totalTracks: portfolioData.music ? portfolioData.music.length : 0
        };
    },
    stopMusic: () => {
        pauseMusic();
    },
    isCurrentlyPlaying: () => isPlaying,
    enableUserInteraction: () => {
        userInteracted = true;
    },
    seekToTrack: (index) => {
        if (portfolioData.music && index >= 0 && index < portfolioData.music.length) {
            const wasPlaying = isPlaying;
            pauseMusic();
            currentTrackIndex = index;
            updateCurrentTrack();
            if (wasPlaying && userInteracted && youtubeAPIReady) {
                setTimeout(() => playMusic(), 500);
            }
        }
    },
    cleanup
};
