// Show or hide the answer when a FAQ question is clicked.
function toggleFaq(question) {
    const answer = document.getElementById(question.getAttribute("aria-controls"));
    const isOpen = answer.classList.toggle("open");

    question.setAttribute("aria-expanded", String(isOpen));
    question.querySelector("span").textContent = isOpen ? "−" : "+";
}

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
        toggleFaq(question);
    });
});
