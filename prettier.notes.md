#### Branch created to help all the developers working on HMDA Frontend to use the same foramtting across files.

Prettier Format API: https://prettier.io/docs/en/options.html

'.prettierrc.json' contains the specific formatting for each file.
'.prettierignore' acts as a .githubignore where the formatter will ignore any directories or files listed.

There are a few important commands we can use to run the formatting.

#### Running all files in project:

- npx prettier --write

#### Directory Specific:

- npx prettier --write {enter-directory} (i.e) -> src/

#### Check files formatting:

- npx prettier --check

The above command will return in the terminal what files have not been formatted by prettier.

#### NOTE: formatting settings that prettier cannot do:

- Format on Save/Paste
- Themes
- Icon Themes
