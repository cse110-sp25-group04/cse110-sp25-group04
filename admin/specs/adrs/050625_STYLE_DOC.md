# Team 4 The Win Style Doc

## Reasoning:

We tried to follow some ususal standards of html, css and js, but also added some of our 
changes such as 4 space indent instead of the usual 2. This is because we prefer readability
and understanding of the code rather than compactness or ease of writing.

Our most contravertial requirement may be the use of **NO ARROW FUNCTIONS**
This is because arrow functions are hard to understand for people who are just now learning
javascript, and even for other people who are familiar with them, the word **function** is
easier to find in a codebase than **()** when searching and looking over.

## File Names:

All files will have the naming format: <b>lower_snake_case</b>

<b>the_name.ext</b>

Ex: main.js, style.css, html_template.html

## Indentation:

TAB = 4 Spaces (please configure in your IDE)
```js
Good: (1 Tab = 4 spaces)
class TheClass {
    constructor();
}
Bad: (2 spaces)
class TheClass {
  constructor();
}
```

## HTML:
1. Common HTML header template
```html
<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="UTF-8">
  <title>Page Title</title>
</head>
```

2. All tags are <b>lower case</b>

```html
<body>
<p>Good<br></p>
</body>
```

3. All attributes are <b>lowercase and quoted</b>
```html
Good:
<link rel="stylesheet" href="style.css">
Bad:
<link REL=stylesheet HREF=style.css>
```

4. Id and class names are **kabob-case**
```html
<div id="the-id-name" class="the-class-name"></div>
```

5. No spacing between operator signs
```html
Good:
<div class="the-class"></div>
Bad:
<div class = "the-class" >< /div >
```

6. ALWAYS CLOSE TAGS (which have a closing tag)

```html
<img src="snake_style.png" alt="kabob-case-image" height="50px" width="100px">
```


7. No **Inline** css or js
```html
Bad:
<div style="width:50px;height:50px">
<div onClick="some function">
```

8. CSS and JS files separate from html
```html
Good: 
<link rel="stylesheet" href="style.css">
<script src="main.js"></script>
```

9. No blank lines for no reason, but for **readability**

## CSS:
1. One space before opening '{' and ':'
```css
Good:
#the-id {
    prop1: "";
    prop2: "";
}
```
2. End property lines with ';'
3. No short hand notation
```css
Bad:
.the-class {
    padding: 10px 10px auto auto;
}
Good:
.the-class {
    padding-top: 10px;
    padding-right: 10px;
}
```
4. Leave 1 line of space between rulesets
```css
Good:
.the-1st-class {
}

.the-2nd-class{
}
```
5. Do not use + and ~ operators, theyre unclear
   
## JavaScript:
1. Use **only** let and const
2. End every line with a ;
```js
Bad:
let num = 10
Good:
let num = 10;
```
3. Use Strict Mode:
```js
"use strict" // top of file
/* rest of file */
```
4. **camelCase** for local variable names
5. **UPPER_SNAKE_CASE** for global constants
6. **PascalCase** for class names
7. **camelCase** for function names
8. Space between math operators and ,
```js
Good:
let theNum = a + b;
const GLOBAL_ARRAY = [a, b, c, d];
```
9. Parentheses: No spacing between start and end
```js
Good:
console.log("The output");
Bad:
theFunction( param1, param2 );
```
10. Function Structure: Follow exactly
```js
Good:
function theFunction(param1, param2, param3) {
    return output;
}
```
11. Callback Functions: **NO ARRAOW FUNCTIONS**
```js
Good:
theObj.addEventListener('click', function (param1, param2) {
    // operation
});
Bad:
theObj.addEventListener('click', (param1, param2) => {
    // operation
});
```
12. Quotations: single quotes outside, double inside
```js
Good:
console.log('some person said "Hello World"');
Also Good:
console.log(`some person said ${textVar}`);
```
13. Line overflow: Insert one more tab than scope level
```js
Good:
let theVar = a + b
    + c;
Bad:
let theBadVar = a + b
        +c; // too far
Also Bad:
let theBad Var = a + b
                 +c // too far
```
14. Limit functions to less than 50 lines of code

## Documentation: JSDoc
1. Label core API functions like so:
```js
/**
 * Description
 *
 * @param param1: Type, purpose
 * @param param2: Type, purpose
 * @return Type, purpose
 */
```
2. Helper functions
```js
Good:
// Description
```
If necessary, follow js to make things clear
