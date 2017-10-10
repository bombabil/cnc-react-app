import React from 'react'
import PropTypes from 'prop-types';
import Area from '../style/Area'
const Tib = <img src=""/>
const Kris = () => <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAGMUExURQAAAJvj+p3l+57m+5vj+prj+p7m+5nh+pni+pri+pni+pri+pvj+5ri+pzl+57n+57m+5ff+Z7m+5nh+qDv/Zvj+57m+6Hr/KL6/pni+p30/Zrl+53z/aLt/KL9/pf0/Zn3/Zv4/pfr+6L0/Zf3/Z7n+5fs+6L1/Zf6/qL8/qL2/pfm+qLw/AlQf5n8/BJVbwlTq3HQ05P29wRFaGzY3hZnhAtRn4zu7h2JtBVxnQMtShFidgZMdQdIk5/9/gY7eQI5YAY9lgY6QghmnAZIUQtUlUe26RmQzwhHXAqAvBFzwg9WjRXM4AtpkTGZowtbZwQscWSt3SuF2SiKk3/j5pLb8WD29UiZpFzR1VzP4htnmjS0xiVpdR2VswpIiSCb6Tap6Ac1g33s7kCq0CeDswQxYjSx2cf2/GrQ6x5mrGfH8izk9UzCyzWEmyuouw+XpAuPyi6ApDqLkF7GzWS9wxbD8TKJzEmPwB+x7ShDQRS90zKGmXHl9wdYtX3M6KHo+k6stWzoymS0yB9GXksjNTkAAAAzdFJOUwAHHxQLFxsBBQMkDQkoMUZCTyw3fBA9VOVYqWWhS/W53sh3sM9ok43r2b52cP///////t3sG3QAAAIISURBVCjPrZJVc9tAFEazwpVkkRljOw23smzZlpkZYjvMzFBmTOGPd5VkAtO+dKb3UWe+785dnaGhfxgazd8Jw0ATQQDIPOQ0AwEAhI2kMIy0EfBBBKLvCJgtksdq4UmCuZeDNooVJbvoGPMvRPyimQR3xQxBCVYt5LY+ckbWkwm3yHJ3UYibfVNHmyHnwupSvfE0MWIhb7fSJkzyxpZ29rW1xcW5udRyUEbRm2KG4x1TK1p9O7ZWa8/OJjcSjy0kuKEMLow568c7794fhPVOPK4mxmXeBq7XQkrKx051vVR4Ga4pivJZC3jtmA1et7KO/MZhKVwqbClKLhv9Hll+My6QwGAAFzzTkfRgd1dVy9Fcpv3tx+r+qISZjFIOEyece83BYGbzeTodz54eX54dTMosgSAKPgldrMd/9T91u61oOqe3z05mQjLPGUdS9umLlLqlds/P31aKh/rX2s8jBI0kTWBivpct6J3Glw/blWIh11H6/VdBu7GTIbCJlUyxFC5+TDVeVNRqtdXqRUZHzDg6hTFRPi2WiSrJeLmZypab0eTJpNclUMbb0wDnHW6tF8sP7z3LVOfnX4f8HhExSF+dQpkla9BrRT9seDgQcHtkC0sSVwxZwJFIAbsk+hwul0uWBJbkIHPrD+BsOEliGMvzPEvhHLhvGI38YiAESD3C9Id8/31+A0POUa1xABFzAAAAAElFTkSuQmCC" />
const img = new Image()
img.src =  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAGbUExURQAAAJri+pvj+prj+pnh+pjg+prj+pjh+pri+pzk+5rj+pni+pzl+5ri+pjh+pnh+prj+pnh+pni+pni+pjw/Jzl+5/s/Jrn+5ff+Zzl+5fz/Z/p/Jzw/Zf0/Jrm+5r3/aL4/Zfh+p7t/Jvt/Jv1/Zfv/Jvw/Jf6/aL6/gtsLQ6IVBKiXghkNm/Sw5H49ARQHJj7+g+FNwhdLYzx7ByrThCNQXvo1w1/OAt2NSvNZhKgRxCdURFyPAdlJRe/ZA2TToPt4y+yZxBsNh2YXA6RW2jcvxW3TTXykCqAWkachqD+/oLk3UeogUCeeWDEplSxnCJwVBKlWBqPNwMyFA2SKAqAUhyGPn71qDSTYhxfPC/liFHFdiTjbqr4sFnFiyCWSRCaQzrCfg1/Rz3ubGj0sVbTp7v7yBC8LBvmNBNKOSrtbxLKKV7xgkvenV3AoHzZzk6/mFHXTAtXLGndrVq5Wcr8zUvvjF+9e2HkmnTmr0fWem7m0C2nfxnVSFKPbRvUakbehimOUz3ORRbDbmveyTnfjnH1hFnMph+1ZunFEtoAAAApdFJOUwAUEBgJCw4CBAYkKC4bPR80RzddoExze1NB0FWIxWrv1GWUmdyvu93GYZ5Q7AAAAgFJREFUKM+tUtVy2wAQjJhZZrZjJ5LMzAxhJoeZy8zc767kNqk7zVOn+3g7eze3uyMj/wcYhuvA7poSBAICEAAixB80TsAoCAAMSYsiTzEoMawjQIikad5mkuSxoEPkUHxIiHK0edzpNvu92cZ9lyQy8O/FBMQ74gdZrzf+5NFR+oHLSoG3UgylTKHOUSFVL+ys9wpr004Wur2KA6I5/vl779vXva3N4+3ijN1KoTcPEYwQqF+f9o5PtHR6q7u04TGzDPJrMUw6xt9s7lZbbxvVUiKRn/UE3TSEDKQ4SJujfVX7oqmt4mIpo8xFIymJAvDBk5DNMjURbmtqrhkr1fL7L56mOzLLwMZFkHL4PZOPV9XESmW5vJZ/9Wzn+YnLROokBjOscyp70FxQzq7OcrGyuvFy/XXLY6UQ40nSFN9dShz2r87P32XCYW2xcVrIxK2kQYK0L6qUD9XM5fXldjPZ1mr5vZWJMYGDB6Q8p6y2tYv3Hz90c+GkUswpkyk/b5ike+eMLITVWvKiv99txmKV6r2U3cKSRjIYwrFydDb5MBv5lKwsx5SZ+mhAYklgEAwBUDaLfdoeckU78/ORyKjsM/Ec+DM0HIFIUXBLPrcl6ArJAUngSQC58R2HQYgjKZpnbYIgsDQHDJcI0ysEI3qJGB0ACBPYHb00+vd3Mf8JPwDEQVFKmgSbiAAAAABJRU5ErkJggg=="


