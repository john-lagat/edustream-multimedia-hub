class AnimationController {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.lastFrameTime = 0;
    }

    startAnimation() {
        this.lastFrameTime = performance.now();
        this.animate();
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastFrameTime;
        this.update(deltaTime);
        this.render();
        this.lastFrameTime = currentTime;
    }

    update(deltaTime) {
        // Update particles
        this.particles.forEach((particle, index) => {
            particle.update(deltaTime);
            // Remove particles that are out of bounds
            if (particle.isOutOfBounds()) {
                this.particles.splice(index, 1);
            }
        });
    }

    render() {
        // Clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw particles
        this.particles.forEach(particle => particle.draw(this.context));
        // Add image filtering logic
        // Example: Apply grayscale filter on the entire canvas
        this.context.filter = 'grayscale(100%)';
        this.context.drawImage(this.canvas, 0, 0);
        this.context.filter = 'none'; // Reset filter
    }

    addParticle(particle) {
        this.particles.push(particle);
    }

    stopAnimation() {
        cancelAnimationFrame(this.animationId);
    }
}

class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = Math.random() * 2 - 1;
        this.velocityY = Math.random() * 2 - 1;
    }

    update(deltaTime) {
        this.x += this.velocityX * (deltaTime / 16);
        this.y += this.velocityY * (deltaTime / 16);
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    isOutOfBounds() {
        return (this.x < 0 || this.x > context.canvas.width || this.y < 0 || this.y > context.canvas.height);
    }
}
