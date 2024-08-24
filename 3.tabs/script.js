window.addEventListener('DOMContentLoaded', function() {
    const allTabContentEls = document.querySelectorAll(".tab-content");
    let activeTabId;


    const updateActiveTab = (tabId) => {
        if (document.querySelector(".tabs .tab.active")) {
            document.querySelector(".tabs .tab.active").classList.remove("active")
        }
        
        let activeTabId = tabId;

        const activeTabEl = document.querySelector(`.tabs .tab[data-tab-id="${tabId}"`)
        activeTabEl.classList.add("active");

        allTabContentEls.forEach(tabContentEl => {
            const tabContentTabId = tabContentEl.dataset.tabId;

            if (tabContentTabId === activeTabId) {
                tabContentEl.style.display = "block";
            } else {
                tabContentEl.style.display = "none";
            }
        })
    } 

    // Init
    const activeTabEl = document.querySelector(".tabs .tab.active");
    updateActiveTab(activeTabEl?.dataset?.tabId || "1");

    // On tab click
    document.querySelectorAll("button.tab").forEach(tabButton => {
        tabButton.addEventListener("click", function(e) {
            if (e.target.dataset.tabId === activeTabId) {
                return;
            }

            updateActiveTab(e.target.dataset.tabId);
        })
    })

})