
```markdown
# subdox

`subdox` is a powerful CLI tool for managing and discovering domain information. With a range of commands, `subdox` simplifies domain discovery, API key management, and more.

## Installation

To install `subdox` globally, use npm:

```bash
npm install -g subdox
```

## Usage

Run `subdox` from your terminal:

```bash
subdox [options] [command]
```

### Options

- `-V, --version`        Output the version number
- `-h, --help`           Display help for command

### Commands

- `test`                  Test for CLI functionality
- `find <domain>`         Find domain using a name file
- `find-st <domain>`      Find domain using SecurityTrails
- `add-api-key <key>`     Add an API key (you can have multiple keys)
- `remove-api-key <key>`  Remove an API key
- `reset-api-key`         Reset all your API keys
- `all-api-key`           Show all API keys
- `help [command]`        Display help for command

## Examples

- **Test the CLI tool:**

  ```bash
  subdox test
  ```

- **Find a domain using a name file:**

  ```bash
  subdox find example.com
  ```

- **Find a domain using SecurityTrails:**

  ```bash
  subdox find-st example.com
  ```

- **Add an API key:**

  ```bash
  subdox add-api-key your-api-key
  ```

- **Remove an API key:**

  ```bash
  subdox remove-api-key your-api-key
  ```

- **Reset all API keys:**

  ```bash
  subdox reset-api-key
  ```

- **Show all API keys:**

  ```bash
  subdox all-api-key
  ```

## Repository

For more details, check out the [GitHub repository](https://github.com/ocircleo/subdox).

## License

This project is licensed under the MIT License.
```