<?php
// Database connection parameters
$servername = "127.0.0.1";
$username = "root";
$password = "1234";
$database = "watchstore";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

// Queries operations:

if ($_POST && isset($_POST['signup']) && $_POST['signup'] === 'signupfo') {
    // Retrieve registration form data
    $email = $_POST['EmailSignup'] ?? '';
    $password = $_POST['PasswordSignup'] ?? '';

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user data into the users table
    $sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        // Bind parameters to the statement
        $stmt->bind_param("ss", $email, $hashedPassword);

        // Execute the statement
        if ($stmt->execute()) {
            echo "User registered successfully!";
        } else {
            echo "Error inserting user: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Error preparing statement: " . $conn->error;
    }
}
if ($_POST && isset($_POST['login']) && $_POST['login'] === 'loginfo') {
    // Retrieve login form data
    $Email = $_POST['EmailLogin'] ?? '';
    $Password = $_POST['PasswordLogin'] ?? '';

    // Find user by username or email
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        // Bind parameters to the statement
        $stmt->bind_param("s", $Email);

        // Execute the statement
        $stmt->execute();

        // Get the result
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // User found, verify password
            $user = $result->fetch_assoc();
            if (password_verify($Password, $user['password'])) {
                echo "Login successful! Welcome, " . $user['username'];
                // Redirect or perform further actions after successful login
            } else {
                echo "Incorrect password";
            }
        } else {
            echo "User not found";
        }

        $stmt->close();
    } else {
        echo "Error preparing statement: " . $conn->error;
    }
}

// Close prepared statement and database connection

// Check if form data is being submitted
if ($_POST && isset($_POST['descpription']) && $_POST['description'] === 'cart') {
    // Retrieve the form data
    $cardnumber = $_POST['cardnumber'] ?? '';
    $cardname = $_POST['cardname'] ?? '';
    $cvv = $_POST['cvv'] ?? '';
    $expirationdate = $_POST['expdate'] ?? '';
    $deliveryname = $_POST['deliveryname'] ?? '';
    $deliveryadress = $_POST['deliveryadress'] ?? '';
    $zip = $_POST['zip'] ?? '';
    $city = $_POST['city'] ?? '';

    // Generate a unique user ID

    // Insert data into the database
    $stmt = $conn->prepare("INSERT INTO bookings (cardnumber, cardname, cvv, expirationdate, deliveryname, deliveryadress, zip, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $cardnumber, $cardname, $cvv, $expirationdate, $deliveryname, $deliveryadress, $zip, $city);

    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}



// Close connection
$conn->close();
?>