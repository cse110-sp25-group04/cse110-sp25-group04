# Team 4 The Win Style Doc

## File Names:

All files will have the naming format: <b>lower_snake_case</b>

<b>the_name.ext</b>

Ex: main.js, style.css, html_template.html

## Indentation:

1 TAB = 4 Spaces (please configure in your IDE)
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
<ol>
<li> Common HTML header template
```html
<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="UTF-8">
  <title>Page Title</title>
</head>
```
</li>
<li> All tags are <b>lower case</b>

```html
<body>
<p>Good<br></p>
</body>
```
</li>
<li> All attributes are <b>lowercase and quoted</b>
```html
Good:
<link rel="stylesheet" href="style.css">
Bad:
<link REL=stylesheet HREF=style.css>
```
</li>
<li> Id and class names are <b>kabob-case</b>
```html
<div id="the-id-name" class="the-class-name"></div>
```
</li>
<li> No spacing between operator signs
```html
Good:
<div class="the-class"></div>
Bad:
<div class = "the-class" >< /div >
```
</li>
<li> ALWAYS CLOSE TAGS (which have a closing tag) </li>

<li> Default image <b>size and alt</b> must be provided
```html
<img src="snake_style.png" alt="kabob-case-image" height="50px" width="100px">
```
</li>

<li> No <b>Inline</b> css or js
```html
Bad:
<div style="width:50px;height:50px">
<div onClick="some function">
```
</li>

<li> CSS and JS files separate from html
```html
Good: 
<link rel="stylesheet" href="style.css">
<script src="main.js"></script>
```
</li>

<li> No blank lines for no reason, but for readability</li>

</ol>