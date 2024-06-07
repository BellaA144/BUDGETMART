// feedback.js

document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    const ratingStars = document.querySelectorAll('.rating .star');
    const feedbackReasonContainer = document.getElementById('feedbackReasonContainer');
    const feedbackReasonTextarea = document.getElementById('feedbackReason');
    const feedbackTableBody = document.querySelector('#feedbackTable tbody');

    let currentRating = 5; // Default rating

    // Event listeners for rating stars
    ratingStars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = index + 1; // Index starts from 0, rating starts from 1
            updateRating(rating);
        });
    });

    // Event listener for feedback form submission
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitFeedback();
    });

    // Update rating based on user selection
    function updateRating(rating) {
        currentRating = rating;
        ratingStars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = 'orange';
            } else {
                star.style.color = 'black';
            }
        });

        // Show feedback reason container if rating is below 3
        if (rating < 3) {
            feedbackReasonContainer.style.display = 'block';
        } else {
            feedbackReasonContainer.style.display = 'none';
        }
    }

    // Submit feedback
    function submitFeedback() {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const rating = currentRating;
        const feedbackReason = feedbackReasonTextarea.value;

        // Clear form fields
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        ratingStars.forEach(star => {
            star.style.color = 'black';
        });
        ratingStars[4].style.color = 'orange'; // Set default rating to 5 stars
        feedbackReasonTextarea.value = '';
        feedbackReasonContainer.style.display = 'none';

        // Update feedback history table
        updateFeedbackHistory(title, description, rating);
    }

    // // Update feedback history table
    function updateFeedbackHistory(title, description, rating) {
        const row = feedbackTableBody.insertRow();
        row.innerHTML = `
            <td>${title}</td>
            <td>${description}</td>
            <td>${rating}</td>
            <td class="status-pending">Pending</td>
        `;
    }

    // For demonstration, let's add some dummy feedback data
    updateFeedbackHistory('Sample Feedback 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4);
    updateFeedbackHistory('Sample Feedback 2', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 5);
});
