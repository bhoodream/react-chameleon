# React Chameleon
React-chameleon is a HOC. With react-chameleon you can parse image colors and apply them how you want.  

#### Install:
```bash
npm i react-chameleon
```

#### Use:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Chameleon from 'react-chameleon';

const Text = props => {
    const {
        content,
        reactChameleonColors = []
    } = props;
    const defaultColors = {
        back: { r: 255, g: 255, b: 255, alpha: 1 },
        front: { r: 0, g: 0, b: 0, alpha: 1 }
    };
    const [
        backColor = defaultColors.back,
        frontColor = defaultColors.front
    ] = reactChameleonColors;
    const getColor = c => `rgba(${c.r},${c.g},${c.b},${c.alpha})`;

    return <p
        style={{
            backgroundColor: getColor(backColor),
            color: getColor(frontColor)
        }}>{content}</p>;
};

const ChameleonText = Chameleon(Text);

ReactDOM.render(
    <ChameleonText
        img={'./path/to/image'}
        content={'React Chameleon Demo'}
    />,
    document.body
);
```

#### Props:

| Name        | Type           | Required  |  Default |  Description |
|:------------|:---------------|:----------|:---------|:-------------|
| img        | String | Yes  |  null |  Path to image. For example, './my/image/path.png'. |
| colorsCacheLimit        | Number | No |  100 |  In order not to do the same thing several times (image analysis), we cache the resulting colors for the images. Enter the number of entries in the cache here. The uniqueness of the set is determined by the settings. |
| adaptFrontColorsToBack | Boolean | No  |  false | Adapt the colors to the background color. The background color will be the first color after sorting, the other colors will adapt to it. |
| sortType | String | No  |  'count' | What color characteristic will be used for sorting. Allowed values: "count", "alpha". |
| sortDir | String | No  |  'desc' | Sorting direction. Allowed values: "desc", "asc". |
| colorsCount | Number | No  |  undefined | The number of colors used. It is necessary to specify to optimize the process of adapting colors to the background color. |
| colorDifference | Number | No  |  120 | The minimum allowed difference in colors. For example, if we compare colors: rgb(0, 0, 0) and rgb(255, 255, 255), then "color_difference" of them is 765. Math.abs(0 - 255 + 0 - 255 + 0 - 255) = 765. |
| minColorAlpha | Number | No  |  0 | The minimum acceptable alpha-channel level of color. All colors whose level will be lower will be ignored. |
| colorAlphaPrecision | Number | No  |  100 | Precision of alpha-chanel value. For example, with a default value of 100, the precision will be 0.01. |

#### Demo:

For more information and examples check the [demo page](https://vadimfedorov.ru/lab/chameleon-js/react/).