class Gallery {
    constructor(items) {
        this.items = items;
        this.filteredItems = items;
        this.modal = document.getElementById('modal');
        this.modalContent = document.getElementById('modalContent');
        this.init();
    }

    init() {
        this.render();
        this.setupSearch();
        this.setupModal();
    }

    render() {
        const galleryContainer = document.getElementById('gallery');
        galleryContainer.innerHTML = ''; 
        this.filteredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'gallery-item';
            itemElement.innerHTML = `
                <img src="${item.src}" alt="${item.alt}" onclick="gallery.openModal('${item.src}')">
                <h3>${item.title}</h3>
            `;
            galleryContainer.appendChild(itemElement);
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', (event) => {
            const query = event.target.value.toLowerCase();
            this.filteredItems = this.items.filter(item => item.title.toLowerCase().includes(query));
            this.render();
        });
    }

    openModal(src) {
        this.modal.style.display = 'block';
        this.modalContent.innerHTML = `<img src="${src}" alt="Modal Image">`;
    }

    closeModal() {
        this.modal.style.display = 'none';
    }
}

// Sample multimedia items
const items = [
    { src: 'url_to_image1.jpg', title: 'Image 1', alt: 'Image 1 Description' },
    { src: 'url_to_image2.jpg', title: 'Image 2', alt: 'Image 2 Description' },
    { src: 'url_to_image3.jpg', title: 'Image 3', alt: 'Image 3 Description' },
    { src: 'url_to_image4.jpg', title: 'Image 4', alt: 'Image 4 Description' },
    { src: 'url_to_image5.jpg', title: 'Image 5', alt: 'Image 5 Description' },
    { src: 'url_to_image6.jpg', title: 'Image 6', alt: 'Image 6 Description' },
    { src: 'url_to_image7.jpg', title: 'Image 7', alt: 'Image 7 Description' },
    { src: 'url_to_image8.jpg', title: 'Image 8', alt: 'Image 8 Description' },
    { src: 'url_to_image9.jpg', title: 'Image 9', alt: 'Image 9 Description' },
    { src: 'url_to_image10.jpg', title: 'Image 10', alt: 'Image 10 Description' },
    { src: 'url_to_image11.jpg', title: 'Image 11', alt: 'Image 11 Description' },
    { src: 'url_to_image12.jpg', title: 'Image 12', alt: 'Image 12 Description' },
];

// Initialize Gallery
const gallery = new Gallery(items);