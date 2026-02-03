// Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Video Modal functionality
const createVideoModal = () => {
    if (!document.getElementById('videoModal')) {
        const modal = document.createElement('div');
        modal.id = 'videoModal';
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-content">
                <span class="close-modal">&times;</span>
                <div class="video-container">
                    <video id="modalVideo" controls autoplay>
                        <source src="" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

// Open video in modal
const openVideoModal = (videoSrc) => {
    createVideoModal();
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    const source = video.querySelector('source');
    
    source.src = videoSrc;
    video.load();
    video.play();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

// Close video modal
const closeVideoModal = () => {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    
    video.pause();
    video.currentTime = 0;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createVideoModal();
    
    // Close modal handlers
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }
    
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'videoModal') {
                closeVideoModal();
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
    });
    
    // Setup portfolio items — each card opens its matching video
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const videoFiles = [
        'FINI intro.MP4',                                    // 1  - Dj Wail Bouri
        'vlog 1 test  .MP4',                                 // 2  - Turkey vlog
        'z,2222222.MP4',                                     // 3  - Get V1
        'z,123.MP4',                                         // 4  - Get V2
        'z,33333333333.MP4',                                 // 5  - Get V3
        'reeel 1.MP4',                                       // 6  - Deentler V1
        'reel 2.MP4',                                        // 7  - Deentler V2
        'reel 3.MP4',                                        // 8  - Deentler V3
        'chilla.MP4',                                        // 9  - Chilla event
        'bouda seuuuuu.MP4',                                 // 10 - SLS
        'fini chab lab.MP4',                                 // 11 - Chap-Lab
        'fini 1.MP4',                                        // 12 - Machinery
        'maison karkina.MP4',                                // 13 - Rental House
        'reel fini 3 logo .MP4',                             // 14 - Cosmetic Qatar
        '1234.MP4',                                          // 15 - Subway
        'test 1.MP4',                                        // 16 - Cardboard
        'bebeto .MP4',                                       // 17 - bebeto
        'fini abdel aziz.MP4',                               // 18 - Wedding V1
        'shoting mahdi.MP4',                                 // 19 - Wedding V2
        'amal wissem.MP4',                                   // 20 - Wedding V3
        'praparation ibrahim 2.MP4',                         // 21 - Wedding V4
        'mariage ibrahim.mp4',                               // 22 - Wedding V5
        'copy_72FEBA0D-D890-49BF-854D-0EBE2796AB40.mp4',    // 23 - Recap party
    ];
    
    portfolioItems.forEach((item, index) => {
        if (videoFiles[index]) {
            item.addEventListener('click', function() {
                openVideoModal(videoFiles[index]);
            });
        }
    });
});