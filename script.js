//ratings and reviews
let selectedRating = 0;

// Load reviews on page load
window.onload = () => {
  loadStoredReviews();
  setupStars();
};

// Setup star selection
function setupStars() {
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-value'));
      updateStarDisplay();
    });
  });
}

// Update star UI
function updateStarDisplay() {
  document.querySelectorAll('.star').forEach(star => {
    const val = parseInt(star.getAttribute('data-value'));
    star.classList.toggle('selected', val <= selectedRating);
  });
}

// Display a single review
function displayReview(name, text, rating) {
  const reviewDiv = document.createElement('div');
  reviewDiv.classList.add('review');

  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? '★' : '☆';
  }

  reviewDiv.innerHTML = `
    <strong>${name}</strong>
    <p>${text}</p>
    <div style="color: gold; font-size: 18px;">${stars}</div>
  `;

  document.getElementById('review-list').prepend(reviewDiv);
}

// Submit and store review
function submitReview() {
  const name = document.getElementById('review-name').value.trim();
  const text = document.getElementById('review-text').value.trim();

  if (name === '' || text === '' || selectedRating === 0) {
    alert('Please fill out all fields and select a rating.');
    return;
  }

  const review = { name, text, rating: selectedRating };
  displayReview(name, text, selectedRating);

  // Save to localStorage
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.unshift(review); // add to top
  localStorage.setItem('reviews', JSON.stringify(reviews));

  // Reset form
  document.getElementById('review-name').value = '';
  document.getElementById('review-text').value = '';
  selectedRating = 0;
  updateStarDisplay();
}

// Load reviews from localStorage
function loadStoredReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.reverse().forEach(review => {
    displayReview(review.name, review.text, review.rating);
  });
}

//image slide
let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change slide every 2 seconds
}



// chatbot.js
function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (message === "") return;

  addMessageToChat("user", message);
  input.value = "";

  const response = getBotResponse(message.toLowerCase());
  setTimeout(() => {
    addMessageToChat("bot", response);
  }, 500); // slight delay like real chat
}

function addMessageToChat(sender, message) {
  const chatlog = document.getElementById("chatlog");
  const msgDiv = document.createElement("div");
  msgDiv.className = sender;
  msgDiv.innerHTML = message.replace(/\n/g, "<br>"); // support newlines
  chatlog.appendChild(msgDiv);
  chatlog.scrollTop = chatlog.scrollHeight;
}


function getBotResponse(message) {
  message = message.toLowerCase();
  const foodKeywords = ["food", "meals", "menu", "khana", "bhojan"];
  if (foodKeywords.some(word => message.includes(word))) {
    return "🍽️ Here's what we serve:" +
         " *Breakfast🥞*: Poha, Upma, Tea, and Biscuits" +
         " *Lunch🍛*: Veg thali with Bhakri, Rice, Dal, Sabzi, Papad, and Pickle" +
         " *Dinner🍲*: Same as lunch with extra sweets";
  }
  if (message.includes("rent") || message.includes("rate")) {
    return "AC Room: ₹2000/night, Non-AC Room: ₹1500/night.";
  } else if (message.includes("lunch")) {
    return "🍛Lunch includes veg thali with bhakri, rice, dal, sabzi, papad, and pickle.";
  } else if (message.includes("dinner")) {
    return "🍲Dinner is similar to lunch with extra sweets.";
  } else if (message.includes("Hi") || message.includes("hi") || message.includes("Hello")) {
    return "Welcome to Ekveera Farmhouse. How may I help you? If query persists contact on 8369895048";
  } else if (message.includes("breakfast")) {
    return "🥞Breakfast includes poha, upma, tea, and biscuits.";
  } else if (message.includes("checkin") || message.includes("check-in")) {
    return "Check-in time: 12:00 PM. Check-out time: 10:00 AM.";
  } else if (message.includes("services") || message.includes("amenities")) {
    return "*AC/Non-AC Rooms Traditional* *Maharashtrian Food* *Swimming Pool* *Bonfire* *Children's Play Area*";
  } else {
    return "Sorry, I didn't understand that. Try asking about room rent, food, services, or check-in.";
  }
}
