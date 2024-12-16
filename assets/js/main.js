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

      /* section calculator design*/

      const rowsPerPage = 10;
      let currentPage = 1;
      let amortizationData = [];

      // פונקציה לחישוב המשכנתא
      function calculateMortgage() {
          const loanAmount = parseFloat(document.getElementById("loanAmount").value);
          const annualInterestRate = parseFloat(document.getElementById("annualInterestRate").value);
          const loanTerm = parseInt(document.getElementById("loanTerm").value);
          
          if (isNaN(loanAmount) || isNaN(annualInterestRate) || isNaN(loanTerm)) {
              alert("אנא מלא את כל השדות בצורה נכונה.");
              return;
          }

          const monthlyInterestRate = (annualInterestRate / 100) / 12;
          const numberOfPayments = loanTerm * 12;
          const monthlyPayment = 
              (loanAmount * monthlyInterestRate) / 
              (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

          amortizationData = generateAmortizationData(loanAmount, monthlyInterestRate, monthlyPayment, numberOfPayments);
          currentPage = 1;
          renderTable();
      }

      // יצירת נתונים של לוח סילוקין
      function generateAmortizationData(loanAmount, monthlyInterestRate, monthlyPayment, numberOfPayments) {
          let balance = loanAmount;
          const data = [];
          
          for (let i = 1; i <= numberOfPayments; i++) {
              const interestPayment = balance * monthlyInterestRate;
              const principalPayment = monthlyPayment - interestPayment;
              balance -= principalPayment;
              data.push({
                  paymentNumber: i,
                  monthlyPayment: monthlyPayment.toFixed(2),
                  interestPayment: interestPayment.toFixed(2),
                  principalPayment: principalPayment.toFixed(2),
                  remainingBalance: balance.toFixed(2),
              });
          }
          return data;
      }

      // הצגת הטבלה עם נתוני המשכנתא
      function renderTable() {
          const start = (currentPage - 1) * rowsPerPage;
          const end = start + rowsPerPage;
          const currentData = amortizationData.slice(start, end);

          let tableHTML = `<table>
              <tr>
                  <th>מספר תשלום</th>
                  <th>תשלום חודשי (₪)</th>
                  <th>ריבית (₪)</th>
                  <th>קרן (₪)</th>
                  <th>יתרה (₪)</th>
              </tr>`;
          
          currentData.forEach(row => {
              tableHTML += `
                  <tr>
                      <td>${row.paymentNumber}</td>
                      <td>${row.monthlyPayment}</td>
                      <td>${row.interestPayment}</td>
                      <td>${row.principalPayment}</td>
                      <td>${row.remainingBalance}</td>
                  </tr>
              `;
          });

          tableHTML += `</table>`;
          tableHTML += renderPagination();
          document.getElementById("results").innerHTML = tableHTML;
      }

      // יצירת כפתורי הפגינציה
      function renderPagination() {
          const totalPages = Math.ceil(amortizationData.length / rowsPerPage);
          let paginationHTML = `<div class="pagination">`;

          paginationHTML += `
              <button onclick="changePage(1)" ${currentPage === 1 ? 'class="disabled"' : ''}>←</button>
              <span>עמוד ${currentPage} מתוך ${totalPages}</span>
              <button onclick="changePage(${totalPages})" ${currentPage === totalPages ? 'class="disabled"' : ''}>→</button>
          `;
          
          paginationHTML += `</div>`;
          return paginationHTML;
      }

      // שינוי עמוד בעזרת כפתורים
      function changePage(page) {
          if (page < 1 || page > Math.ceil(amortizationData.length / rowsPerPage)) return;
          currentPage = page;
          renderTable();
      }

      // הוספת מאזין לכפתור החישוב
      document.getElementById("calculateButton").addEventListener("click", calculateMortgage);