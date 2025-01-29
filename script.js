document.getElementById('startButton').addEventListener('click', function() {
    // Reset result and hide it
    document.getElementById('cgpaResult').classList.add('hidden');
    
    // Clear the result display
    document.getElementById('cgpaValue').innerText = '';

    // Clear any existing semester inputs and result
    const semesterFields = document.getElementById('semesterFields');
    semesterFields.innerHTML = '';  // Clear previous inputs

    const numSemesters = parseInt(document.getElementById('semesters').value);

    // Check if the entered number of semesters is valid and less than or equal to 8
    if (isNaN(numSemesters) || numSemesters < 1 || numSemesters > 8) {
        alert("Please enter a valid number of semesters (1 to 8).");
        return;
    }

    // Show the fields for SGPA and Credits input
    for (let i = 0; i < numSemesters; i++) {
        const semesterDiv = document.createElement('div');
        semesterDiv.classList.add('semester');

        const sgpaInput = document.createElement('input');
        sgpaInput.type = 'number';
        sgpaInput.placeholder = `SGPA for Semester ${i + 1}`;
        sgpaInput.id = `sgpa${i + 1}`;
        sgpaInput.min = 0;
        sgpaInput.max = 10;
        sgpaInput.step = 0.01; // Allow decimals
        sgpaInput.required = true;

        const creditsInput = document.createElement('input');
        creditsInput.type = 'number';
        creditsInput.placeholder = `Credits for Semester ${i + 1}`;
        creditsInput.id = `credits${i + 1}`;
        creditsInput.min = 0;
        creditsInput.max = 50;
        creditsInput.required = true;

        semesterDiv.appendChild(sgpaInput);
        semesterDiv.appendChild(creditsInput);

        semesterFields.appendChild(semesterDiv);
    }

    // Show the semester input fields and the calculate button
    document.getElementById('semesterInputs').classList.remove('hidden');
});

document.getElementById('calculateButton').addEventListener('click', function() {
    const numSemesters = parseInt(document.getElementById('semesters').value);
    let totalCredits = 0;
    let totalSGPA = 0;

    // Loop through each semester to calculate the total SGPA and credits
    for (let i = 0; i < numSemesters; i++) {
        const sgpa = parseFloat(document.getElementById(`sgpa${i + 1}`).value);
        const credits = parseFloat(document.getElementById(`credits${i + 1}`).value);

        // Validate SGPA and credits
        if (isNaN(sgpa) || isNaN(credits) || sgpa < 0 || sgpa > 10 || credits < 0 || credits > 50) {
            alert(`Please enter valid values for Semester ${i + 1}`);
            return;
        }

        totalCredits += credits;
        totalSGPA += sgpa * credits;
    }

    // Calculate CGPA
    const cgpa = totalSGPA / totalCredits;

    // Display the result
    if (totalCredits > 0) {
        document.getElementById('cgpaValue').innerText = cgpa.toFixed(2);
        document.getElementById('cgpaResult').classList.remove('hidden');
    }
});
