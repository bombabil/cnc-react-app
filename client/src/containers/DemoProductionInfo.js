/**
 * Created by Bombassd on 03.01.2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Info from '../style/ProductionInfo';
import { shortenNumber } from '../util/service';
import { calcProduction } from '../util/production';
import icon_tib from '../img/icon/icon_tiberium.png';
import icon_cris from '../img/icon/icon_crystal.png';
import icon_power from '../img/icon/icon_power.png';
import icon_credits from '../img/icon/icon_credits.png';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
 from {top: -10px; left: 0; visibility: visible;}
to {top: 30px; left: 0; visibility: hidden;}
/*0% {top: -10px; left: 0;}

  100% {top: 30px; left: 0;}*/
`;

const Diff = styled.div`
    //position: absolute;
    display: inline-block;
    animation: ${rotate} 2s ease-in-out;
    padding: 0 1rem;
    font-size: 0.8rem;

    color: ${p => (p.positiv ? 'green' : '#e06161')};
`;

const Img = styled.img`
    height: 24px;
    //position: absolute;
    // display: inline-block;
    // animation: ${rotate} 2s ease-in-out;
    // padding: 0 1rem;
    // font-size: 0.8rem;
    //
    // color: ${p => (p.positiv ? 'green' : '#e06161')};
`;

class ProductionInfo extends Component {
    state = {
        diff: { tib: '', kris: '', power: '', credits: '' },
    };

    componentDidUpdate(prevProps) {
        if (prevProps.prod !== this.props.prod)
            console.log(prevProps, this.props)
            window.requestIdleCallback(() =>
                this.setState(() => {
                    const diff = {
                        tib: shortenNumber(prevProps.prod.t - this.props.prod.t, 2),
                        kris: shortenNumber(prevProps.prod.k - this.props.prod.k, 2),
                        power: shortenNumber(prevProps.prod.p - this.props.prod.p, 2),
                        credits: shortenNumber(prevProps.prod.c - this.props.prod.c, 2),
                    };
                    return {
                        diff,
                    };
                })
            );
    }


    render() {
        //return null;

        const { diff } = this.state;
        const { prod } = this.props;

        return (
            <Info>
                <div>
                    <Img src={icon_tib} alt={icon_tib} />
                    {shortenNumber(prod.t, 2)}
                    <Diff positiv={diff.tib.charAt(0) !== '-'}>{diff.tib}</Diff>
                </div>
                <div>
                    <Img src={icon_cris} alt={icon_tib} />
                    {shortenNumber(prod.k, 2)}
                    <Diff positiv={diff.kris.charAt(0) !== '-'}>{diff.kris}</Diff>
                </div>
                <div>
                    <Img src={icon_power} alt={icon_tib} />
                    {shortenNumber(prod.p, 2)}
                    <Diff positiv={diff.power.charAt(0) !== '-'}>{diff.power}</Diff>
                </div>
                <div>
                    <Img src={icon_credits} alt={icon_tib} />
                    {shortenNumber(prod.c, 2)}
                    <Diff positiv={diff.credits.charAt(0) !== '-'}>{diff.credits}</Diff>
                </div>
            </Info>
        );
    }
}
function mapStateToProps(state) {
    return {
        prod: state.demo.prod,
    };
}

export default connect(mapStateToProps)(ProductionInfo);
