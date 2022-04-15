CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_type VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_pass VARCHAR(255) NOT NULL
);

INSERT INTO users(user_type, user_email, user_pass) VALUES ('Admin', 'mowvolunteer.manage@gmail.com', 'mealsonwheelsh4i');
