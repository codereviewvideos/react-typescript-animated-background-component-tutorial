import * as React from 'react';
import './AnimatedBackground.css';

type colourType = [number,number,number];

interface IGradientBgState {
    colourIndices: number[],
    colours: colourType[],
    gradientSpeed: number,
    step: number,
}

class AnimatedBackground extends React.Component<any, IGradientBgState> {

    private interval: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            colourIndices: [0, 1, 2, 3],
            colours: [
                [13, 179, 255],
                [12, 105, 232],
                [0, 41, 255],
                [35, 12, 232],
                [105, 13, 255],
            ],
            gradientSpeed: 0.002,
            step: 0,
        };
    }

    public componentDidMount() {
        this.interval = setInterval(() => this.updateGradient(), 10);
    }

    public componentWillUnmount() {
        clearInterval(this.interval);
    }

    public render() {
        const nextColourCombo = this.determineNextColourCombo();

        const css = {
            background:"-moz-linear-gradient(left, "+nextColourCombo[0]+" 0%, "+nextColourCombo[1]+" 100%)"
        };

        return (
            <div className="AnimatedBackground" style={css}>hello</div>
        );
    }

    private updateGradient()
    {
        const {colours,gradientSpeed,step} = this.state;

        this.setState({
            step: step + gradientSpeed
        });

        if ( step >= 1 )
        {
            this.state.colourIndices[0] = this.state.colourIndices[1];
            this.state.colourIndices[2] = this.state.colourIndices[3];

            // pick two new target colour indices
            // do not pick the same as the current one
            this.state.colourIndices[1] = ( this.state.colourIndices[1] + Math.floor( 1 + Math.random() * (colours.length - 1))) % colours.length;
            this.state.colourIndices[3] = ( this.state.colourIndices[3] + Math.floor( 1 + Math.random() * (colours.length - 1))) % colours.length;

            this.setState({
                step: step % 1
            });
        }
    }

    private determineNextColourCombo(): [string,string]
    {
        const {colours, step} = this.state;

        const c00 = colours[this.state.colourIndices[0]];
        const c01 = colours[this.state.colourIndices[1]];
        const c10 = colours[this.state.colourIndices[2]];
        const c11 = colours[this.state.colourIndices[3]];

        const istep = 1 - step;

        const r1 = Math.round(istep * c00[0] + step * c01[0]);
        const g1 = Math.round(istep * c00[1] + step * c01[1]);
        const b1 = Math.round(istep * c00[2] + step * c01[2]);
        const colour1 = "rgb("+r1+","+g1+","+b1+")";

        const r2 = Math.round(istep * c10[0] + step * c11[0]);
        const g2 = Math.round(istep * c10[1] + step * c11[1]);
        const b2 = Math.round(istep * c10[2] + step * c11[2]);
        const colour2 = "rgb("+r2+","+g2+","+b2+")";

        return [colour1, colour2];
    }
}

export default AnimatedBackground;