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

// SQL query to select data from the Users table
$sql = "SELECT * FROM Users";

// Execute the query
$result = $conn->query($sql);

// Check if there are any results
if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "User ID: " . $row["user_id"] . " - Email: " . $row["email"] . " - Password: " . $row["password"] . "<br>";
    }
} else {
    echo "0 results";
}


// Close connection
$conn->close();
?>