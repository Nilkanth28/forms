// Initialize Flatpickr with a custom flow for day->month->year
const dateInput = document.getElementById('dateInput');
const calendarIcon = document.getElementById('calendarIcon');
const errorMsg = document.getElementById('errorMsg');

// Restrict manual input to valid numbers and format (dd/mm/yyyy)
dateInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length > 8) value = value.slice(0, 8); // Restrict to 8 digits

    let day = value.slice(0, 2);
    let month = value.slice(2, 4);
    let year = value.slice(4, 8);

    if (day > 31) day = '31'; // Restrict day to 31 max
    if (month > 12) month = '12'; // Restrict month to 12 max

    e.target.value = `${day.padEnd(2, '_')}/${month.padEnd(2, '_')}/${year.padEnd(4, '_')}`; // Format dd/mm/yyyy

    // Add error message for invalid inputs
    if (day === '00' || month === '00' || parseInt(day) > 31 || parseInt(month) > 12) {
        errorMsg.innerText = 'Invalid date or month';
    } else {
        errorMsg.innerText = '';
    }
});

// Flatpickr instance with custom behavior
const flatpickrInstance = flatpickr(dateInput, {
    allowInput: true,
    dateFormat: "d/m/Y", // Format to dd/mm/yyyy
    clickOpens: false,    // Prevent default open on input field click
    onReady: function(selectedDates, dateStr, instance) {
        instance.changeMode = function(newMode) {
            instance.currentMode = newMode;
            instance.redraw();
        };
    },
    onOpen: function(selectedDates, dateStr, instance) {
        // Start with day selection
        instance.currentMode = 'day';
        instance.redraw();
    },
    onChange: function(selectedDates, dateStr, instance) {
        if (instance.currentMode === 'day') {
            // After selecting the day, switch to month selection
            instance.changeMode('month');
        } else if (instance.currentMode === 'month') {
            // After selecting the month, switch to year selection (1850-2025)
            instance.changeMode('year');
            instance.set('minDate', '1850');
            instance.set('maxDate', '2025');
        }
    },
    onClose: function(selectedDates, dateStr, instance) {
        // Set the formatted date when the calendar is closed
        if (selectedDates.length > 0) {
            const formattedDate = instance.formatDate(selectedDates[0], 'd/m/Y');
            dateInput.value = formattedDate;
        }
    }
});

// Open the date picker when the calendar icon is clicked
calendarIcon.addEventListener('click', () => {
    flatpickrInstance.open();
});
