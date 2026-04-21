const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

let students = [
  { id: 1, name: 'John Doe', age: 20, grade: 'A' },
  { id: 2, name: 'Jane Smith', age: 22, grade: 'B' }
];


app.get('/students', (req, res) => {
  res.json(students);
});


app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  res.json(student);
});


app.post('/students', (req, res) => {
  const { name, age, grade } = req.body;

  if (!name || !age || !grade) {
    return res.status(400).json({ error: 'Name, age, and grade are required' });
  }

  const newStudent = {
    id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1, // Generate next ID
    name,
    age,
    grade
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});


app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, age, grade } = req.body;

  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

 
  if (name) students[studentIndex].name = name;
  if (age) students[studentIndex].age = age;
  if (grade) students[studentIndex].grade = grade;

  res.json(students[studentIndex]);
});

app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const deletedStudent = students.splice(studentIndex, 1);
  res.json({ message: 'Student deleted successfully', deletedStudent: deletedStudent[0] });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});