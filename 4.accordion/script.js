window.addEventListener("DOMContentLoaded", function() {
    const allAccordionContainerEls = document.querySelectorAll(".accordion-container");

    allAccordionContainerEls.forEach(accordionContainerEl => {
        const allAccordionEls = accordionContainerEl.querySelectorAll(".accordion");
    
        allAccordionEls.forEach(accordionEl => {
            accordionEl.querySelector(".accordion-header").addEventListener("click", function(e) {
                const accordionEl = e.target.parentElement;
                // collapse
                if (accordionEl.classList.contains("active")) {
                   accordionEl.classList.remove("active");
                // open
                } else {
                    allAccordionEls.forEach(_accordionEl => {
                        _accordionEl.classList.remove("active");
                    })
                    accordionEl.classList.add("active");
                }
            })
        })
    })

});