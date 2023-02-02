# range-slider

## How to use

First import css and js files:
```html
<head>
  ...
  <link type="text/css" rel="stylesheet" href="range-slider.min.css">
  ...
</head>
<body>
  ...
  <script src="range-slider.min.js"></script>
</body>
```

Add slider to page (without any data attributes it will produce range slider from 0 to 100)
```html
<body>
  ...
  <div class="r-slider"></div>
  ...
</body>
```

To specify range steps add data-steps attribute
```html
<body>
  ...
  <div class="r-slider" data-steps="[10,15,30,50,100]"></div>
  ...
</body>
```

To specify start point add data-start-index attribute
```html
<body>
  ...
  <div class="r-slider" data-start-index="3"></div>
  ...
</body>
```

To specify min range add data-min attribute
```html
<body>
  ...
  <div class="r-slider" data-min="-100"></div>
  ...
</body>
```

To specify max range add data-max attribute
```html
<body>
  ...
  <div class="r-slider" data-max="1000"></div>
  ...
</body>
```

To specify step of generated range add data-step attribute
```html
<body>
  ...
  <div class="r-slider" data-step="5"></div>
  ...
</body>
```

To get range slider value on its updating add event listener on slider
```html
<body>
  ...
  <div class="r-slider" data-steps='["a","b","c","d","e","f"]'></div>
  <div class="r-slider" data-min="-100" data-max="200" data-step="5"></div>
  ...
  <script>
    const s1 = document.getElementsByClassName('r-slider')[0],
          s2 = document.getElementsByClassName('r-slider')[1]

    s1.addEventListener('r-slider-updated', e => console.log('slider1', e.detail.value))
    s2.addEventListener('r-slider-updated', e => console.log('slider2', e.detail.value))
  </script>
</body>
```

To see more check public/example.html file or https://jsfiddle.net/fy0u11/oxtj6szn/10/
