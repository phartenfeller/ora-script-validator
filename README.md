# ORA Script Validator

A tool to check an Oracle SQL-Script for common errors.

## Usage

Requirements: https://nodejs.org/en/

```sh
npx orasv install.sql
```

You can also directly install it from npm (https://www.npmjs.com/package/orasv) and use it offline:

```sh
npm i -g orasv

orasv install.sql
```

## Arguments

### Version

```sh
orasv -v
```

### Loglevel

```sh
orasv install.sql -l 1
```

Levels:

| level | description                                 | default |
| :---: | ------------------------------------------- | :-----: |
|   0   | off (No output)                             |         |
|   1   | only runtime errors                         |         |
|   2   | all necessary info                          |   ✅    |
|   3   | additional debug info to see whats going on |         |

## Supported checks

- Checks linked files (e.g. @@myscript.sql)
- Checks for foreign keys if the referenced table was created before
- Check for read / select grants if the referenced table was created before
