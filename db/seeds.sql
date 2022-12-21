-- Insert departments
INSERT INTO departments (name)
VALUES

    ("Software Development"),
    ("Sales"),
    ("Accounting"),
    ("Human Rescources");


-- Insert role
INSERT INTO role (title, salary, department_id)
VALUES
    ("Software Engineer", 90000, 1),
    ("Junior Software Engineer", 50000, 1),
    ("Sale manager", 75000, 2),
    ("Sale Representative", 40000, 2),
    ("Accountant Manager", 120000, 3),
    ("Accountant", 65000, 3),
    ("HR specialist", 80000, 4),
    ("Accountant", 80000, 4);

-- Insert employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Ana", "Tara", 1, null),
    ("Andi", "Fama", 2, 1),
    ("Eda", "Mapa", 3, null),
    ("Tina", "Capa", 4, 3),
    ("Visa", "Hala", 5, null),
    ("Genci", "Topani", 6, 5),
    ("Mira", "Lala", 7, null),
    ("Agimi","Mali", 8, 7),
    ("Arti", "Noci", 2, 1);