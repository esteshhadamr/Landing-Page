/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


//Add EventListener 'DOMContentLoaded' to document 
document.addEventListener('DOMContentLoaded', (event) => {

    /**
     * Define Global Variables
    */
    //navigation Global var
    const navigation = document.getElementById('navbar__list');

    //Sections Global var
    const Sections = document.querySelectorAll("section");


    /**
     * End Global Variables
     * Start Helper Functions
     * 
    */

    //Function to determine viewport of section , return true if it's position in viewport else return false
    const isInView = (section) => {

        const sectionPosition = section.getBoundingClientRect();
        let secOffset = Math.floor(sectionPosition.top);
        return secOffset < 150 && secOffset >= -150;
    };

    //remove 'your-active-class' class from all sections
    const removeAllActiveFromSection = () => {
        Sections.forEach((section) => {
            section.classList.remove('your-active-class');
        })
    };

    //remove 'active-link' class from all links
    const removeAllActiveFromLinks = () => {
        const navLinks = document.querySelectorAll('.navbar__menu a');
        navLinks.forEach((navlink) => {
            navlink.classList.remove("active-link");
        })
    };

    // Add class 'active-link' to navLink  which  it's section in viewport
    const addActivetoLink = (section) => {
        removeAllActiveFromLinks();

        const navLinks = document.querySelectorAll('.navbar__menu a');
        for (let navlink of navLinks) {
            navlink.classList.remove("active-link");
            const activelink = navlink.getAttribute("href").substring(1);
            if (section.id === activelink) {
                navlink.classList.add("active-link");
            }
            else {
                navlink.classList.remove("active-link");
            }
        };
    };

    // Add class 'your-active-class' to section when near top of viewport
    const addActiveToSection = (codition, section) => {
        if (codition) {
            section.classList.add('your-active-class');
            removeAllActiveFromLinks();
            addActivetoLink(section);
        }
    };

    /**
     * End Helper Functions
     * Begin Main Functions
    */

    // build the nav

    (function () {
        for (let section of Sections) {
            const sectionID = section.id;
            const sectionDataNav = section.dataset.nav;
            //Create 'li' element for each nav item 
            const navItem = document.createElement('li');
            navItem.innerHTML = `<a class="menu__link" href="#${sectionID}"> ${sectionDataNav}</a>`;
            //Append navitem to navigation
            navigation.appendChild(navItem);
        }
    })();


    // Add class 'your-active-class' to section when near top of viewport
    const sectionActivation = () => {
        Sections.forEach((sec) => {
            const isInViewport = isInView(sec);
            if (isInViewport) {
                removeAllActiveFromSection();
                addActiveToSection(isInViewport, sec);
            }
        })

    };

    // Scroll to section when link clicked
    (function () {
        const ScrollToSection = () => {
            const menuLinks = document.querySelectorAll('.navbar__menu a');
            for (let menuLink of menuLinks) {
                menuLink.addEventListener('click', function (event) {
                    e.preventDefault();
                    const sectionId = menuLink.getAttribute("href").substring(1);
                    const appropriateSection = document.getElementById(sectionId);
                    const rect = appropriateSection.getBoundingClientRect();
                    window.scrollTo(rect.top, rect.y);
                    addActivetoLink(appropriateSection);
                })
            }
        }

    })();

    // End Main Functions


    /* Begin Events    */

    //Section Active State while scrolling through the page

    window.addEventListener('scroll', sectionActivation);

});