# ORA Script Validator

A tool to check an Oracle SQL-Script for common errors.

## Usage

Requirements: https://nodejs.org/en/

```sh
npx orasv install.sql
```

## Supported checks

- Checks linked files (e.g. @@myscript.sql)
- Checks for foreign keys if the referenced table was created before
- Check for read / select grants if the referenced table was created before
