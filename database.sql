CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    user_type VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_pass VARCHAR(255) NOT NULL
);

INSERT INTO users(user_type, user_email, user_pass) VALUES ('Admin', 'mowvolunteer.manage@gmail.com', 'mealsonwheelsh4i');

CREATE TABLE IF NOT EXISTS shifts (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL,
    shift_type VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS volunteer (
    volunteer_id SERIAL PRIMARY KEY,
    volunteer_name VARCHAR(255) NOT NULL,
    volunteer_address VARCHAR(255) NOT NULL,
    volunteer_email VARCHAR(255) NOT NULL,
    volunteer_password VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,

    emergency_contact_id SERIAL,
    partner_id SERIAL,
    background boolean NOT NULL, 
    training boolean NOT NULL,
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    snapchat VARCHAR(255),
    upcoming_shift timestamp,

    FOREIGN KEY (volunteer_id) REFERENCES users(user_id),
    FOREIGN KEY (emergency_contact_id) REFERENCES emergency_contact(emergency_contact_id),
    FOREIGN KEY (partner_id) REFERENCES volunteer_partner(partner_id)
);

CREATE TABLE IF NOT EXISTS history (
    user_id SERIAL PRIMARY KEY,
    curr_year int NOT NULL,
    year_one int,
    year_two int,
    year_three int,
    FOREIGN KEY (user_id) REFERENCES volunteer(volunteer_id)
);

CREATE TABLE IF NOT EXISTS emergency_contact (
    emergency_contact_id SERIAL PRIMARY KEY,
    emergency_name VARCHAR(255) NOT NULL,
    emergency_phone VARCHAR(255) NOT NULL,
    emergency_relation VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS volunteer_partner (
    partner_id SERIAL PRIMARY KEY,
    partner_name VARCHAR(255) NOT NULL,
    partner_phone VARCHAR(255) NOT NULL,
    partner_email VARCHAR(255) NOT NULL,
    partner_first boolean NOT NULL,
    emergency_contact_id SERIAL,
    FOREIGN KEY (emergency_contact_id) REFERENCES emergency_contact(emergency_contact_id)
);