document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

    // Load students from local storage
    let students = JSON.parse(localStorage.getItem('students')) || [];

    const renderStudents = () => {
        studentTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = studentTable.insertRow();
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentID}</td>
                <td>${student.email}</td>
                <td>${student.contactNumber}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
        });
    };

    function addStudent(student) {
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }

    window.deleteStudent = function(index) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    };

    window.editStudent = function(index) {
        const student = students[index];
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentID').value = student.studentID;
        document.getElementById('email').value = student.email;
        document.getElementById('contactNumber').value = student.contactNumber;
        form.onsubmit = function(e) {
            e.preventDefault();
            students[index] = {
                name: document.getElementById('studentName').value,
                studentID: document.getElementById('studentID').value,
                email: document.getElementById('email').value,
                contactNumber: document.getElementById('contactNumber').value,
            };
            localStorage.setItem('students', JSON.stringify(students));
            renderStudents();
            form.onsubmit = addNewStudent;
            form.reset();
        };
    };

    function addNewStudent(e) {
        e.preventDefault();
        const student = {
            name: document.getElementById('studentName').value,
            studentID: document.getElementById('studentID').value,
            email: document.getElementById('email').value,
            contactNumber: document.getElementById('contactNumber').value,
        };
        addStudent(student);
        form.reset();
    }

    form.onsubmit = addNewStudent;
    renderStudents();
});
