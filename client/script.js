// Get the button element
const scrollButton = document.getElementById('scrollButton');

// Show the button when the user scrolls down 100px from the top
window.onscroll = function () {
if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollButton.style.display = 'block';
} else {
    scrollButton.style.display = 'none';
}
};

// Scroll to the top of the document
function scrollToTop() {
window.scrollTo({
    top: 0,
    behavior: 'smooth',
});
}