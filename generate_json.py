import json
import random
from faker import Faker

fake = Faker()

# Generate fake students
def generate_students(num_students):
    students = []
    for i in range(1, num_students + 1):
        student = {
            "student_id": i,
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "age": random.randint(18, 35),
            "email": fake.email(),
            "phone_number": fake.phone_number()
        }
        students.append(student)
    return students

# Generate fake teachers
def generate_teachers(num_teachers):
    teachers = []
    for i in range(1, num_teachers + 1):
        teacher = {
            "teacher_id": i,
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "age": random.randint(25, 60),
            "email": fake.email(),
            "phone_number": fake.phone_number(),
            "subject": fake.job()
        }
        teachers.append(teacher)
    return teachers

# Generate fake classes
def generate_classes(num_classes, students, teachers):
    classes = []
    for i in range(1, num_classes + 1):
        class_students = random.sample([student['student_id'] for student in students], k=random.randint(5, 15))
        class_ = {
            "class_id": i,
            "teacher_id": random.choice(teachers)['teacher_id'],
            "students": class_students,
            "description": fake.text(max_nb_chars=50),
            "is_virtual": random.choice([True, False])
        }
        classes.append(class_)
    return classes

# Generate the data
students = generate_students(50)
teachers = generate_teachers(5)
classes = generate_classes(20, students, teachers)

# Save data to JSON files
with open('students.json', 'w') as f:
    json.dump(students, f, indent=4)

with open('teachers.json', 'w') as f:
    json.dump(teachers, f, indent=4)

with open('classes.json', 'w') as f:
    json.dump(classes, f, indent=4)

print("Fake data generated successfully!")
