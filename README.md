# NCloc

<br />

A cli written in Node.js inspired by [cloc](https://github.com/AlDanial/cloc) to count the lines of source code.

<br />

## Installation

```
npm i -g ncloc
```

<br />

## Basic example

```
$ ncloc -i /home/michal/repos/ncloc
╔═══════════════════════╤══════════════════╤══════════════════╗
║ Programming language  │ Files            │ Lines of code    ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ Javascript            │ 4352             │ 1365030          ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ Java                  │ 1                │ 16               ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ Python                │ 1                │ 4                ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ Go                    │ 1                │ 6                ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ C#                    │ 1                │ 10               ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ C++                   │ 1                │ 8                ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ Typescript            │ 1155             │ 216694           ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ PHP                   │ 1                │ 156              ║
╚═══════════════════════╧══════════════════╧══════════════════╝

```

<br />

## Excluding directories

```
$ ncloc -i /home/michal/repos/ncloc -e /home/michal/repos/ncloc/node_modules
╔═══════════════════════╤══════════════════╤══════════════════╗
║ Programming language  │ Files            │ Lines of code    ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ Javascript            │ 19               │ 423              ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ Java                  │ 1                │ 16               ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ Python                │ 1                │ 4                ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ Go                    │ 1                │ 6                ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ C#                    │ 1                │ 10               ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ C++                   │ 1                │ 8                ║
╟───────────────────────┼──────────────────┼──────────────────╢
║ Typescript            │ 29               │ 699              ║
╚═══════════════════════╧══════════════════╧══════════════════╝

```

<br />

## Flags

```
Flags:
  -i, --input    Directory/file absolute path to count lines in
  -e, --exclude  Directories/files absolute paths to be excluded from counting
      --help     Show help
```

<br />

## Supported languages

- C++
- C#
- Javascript
- Typescript
- Python
- Jave
- Go
- PHP
- Rust
- Ruby

<br />

## ✨ Contributing

Feel free to add more programming languages! 🚀
