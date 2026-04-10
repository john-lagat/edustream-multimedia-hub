class AudioPlayer {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.currentSound = null;
        this.volume = 1.0;
        this.isMuted = false;
    }

    play(buffer) {
        this.stop();
        this.currentSound = this.audioContext.createBufferSource();
        this.currentSound.buffer = buffer;
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = this.isMuted ? 0 : this.volume;
        this.currentSound.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        this.currentSound.start(0);
    }

    pause() {
        if (this.currentSound) {
            this.currentSound.stop();
        }
    }

    stop() {
        if (this.currentSound) {
            this.currentSound.stop();
            this.currentSound = null;
        }
    }

    seek(time) {
        if (this.currentSound) {
            this.currentSound.stop();
            this.play(this.currentSound.buffer); // Must load the buffer again if we want to seek.
            this.currentSound.start(0, time);
        }
    }

    setVolume(value) {
        this.volume = value;
        if (this.currentSound) {
            this.currentSound.gain.value = this.isMuted ? 0 : this.volume;
        }
    }

    mute() {
        this.isMuted = true;
        if (this.currentSound) {
            this.currentSound.gain.value = 0;
        }
    }

    unmute() {
        this.isMuted = false;
        this.setVolume(this.volume);
    }
}

class ToneGenerator {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    generateTone(frequency, duration) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine'; // Can change to square, sawtooth, etc.
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        // ADSR Envelope
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 0.1); // Attack
        gainNode.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + 0.5); // Decay
        gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration - 0.1); // Release

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
}