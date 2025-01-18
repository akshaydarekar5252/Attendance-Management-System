const students = [];
const attendanceData = [];

function addStudent() {
    const nameInput = document.getElementById('student-name');
    const rollInput = document.getElementById('student-roll');
    const name = nameInput.value.trim();
    const roll = rollInput.value.trim();
    if (name && roll) {
        students.push({ name, roll });
        const select = document.getElementById('attendance-student');
        const option = document.createElement('option');
        option.value = roll; // Store roll number in the value
        option.textContent = `${name} (${roll})`;
        select.appendChild(option);
        nameInput.value = '';
        rollInput.value = '';
        alert(`${name} with Roll No. ${roll} added.`);
    } else {
        alert('Enter both student name and roll number.');
    }
}

function markAttendance() {
    const studentSelect = document.getElementById('attendance-student');
    const statusSelect = document.getElementById('attendance-status');
    const studentRoll = studentSelect.value;
    const status = statusSelect.value;

    if (studentRoll && status) {
        const student = students.find(s => s.roll === studentRoll);
        const tableBody = document.querySelector('#attendance-table tbody');
        const row = document.createElement('tr');
        row.innerHTML = `<td>${student.name}</td><td>${student.roll}</td><td>${status}</td>`;
        tableBody.appendChild(row);

        // Save the attendance in the data array
        attendanceData.push({ name: student.name, roll: student.roll, status });

        studentSelect.value = '';
        statusSelect.value = '';
        alert(`Attendance marked for ${student.name}: ${status}`);
    } else {
        alert('Select both student and status.');
    }
}

function exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(attendanceData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, "Attendance_Data.xlsx");
}