class Layout extends React.Component {
    componentDidMount(props) {
        this.updateCanvas(props);
    }
    // componentDidUpdate({layout} = {}) {
    //     this.updateCanvas(layout);
    // }
    updateCanvas() {
        const layout  = this.props.layout
        console.log(layout)
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0, 200, 200);
        img.onload = () => {
            ctx.drawImage(img, 0, 0)
        }
        // draw children “components”
        let x = 0,
            y = 0
        layout.layout.split("").map((slot, i) => {
            //console.log({i, x, y})
            const color = slot === "." ? "white" : slot === "t" ? "green" : "blue"
            ctx.fillStyle = color
            ctx.fillRect(x, y, 20, 20);
            x += 20
            if(x > 8*20 ) {
                x = 0
                y += 20
                if(y < 160) {
                    // horizontal
                    ctx.moveTo(0, y)
                    ctx.lineTo(180, y)
                }
                if(y < 180) {
                    //vertikal
                    ctx.moveTo(y, 0)
                    ctx.lineTo(y, 160)
                }
            }
            ctx.strokeStyle = "rgba(50,150,120,0.1)";
            ctx.lineWidth = 0.5;
            ctx.stroke();
        })


        //rect({ctx, x: 0, y: 0, width: 20, height: 20});
        //rect({ctx, x: 110, y: 110, width: 20, height: 20});
    }
    render() {
        const { layout } = this.props
        return (
            <Area>
                <div>{`T: ${layout.tib}    - K: ${layout.cris}`}</div>
                <canvas ref="canvas" width={180} height={160}/>
                <Kris/>
                <div>{`${layout.x} : ${layout.y}`}</div>
            </Area>
        );
    }
}
Layout.propTypes = {
    layout: PropTypes.object.isRequired
}
export default Layout