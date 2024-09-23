document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const addBasicUserFieldButton = document.getElementById('add-basic-user-field');
    const addDynamicFieldsButton = document.getElementById('add-dynamic-fields');
    const addOtherFieldsButton = document.getElementById('add-other-fields');
    const addConditionalFieldsButton = document.getElementById('add-conditional-fields');
    const roleSelect = document.getElementById('role');

    let basicFieldsAdded = false;

    // Function to create the basic user information fields (5 default fields)
    const createBasicUserFields = () => {
        if (!basicFieldsAdded) {
            const fields = [
                { placeholder: 'Username', type: 'text' },
                { placeholder: 'Last Name', type: 'text' },
                { placeholder: 'Email', type: 'email' },
                { placeholder: 'Phone Number', type: 'tel' },
                { placeholder: 'Address', type: 'text' }
            ];

            fields.forEach(field => {
                const userField = document.createElement('div');
                userField.classList.add('user-field');
                const input = document.createElement('input');
                input.setAttribute('type', field.type);
                input.setAttribute('placeholder', field.placeholder);
                userField.appendChild(input);
                userForm.appendChild(userField);
            });

            basicFieldsAdded = true; // Prevent adding basic fields multiple times
        }
    };

    // Function to create a new user field
    const createUserField = () => {
        const userField = document.createElement('div');
        userField.classList.add('user-field');

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'New Field');

        const dropdown = document.createElement('select');
        const options = roleSelect.querySelectorAll('option');
        options.forEach(option => {
            const newOption = document.createElement('option');
            newOption.value = option.value;
            newOption.textContent = option.textContent;
            dropdown.appendChild(newOption);
        });

        // Create checkboxes
        const checkboxGroup = document.createElement('div');
        checkboxGroup.classList.add('checkbox-group');

        const statuses = ['Active', 'Required', 'Request'];
        statuses.forEach(status => {
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('name', 'status');
            checkbox.setAttribute('value', status.toLowerCase());

            const label = document.createElement('label');
            label.textContent = status;
            checkboxGroup.appendChild(checkbox);
            checkboxGroup.appendChild(label);
        });

        // Create and configure the delete button with a Font Awesome icon
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-icon');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Font Awesome trash icon

        // Add event listener to the delete button
        deleteButton.addEventListener('click', () => {
            userForm.removeChild(userField);
        });

        userField.append(input, dropdown, checkboxGroup, deleteButton);
        return userField;
    };

    // Function to add user fields to the form
    const addUserFieldToForm = (userField) => {
        userForm.appendChild(userField);
    };

    // Attach event listeners to each button
    addBasicUserFieldButton.addEventListener('click', (e) => {
        e.preventDefault();
        createBasicUserFields(); // Only add the basic fields once
    });

    addDynamicFieldsButton.addEventListener('click', (e) => {
        e.preventDefault();
        const userField = createUserField();
        addUserFieldToForm(userField); // Add dynamic fields to the form
    });

    addOtherFieldsButton.addEventListener('click', (e) => {
        e.preventDefault();
        const userField = createUserField();
        addUserFieldToForm(userField); // Same functionality for "Add Other Fields"
    });

    addConditionalFieldsButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Conditional fields feature not implemented yet.');
    });
});
