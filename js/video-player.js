class VideoPlayer {
    constructor(videoElement) {
        this.videoElement = videoElement;
        this.playbackSpeed = 1;
        this.isFullscreen = false;
        this.captionsEnabled = false;
        this.videoState = { isPlaying: false, currentTime: 0, duration: 0 };

        this.setupControls();
        this.updateVideoState();
    }

    setupControls() {
        const playButton = document.createElement('button');
        playButton.innerText = 'Play';
        playButton.onclick = () => this.play();
        document.body.appendChild(playButton);

        const pauseButton = document.createElement('button');
        pauseButton.innerText = 'Pause';
        pauseButton.onclick = () => this.pause();
        document.body.appendChild(pauseButton);

        const speedSelect = document.createElement('select');
        [0.5, 1, 1.5, 2].forEach(speed => {
            const option = document.createElement('option');
            option.value = speed;
            option.text = `${speed}x`;
            speedSelect.appendChild(option);
        });
        speedSelect.onchange = (event) => this.setPlaybackSpeed(event.target.value);
        document.body.appendChild(speedSelect);

        const fullscreenButton = document.createElement('button');
        fullscreenButton.innerText = 'Toggle Fullscreen';
        fullscreenButton.onclick = () => this.toggleFullscreen();
        document.body.appendChild(fullscreenButton);

        const captionsButton = document.createElement('button');
        captionsButton.innerText = 'Toggle Captions';
        captionsButton.onclick = () => this.toggleCaptions();
        document.body.appendChild(captionsButton);
    }

    play() {
        this.videoElement.play();
        this.videoState.isPlaying = true;
        this.updateVideoState();
    }

    pause() {
        this.videoElement.pause();
        this.videoState.isPlaying = false;
        this.updateVideoState();
    }

    setPlaybackSpeed(speed) {
        this.playbackSpeed = speed;
        this.videoElement.playbackRate = speed;
    }

    toggleFullscreen() {
        if (!this.isFullscreen) {
            this.videoElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        this.isFullscreen = !this.isFullscreen;
    }

    toggleCaptions() {
        this.captionsEnabled = !this.captionsEnabled;
        // Logic to show/hide captions goes here
    }

    updateVideoState() {
        this.videoState.currentTime = this.videoElement.currentTime;
        this.videoState.duration = this.videoElement.duration;
        // Update video state display logic if needed
    }
}

// Usage Example:
// const player = new VideoPlayer(document.querySelector('video'));