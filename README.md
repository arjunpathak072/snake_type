# snake_type

This is snake_type! It's a web project that I've made to mimic the functionality found in the rather popular typing website "monkeyType" with a pinch of vim. Users can track their typing history and stats, including words per minute (WPM), raw WPM, accuracy, and more but in true nerd spirit the website is aimed at keyboard users. All the navigation is done using the command-line which can be found at the bottom (similar to the status line found at the bottom of vim).

## Features

- **Typing Tests**: Engage in various typing tests with randomly generated text.
- **Stats Tracking**: Keep track of your typing history, including:
  - Words per minute (WPM)
  - Raw words per minute (RWPM)
  - Accuracy percentage (ACC)
  - Characters typed (CHARS)
- **Vim Like Command Mode**: Modify the functionality and navigate to different pages.
- **User-Friendly Interface**: A clean and responsive design for an enjoyable typing experience.
- **History Logs**: View your previous test results and progress over time.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/typing-test.git
   cd typing-test
   ```
2. **Install the dependencies**:
    ```bash
    npm install
    ```
2. **Start the node server**:
    ```bash
    node server.js
    ```

## Usage

1. Simply start typing.
2. You can hit enter at any time to restart the test.
3. To enter a command in the commandLine, hit ":" followed by the command.

## Supported Commands

1. ```show history``` takes you to the history page.
2. ```set timeout x``` changes the test timer to x seconds instead of the default (15s).

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to add new features, please fork the repository and submit a pull request.

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- Inspired by the Monkeytype project.
- And obiously, the greatest editor of all time... VIM!