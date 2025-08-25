### URL Shortener Microservice

This project is a solution for the FreeCodeCamp Back End Development and APIs certification. The service provides a simple API that shortens URLs and redirects users to the original link.

-----

### How to Use the API

The API has two main endpoints for shortening and redirecting URLs.

#### `POST` `/api/shorturl`

  - **Description**: Creates a new short URL. You must send a valid URL in the request body with the key `url`.
  - **Request Body**: `url=https://www.example.com`
  - **Success Response**: Returns a JSON object with the original URL and the newly created short URL.
    ```json
    {
      "original_url": "https://www.example.com",
      "short_url": 1
    }
    ```
  - **Error Response**: If the URL is invalid, returns an error message.
    ```json
    {
      "error": "invalid url"
    }
    ```

#### `GET` `/api/shorturl/:short_url`

  - **Description**: Redirects to the original URL associated with the provided short URL ID.
  - **Example**: `https://your-app-name.herokuapp.com/api/shorturl/1`
  - **Success Response**: The user is redirected to `https://www.example.com`.
  - **Error Response**: If the short URL ID is not found, returns an error message.
    ```json
    {
      "error": "short url not found"
    }
    ```

-----

### Project Details

This project was built to fulfill the requirements of the FreeCodeCamp "URL Shortener Microservice" challenge. It demonstrates:

  - Handling both `POST` and `GET` requests
  - URL validation using `dns.lookup`
  - Redirecting users with a `302` status code
  - JSON response formatting

-----

### Technologies Used

  - **Node.js**: Runtime environment
  - **Express.js**: Web framework for building the API
  - **`cors`**: Middleware for enabling Cross-Origin Resource Sharing
  - **`dns`**: Node.js module for domain validation