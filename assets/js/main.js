/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    toggle.addEventListener('click', () => {
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
        // Add show-icon to show and hide menu icon
        toggle.classList.toggle('show-icon')
    })
}

showMenu('nav-toggle', 'nav-menu')

/*=============== SHOW DROPDOWN MENU ===============*/
const dropdownItems = document.querySelectorAll('.dropdown__item')

// 1. Select each dropdown item
dropdownItems.forEach((item) => {
    const dropdownButton = item.querySelector('.dropdown__button')

    // 2. Select each button click
    dropdownButton.addEventListener('click', () => {
        // 7. Select the current show-dropdown class
        const showDropdown = document.querySelector('.show-dropdown')

        // 5. Call the toggleItem function
        toggleItem(item)

        // 8. Remove the show-dropdown class from other items
        if (showDropdown && showDropdown !== item) {
            toggleItem(showDropdown)
        }
    })
})

// 3. Create a function to display the dropdown
const toggleItem = (item) => {
    // 3.1. Select each dropdown content
    const dropdownContainer = item.querySelector('.dropdown__container')

    // 6. If the same item contains the show-dropdown class, remove
    if (item.classList.contains('show-dropdown')) {
        dropdownContainer.removeAttribute('style')
        item.classList.remove('show-dropdown')
    } else {
        // 4. Add the maximum height to the dropdown content and add the show-dropdown class
        dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
        item.classList.add('show-dropdown')
    }
}

/*=============== DELETE DROPDOWN STYLES ===============*/
const mediaQuery = matchMedia('(min-width: 1118px)'),
    dropdownContainer = document.querySelectorAll('.dropdown__container')

// Function to remove dropdown styles in mobile mode when browser resizes
const removeStyle = () => {
    // Validate if the media query reaches 1118px
    if (mediaQuery.matches) {
        // Remove the dropdown container height style
        dropdownContainer.forEach((e) => {
            e.removeAttribute('style')
        })

        // Remove the show-dropdown class from dropdown item
        dropdownItems.forEach((e) => {
            e.classList.remove('show-dropdown')
        })
    }
}

$(window).on("scroll", function() {
    if($(window).scrollTop() > 50) {
        $(".header").addClass("active");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
       $(".header").removeClass("active");
    }
});


addEventListener('resize', removeStyle)



const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav__link");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 70; 
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(currentSection)) {
            link.classList.add("active");
        }
    });
});

     // אימות בסיסי בצד הלקוח
     document.getElementById("contactForm").addEventListener("submit", function (event) {
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;

        if (!neme.includes("name")) {
            alert("נא להזין כתובת דוא\"ל תקינה.");
            event.preventDefault();
        }

        if (phone && isNaN(phone)) {
            alert("נא להזין מספר טלפון תקין.");
            event.preventDefault();
        }
    });

    // card section desing
    document.addEventListener("DOMContentLoaded", () => {
        const cards = document.querySelectorAll(".card");
      
        // Function to reveal cards on page load with delay
        const revealCards = () => {
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("visible");
            }, index * 300); // Delay for each card
          });
        };
      
        // Trigger the animation
        revealCards();
      });