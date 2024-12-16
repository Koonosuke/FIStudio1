CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isadmin BOOLEAN DEFAULT FALSE,
    grade INTEGER DEFAULT 1,
    pr TEXT DEFAULT ''
);


CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_email VARCHAR(100) NOT NULL,
    receiver_email VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'unread',
    FOREIGN KEY (sender_email) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (receiver_email) REFERENCES users(email) ON DELETE CASCADE
);

CREATE TABLE subjects (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    subject_name VARCHAR(255) NOT NULL,
    teacher_name VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL
);

CREATE TABLE subject_contents (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    subject_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    content TEXT,
    evaluation INTEGER CHECK (evaluation >= 0 AND evaluation <= 5),
    past_exams TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notifications(
notification_id SERIAL NOT NULL,
user_id BIGINT NOT NULL,
subject CHAR(100) NOT NULL,
value text NOT NULL,
PRIMARY KEY(notification_id),
FOREIGN KEY (user_id) references users(id)
);