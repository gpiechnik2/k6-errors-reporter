# k6-errors-reporter

Work in progress, package is further under testing

A package for generating automatic error reports from a k6 log file and displaying them in the console during performance testing.

## Installation

To install a package, use the command:

```bash
npm install k6-errors-reporter // soon
```

## Usage

The package can be used in two different ways.

### 1. Simple error display
For this way, just import and use the `checkResponse` function. It will display the most important information about the detected error during the test.

```javascript
import { checkResponse } from 'https://raw.githubusercontent.com/gpiechnik2/k6-errors-reporter/main/dist/bundle.js';


export default function() {
    const res = http.get("https://k6.io")
    const status = check(
        res,
        {
          "response code is 201": (res) => res.status == 201
        }
    )
    checkResponse(res, status)
}
```

Example log:

```bash
ERRO[0003]
  status.....: 207
  error_code.: Unknown error
  error......:
  status_text: 207 Multi-Status
  request....: GET https://mySite.com |  source=console
```


### 2. Redirect the output to a file and generate raports based on it 

The second way is a bit more complicated and assumes that we will redirect the displayed logs from the console to a file. This can be done using the command:

```bash
k6 run --log-output=file=logOutput.json --log-format=json scenario.js
```

Next, inside the `scenario.js` script, let's import the auxiliary function `checkResponse`, which (compared to the previous usage) will take `true` as the third argument. This way the `checkResponse` function knows that we will redirect the logs to a file.

```javascript
import { checkResponse } from 'https://raw.githubusercontent.com/gpiechnik2/k6-errors-reporter/main/dist/bundle.js';


export default function() {
    const res = http.get("https://k6.io")
    const status = check(
        res,
        {
          "response code is 201": (res) => res.status == 201
        }
    )
    checkResponse(res, status, true) // <----
}
```

This will create an `output.json` file. It allows us to generate several reports.

## Reports

[IMPORTANT] Generating reports is possible only from the `output.json` file, which we can create only in the second way.

### Html Raport

Generate html report based on log file `output.json`.

```bash
k6-error-reporter generate-html-report output.json raport.html
```

### Markdown Raport

Generate markdown report based on log file `output.json`.

```bash
k6-error-reporter generate-markdown-report output.json raport.md
```

### Console Raport

View all detected errors in the console.

```bash
k6-error-reporter show-errors output.json
```

## Sample view of reports

### Html Report



### Markdown Report



### Console Report


