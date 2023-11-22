# Contributing to Card Games Utils

Thank you for considering contributing to this project! Before you start, please take a moment to read our contributing guidelines.

## Project Structure

This project follows a specific structure to maintain organization and clarity. Here's an overview:

### Source Code

- The source code is located in the `src` folder.
- Configuration files:
  - `.eslintrc.json`: Configuration for ESLint.
  - `.prettierrc`: Configuration for Prettier.

### Source Code Structure

The `src` folder contains the following subfolders:

1. **`constants`**

   - Purpose: Contains files with constant ENUMs, error messages, and static names used in the project.
   - Guidelines: If adding new constants, they should be placed in this folder.

2. **`data`**

   - Purpose: Contains files/classes representing real-world objects (e.g., cards).
   - Guidelines: Add new cards or methods related to real-world objects in this folder.

3. **`helpers`**

   - Purpose: Contains files with helper functions.
   - Guidelines: Add new helper functions to this folder.

4. **`interfaces`**

   - Purpose: Contains all project interfaces, representing the structure of real-world objects.
   - Guidelines: Add new interfaces to this folder.

5. **`models`**

   - Purpose: Contains files/classes representing the core logic of card games (e.g., Rummy, TeenPatti).
   - Guidelines: Add new games (files/classes) to this folder. Utilize interfaces, helpers, constants, and data from other folders.

6. **`tests`**
   - Purpose: Contains test files for models, helpers, and data.
   - Guidelines: Create a test file for each file in the models folder, as well as for helpers and data.

### Entry Point

- The `index.ts` file gathers all project files and exports them for external use.

## How to Contribute

1. Fork the repository.
2. Create a branch for your feature or bug fix.
3. Make your changes within the appropriate folders.
4. Ensure that your code adheres to the coding style defined in `.eslintrc.json` and `.prettierrc`.
5. Submit a pull request.

## Note

- while committing your update, please use VS code's [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) extension and explain your changes in commit briefly to make it easy to understand and review.

## Code Review Process

All contributions will be reviewed. Be sure to address any feedback provided.

Thank you for contributing!
